const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, API is offline.**`);

    request(`http://aws.random.cat/meow`, async (err, response, cat) => {
        if (response.statusCode === 200) {
            cat = JSON.parse(cat);
            let catEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setImage(cat.file)
                .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);    
            return message.channel.send(catEmbed).catch(O_o => {});
        }
        
        return message.channel.send(errorEmbed).catch(O_o => {});
    });
}

module.exports.help = {
    name: "cat",
    usage: false,
    category: "general",
    description: "Send a random cat."
}