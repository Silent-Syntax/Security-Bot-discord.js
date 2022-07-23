const moment = require("moment")
module.exports = {
	name: "find",
	description: "Show members in any role",
  type: "CHAT_INPUT",
	options: [{
		name: "role",
    description: "Specify role you want to show members who have it",
		type: "ROLE",
		required: true
	}],
    execute (interaction, client) {
			if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({content: `**You don't have permission : \`MANAGE_ROLES\`**`, ephemeral: true})
			let role = interaction.options.get("role").role
			let map = interaction.guild.roles.cache.get(role.id).members.map(member => `${member} ( ${member.user.tag} )\n( ${member.id} )`).join("\n")
		  interaction.reply({content: `**Role Name: \`${role.name}\`\nRole Color: \`${role.hexColor}\`\nMembers Count: \`${interaction.guild.roles.cache.get(role.id).members.size}\`**`})
			const { Util } = require("discord.js")
			const [first, ...rest] = Util.splitMessage(map, { maxLength: 2000 })
		  try {
			setTimeout(() => {
	    	if (!rest.length) {
		  		interaction.channel.send("**" + first + "**").catch(() => {})
  			} else {
	  			for (const text of rest) {
            interaction.channel.send("**" + text + "**").catch(() => {})
          }
  			}
			}, 400)  
			} catch(err) {
        console.log(err)
      }
		},
}