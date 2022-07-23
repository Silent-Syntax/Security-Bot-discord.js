const fs = require("fs")
const chalk = require("chalk")

function loader(client, tempDatabase) {
	const eventsFile = fs.readdirSync("./Bot/events").filter(f => f.endsWith(".js"))
for (const file of eventsFile) {
	const eventName = file.split(".")[0]
	const event = require(`../Bot/events/${file}`)
	event(client, tempDatabase)
//	console.log(chalk.gray.bold(`Loading `) + chalk.yellow.bold(`"${file.split(".")[0]}"`))
 }

 /*console.log(chalk.hex("#079680").bold("Loaded ") + chalk.hex('#84C6E6').underline(eventsFile.length) + " " + chalk.hex("#079680").bold("Events"))

 console.log(chalk.hex("#A06523").bold("============================="))
	
*/
}

function loader_premium(client, tempDatabase) {
	const eventsFile = fs.readdirSync("./Bot/events").filter(f => f.endsWith(".js"))
for (const file of eventsFile) {
	const eventName = file.split(".")[0]
	const event = require(`../Bot/events/${file}`)
  try {
		event(client, tempDatabase)
	} catch(err) {
		console.log(err)
	}
}


}

module.exports.run = loader;
module.exports.run_premium = loader_premium;