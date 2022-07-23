const Discord = require("discord.js")
module.exports = {
  name: "user-avatar",
  options: [{
		name: "user",
    type: "USER",
		required: false,
		description: "User you want to get his avatar"
	}],
	description: "Get [server/user] avatar",
	execute (interaction, client) {
		if (!interaction.options.get("user")){
      let user = interaction.user
      let embed = new Discord.MessageEmbed()
	    .setTitle("Avatar Link")
      .setURL(user.avatarURL({format: "png", size: 2048, dynamic: true}))
      .setImage(user.avatarURL({format: "png", size: 2048, dynamic: true}))
	  	interaction.reply({embeds: [embed]})
		} else {
			let user = interaction.options.get("user").user
      let embed = new Discord.MessageEmbed()
	    .setTitle("Avatar Link")
      .setURL(user.avatarURL({format: "png", size: 2048, dynamic: true}))
      .setImage(user.avatarURL({format: "png", size: 2048, dynamic: true}))
	  	interaction.reply({embeds: [embed]})
		}
	}
}