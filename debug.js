const backupGithub = require('./src/')

backupGithub({username: 'lukasMega'})
// backupGithub({username: 'elmasse'}) // 39
// backupGithub({username: 'vasanthk'}) // 108
// backupGithub({username: 'sindresorhus'})
  .then(console.log)
  .catch(console.log)
