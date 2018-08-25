const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let ipEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setDescription(`Server IP: **${config.ip}**`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);

    if (message.guild.id != config.officialGuildID) {
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    await message.channel.send(ipEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "ip",
    usage: false,
    category: "official",
    description: "View the Server IP of MCPinoyZone."
}