module.exports = {
	name: "uptime", 
	description: "Show bot uptime",
	execute (interaction, client) {
		let ms = require("parse-ms")
    let { MessageEmbed } = require("discord.js")
		let days = ms(client.uptime).days
    let hours = ms(client.uptime).hours
    let minutes = ms(client.uptime).minutes
		let seconds = ms(client.uptime).seconds

		let embed = new MessageEmbed()
		.setTitle("BOT UPTIME")
    .setThumbnail(client.user.avatarURL())
    .setAuthor(`${client.user.tag}`, client.user.avatarURL())
    .setFooter(`Requested By: ${interaction.user.username}`, interaction.user.avatarURL())
		.setColor("BLUE")
    .setDescription(`**\`${days}\` Days**\n**\`${hours}\` Hours**\n**\`${minutes}\` Minutes**\n**\`${seconds}\` Seconds**`)
	
	  interaction.reply({embeds: [embed], ephemeral: false})
	},
}