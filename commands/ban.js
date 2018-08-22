const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`)
        await message.channel.send(errorEmbed);
        return;
    }

    let helpName = this.help.name;
    let helpUsage = this.help.usage;
    let helpDescription = this.help.description;
    try {
        let member = message.mentions.members.first() || message.guild.members.get(content[0]);
        if (!member.bannable) {
            let errorEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setDescription(`**<@${message.author.id}>, I can't ban this user! Do they have a higher role?**`)
            await message.channel.send(errorEmbed);
            return;
        }

        let reason = content.slice(1).join(' ');
        if (!reason) reason = "The Ban hammer has spoken!";
        await message.delete().catch(O_o => {});
        await member.ban({days: 7, reason: reason}).catch(O_o => {});
        let logEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setAuthor(`Banned | ${member.user.tag}`, bot.user.displayAvatarURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .addField("User", member.user.tag, true)
                .addField("Staff Member", message.author.tag, true)
                .addField("Reason", reason)
                .setFooter(`${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
        if (message.guild.id === config.officialGuildID) {
            await bot.channels.get(config.logChannelID).send(logEmbed).catch(O_o => {});
        } else {
            await message.channel.send(logEmbed).catch(O_o => {});
        }
    } catch(e) {
        let usageEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setTitle(`Correct usage for ${config.prefix}${helpName} command.`)
            .setDescription(`\`${config.prefix}${helpName} ${helpUsage}\` - *${helpDescription}*`);
        await message.channel.send(usageEmbed).catch(O_o => {});
    }
    return;
}

module.exports.help = {
    name: "ban",
    usage: "[user/user id] <reason>",
    category: "admin",
    description: "Ban a user."
}