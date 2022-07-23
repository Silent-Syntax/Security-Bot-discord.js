module.exports = client => {
	client.on("guildCreate", guild => {
		const Database = require("st.db")
	  const db1 = new Database("./Database/premiums.json")

	  const array = db1.get({key: "PREMIUMS"}) || []
     
    if (array.includes(guild.id) && client.user.id == process.env.CLIENT_ID) return;
	
		let on_off = "off"
		if (on_off == "off") return;
		if (guild.memberCount < 30) return //guild.leave()
	})
}