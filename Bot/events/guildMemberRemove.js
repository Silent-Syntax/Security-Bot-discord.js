module.exports = function (client, tempDB) {
	const db = require("quick.db");
	const Database = require("st.db");
	const db1 = new Database("./Database/database.json")
  const db2 = new Database("./Database/premiums.json")
  const Discord = require("discord.js")
	const clearPermissions = require("../../Functions/clearPermissions.js")
	client.on("guildMemberRemove", async member => {
		
		try {
    const array = db2.get({key: "PREMIUMS"}) || []
     
    if (array.includes(member.guild.id) && client.user.id == process.env.CLIENT_ID) return;
			
		if (!member.guild) return;
		if (!member.guild.me) return;
		if (!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    const audit = (await member.guild.fetchAuditLogs({ limit: 1 })).entries.first()
		const { executor } = audit;
    let status = db.get(`ANTIHACKS_${member.guild.id}`)
		if (!status) status = "true"
		if (status == "false") return;
		if (!db1.get({key: `${member.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${member.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		/*if (db1.get({key: `${member.guild.id}_CONTROLUSERS`}).includes(executor.id)) return;*/
		
		if (!db1.get({key: `${member.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${member.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (db1.get({key: `${member.guild.id}_WHITELISTS`}).includes(executor.id)) return;


		if (audit.action == "MEMBER_KICK") {
		let kickAdd = tempDB[`${member.guild.id}_${executor.id}_KICKED_MEMBER`]
	  let limit = db.get(`KICKS-LIMIT_${member.guild.id}`)
  
		if (!kickAdd) tempDB[`${member.guild.id}_${executor.id}_KICKED_MEMBER`] = 0
		if (!limit) db.set(`KICKS-LIMIT_${member.guild.id}`, 1)
		if(kickAdd >= limit - 1) {
      clearPermissions(member)
      let embed = new Discord.MessageEmbed()
.setTitle('**Protection Is Enabled**')
.setDescription(`**By : ${executor}\nAction : Kicked Members\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setColor('RED')
.setThumbnail(executor.avatarURL({dynamic:true}))
.setAuthor(executor.tag, executor.avatarURL({dynamic:true}))
.setTimestamp()
.setFooter('[!] To Restore Roles Permissions Please Use Restore Command')
	const hh = db.get(`${member.guild.id}_PROTECTIONLOG`)
	    const channel1 = client.channels.cache.get(`${hh}`)
			if (!channel1) return;
    	channel1.send({embeds: [embed]})   

      tempDB[`${member.guild.id}_${executor.id}_KICKED_MEMBER`] = 0
		} else { 
			tempDB[`${member.guild.id}_${executor.id}_KICKED_MEMBER`]++
			setTimeout(() => {
				tempDB[`${member.guild.id}_${executor.id}_KICKED_MEMBER`] = 0
			},20 * 1000)
		
			return;
		}
		}
			
		} catch(err) {
    console.log(err)
		}
	})
}