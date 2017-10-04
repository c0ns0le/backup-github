const R = require('rambdax')

const type = async ({ page, text, selector }) => {
  await page.focus(selector)

  await R.composeAsync(
    R.mapAsync(async char => {
      await page.keyboard.sendCharacter(char)
      await R.delay(100)
    }),
    R.split('')
  )(text)
}

module.exports = type
