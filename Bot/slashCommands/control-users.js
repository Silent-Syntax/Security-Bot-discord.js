const Database = require("st.db");
const { Util } = require("discord.js")
require("discord-reply")
const db1 = new Database("./Database/database.json")
module.exports = {
	name: "control-users",
	description: "Show list of control users",
	execute (interaction, client) {
    if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
		db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		if (!db1.get({key: `${interaction.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${interaction.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
       interaction.reply({content: `**❌ Only Ownership And Control Users Can Use This Command**`})
		}
    
		
    let array = db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})
		if (!array) {
      db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
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
		
		interaction.reply({content: `**__[!] There Is __\`${users.length}\`__ In Control Users__**\n-\n${first}`})
	},
}