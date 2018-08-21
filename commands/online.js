const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const request = module.require("request");

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
    request(`https://minecraft-mp.com/api/?object=servers&element=detail&key=${config.serverkey}`, async function(err, response, body) {
        if (err) return;
        if (response.statusCode != 200) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor(`#${config.colorDanger}`)
                .setTitle("API is currently offline. Try again later.")
                .setFooter(moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat))
            );
        } else {
            body = JSON.parse(body);
            let plural = (body.players > 1 || body.players == 0) ? "are" : "is";
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${(body.is_online) ? config.colorInfo : config.colorDanger}`)
                .setTitle((body.is_online) ? `There ${plural} ${body.players} out of ${body.maxplayers} players online.` : "Server is currently offline. Try again later.")
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
        }
        return;
    });
}

module.exports.help = {
    name: "online",
    desc: "How many players currently online.",
    category: "general"
}