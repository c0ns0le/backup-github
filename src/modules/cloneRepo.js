const execCommand = require('./execCommand')

const cloneRepo = async repo => {
  const command = `https://github.com/selfrefactor/${ repo }.git`

  return execCommand(`git clone ${ command }`)
}

module.exports = cloneRepo
