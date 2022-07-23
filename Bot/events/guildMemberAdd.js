module.exports = client => {
	client.on("guildMemberAdd", member => {
		const Database = require("st.db")
	  const db1 = new Database("./Database/premiums.json")
	  const array = db1.get({key: "PREMIUMS"}) || []
     
    if (array.includes(member.guild.id) && client.user.id == process.env.CLIENT_ID) return;
	
		if (!require("quick.db").fetch(`ANTIBOTS_${member.guild.id}`)) require("quick.db").set(`ANTIBOTS_${member.guild.id}`, "true")
	  if (require("quick.db").fetch(`ANTIBOTS_${member.guild.id}`) == "true") {
			if (member.user.bot) return member.ban({reason: "Antibots Enabled"}).catch(() => {})
		}
  })
}