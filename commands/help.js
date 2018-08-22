module.exports.execute = async (bot, message, content, config, moment, request) => {
    let help = "```Official Server Commands```";
    for (let i = 0; i <= bot.commands.map(command => command.help.name).length - 1; i++)  {
        if (bot.commands.map(command => command.help.category)[i] === "official") help += `\`${config.prefix}${bot.commands.map(command => command.help.name)[i]}\`${(bot.commands.map(command => command.help.usage)[i]) ? `, \`${config.prefix}${bot.commands.map(command => command.help.name)[i]} ${bot.commands.map(command => command.help.usage)[i]}\` ` : ' '}- *${bot.commands.map(command => command.help.description)[i]}*\n`;
    }

    help += "\n```General Commands```";
    for (let i = 0; i <= bot.commands.map(command => command.help.name).length - 1; i++)  {
        if (bot.commands.map(command => command.help.category)[i] === "general") help += `\`${config.prefix}${bot.commands.map(command => command.help.name)[i]}\`${(bot.commands.map(command => command.help.usage)[i]) ? `, \`${config.prefix}${bot.commands.map(command => command.help.name)[i]} ${bot.commands.map(command => command.help.usage)[i]}\` ` : ' '}- *${bot.commands.map(command => command.help.description)[i]}*\n`;
    }

    help += "\n```Moderation Commands```";
    for (let i = 0; i <= bot.commands.map(command => command.help.name).length - 1; i++)  {
        if (bot.commands.map(command => command.help.category)[i] === "admin") help += `\`${config.prefix}${bot.commands.map(command => command.help.name)[i]}\`${(bot.commands.map(command => command.help.usage)[i]) ? `, \`${config.prefix}${bot.commands.map(command => command.help.name)[i]} ${bot.commands.map(command => command.help.usage)[i]}\` ` : ' '}- *${bot.commands.map(command => command.help.description)[i]}*\n`;
    }

    help += "\n```© 2013 - 2018 MCPinoyZone```";
    await message.channel.send(help);
    return;
}

module.exports.help = {
    name: "help",
    usage: false,
    category: "general",
    description: "View my available commands."
}