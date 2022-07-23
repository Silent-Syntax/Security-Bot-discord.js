const db = require("quick.db");
const devs = require("../config/config.json").devs
  
require("discord-reply")
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "control-user",
  type: "CHAT_INPUT",
	description: "[Add/Remove] control user",
  options: [{
		name: "type",
		type: "STRING",
		description: "[add/remove] control user",
    required: true,
		choices: [{
			name: "add",
      value: "add"
		},{
			name: "remove",
			value: "remove"
		}]
	},{
		name: "user",
    description: "ID/Mention user you want to add",
		type: "USER",
		required: true
	}],
	execute(interaction, client) {
   if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply({content: '**❌ Only Owner Ship Can Use This Command**', ephemeral: true})
    
   const user = interaction.options.get("user").user

   if (interaction.options.getString("type") == "add")  {
		 if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
		 db1.set({
			 key: `${interaction.guild.id}_CONTROLUSERS`,
			 value: []
		 })
	 }

		if (db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(user.id)) return interaction.reply({content: `**❌ This User Is Already In Control Users**`})
		
		db1.push({
			key: `${interaction.guild.id}_CONTROLUSERS`,
			value: user.id
		})
		
    interaction.reply({content: `✅ **Sunccessfully Added ${user} To Control Users**`})
		let embed = new Discord.MessageEmbed()
.setTitle(`New Control User Added`)
.setThumbnail(interaction.guild.iconURL({dynamic: true }))
.setAuthor(`${interaction.user.tag}`,`${interaction.user.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${interaction.user}\nAction : Added Control User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
 const hh = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
	if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]})  .catch(() => {})  
		  
	 } else if (interaction.options.getString("type") == "remove") {
     if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
		 db1.set({
			 key: `${interaction.guild.id}_CONTROLUSERS`,
			 value: []
		 })
	 }

		if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(user.id)) return interaction.reply({content: `**❌ This User Isn't In Control Users**`, ephemeral: true})
		
		db1.unpush({
			key: `${interaction.guild.id}_CONTROLUSERS`,
			value: user.id
		})
		
    interaction.reply({content: `**✅ Sunccessfully Removed ${user} From Control Users**`})
		
		let embed = new Discord.MessageEmbed()
.setTitle(`New Control User Removed`)
.setThumbnail(interaction.guild.iconURL({dynamic: true }))
.setAuthor(`${interaction.user.tag}`,`${interaction.user.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${interaction.user}\nAction : Removed Control User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
 const hh = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
  if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]})  .catch(() => {})
	 }
    },
	}
