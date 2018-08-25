const Discord = module.require("discord.js");
const pckg = module.require("../package.json");
const os = module.require("os");

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let totalram = os.totalmem();
    let usedram = process.memoryUsage().rss / 1024 / 1024;
    let ramusage = usedram * 100 / (totalram / 1024 / 1024);
    let botEmbed = new Discord.RichEmbed()
        .setAuthor("Bot Statistics", bot.user.displayAvatarURL)
        .setColor(`#${config.colorInfo}`)
        .addField("Bot Name", bot.user.tag, true)
        .addField("Bot ID", bot.user.id, true)
        .addField("Bot Creator", config.creatorTag, true)
        .addField("Ping", `${parseFloat(bot.ping).toFixed(0)}ms`, true)
        .addField("RAM Usage", `${parseFloat(ramusage).toFixed(2)}%`, true)
        .addField("CPUs", `${os.cpus().length}`, true)
        .addField("OS", `${process.platform.toUpperCase()} ${process.arch}`, true)
        .addField("RSS", `${parseFloat(usedram).toFixed(2)}MB`, true)
        .addField("Heap", `${parseFloat(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB`, true)
        .addField("Invite", "[Invite Me!](https://discordapp.com/api/oauth2/authorize?client_id=479842822644695042&permissions=8&scope=bot)", true)
        .addField("Node Version", pckg.engines.node, true)
        .addField("Bot Version", pckg.version, true)
        .addField("Uptime", `${hours} ${(hours > 1 || hours == 0) ? `hrs` : `hr`}, ${minutes} ${(minutes > 1 || minutes == 0) ? `mins` : `min`} and ${parseFloat(seconds).toFixed(0)} ${(seconds > 1 || seconds == 0) ? `secs` : `sec`}`)
        .setFooter(`${config.prefix}${this.help.name} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
    return message.channel.send(botEmbed).catch(O_o => {});
}

module.exports.help = {
    name: "bot",
    usage: false,
    category: "general",
    description: "View the bot statistics."
}