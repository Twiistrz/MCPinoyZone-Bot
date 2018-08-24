const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.noPermission}**`);
    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.description}*`);
    let notKickableEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, I can't kick this user! Do they have a higher role?**`);

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    if (content[0]) {
        let id = content[0].replace(/[^a-zA-Z0-9]/g, '');
        try {
            let member = message.guild.members.get(id);
            if (!member.kickable) {
                await message.channel.send(notKickableEmbed).catch(O_o => {});
                return;
            }

            let reason = content.slice(1).join(' ');
            if (!reason) reason = "None";
            await message.delete().catch(O_o => {});
            await member.kick(reason).catch(O_o => {});
            let logEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setAuthor(`Kicked | ${member.user.tag}`, bot.user.displayAvatarURL)
                .setThumbnail(config.securityShield)
                .addField("User", member.user.tag, true)
                .addField("Staff Member", message.author.tag, true)
                .addField("Reason", reason)
                .setFooter(`${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
            if (message.guild.id === config.officialGuildID) {
                await bot.channels.get(config.logChannelID).send(logEmbed).catch(O_o => {});
                return;
            } 
            await message.channel.send(logEmbed).catch(O_o => {});
        } catch(e) { await message.channel.send(usageEmbed).catch(O_o => {}); }
        return;
    } else {
        await message.channel.send(usageEmbed).catch(O_o => {});
        return;
    }
}

module.exports.help = {
    name: "kick",
    usage: ["[user] <reason>"],
    category: "admin",
    description: "Kick a user."
}