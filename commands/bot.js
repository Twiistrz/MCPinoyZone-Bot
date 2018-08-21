const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");
const os      = module.require("os");

module.exports.run = async (bot, message, args)  => {
    const helpname = this.help.name;
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let totalram = os.totalmem();
    let usedram = process.memoryUsage().rss / 1024 / 1024;
    let ramusage = usedram * 100 / (totalram / 1024 / 1024);
    await message.channel.send(
        new Discord.RichEmbed()
        .setAuthor("Bot Statistics", bot.user.displayAvatarURL)
        .setColor(`#${config.colorInfo}`)
        .addField("Bot Name", `${bot.user.tag}`, true)
        .addField("Bot ID", `\`${bot.user.id}\``, true)
        .addField("Bot Creator", config.creatorTag, true)
        .addField("Ping", `${parseFloat(bot.ping).toFixed(0)}ms`, true)
        .addField("RAM Usage", `${parseFloat(ramusage).toFixed(2)}%`, true)
        .addField("CPUs", `${os.cpus().length}`, true)
        .addField("OS", `${process.platform.toUpperCase()} ${process.arch}`, true)
        .addField("RSS", `${parseFloat(usedram).toFixed(2)}MB`, true)
        .addField("Heap", `${parseFloat(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB`, true)
        .addField("Uptime", `${hours} ${(hours > 1) ? "hours" : "hour"}, ${minutes} ${(minutes > 1) ? "minutes" : "minute"}, ${parseFloat(seconds).toFixed(0)} ${(seconds > 1) ? "seconds" : "second"}`)
        .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: `bot`,
    desc: `View the bot statistics`,
    category: `general`
}