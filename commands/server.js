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
    request(`https://minecraft-mp.com/api/?object=servers&element=detail&key=${config.serverkey}`, async function(err, response, body) {
        if(err) return;
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
                .setColor(`#${config.colorInfo}`)
                .setAuthor(`MCPinoyZone Server Statistics`, bot.user.displayAvatarURL)
                .addField(`ID`, `${body.id}`, true)
                .addField(`Votes`, `${body.votes}`, true)
                .addField(`Rank`, `${body.rank}`, true)
                .addField(`Score`, `${body.score}`, true)
                .addField(`Uptime`, `${body.uptime}%`, true)
                .addField(`Favorited`, `${body.favorited}`, true)
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
        }
    });
    return;
}

module.exports.help = {
    name: `server`,
    desc: `- View MCPinoyZone Server Statistics`,
    category: `official`
}