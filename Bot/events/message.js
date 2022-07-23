module.exports = client => {
	const Database = require("st.db")
	const db1 = new Database("./Database/premiums.json")
	client.on("messageCreate", message => {
		try {
	    const array = db1.get({key: "PREMIUMS"}) || []
     
      if (array.includes(message.guild.id) && client.user.id == process.env.CLIENT_ID) return;
			
			if (!message.guild) return;
		if (!message.member) return;
		
		if (message.member.permissions.has("MANAGE_MESSAGES")) return;
		if (message.content.toLowerCase().includes("http") || message.content.toLowerCase().includes("discord.gg")) {
      if (!require("quick.db").get(`ANTILINKS_${message.guild.id}`)) require("quick.db").set(`ANTILINKS_${message.guild.id}`, "false")
			if (require("quick.db").get(`ANTILINKS_${message.guild.id}`) == "true") {
				try {
					message.delete()
				} catch {
					return
				}
			}
		}
		} catch(err) {
			console.log(err)
		}
	})
}