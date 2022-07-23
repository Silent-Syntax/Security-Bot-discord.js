module.exports.run = function (client) {
  const commandsMap = require("../index.js").commands
  const commandsFile = require("fs").readdirSync("./Bot/commands").filter(file => file.endsWith(".js"))
  for (const file of commandsFile) {
    const command = require(`../Bot/commands/${file}`)
    commandsMap.set(command.name, command) 
  }
}