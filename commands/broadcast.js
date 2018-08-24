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

    let messageContent = content.join(' ');
    let usage = `\`${config.prefix}${this.help.name}\` \`${this.help.description}\`\n`;
        usage += `**Usage:** ${config.prefix}${this.help.name} ${this.help.usage.join(' | ')}`;
    let bcFormat = "@everyone\n";
        bcFormat += "Greetings, MCPZ Crafters!\n\n";
        bcFormat += `${messageContent}\n\n`;
        bcFormat += "Sincerely,\nMCPZ Staff Team";
    let logEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**Announced by <@${message.author.id}>\n${messageContent}`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    
    if (content.length < 1) {
        await message.channel.send(usage).catch(O_o => {});
        return;
    }

    await bot.channel.get(config.broadcastChannelID).send(bcFormat).catch(O_o => {});
    await bot.channel.get(config.logChannelID).send(logEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "broadcast",
    usage: ["[message]"],
    category: "official",
    description: "Post an announcement."
}