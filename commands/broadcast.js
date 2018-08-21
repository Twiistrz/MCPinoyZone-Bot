const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const moment  = module.require("moment-timezone");

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("You can't use this command in other server.")
        );
        return;
    }

    if (!message.member.roles.some(r => [`Owner`, `Server Adviser`, `Sponsor`, `Admin`].includes(r.name))) {
        await message.author.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("You don't have permission to use this command.")
        );
        return;
    }
    
    let msg = args.slice(1).join(" ");
    if (msg.length < 1) {			
        await message.author.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("Cannot announce nothing!")
        );
        return;
    }

    let bc = `@everyone\n`;
        bc += `Greetings, MCPZ Crafters!\n\n`;
        bc += `${msg}\n\n`;
        bc += `- MCPZ Staff Team`;
    await bot.channels.get(`${config.bcchannelID}`).send(bc).catch(() => console.log(`Oops Something went wrong...`));
    await bot.channels.get(`${config.logchannelID}`).send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**Announced by <@${message.author.id}>**\n${msg}`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    )
    .catch(() => console.log(`Oops Something went wrong...`));
    return;
}

module.exports.help = {
    name: "broadcast",
    desc: `Post an announcement to <#${config.bcchannelID}>.`,
    category: "admin"
}