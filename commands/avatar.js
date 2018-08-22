const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let helpName = this.help.name;
    let helpUsage = this.help.usage;
    let helpDescription = this.help.description;
    var username, avatar;
    if (content[0])  {
        try {
            if (message.mentions.users.first()) {
                username = message.mentions.users.first().username;
                avatar = message.mentions.users.first().displayAvatarURL;
            } else {
                username = bot.users.find(member => member.username === content[0]).username;
                avatar = bot.users.find(member => member.username === content[0]).displayAvatarURL;
            }
        } catch(e) {
            let usageEmbed = new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setTitle(`Correct usage for ${config.prefix}${helpName} command.`)
                .setDescription(`\`${config.prefix}${helpName} ${helpUsage}\` - *${helpDescription}*`);
            await message.channel.send(usageEmbed).catch(O_o => {});
            return;
        }
    }

    let avatarEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`${(username) ? username : message.author.username}'s Avatar`)
        .setImage(`${(avatar) ? avatar : message.author.displayAvatarURL}`);
    await message.channel.send(avatarEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "avatar",
    usage: "<user>",
    category: "general",
    description: "Get a user's avatar"
}