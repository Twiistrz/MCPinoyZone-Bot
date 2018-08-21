const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("You can't use this command in other server.")
        );
        return;
    }

    const helpname = this.help.name;
    await message.channel.send(
        new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Server IP: **${config.ip}**`)
        .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: "ip",
    desc: "Check current server ip address.",
    category: "general"
}