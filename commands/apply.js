const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let applyEmbed = new Discord.RichEmbed()
        .setColor(`#${(config.acceptingApplicants) ? config.colorInfo : config.colorDanger}`)
        .setDescription(`<@${message.author.id}> ${(config.acceptingApplicants) ? "Yes, we're accepting applicants." : "Sorry, we're not looking for staff!"}`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    if (message.guild.id != config.officialGuildID) return message.channel.send(errorEmbed).catch(O_o => {});
    return message.channel.send(applyEmbed).catch(O_o => {});
}

module.exports.help = {
    name: "apply",
    usage: false,
    category: "official",
    description: "Are we accepting any staff?"
}