const Discord = require("discord.js");
const moment = require ("moment");
module.exports = {
	name: "server",
	description: "Display information about server",
	execute(interaction, client) {
    let embed = new Discord.MessageEmbed()
.setTitle(`**Server Information**`)
.setDescription(`**🔰 Name :**\n${interaction.guild.name}\n**🆔 Server ID :**\n${interaction.guild.id}\n**🕛 Created at :**\n${moment(interaction.guild.createdAt).format("YYYY/MM/DD, hh:mm") + '\n' + moment(interaction.guild.createdAt, "YYYYMMDD").fromNow()}\n**👑 Owned By : **\n<@${interaction.guild.ownerId}>\n**👥 Members : **\n${interaction.guild.memberCount}`)

.setThumbnail(interaction.guild.iconURL({dynamic:true}))
.setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true})) 
.setFooter(interaction.guild.name, interaction.guild.iconURL())
.setTimestamp() 
.setColor("RANDOM")
interaction.reply({embeds: [embed]})   
    },
}