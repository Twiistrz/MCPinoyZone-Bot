const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => {
    if (message.author.id != config.creatorID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("Sorry, you're not my creator!")
        );
        return;
    }

    const msg = (message.guild.id != config.officialguildID) ? message.channel : bot.channels.get(config.logchannelID);

    await msg.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**<@${message.author.id}> restarts the bot**`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );

    let restarting = await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle("Bot Restarting. . .")
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );

    await bot.destroy()
    .then(() => 
        bot.login(process.env.TOKEN)
        .catch(() => console.log("\nERROR: Can't reach the bot.\n"))
    )
    .then(() => restarting.delete().catch(() => {}))
    .then(() => message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorSuccess}`)
        .setTitle("Bot Restarted!")
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    ));
    return;
}

module.exports.help = {
    name: "restart",
    desc: "Restart the bot",
    category: "admin"
}