const path = require("path")
const { exec } = require("child_process")

const execCommand = (command, cwd = path.resolve(__dirname, "../files")) =>
  new Promise((resolve, reject) => {
    const proc = exec(
      command,
      { cwd }
    )
    proc.stdout.on("data", chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on("end", resolve)
    proc.stdout.on("error", err => {
      reject(err)
    })
  })

module.exports = execCommand
