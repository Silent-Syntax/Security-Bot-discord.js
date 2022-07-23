module.exports = function (client, tempDB) {
	const db = require("quick.db");
	const Database = require("st.db");
	const db1 = new Database("./Database/database.json")
	const db2 = new Database("./Database/premiums.json")
  const Discord = require("discord.js")
	const clearPermissions = require("../../Functions/clearPermissions.js")
	client.on("channelDelete", async channel => {
	try {
		const array = db2.get({key: "PREMIUMS"}) || []
     
    if (array.includes(channel.guild.id) && client.user.id == process.env.CLIENT_ID) return;
	
		if (!channel.guild) return;
	  let status = db.get(`ANTIHACKS_${channel.guild.id}`)
		if (!status) status = "true"
		if (status == "false") return;
		if (!channel.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    const audit = (await channel.guild.fetchAuditLogs()).entries.first()
		const { executor } = audit;

		if (!db1.get({key: `${channel.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${channel.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		/*if (db1.get({key: `${channel.guild.id}_CONTROLUSERS`}).includes(executor.id)) return;*/
		
		if (!db1.get({key: `${channel.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${channel.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (db1.get({key: `${channel.guild.id}_WHITELISTS`}).includes(executor.id)) return;


		if (audit.action == "CHANNEL_DELETE") {
		let channelsDeleted = tempDB[`${channel.guild.id}_${executor.id}_CHANNELS-DELETED`]
	  let limit = db.get(`CHANNELS-DELETE-LIMIT_${channel.guild.id}`)
  
		if (!channelsDeleted) tempDB[`${channel.guild.id}_${executor.id}_CHANNELS-DELETED`] = 0
		if (!limit) db.set(`CHANNELS-DELETE-LIMIT_${channel.guild.id}`, 1)
		if(channelsDeleted >= limit - 1) {
      clearPermissions(channel)
      let embed = new Discord.MessageEmbed()
.setTitle('**Protection Is Enabled**')
.setDescription(`**By : ${executor}\nAction : Deleted Channels\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setColor('RED')
.setThumbnail(executor.avatarURL({dynamic:true}))
.setAuthor(executor.tag, executor.avatarURL({dynamic:true}))
.setTimestamp()
.setFooter('[!] To Restore Roles Permissions Please Use Restore Command')
	const hh = db.get(`${channel.guild.id}_PROTECTIONLOG`)
	    const cha1nnel = client.channels.cache.get(`${hh}`)
			if (!cha1nnel) return;
    	cha1nnel.send({embeds: [embed]})   

      tempDB[`${channel.guild.id}_${executor.id}_CHANNELS-DELETED`] = 0
		} else { 
			tempDB[`${channel.guild.id}_${executor.id}_CHANNELS-DELETED`]++
			setTimeout(() => {
				tempDB[`${channel.guild.id}_${executor.id}_CHANNELS-DELETED`] = 0
			},20 * 1000)
		
			return;
		}
	  }
	} catch(err) {
    console.log(err)
  }
	})
}