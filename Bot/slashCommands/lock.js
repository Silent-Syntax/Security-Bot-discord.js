module.exports = {
	name: "lock",
	description: "Lock channel",
  type: "CHAT_INPUT",
	options: [{
		name: "channel",
		type: "CHANNEL",
		description: "Specify channel to lock",
		required: false
	}],
  execute (interaction, client) {
      let channel = interaction.channel
			let channelOption = interaction.options.get("channel")
			if (channelOption) channel = channelOption.channel
		  if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content: `**❌ You don't have permission : \`MANAGE_CHANNELS\`**`, ephemeral: true})
		  if (!channel.permissionsFor(interaction.guild.me).has("MANAGE_ROLES")) return interaction.reply({content: "**❌ I don't have permission : `MANAGE_ROLES` to do that**", ephemeral: true})
			interaction.reply(`**🔒 ${channel} has locked**`)
			channel.permissionOverwrites.edit(interaction.guild.id, {
				SEND_MESSAGES: false
			})
    }
}