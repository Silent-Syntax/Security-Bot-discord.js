let db = require("quick.db")
module.exports = {
	name: "set-prefix",
  execute (message, client) {
		let prefix = db.get(`${message.guild.id}_PREFIX`) || require("../config/config.json").prefix
		if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply("**❌ You don't have permission : `MANAGE_GUILD`**")  
    const args = message.content.split(" ")
		if (!args[1]) return message.reply("**❌ Specify prefix to change**")
		let old_p = require("quick.db").fetch(`${message.guild.id}_PREFIX`) || prefix
		message.reply(`**✅ Successfully changed prefix from \`${old_p}\` to \`${args[1]}\`**`)
		db.set(`${message.guild.id}_PREFIX`, args[1])
  }
}