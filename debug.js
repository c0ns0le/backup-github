require('env-fn')('special')

const backupGithub = require('./src/')

backupGithub({username: 'selfrefactor'})
  .then(console.log)
  .catch(console.log)
