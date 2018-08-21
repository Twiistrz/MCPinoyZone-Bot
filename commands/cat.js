const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const request = module.require("request");
const moment  = module.require("moment-timezone");

module.exports.run = async (bot, message, args)  => {
    const helpname = this.help.name;
    request(`http://aws.random.cat/meow`, async function(err, response, body) {
        if(err) return;
        if (response.statusCode != 200) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle("API is currently offline. Try again later.")
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
        } else {
            body = JSON.parse(body);			
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setImage(body.file)
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            )
            .then(() => console.log(`[random.cat] ${message.author.tag}: ${body.file}`));
        }      
        return;
    });
}

module.exports.help = {
    name: `cat`,
    desc: `- Send random cat image.`,
    category: `fun`
}