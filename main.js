const Discord = module.require("discord.js");
const Request = module.require("request");
const Moment = module.require("moment-timezone");
const fs = module.require("fs");
const swearWords = [`homo`,`fuk`,`bakla`,`gago`,`tangina`,`puta`,`fuck`,`darn`,`shit`,`dick`,`asshole`,`bastard`,`bitch`,`damn`,`cunt`,`noob`];
const fileConfig = module.require("./config.json");
const fileCommand = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

console.log(`>> Loading ${fileCommand.length} commands`);
for (const file of fileCommand) {
    const command = module.require(`./commands/${file}`);
    bot.commands.set(command.help.name, command);
}

bot.on("ready", () => {
    Moment.tz.setDefault(fileConfig.timezone);
    bot.user.setPresence({ game: { name: `${fileConfig.prefix}help • ${fileConfig.ip}`, type: 0 } }).catch(O_o => {});
    console.log(`>> Logged in as ${bot.user.tag}`);
});

bot.on("guildCreate", async (guild) => {
    console.log(`New guild joined: ${guild.name} (ID: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", async (guild) => {
    console.log(`I have been removed from: ${guild.name} (ID: ${guild.id})`);
});

bot.on("messageDelete", async (message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    if (message.guild.id === fileConfig.officialGuildID && swearWords.some(word => message.content.includes(word))) {
        let logEmbed = new Discord.RichEmbed()
            .setColor(`#${fileConfig.colorDanger}`)
            .setDescription(`**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.cleanContent}`)
            .addField("Reason", "Swearing")
            .setFooter(`ID: ${message.author.id} •  ${Moment.tz(message.createdTimestamp, fileConfig.timezone).format(fileConfig.timeFormat)}`);
        await bot.channel.get(fileConfig.logChannelID).send(logEmbed).catch(O_o => {});
        return;
    }
});

bot.on("messageUpdate", async (oldMessage, newMessage) => {
    if (newMessage.author.id || newMessage.channel.type === "dm") return;
    if (swearWords.some(word => newMessage.content.includes(word))) {
        await newMessage.delete().catch(O_o => {});
        return;
    }
});

bot.on("message", async (message) => {
    if (swearWords.some(word => message.content.includes(word))) {
        await message.delete().catch(O_o => {});
        return;
    }

    if (!message.content.startsWith(fileConfig.prefix) || message.author.bot || message.channel.type === "dm") return;
    const content = message.content.slice(fileConfig.prefix.length).split(' ');
    const command = bot.commands.get(content[0].toLowerCase());
    if (command) command.execute(bot, message, content.slice(1), fileConfig, Moment, Request);
});

bot.login(process.env.TOKEN).catch(O_o => {});