const database = require("st.db")
const fs = require("fs")
const coins = JSON.parse(fs.readFileSync("./Database/coins.json"))
const db = new database("./Database/coins.json")
const db1 = new database("./Database/timeout.json")
const ms = require("parse-ms")
require("discord-reply")

module.exports = {
	name: "daily", 
	disabled: true,
	description: "Get daily coins",
	execute (interaction, client) {
		let time = db1.get({key: `${interaction.user.id}_DAILY-TIMEOUT`})
	  if (time !== null && (1000 * 60 * 60 * 12) - (Date.now() - time) > 0) {
			let remaining_time = ms((1000 * 60 * 60 * 12) - (Date.now() - time))
			interaction.reply({content: `**:rolling_eyes: ${interaction.user.username}, your daily coins refreshes in ${remaining_time.hours} hours, ${remaining_time.minutes} minutes, and ${remaining_time.seconds} seconds.**`})
			return;
		} else {
			let balance = coins[`${interaction.user.id}_COINS`]
			if (!balance) balance = 0
			let amount = Math.floor(Math.random() * 2000) + 1000
			coins[`${interaction.user.id}_COINS`] = Math.floor(amount + balance)
      db1.set({key:`${interaction.user.id}_DAILY-TIMEOUT`, value: Date.now()})
			fs.writeFileSync("./Database/coins.json",JSON.stringify(coins,null, 2))
			interaction.reply({content: `**:moneybag: ${interaction.user.username}, you got :dollar: ${amount} daily coins!**`, ephemeral: true})
		} 
		
	},
}