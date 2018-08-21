const config = module.require("../config.json");
const Discord = module.require("discord.js");
const moment = module.require("moment-timezone");

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notofficial}**`)
        );
        return;
    }

    if (!message.member.roles.some(r => [`Owner`, `Server Adviser`, `Sponsor`, `Developer`, `Admin`, `Senior Moderator`].includes(r.name))) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.nopermission}**`)
        );
        return;
    }
    
    let msg = args.join(` `);
    if (msg.length < 1) {			
        await message.author.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle(`Cannot announce nothing!`)
        );
        return;
    }

    let bc = `@everyone\n`;
        bc += `Greetings, MCPZ Crafters!\n\n`;
        bc += `${msg}\n\n`;
        bc += `- MCPZ Staff Team`;
    await bot.channels.get(`${config.bcchannelID}`).send(bc).catch(err => console.log(err));
    await bot.channels.get(`${config.logchannelID}`).send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**Announced by <@${message.author.id}>**\n${msg}`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    ).catch(err => console.log(err));
    return;
}

module.exports.help = {
    name: `broadcast`,
    desc: `- Post an announcement.`,
    category: `official`
}