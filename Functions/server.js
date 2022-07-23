const express = require("express")
const app = express()



function runFunction(client) {
  client.on("ready", () => {
  	app.get("/", (req,res) => {
   	res.send(`Bot Name: ${client.user.username} , Bot ID: ${client.user.id}`)
   	})
		app.listen(3000)
  })



}

module.exports = runFunction;