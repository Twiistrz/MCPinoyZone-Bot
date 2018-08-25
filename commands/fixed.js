const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.description}*`);
    
    if (message.guild.id != config.officialGuildID) return message.channel.send(errorEmbed).catch(O_o => {});

    errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`);

    if (message.author.id != config.creatorID) return message.channel.send(errorEmbed).catch(O_o => {});
    if (content.length < 2) return message.channel.send(usageEmbed).catch(O_o => {});
    await message.delete().catch(O_o => {});
    let messageContent = content.slice(1).join(' ').replace(/\s+/g, ' ');
    let reportedBy = content[0];
    let fixedEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(`Bug Fixed | ${message.author.tag}`, message.author.displayAvatarURL)
        .addField("User", reportedBy, true)
        .addField("Staff Member", message.author.tag, true)
        .addField("Bug", messageContent)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    return bot.channels.get(config.bugChannelID).send(fixedEmbed).catch(O_o => {});
}

module.exports.help = {
    name: "fixed",
    usage: ["[report by] [report content]"],
    category: "official",
    description: "Send a bug fixed message."
}