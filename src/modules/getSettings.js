module.exports = ({x,y}) => {
  const args = [
    '--no-first-run',
    '--disable-sync',
    '--disable-gpu',
    '--disable-translate',
    '--disable-background-networking',
    '--single-process',
    '--ignore-certificate-errors',
    `--window-size=${ x },${ y }`,
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--shm-size=1G',
  ]

  return {
    args         : args,
    handleSIGINT : false,
    headless     : false,
  }
}
