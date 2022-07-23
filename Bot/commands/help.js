module.exports = {
	name: "help",
	description: "Help command",
  execute (message, client) {
		let { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
    let embed = new MessageEmbed()
		.setAuthor(client.user.tag, client.user.avatarURL())
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`**🌍 | Public Commands**\n\`server,anime,bot,youtube-search,ping,uptime,user,daily,user-avatar,coins\`\n**🛠️ | Moderation Commands**\n\`lock,find,unlock, hide,show\`\n**🛡️ | Protection Commands**\n\`antibots,antihacks,antilinks,limit-bans,limit-kicks,limit-ch-create,limit-ch-delete,limit-ro-create,limit-ro-delete,control-user,whitelist,control-users,whitelists,config,bots\``)

		let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setStyle("LINK")
      .setLabel("Add Bot")
      .setEmoji("<:emoji_6:917121007632928778>") 
			.setURL("https://discord.com/api/oauth2/authorize?client_id=806779133023223860&permissions=8&scope=bot%20applications.commands")
		)
		.addComponents(
			new MessageButton()
		  .setStyle("LINK")
      .setLabel("Support")
      .setEmoji("<a:emoji_5:917120970752401458> ") 
			.setURL("https://discord.gg/eRk9chq5w6")		
	
		)

		.addComponents(
	    new MessageButton()
		  .setStyle("DANGER")
			.setEmoji("<:emoji_8:917121138860130425>")
      .setLabel("Report Problem")
			.setCustomId("report")		
			)
		.addComponents(
			new MessageButton()
		  .setStyle("LINK")
      .setLabel("Vote Top.gg")
      .setEmoji("<:emoji_7:917121047663362119>") 
			.setURL("https://top.gg/bot/806779133023223860/vote")
		)
		
		message.reply({embeds: [embed], components: [row], ephemeral: true})
 
	},
}