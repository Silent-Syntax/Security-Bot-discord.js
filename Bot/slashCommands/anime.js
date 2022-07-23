module.exports = {
	name: "anime",
	description: "Get random photos",
	execute (interaction, client) { 
    interaction.reply({files: [require("anime-photos").getRandomAnime()]})
  },
}