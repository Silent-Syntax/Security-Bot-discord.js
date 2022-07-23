const Database = require("st.db")
const db = new Database("./Database/premiums.json")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "vip",
	description: "Display Premium Bot Information",
	execute (message, client) {
	  if (client.user.id !== process.env.CLIENT_ID && db.get(`PREMIUMS`).includes(message.guild.id)) {
      let time = db.get({key: `${client.user.id}_PREMIUM-TIMEOUT`})
			let data = db.get({key: `${client.user.id}_PREMIUM-INFO`})
      let remaining = require("parse-ms")((1000 * 60 * 60 * 24 * 30) - (Date.now() - time))
      const user = client.users.cache.get(data.OWNER_ID)
			let embed = new MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(client.user.avatarURL())
 			.setDescription(`> **Bot Owner :** <@${user.id}>\n> **Subscription Time :**\n> \`${remaining.days}\` days\n> \`${remaining.hours}\` hours\n> \`${remaining.minutes}\` minutes\n> \`${remaining.seconds}\` seconds`)

      message.reply({embeds: [embed]})
		} else {
			message.reply({content: "**❌ This Commmand Only In Premium Bot**", ephemeral: true})
		}
	},
}