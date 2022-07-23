require("discord-reply");
const { Permissions, Util } = require("discord.js")

module.exports = {
	name: "bots",
	description: "Mention all bots in server",
	execute(interaction, client) {
    let member = interaction.guild.members.cache.get(interaction.user.id)
	  if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({content: `**You don't have permission : \`MANAGE_GUILD\`**`, ephemeral: true})
    let bots = interaction.guild.members.cache.filter(me => me.user.bot)
		let botsmap = bots.map(bo => bo.user).join("\n")
    try {
		interaction.reply({content: `**Bots Count : ${bots.size}**`, ephemeral: false})
    const [first, ...rest] = Util.splitMessage(`${botsmap}`, { maxLength: 2000 })
		setTimeout(() => {
			if (!rest.length) return interaction.channel.send(`${first}`).catch(() => {})
		else {
			for (const text of rest) {
        interaction.channel.send(`${text}`).catch(() => {})
       }
		}
    
		},500) 
		} catch(err) {
			console.log(err)
		}
	},
}