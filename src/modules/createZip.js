const zipFolder = require('zip-folder');
const path = require('path')

const createZip = output =>
  new Promise((resolve, reject) => {
    const outputValue = path.join(output, 'github-backup.zip')
    zipFolder(path.resolve(__dirname, "../files"), outputValue, function(err) {
      if(err) {
        reject(err)
      } else {
        resolve(outputValue)
      }
    })
  })

module.exports = createZip
