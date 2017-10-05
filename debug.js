const backupGithub = require('./src/')

backupGithub({username: 'selfrefactor'})
// backupGithub({username: 'sindresorhus'})
  .then(console.log)
  .catch(console.log)
