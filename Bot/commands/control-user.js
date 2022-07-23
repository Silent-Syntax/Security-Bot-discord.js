const db = require("quick.db");
require("discord-reply")
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");
const owners = '922224088590737520' 
module.exports = {
	name: "control-user",
	execute(message, client) {
	 let prefix = db.get(`${message.guild.id}_PREFIX`) || require("../config/config.json").prefix
   if (!owners.includes(message.author.id)) return; 
    
   const args = message.content.split(" ")
	 if (!args[1] || !args[2] || !["add","remove"].includes(args[1].toLowerCase())) return message.reply(`**❌ Example: \`${prefix}control-user [add/remove] [user]\`**`)
   const user = message.mentions.users.first() || client.users.cache.get(args[2])
   if (!user) return message.reply(`**❌ Example: \`${prefix}control-user [add/remove] [user]\`**`)

   if (args[1] == "add")  {
		 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
		 db1.set({
			 key: `${message.guild.id}_CONTROLUSERS`,
			 value: []
		 })
	 }

		if (db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(user.id)) return message.reply({content: `**❌ This User Is Already In Control Users**`})
		
		db1.push({
			key: `${message.guild.id}_CONTROLUSERS`,
			value: user.id
		})
		
    message.reply({content: `✅ **Sunccessfully Added ${user} To Control Users**`})
		let embed = new Discord.MessageEmbed()
.setTitle(`New Control User Added`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.avatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${message.author}\nAction : Added Control User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
 const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
	if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]})  .catch(() => {})  
		  
	 } else if (args[1] == "remove") {
     if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
		 db1.set({
			 key: `${message.guild.id}_CONTROLUSERS`,
			 value: []
		 })
	 }

		if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(user.id)) return message.reply({content: `**❌ This User Isn't In Control Users**`})
		
		db1.unpush({
			key: `${message.guild.id}_CONTROLUSERS`,
			value: user.id
		})
		
    message.reply({content: `**✅ Sunccessfully Removed ${user} From Control Users**`})
		
		let embed = new Discord.MessageEmbed()
.setTitle(`New Control User Removed`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**Member : ${user}\nBy : ${message.author}\nAction : Removed Control User\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
 const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const Mo7amd = client.channels.cache.get(`${hh}`)
  if (!Mo7amd) return;
	Mo7amd.send({embeds: [embed]})  .catch(() => {})
	 }
    },
	}
