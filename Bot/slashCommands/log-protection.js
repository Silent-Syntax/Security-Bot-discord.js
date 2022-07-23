const db = require("quick.db");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "log-protection",
	description: "Setup protection log",
	type: "CHAT_INPUT",
  options: [{
		name: "channel",
		type: "CHANNEL",
		required: true,
		description: "Enter id/mention channel to setup log"
	}],
	execute(interaction, client) {
		if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	  if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**', ephemeral: true})


    const channel = interaction.options.get("channel").channel
    if (db.get(`${interaction.guild.id}_PROTECTIONLOG`) == channel.id) return interaction.followUp({content: `This Channel Is Already Protection Log`, ephemeral: true})
    db.set(`${interaction.guild.id}_PROTECTIONLOG`, channel.id)
    interaction.reply({content: `**✅ Successfully set protection log to ${channel}**`})
  }
}
	