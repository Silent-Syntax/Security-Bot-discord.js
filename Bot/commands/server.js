const Discord = require("discord.js");
const moment = require ("moment");
module.exports = {
	name: "server",
	description: "Display information about server",
	execute(message, client) {
    let embed = new Discord.MessageEmbed()
.setTitle(`**Server Information**`)
.setDescription(`**🔰 Name :**\n${message.guild.name}\n**🆔 Server ID :**\n${message.guild.id}\n**🕛 Created at :**\n${moment(message.guild.createdAt).format("YYYY/MM/DD, hh:mm") + '\n' + moment(message.guild.createdAt, "YYYYMMDD").fromNow()}\n**👑 Owned By : **\n<@${message.guild.ownerId}>\n**👥 Members : **\n${message.guild.memberCount}`)

.setThumbnail(message.guild.iconURL({dynamic:true}))
.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})) 
.setFooter(message.guild.name, message.guild.iconURL())
.setTimestamp() 
.setColor("RANDOM")
message.reply({embeds: [embed]})   
    },
}