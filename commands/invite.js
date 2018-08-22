const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let inviteEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)    
        .setDescription(`**MCPZ Discord invite link: ${config.inviteLink}**`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    await message.channel.send(inviteEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "invite",
    usage: false,
    category: "general",
    description: "View invite link for MCPinoyZone Server."
}