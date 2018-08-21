const moment = module.require(`moment-timezone`);
const config = module.require(`../config.json`);
const Discord = module.require(`discord.js`);

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notofficial}**`)
        );
        return;
    }

    if (args.length > 0) {
        let msg = args.join(` `);
        message.delete();
        await bot.channels.get(`${config.bugchannelID}`).send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setDescription(`**Bug Report:** \`${msg}\`\n**By:** <@${message.author.id}>`)
            .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
        )
        console.log(args);
    } else {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle(`Correct usage for '${config.prefix}${this.help.name}' command.`)
            .setDescription(`${config.prefix}${this.help.name} <report content> - Submit a bug report.`)
            .setFooter(`${config.prefix}help <${this.help.name}> • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
        );
    }
    return;
}

module.exports.help = {
    name: `bug`,
    desc: `\`${config.prefix}help bug\` - Report a bug.`,
    category: `official`
}