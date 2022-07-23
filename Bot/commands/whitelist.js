const db = require("quick.db");
require("discord-reply")
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "whitelist", 
	execute(message, client) {
    let prefix = db.get(`${message.guild.id}_PREFIX`) || require("../config/config.json").prefix
		const args = message.content.split(" ")
	  if (!args[1] || !args[2] || !["add","remove"].includes(args[1].toLowerCase())) return message.reply(`**❌ Example: \`${prefix}whitelist [add/remove] [user]\`**`)
    const user = message.mentions.users.first() || client.users.cache.get(args[2])


   if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db2.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		if (!db1.get({key: `${message.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${message.guild.id}_WHITELISTS`,
				value: []
			})
		}

	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: `**❌ Only Ownerahip And Control Users Can Use This Command**`, ephemeral: true})
		
  
   if (args[1] == "add")  {
		 if (!db1.get({key: `${message.guild.id}_WHITELISTS`})) {
		 db1.set({
			 key: `${message.guild.id}_WHITELISTS`,
			 value: []
		 })
	 }

		if (db1.get({key: `${message.guild.id}_WHITELISTS`}).includes(user.id)) return message.reply({content: `**❌ This User Is Already In Control Users**`})
		
		db1.push({
			key: `${message.guild.id}_WHITELISTS`,
			value: user.id
		})
		
    message.reply({content: `✅ **Sunccessfully Added ${user} To Whitelist**`})
		let embed = new Discord.MessageEmbed()
.setTitle(`New Whitelist Added`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${message.author}\nAction : Added Whitelist User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
 const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
	if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]}).catch(() => {})  
		  
	 } else if (args[1] == "remove") {
     if (!db1.get({key: `${message.guild.id}_WHITELISTS`})) {
		 db1.set({
			 key: `${message.guild.id}_WHITELISTS`,
			 value: []
		 })
	 }

		if (!db1.get({key: `${message.guild.id}_WHITELISTS`}).includes(user.id)) return message.reply({content: `**❌ This User Isn't In Whitelist**`, ephemeral: true})
		
		db1.unpush({
			key: `${message.guild.id}_WHITELISTS`,
			value: user.id
		})
		
    message.reply({content: `**✅ Sunccessfully Removed ${user} From Whitelist**`})
		
		let embed = new Discord.MessageEmbed()
.setTitle(`New Whitelist Removed`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${message.author}\nAction : Removed Whitelist User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
 const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
  if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]})  .catch(() => {})    
	 }
    },
	}
