const config = module.require(`../config.json`);
const Discord = module.require(`discord.js`);
const moment = module.require(`moment-timezone`);

module.exports.run = async (bot, message, args)  => {
    if (message.guild.id != config.officialguildID) {
        await message.channel.send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notofficial}**`)
        );
        return;
    }
    
    const helpname = this.help.name;
    await message.channel.send(
        new Discord.RichEmbed()
        .setColor(`#${(config.application) ? config.colorInfo : config.colorDanger}`)
        .setTitle((config.application) ? `Message any staff online, we're hiring!` : `Sorry, we're not looking for staff yet.`)
        .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
    );
    return;
}

module.exports.help = {
    name: `apply`,
    desc: `Are we accepting any staff? :thinking:`,
    category: `general`
}