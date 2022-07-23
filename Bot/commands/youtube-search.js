 const { MessageEmbed } = require("discord.js")
const ytsr = require("ytsr")
module.exports = {
	name: "youtube-search",
	description: "Search about anything on YouTube",
  async execute (message, client) {
		const query = message.content.split(" ").slice(1).join(" ")
		if (!query) return message.reply("**❌ Type anything you want to search on it**")

    message.reply("🔎 Searching ..").then(async (msg) => {
		
		const res = await ytsr(query)

		if (!res) return msg.edit({content: `**❌ There isn't any results**`, ephemeral: true})
	
		const video = res.items.filter(i => i.type == "video")[0]

		if (!video) return msg.edit({content: `**❌ There isn't any results**`, ephemeral: true})
		
			let embed = new MessageEmbed()
	    .setTitle(video.title)
	  	.setColor("RED")
      .setURL(`${video.url}`)
		  .setImage(video.bestThumbnail.url)
	  	.addField(`Views`, `${video.views}`, true)
      .addField(`Duration`, `${video.duration}`, true) 
		  .setAuthor(video.author.name)

	  	try { await msg.edit({content: ` `,embeds: [embed]}) } catch(err) { console.log(err) }
		})
	},
}