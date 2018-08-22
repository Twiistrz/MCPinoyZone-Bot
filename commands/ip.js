const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    let ipEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setDescription(`Server IP: **${config.ip}**`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    await message.channel.send(ipEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "ip",
    usage: false,
    category: "official",
    description: "View the Server IP of MCPinoyZone."
}