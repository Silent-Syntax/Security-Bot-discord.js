process.on("unhandledRejection", error => {
  return;
});
process.on("unhandledRejection", error => {
  return;
});
process.on("unhandledRejection", error => {
  return;
});
const Discord = require("discord.js");
const Intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents: Intents})
const { Collection, Permissions, MessageEmbed } = require("discord.js")
const slashCommands = new Collection()
const commands = new Collection()
module.exports = {
  slashCommands: slashCommands,
  client: client,
  commands: commands
}
const tempDatabase = {};
//----- Run Functions -----//
require("./Functions/server.js")(client)
require("./Functions/slashCommandsLoader.js").run(client)
require("./Functions/commandsLoader.js").run(client)
require("./Functions/eventsLoader.js").run(client, tempDatabase)
//----- Premium Area -----//

client.on("messageCreate", message => {
  if (message.content.startsWith("+leave")) {
    if (message.author.id !== "593536295507329049") return message.reply("**فقط اونر البوت يمكنه استعمال ذلك الامر**")
    const guild = client.guilds.cache.get(message.content.split(" ")[1])
    if (!guild) return message.reply("**لم اتمكن من العثور علي هذا السيرفر**")
    message.reply(`**تم الخروج من هذا السيرفر بنجاح**`)
    guild.leave()
  }
})

const owners = ["593536295507329049", "", ""]

client.on("messageCreate", message => {
  if (message.content.startsWith("+servers")) {
    if (!owners.includes(message.author.id)) return message.reply("**فقط اونر البوت يمكنه استعمال ذلك الامر**")
    const guilds = client.guilds.cache.map(g => `${g.name}`).join("\n")
    const { Util } = require("discord.js")
    const [first, ...rest] = Util.splitMessage(guilds, { maxLength: 2000 })
    if (!rest.length) return message.reply(first)
    else {
      for (const text of rest) {
        message.reply(text)
      }
    }
  }
})

const Topgg = require("@top-gg/sdk")
const app = require("express")()
const webhook = new Topgg.Webhook("qxOfpiVeJB9aWCyqMqBdLRpUfTIXk3SfSr5uK")

app.post("/dblwebhook", webhook.listener(vote => {
   let user = client.users.cache.get(vote.user)
   console.log(vote)
})) 


/*
	{
    "472420453823021059_COINS": 2769,
    "552472908363202560_COINS": 2909,
    "710704110571094088_COINS": 66,
    "746649075348406272_COINS": 2923,
    "823146676855767042_COINS": 0,
    "723631888496853053_COINS": 6679,
    "734728647734329415_COINS": 1114,
    "907569838090752000_COINS": 2753,
    "584605436288696349_COINS": 2600,
    "767535340402507776_COINS": 1530,
    "172075838806818817_COINS": 2926,
    "639969204115603458_COINS": 1989,
    "793537676375490610_COINS": 1020,
    "763529197397868608_COINS": 10000,
    "883051874985599048_COINS": 10000,
    "772225145435062324_COINS": 10000,
    "689172614345916425_COINS": 30000,
    "717784730564690011_COINS": 10574,
    "743681553858560050_COINS": 3670,
    "764488040453636117_COINS": 1184,
    "553316248432410625_COINS": 2334,
    "873600972310601769_COINS": 1,
    "552931609842548736_COINS": 1,
    "644619622120685578_COINS": 2511,
    "759740307939524628_COINS": 2353,
    "446992480999571466_COINS": 1368,
    "860909616366616627_COINS": 1957,
    "637090851943612416_COINS": 1009,
    "534734135860920320_COINS": 2000,
    "743199867257749564_COINS": 2484,
    "866801753822593055_COINS": 2501,
    "874958518858444811_COINS": 2356,
    "724254095988490282_COINS": 2308,
    "681197962805772380_COINS": 1277
		}
		*/
/*
const prefix = '+' 
const translaater = require('@iamtraction/google-translate');
client.on('messageCreate', async message => {
        if (!message.guild || message.author.bot) return;
        let args = message.content.split(' ');
        if (message.content.startsWith(prefix + 'translate')) {
try {
                if (!args[1] || !args[2] || !args.slice(3)) return message.reply({ content: `${prefix}translate en ar hello` })
                translaater(args.slice(3).join(' '), { from: `${args[1]}`, to: `${args[2]}` }).then(async r => {
                        var embed = new MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                                .setDescription(`${r.text}`)
                                .setColor('BLUE')
                                .setFooter(`${args[1]} ➔ ${args[2]}`, client.user.displayAvatarURL({ dynamic: true, format: 'png' }));
                        message.reply({ embeds: [embed] });
                })
        } catch (error) {
        message.reply({ embeds:[new MessageEmbed().setDescription(String(error)) ] })
        }
        }
})

*/

client.on("messageCreate", message => {
  if (message.content == "+test-help-2") {
    if (message.author.id !== "593536295507329049") return;
    let { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
    let embed = new MessageEmbed()
      .setDescription(`**<:emoji_33:922258330322350120> [Invite](https://discord.com/oauth2/authorize?client_id=806779133023223860&permissions=8&scope=bot%20applications.commands) | [Vote](https://top.gg/bot/806779133023223860/vote) | [Support](https://discord.gg/huAqQDu2zU)\nPowerBot is the special protection bot .. bot includes alot of commands you can explore them in this menu , Enjoy !!**`)
      .setImage("https://images-ext-1.discordapp.net/external/6e0HoKD9SOt6x5JtZwerwO2AHiakE5WOAzhC6HBASD0/https/media.discordapp.net/attachments/909208267065016362/925578049469153350/1637410381443.jpg")
      .setColor("RED")

    let row = new MessageActionRow()

      .addComponents(
        new MessageSelectMenu()
          .setCustomId('help-selects')
          .setPlaceholder('Select Category')
          .addOptions([
            {
              label: 'Public Commands',
              description: 'Display public commands.',
              value: 'public',
              emoji: "<:emoji_30:922238801303195648>"
            },
            {
              label: 'Close Menu',
              description: 'Delete help menu.',
              value: 'cancel',
              emoji: "<:emoji_32:922239029771137044>"
            },
          ]),
      )
    message.reply({ embeds: [embed], components: [row] })
    client.on("interactionCreate", interaction => {

      if (interaction.customId == "help-selects") {

        if (interaction.user.id !== message.author.id) return;

        if (interaction.values[0] === "cancel") interaction.message.delete()

        if (interaction.values[0] === "public") interaction.message.edit({ content: "0", embeds: [] })
      }

    })
  }
})

client.login(process.env.token)