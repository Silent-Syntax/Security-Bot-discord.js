const Database = require("st.db")
 const ms = require("parse-ms")
 const db = new Database("./Database/premiums.json")

module.exports.run = function(TOKEN, GUILD_ID, OWNER_ID,TEMPDB) {
  const Discord = require("discord.js")
  const Intents = new Discord.Intents(32767)
  const client = new Discord.Client({intents: Intents})
 require("./eventsLoader.js").run(client, TEMPDB)
 require("./slashCommandsLoader.js").run(client)
 require("./commandsLoader.js").run(client)
	

  client.on("ready", () => {
		let status = "EXPIRED"
		let gg = db.get({key: `${client.user.id}_PREMIUM-INFO`})
		if (gg) status = gg.STATUS
        if (!db.has({key: `${client.user.id}_PREMIUM-INFO`}) || status !== "EXPIRED") {
           const premiumData = {
             CLIENT_ID: client.user.id,
						 GUILD_ID: GUILD_ID,
             OWNER_ID: OWNER_ID,
						 STATUS: "AVAILABLE"
           }

					let data = premiumData;

        db.set({
            key: `${client.user.id}_PREMIUM-INFO`,
            value: premiumData
        })
					

		   if (!db.has({key: "PREMIUMS"})) db.set({key: "PREMIUMS", value: []})
					
       if (!db.get({key: `PREMIUMS`}).includes(data.GUILD_ID)) db.push({key: "PREMIUMS", value: data.GUILD_ID }) 
		
          client.on("guildCreate", guild => {
	           if (guild.id !== data.GUILD_ID) guild.leave()
          })

		let time = db.get({key: `${client.user.id}_PREMIUM-TIMEOUT`})
		if (!time) db.set({key: `${client.user.id}_PREMIUM-TIMEOUT`, value: Date.now()})

  }
		
 })
  
client.login(TOKEN)
}