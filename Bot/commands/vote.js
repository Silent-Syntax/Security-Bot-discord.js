const Discord = require("discord.js");
module.exports = {
	name: "vote",
	description: "Get Top.gg vote link",
	execute(message, client) {
    let { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
		let embed = new Discord.MessageEmbed()
		.setTitle("For Vote On Top.gg Press The Button")
		.setColor("BLUE")
let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
		  .setStyle("LINK")
      .setLabel("Top.gg Vote")
      .setEmoji("✨") 
			.setURL("https://top.gg/bot/806779133023223860/vote")
		)	    
    message.reply({embeds: [embed], components: [row], ephemeral: true})
	},
}