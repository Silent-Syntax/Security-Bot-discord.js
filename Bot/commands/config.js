require("discord-reply")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
module.exports = {
	name: "config",
	description: "Show protection configuration",
	execute (message, client) {
		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**'})

		let rolesDeleteLimit = db.get(`ROLES-DELETE-LIMIT_${message.guild.id}`)
		if (!rolesDeleteLimit) db.set(`ROLES-DELETE-LIMIT_${message.guild.id}`, 1)

		let rolesCreateLimit = db.get(`ROLES-CREATE-LIMIT_${message.guild.id}`)
		if (!rolesCreateLimit) db.set(`ROLES-CREATE-LIMIT_${message.guild.id}`, 1)

		let channelsDeleteLimit = db.get(`CHANNELS-DELETE-LIMIT_${message.guild.id}`)
		if (!channelsDeleteLimit) db.set(`CHANNELS-DELETE-LIMIT_${message.guild.id}`, 1)
 
    let channelsCreateLimit = db.get(`CHANNELS-CREATE-LIMIT_${message.guild.id}`)
		if (!channelsCreateLimit) db.set(`CHANNELS-CREATE-LIMIT_${message.guild.id}`, 1)

		let bansLimit = db.get(`BANS-LIMIT_${message.guild.id}`)
		if (!bansLimit) db.set(`BANS-LIMIT_${message.guild.id}`, 1)

		let kicksLimit = db.get(`KICKS-LIMIT_${message.guild.id}`)
		if (!kicksLimit) db.set(`KICKS-LIMIT_${message.guild.id}`, 1)
 
    let protectionLog = `<#` + db.get(`${message.guild.id}_PROTECTIONLOG`) + `>`
		if (!protectionLog) protectionLog = null
 
    let embed = new MessageEmbed()
    .setTitle("Protection Configuration")
		.setAuthor(client.user.tag, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
		.setFooter(`Requested By: ${message.author.username}`, message.author.avatarURL())
    .setColor("GREEN")
    .setDescription(`> **Roles Create Limit :** \`${rolesCreateLimit}\`\n> **Role Delete Limit :** \`${rolesDeleteLimit}\`\n> **Channels Create Limit :** \`${channelsCreateLimit}\`\n> **Channels Delete Limit :**  \`${channelsDeleteLimit}\`\n> **Kicks Limit :** \`${kicksLimit}\`\n> **Bans Limit :** \`${bansLimit}\`\n> **Protection Log :** ${protectionLog === null ? `\`null\`` : protectionLog}`)
    message.reply({content: ` `,embeds: [embed], ephemeral: false})
	},
}