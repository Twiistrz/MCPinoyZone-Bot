const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.usage}*`);
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
            return message.channel.send(usageEmbed).catch(O_o => {});
        }
    }

    let avatarEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`${(username) ? username : message.author.username}'s Avatar`)
        .setImage(`${(avatar) ? avatar : message.author.displayAvatarURL}`);
    return message.channel.send(avatarEmbed).catch(O_o => {});
}

module.exports.help = {
    name: "avatar",
    usage: ["<@user>"],
    category: "general",
    description: "Display your avatar if left blank or another @user's avatar."
}