module.exports = client => {
  const commandsMap = require("../../index.js").commands
	const db = require("quick.db")
	const Database = require("st.db")
	const db1 = new Database("./Database/premiums.json")
  const prefix = require("../config/config.json")
	client.on("messageCreate", message => {
		if (message.channel.type !== "GUILD_TEXT") return;
	  if (client.user.id == "593536295507329049") prefix = "-"
		if (message.author.bot || message.channel.type !== "GUILD_TEXT" || !message.content.startsWith(prefix)) return;
		const command = message.content.toLowerCase().split(" ")[0].slice(prefix.length)
		if (!commandsMap.has(command)) return;
		try {
			const array = db1.get({key: "PREMIUMS"}) || []
     
      if (array.includes(message.guild.id) && client.user.id == process.env.CLIENT_ID) return;
			if (commandsMap.get(command).disabled == true) return message.reply(`**❌ ${commandsMap.get(command).name} is temporary disabled.**`)
			commandsMap.get(command).execute(message, client)
		} catch (err) {
      return message.reply(`${err}`)
    }
	})
}