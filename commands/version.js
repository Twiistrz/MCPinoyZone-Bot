const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    request(`https://minecraft-mp.com/api/?object=servers&element=detail&key=${process.env.SERVERKEY}`, async (err, response, server) => {
        if (err) return;
        if (response.statusCode === 200) {
            server = JSON.parse(server);
            let serverEmbed = new Discord.RichEmbed()
                .setColor(`#${(server.is_online) ? config.colorSuccess : config.colorDanger}`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTitle((server.is_online) ? `Server supports **${server.version}**` : `Server is currently offline. Try again later.`)
                .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
            await message.channel.send(serverEmbed).catch(O_o => {});
        } else {
            let errorEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setDescription(`**<@${message.author.id}>, API is offline.**`);
            await message.channel.send(errorEmbed).catch(O_o => {});
        }
    });
    return;
}

module.exports.help = {
    name: "version",
    usage: false,
    category: "official",
    description: "Check supported version."
}