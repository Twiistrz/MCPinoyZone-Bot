const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    if (message.author.id != config.creatorID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    if (content.length < 2) {
        let usageEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
            .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.description}*`);
        await message.channel.send(usageEmbed).catch(O_o => {});
        return;
    }

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
    await bot.channels.get(config.bugChannelID).send(fixedEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "fixed",
    usage: ["[report by] [report content]"],
    category: "official",
    description: "Send a bug fixed message."
}