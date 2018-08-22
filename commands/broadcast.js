const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }
    if (!message.member.roles.some(role => ["Owner", "Server Adviser", "Sponsor", "Developer", "Admin", "Senior Moderator"].includes(role.name))) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }
    let helpName = this.help.name;
    let helpUsage = this.help.usage;
    let helpDescription = this.help.description;
    let messageContent = content.join(' ');
    if (messageContent.length < 1) {
        let usageEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setTitle(`Correct usage for ${config.prefix}${helpName} command.`)
            .setDescription(`\`${config.prefix}${helpName} ${helpUsage}\` - *${helpDescription}*`);
        await message.channel.send(usageEmbed).catch(O_o => {});
    }

    let broadcastFormat = "@everyone\n";
        broadcastFormat += "Greetings, MCPZ Crafters!\n\n";
        broadcastFormat += `${messageContent}\n\n`;
        broadcastFormat += "- MCPZ Staff Team";
    let logEmbed = new Discord.RichEmbed()
        .setColor(`#${fileConfig.colorDanger}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**Announced by <@${message.author.id}>\n${messageContent}`)
        .setFooter(`ID: ${message.author.id} •  ${Moment.tz(message.createdTimestamp, fileConfig.timezone).format(fileConfig.timeFormat)}`);
    await bot.channel.get(fileConfig.broadcastChannelID).send(broadcastFormat).catch(O_o => {});
    await bot.channel.get(fileConfig.logChannelID).send(logEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "broadcast",
    usage: "[message]",
    category: "official",
    description: "Post an announcement."
}