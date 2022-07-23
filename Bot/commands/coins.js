const Database = require("st.db")
const Discord = require("discord.js")
const fs = require("fs")
const coins = JSON.parse(fs.readFileSync("./Database/coins.json"))
const { MessageAttachment, MessageEmbed } = require("discord.js")
const db = new Database("./Database/coins.json")
const captcha = require("../../Functions/Captcha.js")


module.exports = {
	name: "coins",
  disabled: true,
	description: "Transfer or show coins",
async	execute (message, client) {
	  const args = message.content.split(" ")

		if (!args[1]) {
			let key = `${message.author.id}_COINS`
			let balance = coins[`${message.author.id}_COINS`]
	   	if (!balance) balance = 0
			message.reply({content: `**:bank: ${message.author.username}, your account balance is \`$${balance}\`.**`})
		} else if (args[1] && !args[2]) {
			
			const user = client.users.cache.get(args[1]) || message.mentions.users.first()
			if (!user) return message.reply(`**❌ Cannot Find This User**`)
			if (user.bot) return message.reply({content: `**:thinking: ${message.author.username}, bots do not have coins!**`})
			let balance = coins[`${user.id}_COINS`]
		  if (!balance) balance = 0
			if (user.id === message.author.id) return message.reply({content: `**:bank: ${message.author.username}, your account balance is \`$${balance}\`.**`})
			message.reply({content: `**${user.username} 🪙 balance is \`$${balance}\`.**`})
		} else if (args[1] && args[2]) {
			let amount = +args[2]
		  const user = client.users.cache.get(args[1]) || message.mentions.users.first()
			if (!user) return message.reply(`**❌ Cannot Find This User**`)
		  if (user.bot) return message.reply({content: `**:thinking: ${message.author.username}, bots do not have coins!**`})
			let balance = coins[`${message.author.id}_COINS`]
		  if (!balance) balance = 0
			let user_balance = coins[`${user.id}_COINS`]
		  if (!user_balance) user_balance = 0
			if (user.id === message.author.id) return message.reply({content: `**:bank: ${message.author.username}, your account balance is \`$${balance}\`.**`})
			if (amount <= 0) return message.reply({content: `**:interrobang: ${message.author.username}, type the coins you need to transfer!**`})
			if (balance < amount) return message.reply({content: `**:thinking: ${message.author.username}, Your balance is not enough for that!**`})
			let reason = args[3] || "No Reason Provided"
						
						 coins[`${user.id}_COINS`] = Math.floor(amount + user_balance)
						 coins[`${message.author.id}_COINS`] = Math.floor(balance - amount)

             fs.writeFileSync("./Database/coins.json", JSON.stringify(coins, null, 2))
						
						message.reply(`**:moneybag: ${message.author.username}, has transferred \`$${amount}\` to ${user}**`)
						user.send(`🏧 Transfer Receipt \`You have received $${amount} from user ${message.author.username} (ID: ${message.author.id})\nReason: ${reason}\``).catch(() => {})
					
		}

	},
}