const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);

    if (message.guild.id != config.officialGuildID) return message.channel.send(errorEmbed).catch(O_o => {});
    const betaList = message.guild.roles.get("478820384720814100").members.map(member => member.user.tag);
    const betaTesters = [];
    for (const member of betaList) betaTesters.push(member);
    let betaEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .addField("Beta Testers", betaTesters.sort())
        .addField("Total Beta Testers", betaTesters.length)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`)
    await message.channel.send(betaEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "beta",
    usage: false,
    category: "official",
    description: "View info about our beta testing phase."
}