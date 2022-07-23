const Discord = require("discord.js")
module.exports = {
	name: "bot",
	description: "Display information about bot",
	execute(message, client) {

    let ms = require("parse-ms")
    let days = ms(client.uptime).days
    let hours = ms(client.uptime).hours
    let minutes = ms(client.uptime).minutes
		let seconds = ms(client.uptime).seconds

    
		let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .addField(`<:emoji_17:922238171708817458> Bot Information`, `\`\`\`diff\nName : ${client.user.tag}\nServers : ${client.guilds.cache.size}\nUsers : ${client.users.cache.size}\nChannels : ${client.channels.cache.size}\nDiscord.js : v${require("discord.js").version}\n\`\`\``)
    .addField(`<:emoji_26:922238675390189618> Server Settings`, `\`\`\`diff\nPrefix : ${require("quick.db").fetch(`${message.guild.id}_PREFIX`) || require("../config/config.json").prefix}\n\`\`\``)
    .addField(`<:emoji_14:922237946810224690> System Information`, `\`\`\`diff\nPing : ${Date.now() - message.createdTimestamp}ms\nUptime : ${days}d ${hours}h ${minutes}m ${seconds}s\n\`\`\``)
    .setColor("BLUE")
		.setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL())
			


   message.reply({embeds: [embed]})
  }
}