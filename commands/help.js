const Discord = module.require("discord.js");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let cmdName = bot.commands.map(command => command.help.name);
    let cmdCategory = bot.commands.map(command => command.help.category);
    let cmdUsage = bot.commands.map(command => command.help.usage);
    let cmdDescription = bot.commands.map(command => command.help.description);
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);

    if (content[0] && !content[1]) {
        for (let i = 0; i < cmdName.length; i++) {
            if (cmdName[i] === content[0])  {
                if (cmdCategory[i] === "official" && message.guild.id != config.officialGuildID) {
                    await message.channel.send(errorEmbed).catch(O_o => {});
                    return;
                }

                let help = `\`${config.prefix}${cmdName[i]}\` \`${cmdDescription[i]}\`\n`;
                if (cmdUsage[i]) help += `**Usage:** ${config.prefix}${cmdName[i]} ${cmdUsage[i].join(' | ')}`;
                await message.channel.send(help).catch(O_o => {});
                return;
            }
        }
    }

    let help = "```css\n";
        help += "Standard Command List";
        help += "```";
        help += `\nUse \`${config.prefix}${this.help.name} ${this.help.usage}\` to get more info on a specific command, for example \`${config.prefix}${this.help.name} anime\`\n`;
        help += `\n**1. Official Server -**`;
        for (let i = 0; i <= cmdName.length; i++) if (cmdCategory[i] === "official") help += ` \`${cmdName[i]}\``;
        help += `\n**2. General -**`;
        for (let i = 0; i <= cmdName.length; i++) if (cmdCategory[i] === "general") help += ` \`${cmdName[i]}\``;
        help += `\n**3. Moderation -**`;
        for (let i = 0; i <= cmdName.length; i++) if (cmdCategory[i] === "admin") help += ` \`${cmdName[i]}\``;
        help += "\n\n```";
        help += "# Don't include the example parenthesis and brackets when using commands!\n";
        help += "# [] -> Required\n# <> -> Optional or Default";
        help += "```";
    await message.author.send(help)
    .catch(() => message.reply(`Can't send Direct Messages to you. Please switch on \`Allow direct messages from server members.\` in user settings. Then try again.`));
    return;
}

module.exports.help = {
    name: "help",
    usage: ["<command>"],
    category: "general",
    description: "Displays a list of commands. Provide a command to get its info."
}