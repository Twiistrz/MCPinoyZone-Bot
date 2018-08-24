const Discord = module.require("discord.js");
const description = "LWC is the longest-lived single block protection plugin that protects both the block itself and contents of Chests, Furnaces, and Dispensers. It can also protect any other blocks, and by default will also protect Doors (Wooden + Iron), Signs and Trap Doors.";
const commands = [
    "cprivate",
    "cpublic",
    "cdonation",
    "cpassword <password>",
    "cmodify",
    "cunlock <password>",
    "cinfo",
    "climits",
    "cremove",
    "cremoveall",
    "lwc flag <flag> <on|off>"
];
const usage = [
    "Create a private protection.",
    "Create a public protection.",
    "Create a donation chest.",
    "Create a password protected protection.",
    "Modify an existing private protection.",
    "Unlock a password protected block.",
    "View information on a protection.",
    "View the amount of protections you are allowed.",
    "Remove a protection.",
    "Remove all protections owned by the player.",
    "Change protection flags."
];
module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);

    let cmdUsage = "";
    for (let i = 0; i < commands.length; i++) {
        cmdUsage += `\`/${commands[i]}\` - *${usage[i]}*`;
        if (i != commands.length - 1) cmdUsage += `\n`;
    }

    let lwcEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setThumbnail(`https://www.spigotmc.org/data/resource_icons/2/2162.jpg?1428689943`)
        .setDescription(`${description}\n\n**Commands**\n${cmdUsage}\n\n**Flags**\nMagnet, Redstone, Auto Close, Hopper`);
    
    if (message.guild.id != config.officialGuildID) {
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }
    
    await message.channel.send(lwcEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "lwc",
    usage: false,
    category: "official",
    description: "Show available commands for LWC."
}