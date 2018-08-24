const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    if (content.length < 1) {
        let usageEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
            .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\`\n\n*${this.help.description}*`);
        await message.channel.send(usageEmbed).catch(O_o => {});
        return;
    }

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