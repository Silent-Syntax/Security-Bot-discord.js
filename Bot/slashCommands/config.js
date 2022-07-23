require("discord-reply")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
module.exports = {
	name: "config",
	description: "Show protection configuration",
	execute (interaction, client) {
		//interaction.reply({content: `**Hold on**`}).catch(err => {})
		if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**', ephemeral: true})

		let rolesDeleteLimit = db.get(`ROLES-DELETE-LIMIT_${interaction.guild.id}`)
		if (!rolesDeleteLimit) db.set(`ROLES-DELETE-LIMIT_${interaction.guild.id}`, 1)

		let rolesCreateLimit = db.get(`ROLES-CREATE-LIMIT_${interaction.guild.id}`)
		if (!rolesCreateLimit) db.set(`ROLES-CREATE-LIMIT_${interaction.guild.id}`, 1)

		let channelsDeleteLimit = db.get(`CHANNELS-DELETE-LIMIT_${interaction.guild.id}`)
		if (!channelsDeleteLimit) db.set(`CHANNELS-DELETE-LIMIT_${interaction.guild.id}`, 1)
 
    let channelsCreateLimit = db.get(`CHANNELS-CREATE-LIMIT_${interaction.guild.id}`)
		if (!channelsCreateLimit) db.set(`CHANNELS-CREATE-LIMIT_${interaction.guild.id}`, 1)

		let bansLimit = db.get(`BANS-LIMIT_${interaction.guild.id}`)
		if (!bansLimit) db.set(`BANS-LIMIT_${interaction.guild.id}`, 1)

		let kicksLimit = db.get(`KICKS-LIMIT_${interaction.guild.id}`)
		if (!kicksLimit) db.set(`KICKS-LIMIT_${interaction.guild.id}`, 1)
 
    let protectionLog = `<#` + db.get(`${interaction.guild.id}_PROTECTIONLOG`) + `>`
		if (!protectionLog) protectionLog = null
 
    let embed = new MessageEmbed()
    .setTitle("Protection Configuration")
		.setAuthor(client.user.tag, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
		.setFooter(`Requested By: ${interaction.user.username}`, interaction.user.avatarURL())
    .setColor("GREEN")
    .setDescription(`> **Roles Create Limit :** \`${rolesCreateLimit}\`\n> **Role Delete Limit :** \`${rolesDeleteLimit}\`\n> **Channels Create Limit :** \`${channelsCreateLimit}\`\n> **Channels Delete Limit :**  \`${channelsDeleteLimit}\`\n> **Kicks Limit :** \`${kicksLimit}\`\n> **Bans Limit :** \`${bansLimit}\`\n> **Protection Log :** ${protectionLog === null ? `\`null\`` : protectionLog}`)
    interaction.reply({content: ` `,embeds: [embed], ephemeral: false})
	},
}