const clickLoginSubmit = selector => {
  const element = document.querySelector(selector)
  if(element === null){
    throw `cannot click login submit with selector ${selector}`
  }
  element.click()
}

module.exports = clickLoginSubmit
