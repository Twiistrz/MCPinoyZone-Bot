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

    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setAuthor(`About MCPinoyZone`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`MCPinoyZone is a Minecraft Philippine Server.`)
        .setThumbnail(bot.user.displayAvatarURL)
        .addField(`Founded`, `September 1, 2013`)
        .addField(`Mission`, `To provide excellent Minecraft PC Server gaming experience to Asia especially to Philippines`)
        .addField(`Founder`, `Shinnex`, true)
        .addField(`Owner`, `<@${config.creatorID}>`, true)
        .setFooter(`${config.prefix}${this.help.name} • © 2013 - 2018 MCPinoyZone`)
    );
    return;
}

module.exports.help = {
    name: `about`,
    desc: `- View info about the server.`,
    category: `official`
}