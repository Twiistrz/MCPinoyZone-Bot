const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\`\n\n*${this.help.description}*`);

    if (message.guild.id != config.officialGuildID) return message.channel.send(errorEmbed).catch(O_o => {});
    if (content.length < 1) return message.channel.send(usageEmbed).catch(O_o => {});
    let messageContent = content.join(' ').replace(/\s+/g, ' ');
    let bugEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(`Bug Report | ${message.author.tag}`, message.author.displayAvatarURL)
        .addField("User", `<@${message.author.id}>`)
        .addField("Bug", messageContent)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    await bot.channels.get(config.bugChannelID).send(bugEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "bug",
    usage: ["[report message]"],
    category: "official",
    description: "Report a bug about the server."
}