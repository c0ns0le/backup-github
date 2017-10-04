const puppeteer = require('puppeteer')
const R = require('rambdax')
const getSettings = require('./modules/getSettings')
const typeModule = require('./modules/type')
const clickLoginSubmit = require('./modules/clickLoginSubmit')

const selectors = {
  username: '#login_field',
  password: '#password',
  clickLoginSubmit: '.btn-primary'
}

const TIMEOUT = 50000

module.exports = async function backupGithub({username, password, resolution}){
  try{
    const resolutionValue = R.typedDefaultTo({x:1366, y:768}, resolution)
    var browser = await puppeteer.launch(getSettings(resolutionValue))
    var page = await browser.newPage()
    await page.setViewport({
      width  : resolutionValue.x,
      height : resolutionValue.y,
    })

    const type = R.partialCurry(typeModule, {page})

    const url = 'https://github.com/login'
    await page.goto(url, {
      waitUntil : 'networkidle',
      timeout   : TIMEOUT,
    })

    await type({
      selector: selectors.username,
      text: username
    })
    await type({
      selector: selectors.password,
      text: password
    })
    await page.evaluate(clickLoginSubmit, selectors.clickLoginSubmit)
    await R.delay(300000)
  }catch(err){
    console.log(err)
  }finally{

  }

}
