module.exports = {
	name: "unlock",
	description: "Unlock channel", 
  execute (message, client) {
      let channel = message.channel
			let channelOption = message.mentions.channels.first() || client.channels.cache.get(message.content.split(" ")[1])
			if (channelOption) channel = channelOption
		  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({content: `**❌ You don't have permission : \`MANAGE_CHANNELS\`**`, ephemeral: true})
		  if (!channel.permissionsFor(message.guild.me).has("MANAGE_ROLES")) return message.reply({content: "**❌ I don't have permission : `MANAGE_ROLES` to do that**", ephemeral: true})
			message.reply(`**🔓 ${channel} has unlocked**`)
			channel.permissionOverwrites.edit(message.guild.id, {
				SEND_MESSAGES: null
			})
    }
}