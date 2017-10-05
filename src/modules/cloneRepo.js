const execCommand = require('./execCommand')

const cloneRepo = async ({repo,username}) => {
  const command = `https://github.com/${username}/${ repo }.git`

  return execCommand(`git clone ${ command }`)
}

module.exports = cloneRepo
