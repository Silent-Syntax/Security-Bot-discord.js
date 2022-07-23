module.exports = function(client) {
  const Database = require("st.db")
  const db = new Database("./Database/premiums.json")
  if (db.has({ key: "PREMIUMS" })) {
    db.set({ key: "PREMIUMS", value: [] })
  }
  client.on("ready", async () => {
    if (true) {
      await console.log(`${require("chalk").blue.bold("Logged With")} -->> ${require("chalk").red.bold(client.user.tag)}`)
      await client.user.setActivity(` Owner's Assitant `, { type: "PLAYING" })
    }

    setInterval(() => { require("fs").readFileSync("./Database/coins.json") }, 1000)
  })
}