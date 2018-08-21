const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const bot     = new Discord.Client();
const moment  = module.require("moment-timezone");

bot.commands = new Discord.Collection();

module.exports.run = async (bot, message, args)  => {
    let usage = args;

    if (usage[0]) {
        if (usage[0] === `anime`) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle(`Correct usage for '${config.prefix}${usage[0]}' command.`)
                .setDescription(`${config.prefix}${usage[0]} - Default Random\n${config.prefix}${usage[0]} <tag> - Random with selected tag\n${config.prefix}${usage[0]} [site] - Random in selected site\n${config.prefix}${usage[0]} [site] <tag> - Random in selected site with tag`)
                .addField("Sites", `safebooru, lolibooru, danbooru, konachan, yandere, gelbooru, rule34, tbib, xbooru, youhateus`)
                .setFooter(`${config.prefix}help <${usage[0]}> • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
            return;
        } else

        if (usage[0] === `avatar`) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle(`Correct usage for '${config.prefix}${usage[0]}' command.`)
                .setDescription(`${config.prefix}${usage[0]} - Display own avatar\n${config.prefix}${usage[0]} <user> - Display other user's avatar`)
                .setFooter(`${config.prefix}help <${usage[0]}> • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
            return;
        } else

        if (usage[0] === `bug`) {
            await message.channel.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorDanger}`)
                .setTitle(`Correct usage for '${config.prefix}${usage[0]}' command.`)
                .setDescription(`${config.prefix}${usage[0]} <report content> - Submit a bug report.`)
                .setFooter(`${config.prefix}help <${usage[0]}> • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
            return;
        }
    }

    let help = "```Official Server Commands```";
    for (let i = 0; i <= bot.commands.map(cmd => cmd.help.name).length - 1; i++) {
        if (bot.commands.map(cmd => cmd.help.category)[i] === `official`) {
            help += `\`${config.prefix}${bot.commands.map(cmd => cmd.help.name)[i]}\` ${bot.commands.map(cmd => cmd.help.desc)[i]}\n`;
        }
    }

    help += "\n```General Commands```";
    for (let i = 0; i <= bot.commands.map(cmd => cmd.help.name).length - 1; i++) {
        if (bot.commands.map(cmd => cmd.help.category)[i] === `general`) {
            help += `\`${config.prefix}${bot.commands.map(cmd => cmd.help.name)[i]}\` ${bot.commands.map(cmd => cmd.help.desc)[i]}\n`;
        }
    }

    help += "\n```Other Commands```";
    for (let i = 0; i <= bot.commands.map(cmd => cmd.help.name).length - 1; i++) {
        if (bot.commands.map(cmd => cmd.help.category)[i] === `fun`) {
            help += `\`${config.prefix}${bot.commands.map(cmd => cmd.help.name)[i]}\` ${bot.commands.map(cmd => cmd.help.desc)[i]}\n`;
        }
    }

    help += "\n```Moderation Commands```";
    for (let i = 0; i <= bot.commands.map(cmd => cmd.help.name).length - 1; i++) {
        if (bot.commands.map(cmd => cmd.help.category)[i] === `admin`) {
            help += `\`${config.prefix}${bot.commands.map(cmd => cmd.help.name)[i]}\` ${bot.commands.map(cmd => cmd.help.desc)[i]}\n`;
        }
    }

    help += "\n```© 2013 - 2018 MCPinoyZone```";
    await message.author.send(help);
    return;
}

module.exports.help = {
    name: `help`,
    desc: `- Get info about the bot's commands.`,
    category: `general`
}