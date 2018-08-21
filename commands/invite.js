const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => { 
    await message.channel.send(
        new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Discord invite link: ${config.invitelink}`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: `invite`,
    desc: `- Invite link for MCPinoyZone server.`,
    category: `general`
}