
const Discord = require("discord.js");
module.exports = {
	name: "invite",
	description: "Bot invite link",
	execute(message, client) {
let { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
		let embed = new Discord.MessageEmbed()
		.setTitle("For Invite Bot Press The Button ")
		.setColor("BLUE")
    let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
		  .setStyle("LINK")
      .setLabel("Invite Bot")
      .setEmoji("📎") 
			.setURL("https://discord.com/api/oauth2/authorize?client_id=" + client.user.id + "&permissions=8&scope=bot%20applications.commands") 
		)	
    
    message.reply({embeds: [embed], components: [row], ephemeral: true})
	},
}