const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.author.id != config.creatorID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    const ch = (message.guild.id != config.officialGuildID) ? message.channel : bot.channels.get(config.logChannelID);
    let logEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**<@${message.author.id}> restarts the bot**`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    let restartingEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Bot Restarting. . .`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    let restartedEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorSuccess}`)
        .setTitle(`Bot Restarted!`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    let restarting = await message.channel.send(restartingEmbed);
    console.log(`>> ${message.author.tag} restarts the bot`);
    await ch.send(logEmbed).catch(O_o => {});
    await bot.destroy()
        .then(() => bot.login(process.env.TOKEN).catch(O_o => {}))
        .then(() => restarting.delete())
        .then(() => message.channel.send(restartedEmbed).catch(O_o => {}))
        .catch(O_o => {});
    return;
}

module.exports.help = {
    name: "restart",
    usage: false,
    category: "admin",
    description: "Restart the bot."
}