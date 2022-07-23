const Database = require("st.db")
const Discord = require("discord.js")
const { MessageAttachment, MessageEmbed } = require("discord.js")
const fs = require("fs")
const coins = JSON.parse(fs.readFileSync("./Database/coins.json"))
const db = new Database("./Database/coins.json")
const captcha = require("../../Functions/Captcha.js")

module.exports = {
	name: "coins",
	disabled: true,
	type: "CHAT_INPUT",
	options: [{
		name: "user",
		type: "USER",
		description: "ID/Mention user",
		required: false
	},{
    name: "amount",
		description: "Amount of coins you want to transfer",
		type: "NUMBER",
		required: false
  },{
		name: "reason",
		description: "Reason for transferring coins",
		type: "STRING",
		required: false
	}],
	description: "Transfer or show coins",
async	execute (interaction, client) {

		if (!interaction.options.get("user")) {
			let balance = coins[`${interaction.user.id}_COINS`]
	   	if (!balance) balance = 0
			interaction.reply({content: `**:bank: ${interaction.user.username}, your account balance is \`$${balance}\`.**`})
		} else if (interaction.options.get("user") && !interaction.options.get("amount")) {
			
			const user = interaction.options.get("user").user
			if (user.bot) return interaction.reply({content: `**:thinking: ${interaction.user.username}, bots do not have coins!**`, ephemeral: true})
			let balance = coins[`${user.id}_COINS`]
		  if (!balance) balance = 0
			if (user.id === interaction.user.id) return interaction.reply({content: `**:bank: ${interaction.user.username}, your account balance is \`$${balance}\`.**`})
			interaction.reply({content: `**${user.username} 🪙 balance is \`$${balance}\`.**`})
		} else if (interaction.options.get("user") && interaction.options.get("amount")) {
			let amount = interaction.options.getNumber("amount")
		  const user = interaction.options.get("user").user
			if (user.bot) return interaction.reply({content: `**:thinking: ${interaction.user.username}, bots do not have coins!**`, ephemeral: true})
			let balance = coins[`${interaction.user.id}_COINS`]
		  if (!balance) balance = 0
			let user_balance = coins[`${user.id}_COINS`]
		  if (!user_balance) user_balance = 0
			if (user.id === interaction.user.id) return interaction.reply({content: `**:bank: ${interaction.user.username}, your account balance is \`$${balance}\`.**`})
			if (amount <= 0) return interaction.reply({content: `**:interrobang: ${interaction.user.username}, type the coins you need to transfer!**`, ephemeral: true})
			if (balance < amount) return interaction.reply({content: `**:thinking: ${interaction.user.username}, Your balance is not enough for that!**`, ephemeral: true})
			let attach = new MessageEmbed().setImage(captcha().link)
		//  console.log(captcha().link)
	//		interaction.deferReply()
		//	interaction.reply({content: `**${interaction.user.username}, Transfer Fees: \`0\`, Amount: \`$${amount}\`\nType these captcha to confirm :**`, embeds: [attach], fetchReply: true}).then(async msg => {
			/*	const filter = user => user.author.id === interaction.user.id
        const collector = new Discord.MessageCollector(msg.channel, { time: 15000,max: 1})
				collector.on("collect", async m => { 
					if (m.content == captcha.value) {*/
						let reason = interaction.options.getString("reason") || "No Reason Provided"
					//	m.delete().catch(() => {})
						
						 coins[`${user.id}_COINS`] = Math.floor(user_balance + amount)
						 coins[`${interaction.user.id}_COINS`] = Math.floor(balance - amount)

			       fs.writeFileSync("./Database/coins.json", JSON.stringify(coins, null, 2))

						
						interaction.reply(`**:moneybag: ${interaction.user.username}, has transferred \`$${amount}\` to ${user}**`)
						user.send(`🏧 Transfer Receipt \`You have received $${amount} from user ${interaction.user.username} (ID: ${interaction.user.id})\nReason: ${reason}\``).catch(() => {})
					/*	msg.delete()
					} else {
						msg.delete()
						collector.stop()
					}
				})
				collector.on("end", () => {
					msg.delete()
					collector.stop()
				})
			})
			*/
		}

	},
}