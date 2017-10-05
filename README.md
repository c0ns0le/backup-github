## Backup-github
Backup all your repos to a single zip file.

## How to install?

Use the following command:

```
yarn add https://github.com/selfrefactor/backup-github#0.3.0
```

## Example use

```
const backupGithub = require('backup-github')

backupGithub({username: 'selfrefactor'})
  .then(console.log)
  .catch(console.log)
```

You will receive information in the console about the progress as well as the location of the generated zip file.

## API

### backupGithub({username, output})

- username - Github username

- output(optional) - Absolute path of the directory where the zip file will be generated. The name of the generated zip file is `backup-github.zip`.
