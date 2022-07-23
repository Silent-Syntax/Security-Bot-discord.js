const { slashCommands, client } = require("../../index.js")
const chalk = require("chalk")
const Database = require("st.db")
const db1 = new Database("./Database/premiums.json")
	
const { Permissions } = require("discord.js")
module.exports = function (client) {
  client.on("interactionCreate", async interaction => {
		let { MessageButton, MessageActionRow } = require("discord.js")
    let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
		  .setStyle("LINK")
      .setLabel("Support")
      .setEmoji("✨") 
			.setURL("https://discord.gg/3AXgAvGw5Q")
		)	
		if (interaction.customId == "report") {
      interaction.reply({content: `**To report any problem, contact:\n\` TN hazem#6101 OR join server Support\`**`, components: [row] , ephemeral: true})
      return;
		}

  
		if (!interaction.guild) return interaction.reply({content: `**❌ Bot commands only working in servers**`, ephemeral: true})
		if (!interaction.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return interaction.reply({content: `**❌ I don't have permissions : \`VIEW_CHANNEL\`,\`SEND_MESSAGES\`**`})
	
    if (interaction.isCommand()) {
        const cmd = slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured " });
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        try {
					const array = db1.get({key: "PREMIUMS"}) || []
     
          if (array.includes(interaction.guild.id) && client.user.id == process.env.CLIENT_ID) return interaction.reply({content: "❌** There is a premium bot in this server**"})
			
					if (cmd.enable == true) return interaction.reply(`**❌ ${cmd.name} is temporary disabled.**`)
					cmd.execute(interaction, client, args)
				} catch(err) {
          console.log(chalk.red.bold(err))
				}
		}
    if (interaction.isContextMenu()) {
        const command = slashCommands.get(interaction.commandName);
        if (command) {
					try {
					cmd.execute(interaction, client, args)
				} catch(err) {
          console.log(chalk.red.bold(err))
					}
				}
		}
	})
	
} 