 const Database = require("st.db");
const db1 = new Database("./Database/permissions.json");
const db2 = new Database("./Database/database.json")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "back",
	description: "restore roles permissions",
	execute(message, client) {
		setTimeout(() => {
		if (!db2.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db2.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		if (!db2.get({key: `${message.guild.id}_WHITELISTS`})) {
			db2.set({
				key: `${message.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (!db2.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) {
       message.reply({content: `**❌ Only Ownerahip And Control Users Can Use This Command**`, ephemeral: true})
		} else {
       message.guild.roles.cache.filter(ro => ro.name !== "@everyone").forEach(role => {
        let perms = db1.get({
					key: `${message.guild.id}_${role.id}_PERMS`
				})
				 if (!perms) return;
				role.setPermissions(perms).catch(() => {})
        db1.delete({
					key: `${message.guild.id}_${role.id}_PERMS`
				})
			})
          let embed = new MessageEmbed()
          .setTitle('**Premissions Restored**') 
          .setDescription(`**Protection System\nBy : ${message.author}\nAction : Restored Premissions\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
          .setColor('GREEN')
          .setThumbnail(message.guild.iconURL({dynamic:true}))
          .setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
          .setFooter(message.guild.name, message.guild.iconURL({dynamic:true})) 
          .setTimestamp()  
			    message.reply({content: `**✅ Successfully restored roles permissions.**`})
          const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
        	const channel = client.channels.cache.get(`${hh}`)
          if (!channel) return; 
        	channel.send({embeds: [embed]}) .catch(() => {})
		}
			},1500)
	},
}

