const Discord = require("discord.js")
require("discord-banner")
module.exports = {
  name: "banner",
  disabled: true,
	description: "Get [server/user] banner",
	async execute (message, client) {
		if (!message.content.split(" ")[1]){
      let user = message.author
      let embed = new Discord.MessageEmbed()
	    .setTitle("Banner Link")
      .setURL(await user.bannerURL({format: "png", size: 2048, dynamic: true}))
      .setImage(await user.bannerURL({format: "png", size: 2048, dynamic: true}))
	  	message.reply({embeds: [embed]})
		} else {
			let args = message.content.split(" ")
      let user = message.mentions.users.first() || client.users.cache.get(args[1])
      //const user = client.api.users(g.id).get()
			if (!user) return message.reply("**❌ Cannot Find This User**")
      let embed = new Discord.MessageEmbed()
	    .setTitle("Banner Link")
      .setURL(await user.bannerURL({format: "png", size: 2048, dynamic: true}))
      .setImage(await user.bannerURL({format: "png", size: 2048, dynamic: true}))
	  	message.reply({embeds: [embed]})
		}
	}
}