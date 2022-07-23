const Database = require("st.db")
const db1 = new Database("./Database/permissions.json")

function clearPermissions(eventPara) {
	eventPara.guild.roles.cache.filter(r => r.permissions.has(`ADMINISTRATOR`) || r.permissions.has(`MANAGE_ROLES`) || r.permissions.has(`MANAGE_CHANNELS`) || r.permissions.has(`MANAGE_GUILD`) || r.permissions.has(`KICK_MEMBERS`) || r.permissions.has(`BAN_MEMBERS`)) .forEach(rolePara => {
	if (rolePara.id == eventPara.guild.id || rolePara.name === "@everyone") return;
		let perms = db1.get({key: `${eventPara.guild.id}_${rolePara.id}_PERMS`})
    let rolePermissions = rolePara.permissions.toArray()
		if (rolePara.permissions.toArray().includes("ADMINISTRATOR")) rolePermissions = ["ADMINISTRATOR"]
		if (!perms) {
       db1.set({
				 key: `${eventPara.guild.id}_${rolePara.id}_PERMS`,
         value: rolePermissions
			 })
       rolePara.setPermissions([]).catch(err => {})
		} else {
			if (perms.length > 0 && rolePermissions.length == 0) return;
			db1.set({
				key: `${eventPara.guild.id}_${rolePara.id}_PERMS`,
        value: rolePermissions
			})
			rolePara.setPermissions([]).catch(err => {})
		}
	})
}

function clearPermissionsBan(guild) {
	guild.roles.cache.filter(r => r.permissions.has(`ADMINISTRATOR`) || r.permissions.has(`MANAGE_ROLES`) || r.permissions.has(`MANAGE_CHANNELS`) || r.permissions.has(`MANAGE_GUILD`) || r.permissions.has(`KICK_MEMBERS`) || r.permissions.has(`BAN_MEMBERS`)). forEach(rolePara => {
	  if (rolePara.id === guild.id || rolePara.name === "@everyone") return;
		let perms = db1.get({key: `${guild.id}_${rolePara.id}_PERMS`})
    let rolePermissions = rolePara.permissions.toArray()
		if (rolePara.permissions.toArray().includes("ADMINISTRATOR")) rolePermissions = ["ADMINISTRATOR"]
		if (!perms) {
       db1.set({
				 key: `${guild.id}_${rolePara.id}_PERMS`,
         value: rolePermissions
			 })
       rolePara.setPermissions([]).catch(err => {})
		} else {
			if (perms.length > 0 && rolePermissions.length == 0) return;
			db1.set({
				key: `${guild.id}_${rolePara.id}_PERMS`,
        value: rolePermissions
			})
			rolePara.setPermissions([]).catch(err => {})
		}
		})
}

module.exports = clearPermissions;
module.exports.ban = clearPermissionsBan;