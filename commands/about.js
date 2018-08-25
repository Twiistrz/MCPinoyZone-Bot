const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let aboutEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor("About MCPinoyZone Server")
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription("MCPinoyZone is a Philippine Minecraft Server")
        .addField("Founded", "September 1, 2013")
        .addField("Mission", "To provide excellent Minecraft PC Server gaming experience to Asia especially to Philippines")
        .addField("Founder", "Shinnex", true)
        .addField("Owner", `<@${config.creatorID}>`, true)
        .setFooter(`${config.prefix}${this.help.name} • © 2013 - 2018 MCPinoyZone`);
    if (message.guild.id != config.officialGuildID) return message.channel.send(errorEmbed).catch(O_o => {});
    return message.channel.send(aboutEmbed).catch(O_o => {});
}

module.exports.help = {
    name: "about",
    usage: false,
    category: "official",
    description: "View info about the server."
}