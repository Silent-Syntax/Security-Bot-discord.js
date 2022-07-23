const Database = require("st.db");
const { Util } = require("discord.js")
require("discord-reply")
const db1 = new Database("./Database/database.json")
module.exports = {
	name: "control-users",
	description: "Show list of control users",
	execute (message, client) {
    if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
		db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		if (!db1.get({key: `${message.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${message.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) {
       message.reply({content: `**❌ Only Ownership And Control Users Can Use This Command**`})
		}
    
		
    let array = db1.get({key: `${message.guild.id}_CONTROLUSERS`})
		if (!array) {
      db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
		let users = []

		for (let i = 0; i < array.length; i++) {
			const user = client.users.cache.get(array[i])
  		if (!user) continue;
			users.push(`**${i + 1} )** ${user} ( ${user.username} )\n( ${user.id} )`)
		}
		const map = users.join("\n")
		const [first, ...rest] = Util.splitMessage(map, { maxLength: 2000 })
		
		message.reply({content: `**__[!] There Is __\`${users.length}\`__ In Control Users__**\n-\n${first}`})
	},
}