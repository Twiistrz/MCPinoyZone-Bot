const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    await message.channel.send("Hello! Im a template command file.").catch(O_o => {});

    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.description}*`);
    await message.channel.send(usageEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "template",
    usage: false,
    category: "template",
    description: "Im a template file..."
}