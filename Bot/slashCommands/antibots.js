const db = require("quick.db");
const Discord = require("discord.js");
const Database = require("st.db")
const db1 = new Database("./Database/database.json")


module.exports = {
	name: "antibots",
	type: "CHAT_INPUT",
	options: [{
		name: "value",
		description: "type status of antibots protection",
		type: "STRING",
		required: true,
		choices: [{
			name: "on",
			value: "on"
		},{
			name: "off",
      value: "off"
		}]
	}],
	description: "Enable/Disable antibots protection",
	execute(interaction, client) {
		if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**', ephemeral: true})

		if (interaction.options.getString("value") === "on") {
		//	interaction.deferReply()
      let embed = new Discord.MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setThumbnail(interaction.guild.iconURL())
      .setDescription(`> **Action : **Turn On Antibots System
> **By :** ${interaction.user}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(interaction.guild.name, interaction.guild.iconURL())
      .setTimestamp()

			db.set(`ANTIBOTS_${interaction.guild.id}`, "true")

			interaction.reply({content: `**✅ Antibots is enabled**`})

			const hh1 = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh1}`)
			if (!channel) return;
	    channel.send({embeds: [embed]}).catch(() => {})

     } else if (interaction.options.getString("value") === "off") {
		//	interaction.deferReply()
       let embed = new Discord.MessageEmbed()
			.setAuthor(interaction.user.tag, interaction.user.avatarURL())
      .setThumbnail(interaction.guild.iconURL())
      .setDescription(`> **Action : **Turn Off Antibots System
> **By :** ${interaction.user}
> **Date :** ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}`)
			.setColor("RED")
      .setFooter(interaction.guild.name, interaction.guild.iconURL())
      .setTimestamp()

			db.set(`ANTIBOTS_${interaction.guild.id}`, "false")

			interaction.reply({content: `**✅ Antibots is disabled**`}) 

			const hh = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh}`)
			if (!channel) return;
      channel.send({embeds: [embed]}) .catch(() => {})

		}
	}
}