const Discord = require("discord.js");
module.exports = {
	name: "ping",
	execute(message, client) {
    let embed = new Discord.MessageEmbed()
.setTitle(`**Bot Ping**`)
.setTimestamp()      
.setDescription(`**🏓 My Ping Is : ${client.ws.ping}ms**`)
.setThumbnail(client.user.avatarURL())
message.reply({embeds: [embed], ephemeral: true})
    },
}