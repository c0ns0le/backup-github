const puppeteer = require('puppeteer')
const R = require('rambdax')
const fs = require('fs-extra')
const path = require('path')
const getSettings = require('./modules/getSettings')
const cloneRepo = require('./modules/cloneRepo')
const createZip = require('./modules/createZip')

const selectors = {
  allRepos: 'a[itemprop="name codeRepository"]'
}

const resolution = {x:1366, y:768}
const TIMEOUT = 50000

module.exports = async function backupGithub({username, output}){
  const tempDirectory = path.join(__dirname,'files')

  fs.ensureDirSync(tempDirectory)

  const outputValue = R.typedDefaultTo(__dirname, output)

  const zipLocation = await R.composeAsync(
    async ()=> createZip(outputValue),
    ()=>console.log('All repos are cloned. Now proceed to generating the zip file.'),
    R.mapFastAsync(async repo => cloneRepo(repo))
  )(await getAllRepos(username))

  console.log('Backup of your Github repos is done.')
  console.log(`Location of zip file is ${zipLocation}`)

  fs.removeSync(tempDirectory)
}

const getAllReposFn = selector => {
  const elements = document.querySelectorAll(selector)
  return Array.from(elements).map(x => x.textContent.trim())
}

async function getAllRepos(username){
  try{
    var browser = await puppeteer.launch(getSettings(resolution))
    var page = await browser.newPage()
    await page.setViewport({
      width  : resolution.x,
      height : resolution.y,
    })

    const urlRepo = `https://github.com/${username}?tab=repositories`
    await page.goto(urlRepo, {
      waitUntil : 'networkidle',
      timeout   : TIMEOUT,
    })

    const allRepos = await page.evaluate(getAllReposFn, selectors.allRepos)
    await browser.close()

    return allRepos
  }catch(err){
    console.log(err)
    process.exit()
  }
}
