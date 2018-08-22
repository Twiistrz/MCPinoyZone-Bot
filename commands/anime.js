const Discord = module.require("discord.js");
const Kaori = module.require("kaori");
const noNSFW = [198684730978336769];
const sites = [`safebooru`,`lolibooru`,`danbooru`,`konachan`,`yandere`,`gelbooru`,`rule34`,`tbib`,`xbooru`,`youhateus`]
const kaori = new Kaori();

module.exports.execute = async (bot, message, content, config, moment, request) => {
    if (message.author.id === 198684730978336769) return;
    let helpName = this.help.name;
    let helpUsage = this.help.usage;
    let helpDescription = this.help.description;
    if (message.guild.id === config.officialGuildID && message.channel.id != config.nsfwChannelID && message.channel.id != config.testChannelID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`Use this command in <#${config.nsfwChannelID}>`)
            .setFooter(`${config.prefix}${helpName} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
        await message.author.send(errorEmbed).catch(O_o => {});
        return;
    }

    let searchingEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setDescription("Generating random picture. . .");
    let searching = await message.channel.send(searchingEmbed);

    if (content[0]) {
        let site = content[0].toLowerCase();
        if (sites.some(s => site.includes(s))) {
            let tag = content.slice(1).join(' ').replace(/\s+/g, ' ');
            kaori.search(site, {tags: [tag], limit: 1, random: true})
            .then(async (image) => {         
                var rating, color;
                switch (image[0].common.rating) {
                    case "s":
                        rating = "Safe";
                        color = config.colorSuccess;
                        break;
                    case "q":
                        rating = "Questionable";
                        color = config.colorInfo;
                        break;
                    case "e":
                        rating = "Explicit";
                        color = config.colorDanger;
                        break;
                    default:
                        rating = "None";
                        color = config.colorInfo;
                }

                let animeEmbed = new Discord.RichEmbed()
                    .setColor(`#${color}`)
                    .setTitle(`${site.replace(/^\w/, c => c.toUpperCase())} • ${rating}${(tag) ? ` • ${tag}` : ''}`)
                    .setImage(image[0].common.fileURL)
                    .setFooter(`${config.prefix}${helpName} [${site}]${(tag) ? ' <' + tag + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
                await message.channel.send(animeEmbed)
                .then(() => searching.delete())
                .catch(O_o => {});
            }).catch(async () => {
                let errorEmbed = new Discord.RichEmbed()
                    .setColor(`#${config.colorDanger}`)
                    .setDescription(`**${tag} can't be found in ${site}.**`)
                    .setFooter(`${config.prefix}${helpName} ${(tag) ? ' <' + tag + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`)
                await message.channel.send(errorEmbed)
                .then(() => searching.delete())
                .catch(O_o => {});                
            });
            return;
        }
    }

    let tag = content.join(' ').replace(/\s+/g, ' ');
    let found = false;
    for (let i = 0; i < sites.length; i++) {
        if (found) break; 
        await kaori.search(sites[i], {tags: [tag], limit: 1, random: true})
        .then(async (image) => {
            if (image[0].status) {
                found = true;
                var rating, color;
                switch (image[0].common.rating) {
                    case "s":
                        rating = "Safe";
                        color = config.colorSuccess;
                        break;
                    case "q":
                        rating = "Questionable";
                        color = config.colorInfo;
                        break;
                    case "e":
                        rating = "Explicit";
                        color = config.colorDanger;
                        break;
                    default:
                        rating = "None";
                        color = config.colorInfo;
                }
                
                let animeEmbed = new Discord.RichEmbed()
                    .setColor(`#${color}`)
                    .setTitle(`${sites[i].replace(/^\w/, c => c.toUpperCase())} • ${rating}${(tag) ? ` • ${tag}` : ''}`)
                    .setImage(image[0].common.fileURL)
                    .setFooter(`${config.prefix}${helpName} ${(tag) ? ' <' + tag + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`);
                await message.channel.send(animeEmbed)
                .then(() => searching.delete())
                .catch(O_o => {});
            }
        }).catch(O_o => {});
    }

    if (!found) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**${tag} can't be found in any sites.**`)
            .setFooter(`${config.prefix}${helpName} ${(tag) ? ' <' + tag + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeFormat)}`)
        await message.channel.send(errorEmbed)
        .then(() => searching.delete())
        .catch(O_o => {});    
    }
    return;
}

module.exports.help = {
    name: "anime",
    usage: "<site|tag> <tag>",
    category: "general",
    description: "Send random anime picture."
}