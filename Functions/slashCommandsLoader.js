const slashCommandsMap = require('../index').slashCommands;
const chalk = require("chalk")
const fs = require("fs")

module.exports.run = async(client) => {
    const slashCommands = await fs.readdirSync(`./Bot/slashCommands`);

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(`../Bot/slashCommands/${value}`);
         if (!file.name) return;
        slashCommandsMap.set(file.name, file);
       // console.log(chalk.blue.bold('Loading') + " " + chalk.yellow.bold(`"${file.name}"`))
        arrayOfSlashCommands.push(file);
     });
	//  console.log(chalk.hex("#079680").bold("Loaded ") + chalk.hex('#84C6E6').underline(slashCommandsMap.size) + " " + chalk.hex("#079680").bold("Commands"))
        
    client.on("ready", async() => {
        try {
					await client.application.commands.set(arrayOfSlashCommands)
				} catch(err) {
					console.log(err)
				}
			  //  await client.guilds.cache.forEach(gg => gg.commands.set(arrayOfSlashCommands))
    });
};