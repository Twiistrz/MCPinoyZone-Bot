const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const moment  = module.require("moment-timezone");

module.exports.run = async (bot, message, args)  => {
    let helpname = this.help.name;
    let user = args.slice(1);
    var username, avatar;

    if (user[0]) {
        // console.log(message.server.members.get(`username`, user[0]).id);
        // console.log(user[0]);
        // console.log(message.author.username);
        try {
            username = message.mentions.users.first().username;
            avatar = message.mentions.users.first().displayAvatarURL;
        } catch(e) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle(`Correct usage for '${config.prefix}${helpname}' command.`)
                .setDescription(`${config.prefix}${helpname} - Own avatar\n${config.prefix}${helpname} [tagged user] - Other avatar`)
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
    name: "avatar",
    desc: "Get a users avatar.",
    category: "fun"
}