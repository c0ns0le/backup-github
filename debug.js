require('env-fn')('special')

const backupGithub = require('./src/')

backupGithub({
  username: 'selfrefactor',
  password: process.env.GITHUB_PASSWORD
}).then(console.log).catch(console.log)
