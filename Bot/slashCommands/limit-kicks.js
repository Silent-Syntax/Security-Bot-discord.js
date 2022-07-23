const db = require("quick.db");
const Database = require("st.db");
const db1 = new Database("./Database/database.json")
const Discord = require("discord.js");

module.exports = {
	name: "limit-kicks",
	description: "Set kicks limit",
  type: "CHAT_INPUT",
	options: [{
    name: "number",
		description: "Type the number of limit",
		required: true,
		type: "NUMBER"
	}],
	execute(interaction, client) {
   
   let limit = interaction.options.getNumber("number")

   if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}
	 if (!db1.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({content: '**❌ Only Ownership And Control Users Can Use This Command**', ephemeral: true})

 
   db.set(`KICKS-LIMIT_${interaction.guild.id}`, limit) 
  
let embed = new Discord.MessageEmbed()
.setTitle(`Limit Has Been Updated`)
.setThumbnail(interaction.guild.iconURL({dynamic: true }))
.setAuthor(`${interaction.user.tag}`,`${interaction.user.displayAvatarURL({ dynamic: true })}`)  
.setColor("BLUE")
.setDescription(`**By : ${interaction.user}\nAction : Updated Limit Kicks\nNew Limit : ${limit}\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
  
  interaction.reply({content: `**✅ Successfully updated kicks limit to \`${limit}\`**`})
		
	const hh = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
	const channel = client.channels.cache.get(`${hh}`)
	if (!channel) return;
	channel.send({embeds: [embed]})  .catch(() => {})       
 }
}