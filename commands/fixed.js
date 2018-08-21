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

    if (message.author.id != config.creatorID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle("Sorry, you're not my creator!")
        );
        return;
    }

    message.delete();
    let msg = args.slice(1).join(` `);
    let reportby = args[0];
    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`**Fixed:** \`${msg}\`\n**Report by:** ${reportby}`)
        .setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    )
    return;
}

module.exports.help = {
    name: `fixed`,
    desc: `- Display fixed bug message.`,
    category: `official`
}