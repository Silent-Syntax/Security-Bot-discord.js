const Database = require("st.db");
const db1 = new Database("./Database/permissions.json");
const db2 = new Database("./Database/database.json")
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "restore",
	description: "restore roles permissions",
	execute(interaction, client) {
		interaction.deferReply()
		//interaction.reply({content: `**🛡️ Please Wait**`})
			setTimeout(() => {
		if (!db2.get({key: `${interaction.guild.id}_CONTROLUSERS`})) {
			db2.set({
				key: `${interaction.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		if (!db2.get({key: `${interaction.guild.id}_WHITELISTS`})) {
			db2.set({
				key: `${interaction.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (!db2.get({key: `${interaction.guild.id}_CONTROLUSERS`}).includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
       interaction.editReply({content: `**❌ Only Ownerahip And Control Users Can Use This Command**`, ephemeral: true})
		} else {
       interaction.guild.roles.cache.filter(ro => ro.name !== "@everyone").forEach(role => {
        let perms = db1.get({
					key: `${interaction.guild.id}_${role.id}_PERMS`
				})
				 if (!perms) return;
				role.setPermissions(perms).catch(() => {})
        db1.delete({
					key: `${interaction.guild.id}_${role.id}_PERMS`
				})
			})
          let embed = new MessageEmbed()
          .setTitle('**Premissions Restored**') 
          .setDescription(`**Protection System\nBy : ${interaction.user}\nAction : Restored Premissions\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
          .setColor('GREEN')
          .setThumbnail(interaction.guild.iconURL({dynamic:true}))
          .setAuthor(`${interaction.user.tag}`,`${interaction.user.displayAvatarURL({ dynamic: true })}`)  
          .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true})) 
          .setTimestamp()  
			    interaction.editReply({content: `**✅ Successfully restored roles permissions.**`})
          const hh = db.get(`${interaction.guild.id}_PROTECTIONLOG`)
        	const channel = client.channels.cache.get(`${hh}`)
          if (!channel) return; 
        	channel.send({embeds: [embed]}) .catch(() => {})
		}
			},1500)
	},
}

