module.exports = {
	name: "hide",
	description: "Hide channel",
	execute (message, client) {
      let channel = message.channel
			let channelOption = message.mentions.channels.first() || message.guild.channels.cache.get(message.content.split(" ")[1])
			if (channelOption) channel = channelOption
		  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({content: `**❌ You don't have permission : \`MANAGE_CHANNELS\`**`})
		  if (!channel.permissionsFor(message.guild.me).has("MANAGE_ROLES")) return message.reply({content: "**❌ I don't have permission : `MANAGE_ROLES` to do that**"})
			message.reply(`**✅ ${channel} has hidden**`)
			channel.permissionOverwrites.edit(message.guild.id, {
				VIEW_CHANNEL: false
			})
    }
}