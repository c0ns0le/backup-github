# backup-github
Backup all your repos to a single zip file

# How to install?

Use the following command:

```
yarn add https://github.com/selfrefactor/backup-github#0.1.0
```

Example use

```
const backupGithub = require('backup-github')

backupGithub({username: 'selfrefactor'})
  .then(console.log)
  .catch(console.log)
```
