const config = module.require("../config.json");
const Discord = module.require("discord.js");
const request = module.require("request");
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

    const helpname = this.help.name;
    request(`http://mcapi.us/server/status?ip=${config.ip}`, async function(err, response, body) {
        if (err) return;
        if (response.statusCode != 200) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor(`#${config.colorDanger}`)
                .setTitle(`API is currently offline. Try again later.`)
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
        } else {
            body = JSON.parse(body);
            await message.channel.send(
                new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor(`#${(body.online) ? config.colorSuccess : config.colorDanger}`)
                .setTitle((body.online) ? `Server is online. **Play Now!**` : `Server is currently offline. Try again later.`)
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
        }
    });
    return;
}

module.exports.help = {
    name: `status`,
    desc: `- Check the MCPinoyZone server if its online.`,
    category: `official`
}