const config = module.require("../config.json");
const Discord = module.require("discord.js");
const moment = module.require("moment-timezone");

module.exports.run = async (bot, message, args)  => {
    let helpname = this.help.name;
    let user = args;
    var username, avatar;

    if (user[0]) {
        try {
            if (message.mentions.users.first()) {
                username = message.mentions.users.first().username;
                avatar = message.mentions.users.first().displayAvatarURL;
            } else {
                username = bot.users.find(u => u.username === user[0]).username;
                avatar = bot.users.find(u => u.username === user[0]).displayAvatarURL;
            }
        } catch(e) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle(`Correct usage for '${config.prefix}${helpname}' command.`)
                .setDescription(`${config.prefix}${helpname} - Display own avatar\n${config.prefix}${helpname} <user> - Display other user's avatar`)
                .setFooter(`${config.prefix}help <${helpname}> • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
            return;
        }
    }

    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`${(username) ? username : message.author.username}'s Avatar`)
        .setImage(`${(avatar) ? avatar : message.author.displayAvatarURL}`)
        .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: `avatar`,
    desc: `\`${config.prefix}help avatar\` - Get a users avatar.`,
    category: `fun`
}