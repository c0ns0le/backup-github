const fs = require('fs-extra')
const path = require('path')
const R = require('rambdax')
const log = require('log-fn')

const cloneRepo = require('./modules/cloneRepo')
const createZip = require('./modules/createZip')
const getAllRepos = require('./modules/getAllRepos')

async function backupGithub ({ username, output }) {
  const tempDirectory = path.join(__dirname, 'files')

  fs.ensureDirSync(tempDirectory)

  const outputValue = R.typedDefaultTo(__dirname, output)

  const zipLocation = await R.composeAsync(
    async () => createZip(outputValue),
    () => console.log('All repos are cloned. Now proceed to generating the zip file.'),
    R.mapFastAsync(async repo => cloneRepo({repo,username})),
    R.tap(x=>{
      log(`Puppeteer scraped all repos for account ${username}`,'info')
      log({numberRepos: x.length},'pattern')
      log(`Now proceeding to cloning these repos to a temp directory`,'info')
    })
  )(await getAllRepos(username))

  console.log('Backup of your Github repos is done.')
  console.log(`Location of zip file is ${ zipLocation }`)

  fs.removeSync(tempDirectory)
}

module.exports = backupGithub
