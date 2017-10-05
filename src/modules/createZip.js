const path = require('path')
const zipFolder = require('zip-folder')

const createZip = output =>
  new Promise((resolve, reject) => {
    const outputValue = path.join(output, 'github-backup.zip')
    zipFolder(path.resolve(__dirname, '../files'), outputValue, err => {
      if (err) {
        reject(err)
      } else {
        resolve(outputValue)
      }
    })
  })

module.exports = createZip
