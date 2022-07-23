 const Database = require("st.db");
require("discord-reply")
const { Util } = require("discord.js")
const db1 = new Database("./Database/database.json")
module.exports = {
	name: "whitelists",
	description: "Show users of whitelist",
	execute (message, client) {
		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**', ephemeral: true})

		let array = db1.get({key: `${message.guild.id}_WHITELISTS`})
		if (!array) {
      db1.set({
				key: `${message.guild.id}_WHITELIST`,
				value: []
			})
		}
		let users = []

		for (let i = 0; i < array.length; i++) {
			const user = client.users.cache.get(array[i])
			if (!user) continue;
			users.push(`**${1 + i} )** ${user} ( ${user.username} )\n( ${user.id} )`)
			
		}
		const map = users.join("\n")
		const [first, ...rest] = Util.splitMessage(map, { maxlength: 2000 })
		message.reply({content: `**__[!] There Is __\`${users.length}\`__ In Whitelist__**\n-\n${first}`})
	},
}