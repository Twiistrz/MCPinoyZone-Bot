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
    let betalist = message.guild.roles.get(`478820384720814100`).members.map(m => m.user.id);
    let betatesters = "";

    for (let i = 0; i < betalist.length; i++) {
        betatesters += `<@${betalist[i]}>`;
        if (i < betalist.length - 1) betatesters += ', ';
    }

    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setDescription("**Server is currently on Beta Testing Phase**")
        .addField("Beta Testers", `${betatesters}`)
        .addField("Total", `${betalist.length}`)
        .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: "beta",
    desc: "About the beta testing phase",
    category: "general"
}