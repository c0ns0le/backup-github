const getSettings = require('./getSettings')
const puppeteer = require('puppeteer')
const R = require('rambdax')

const selectors = {
  allRepos            : 'a[itemprop="name codeRepository"]',
  navigationContainer : '.pagination',
}

const resolution = {
  x : 1366,
  y : 768,
}
const TIMEOUT = 50000

const hasElement = selector => document.querySelector(selector) !== null

const getAllReposFn = selector => {
  const elements = document.querySelectorAll(selector)

  return Array.from(elements).map(x => x.textContent.trim())
}

const getLastNavigation = x => {
  const container = document.querySelector(x.navigationContainer)
  const links = Array.from(container.querySelectorAll('a'))
  const numberedLinks = links.filter(link => !Number.isNaN(Number(link.textContent)))
  const len = numberedLinks.length
  if (len === 0) {
    throw 'getLastNavigation len === 0'
  }

  return Number(links[ len - 1 ].textContent)
}

async function getAllRepos (username) {
  try {
    var browser = await puppeteer.launch(getSettings(resolution))
    const page = await browser.newPage()
    await page.setViewport({
      width  : resolution.x,
      height : resolution.y,
    })

    const initialUrl = `https://github.com/${ username }?tab=repositories`
    await page.goto(initialUrl, {
      waitUntil : 'networkidle',
      timeout   : TIMEOUT,
    })
    const hasNavigation = await page.evaluate(hasElement, selectors.navigationContainer)
    const initialPageRepos = await page.evaluate(getAllReposFn, selectors.allRepos)
    if (hasNavigation === false) {
      return initialPageRepos
    }
    const lastNavigation = await page.evaluate(getLastNavigation, selectors)
    const allRepos = [ initialPageRepos ]

    for (const index of R.range(2, lastNavigation + 1)) {
      const loopUrl = `https://github.com/${ username }?page=${ index }&tab=repositories`
      await page.goto(loopUrl, {
        waitUntil : 'networkidle',
        timeout   : TIMEOUT,
      })
      const loopPageRepos = await page.evaluate(getAllReposFn, selectors.allRepos)
      allRepos.push(loopPageRepos)
    }

    return R.flatten(allRepos)
  } catch (err) {
    console.log(err)
    process.exit()
  } finally {
    await browser.close()
  }
}

module.exports = getAllRepos
