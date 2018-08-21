const moment = module.require("moment-timezone");
const config = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => {
    if (!message.member.hasPermission(`KICK_MEMBERS`)) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.nopermission}**`)
        );
        return;
    }

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply(`Please mention a valid member of this server`);
    if (!member.kickable) return message.reply(`I cannot kick this user! Do they have a higher role?`);

    let reason = args.slice(1).join(` `);
    if (!reason) reason = `Not following our rules.`;

    await message.delete().catch(err => console.log(err));
    await member.kick(reason).catch(err => message.reply(`Sorry ${message.author} I couldn't kick because of : ${err}`))

    if (message.guild.id === config.officialguildID) {
        await bot.channels.get(config.logchannelID).send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setAuthor(`Kicked | ${member.user.tag}`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField(`User`, member.user.tag, true)
            .addField(`Staff Member`, message.author.tag, true)
            .addField(`Reason`, reason)
            .setFooter(`${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
        ).catch(err => console.log(err));
    } else {
        await message.reply(`${member.user.tag} has been kicked by <@${message.author.id}> because: ${reason}`);
    }
    return;
}

module.exports.help = {
    name: `kick`,
    desc: `- Kick a user.`,
    category: `admin`
}