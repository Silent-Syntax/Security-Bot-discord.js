module.exports = {
	name: "anime",
	description: "Get random photos",
	execute (message, client) { 
    message.reply({files: [require("anime-photos").getRandomAnime()]})
  },
}