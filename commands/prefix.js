const config = module.require("../config.json");
const Discord = module.require("discord.js");
const fs = module.require(`fs`);

module.exports.run = async (bot, message, args)  => {
    if (message.author.id != config.creatorID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle(`Sorry, you're not my creator!`)
        );
        return;
    }

    let newPrefix = message.content.split(` `).slice(1)[0];
    if (!newPrefix) return;
    config.prefix = newPrefix;

    try {
        fs.writeFileSync(`../config.json`, JSON.stringify(config));
    } catch(err) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setTitle(`ERROR: ${err.message}`)
        );
    }

    bot.user.setPresence({
		game: {
			name: `${config.prefix}help | Serving ${bot.guilds.size} servers`,
			type: 3
		}
	});
    return;
}

module.exports.help = {
    name: `prefix`,
    desc: `- Update my prefix.`,
    category: `owner`
}