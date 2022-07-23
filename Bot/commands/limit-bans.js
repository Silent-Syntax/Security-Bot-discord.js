const db = require("quick.db");
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "limit-bans",
	description: "Set bans limit", 
	execute(message, client) {
   
   let limit = +message.content.split(" ")[1]
   if (!limit) return message.reply("**❌ Type a number to set limit**")

   if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${message.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${message.guild.id}_CONTROLUSERS`}).includes(message.author.id) && message.author.id !== message.guild.ownerId) return message.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**'})

 
   db.set(`BANS-LIMIT_${message.guild.id}`, limit) 
  
let embed = new Discord.MessageEmbed()
.setTitle(`Limit Has Been Updated`)
.setThumbnail(message.guild.iconURL({dynamic: true }))
.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**By : ${message.author}\nAction : Updated Limit Bans\nNew Limit : ${limit}\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
  
  message.reply({content: `**✅ Successfully updated bans limit to \`${limit}\`**`})
		
	const hh = db.get(`${message.guild.id}_PROTECTIONLOG`)
	const channel = client.channels.cache.get(`${hh}`)
	if (!channel) return;
	channel.send({embeds: [embed]}) .catch(() => {})        
 }
}