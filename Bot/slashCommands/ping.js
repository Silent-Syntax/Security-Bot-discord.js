
const Discord = require("discord.js");
module.exports = {
	name: "ping",
  type: "CHAT_INPUT",
  description: "Show bot ping",
	execute(interaction, client) {
    let embed = new Discord.MessageEmbed()
.setTitle(`**Bot Ping**`)
.setTimestamp()      
.setDescription(`**🏓 My Ping Is : ${client.ws.ping}ms**`)
.setThumbnail(client.user.avatarURL())
interaction.reply({embeds: [embed]})
    },
}