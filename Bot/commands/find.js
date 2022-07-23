const moment = require("moment")
module.exports = {
	name: "find",
	description: "Show members in any role",
    execute (message, client) {
			const args = message.content.split(" ")
			if (!args[1]) return message.reply("**❌ Mention role you want to find member on it**")
			const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(ro => ro.name == args[1])
			if (!role) return message.reply("**❌ Cannot find this role**")
			if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply({content: `**You don't have permission : \`MANAGE_ROLES\`**`, ephemeral: true})
			let map = role.members.map(member => `${member} ( ${member.user.tag} )\n( ${member.id} )`).join("\n")
		  message.reply({content: `**Role Name: \`${role.name}\`\nRole Color: \`${role.hexColor}\`\nMembers Count: \`${message.guild.roles.cache.get(role.id).members.size}\`**`})
			const { Util } = require("discord.js")
			const [first, ...rest] = Util.splitMessage(map, { maxLength: 2000 })
		  try {
			setTimeout(() => {
	    	if (!rest.length) {
		  		message.reply("**" + first + "**").catch(() => {})
  			} else {
	  			for (const text of rest) {
            message.reply("**" + text + "**").catch(() => {})
          }
  			}
			}, 400)  
			} catch(err) {
        console.log(err)
      }
		},
}