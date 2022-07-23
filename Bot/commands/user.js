 const Discord = require("discord.js")
const moment = require("moment")
module.exports = {
	name: "user",
	type: "CHAT_INPUT",
  options: [{
		name: "user",
		description: "User you want to show information about him",
		type: "USER",
		required: false
	}],
  description: "Show information of user",
	execute (message, client) {
		const args = message.content.split(" ")
		const user = message.mentions.users.first() || client.users.cache.get(args[1])
		if (!user && args[1]) return message.reply("**❌ Cannot find this user**")
		if (args[1]) {
		  user.member = message.guild.members.cache.get(user.id)
      let embed = new Discord.MessageEmbed()
      .setTitle("User Info")
			.setDescription(`> **ID:**\n${user.id}
> **Joined Discord:**\n${moment(user.createdTimestamp).format("DD/MM/YYYY hh:mm")}
${moment(user.createdTimestamp).fromNow()}
> **Joined Server:**\n${moment(user.member.joinedTimestamp).format("DD/MM/YYYY hh:mm")}
${moment(user.member.joinedTimestamp).fromNow()}`)
			.setColor("BLACK")
      .setThumbnail(`${user.avatarURL()}`)

			message.reply({embeds: [embed]})
    } else {
			const user = message.author
			user.member = message.guild.members.cache.get(user.id)
      let embed = new Discord.MessageEmbed()
      .setTitle("User Info")
			.setDescription(`> **ID:**\n${user.id}
> **Joined Discord:**\n${moment(user.createdTimestamp).format("DD/MM/YYYY hh:mm")}
${moment(user.createdTimestamp).fromNow()}
> **Joined Server:**\n${moment(user.member.joinedTimestamp).format("DD/MM/YYYY hh:mm")}
${moment(user.member.joinedTimestamp).fromNow()}`)
			.setColor("BLACK")
      .setThumbnail(`${user.avatarURL()}`)

			message.reply({embeds: [embed]})
		}
	}
}