const Discord = require("discord.js")
module.exports = {
  name: "avatar",
	description: "Get [server/user] avatar",
	execute (message, client) {
		if (!message.content.split(" ")[1]){
      let user = message.author
      let embed = new Discord.MessageEmbed()
	    .setTitle("Avatar Link")
      .setURL(user.avatarURL({format: "png", size: 2048, dynamic: true}))
      .setImage(user.avatarURL({format: "png", size: 2048, dynamic: true}))
	  	message.reply({embeds: [embed]})
		} else {
			let args = message.content.split(" ")
      const user = message.mentions.users.first() || client.users.cache.get(args[1])
			if (!user) return message.reply("**❌ Cannot Find This User**")
      let embed = new Discord.MessageEmbed()
	    .setTitle("Avatar Link")
      .setURL(user.avatarURL({format: "png", size: 2048, dynamic: true}))
      .setImage(user.avatarURL({format: "png", size: 2048, dynamic: true}))
	  	message.reply({embeds: [embed]})
		}
	}
}