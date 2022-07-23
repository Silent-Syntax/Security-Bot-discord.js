module.exports = function (client, tempDB) {
	const db = require("quick.db");
	const Database = require("st.db");
const db1 = new Database("./Database/database.json")
	const db2 = new Database("./Database/premiums.json")
  const Discord = require("discord.js")
	const clearPermissions = require("../../Functions/clearPermissions.js")
	client.on("roleCreate", async role => {
		try {
      const array = db2.get({key: "PREMIUMS"}) || []
     
      if (array.includes(role.guild.id) && client.user.id == process.env.CLIENT_ID) return;
			
		if (!role.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    const audit = (await role.guild.fetchAuditLogs()).entries.first()
		const { executor } = audit;
    let status = db.get(`ANTIHACKS_${role.guild.id}`)
		if (!status) status = "true"
		if (status == "false") return;

    if (!db1.get({key: `${role.guild.id}_CONTROLUSERS`})) {
			db1.set({
				key: `${role.guild.id}_CONTROLUSERS`,
				value: []
			})
		}

		/*if (db1.get({key: `${role.guild.id}_CONTROLUSERS`}).includes(executor.id)) return;*/
		
		if (!db1.get({key: `${role.guild.id}_WHITELISTS`})) {
			db1.set({
				key: `${role.guild.id}_WHITELISTS`,
				value: []
			})
		}

		if (db1.get({key: `${role.guild.id}_WHITELISTS`}).includes(executor.id)) return;

		

		if (audit.action == "ROLE_CREATE") {
		let rolesCreated = tempDB[`${role.guild.id}_${executor.id}_ROLES-CREATED`]
	  let limit = db.get(`ROLES-CREATE-LIMIT_${role.guild.id}`)
  
		if (!rolesCreated) tempDB[`${role.guild.id}_${executor.id}_ROLES-CREATED`] = 0
		if (!limit) db.set(`ROLES-CREATE-LIMIT_${role.guild.id}`, 1)
		if(rolesCreated >= limit - 1) {
      clearPermissions(role)
      let embed = new Discord.MessageEmbed()
.setTitle('**Protection Is Enabled**')
.setDescription(`**By : ${executor}\nAction : Created Roles\nDate On : ${require("moment")(new Date()).format("DD/MM/YYYY hh:mm")}**`)
.setColor('RED')
.setThumbnail(executor.avatarURL({dynamic:true}))
.setAuthor(executor.tag, executor.avatarURL({dynamic:true}))
.setTimestamp()
.setFooter('[!] To Restore Roles Permissions Please Use Restore Command')
	const hh = db.get(`${role.guild.id}_PROTECTIONLOG`)
	    const channel = client.channels.cache.get(`${hh}`)
			if (!channel) return;
    	channel.send({embeds: [embed]})   

      tempDB[`${role.guild.id}_${executor.id}_ROLES-CREATED`] = 0
		} else { 
			tempDB[`${role.guild.id}_${executor.id}_ROLES-CREATED`]++
			setTimeout(() => {
				tempDB[`${role.guild.id}_${executor.id}_ROLES-CREATED`] = 0
			},20 * 1000)
		
			return;
		}
		}
		} catch(err) {
    console.log(err)
    } 
	})
} 