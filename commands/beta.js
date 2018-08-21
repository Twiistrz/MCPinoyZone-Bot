const moment = module.require("moment-timezone");
const config = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notofficial}**`)
        );
        return;
    }

    const betalist = message.guild.roles.get(`478820384720814100`).members.map(m => m.user.tag);
    const betatesters = [];

    for (const list of betalist) betatesters.push(` ${list}`);

    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .addField(`Beta Testers`, `${betatesters.sort()}`)
        .addField(`Total Beta Testers`, `${betatesters.length}`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: `beta`,
    desc: `- About the beta testing phase.`,
    category: `official`
}