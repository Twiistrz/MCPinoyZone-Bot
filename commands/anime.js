const config = module.require(`../config.json`);
const Discord = module.require(`discord.js`);
const Kaori = module.require(`kaori`);
const moment = module.require(`moment-timezone`);
const kaori = new Kaori();
const sites = [`safebooru`,`lolibooru`,`booru`,`danbooru`,`konachan`,`yandere`,`gelbooru`,`rule34`,`tbib`,`xbooru`,`youhateus`]

module.exports.run = async (bot, message, args)  => {
    if (message.author.id === 198684730978336769) return;
    const helpname = this.help.name;
    if (message.guild.id === config.officialguildID) {
        if (message.channel.id != config.nsfwchannelID && message.channel.id != config.testchannelID) {
            await message.author.send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setDescription(`Use this command in <#${config.nsfwchannelID}>`)
                .setFooter(`${config.prefix}${helpname} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            );
            return;
        }
    }

    let keyword = args.slice(1);
    if (keyword[0]) {
        let site = keyword[0].toLowerCase();
        if (sites.indexOf(site) > -1) {
            keyword = args.slice(2).join(` `);
            kaori.search(site, { tags: [keyword], limit: 1, random: true })
            .then(async (images) => await message.channel
                .send(
                    new Discord.RichEmbed()
                    .setColor(`#${config.colorInfo}`)
                    .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${site}.**`)
                    .setImage(images[0].common.fileURL)
                    .setFooter(`${config.prefix}${helpname} [${site}]${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                )
                .then(() => console.log(`[${site}] ${message.author.tag}: ${images[0].common.fileURL}`))
            )
            .catch(async () => await message.channel
                .send(
                    new Discord.RichEmbed()
                    .setColor(`#${config.colorDanger}`)
                    .setDescription(`**${keyword} can't be found in ${site}**`)
                    .setFooter(`${config.prefix}${helpname} [${site}]${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                )
            );
            return;
        }
    }
    
    keyword = keyword.join(' ');
    kaori.search(sites[0], { tags: [keyword], limit: 1, random: true })
    .then(async (images) => await message.channel
        .send(
            new Discord.RichEmbed()
            .setColor(`#${config.colorInfo}`)
            .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[0]}.**`)
            .setImage(images[0].common.fileURL)
            .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
        )
        .then(() => console.log(`[${sites[0]}] ${message.author.tag}: ${images[0].common.fileURL}`))
    ).catch(() =>
        kaori.search(sites[1], { tags: [keyword], limit: 1, random: true })
        .then(async (images) => await message.channel
            .send(
                new Discord.RichEmbed()
                .setColor(`#${config.colorInfo}`)
                .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[1]}.**`)
                .setImage(images[0].common.fileURL)
                .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
            )
            .then(() => console.log(`[${sites[1]}] ${message.author.tag}: ${images[0].common.fileURL}`))
        ).catch(() =>
            kaori.search(sites[2], { tags: [keyword], limit: 1, random: true })
            .then(async (images) => await message.channel
                .send(
                    new Discord.RichEmbed()
                    .setColor(`#${config.colorInfo}`)
                    .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[2]}.**`)
                    .setImage(images[0].common.fileURL)
                    .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                )
                .then(() => console.log(`[${sites[2]}] ${message.author.tag}: ${images[0].common.fileURL}`))
            ).catch(() =>
                kaori.search(sites[3], { tags: [keyword], limit: 1, random: true })
                .then(async (images) => await message.channel
                    .send(
                        new Discord.RichEmbed()
                        .setColor(`#${config.colorInfo}`)
                        .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[3]}.**`)
                        .setImage(images[0].common.fileURL)
                        .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                    )
                    .then(() => console.log(`[${sites[3]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                ).catch(() =>
                    kaori.search(sites[4], { tags: [keyword], limit: 1, random: true })
                    .then(async (images) => await message.channel
                        .send(
                            new Discord.RichEmbed()
                            .setColor(`#${config.colorInfo}`)
                            .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[4]}.**`)
                            .setImage(images[0].common.fileURL)
                            .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                        )
                        .then(() => console.log(`[${sites[4]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                    ).catch(() =>
                        kaori.search(sites[5], { tags: [keyword], limit: 1, random: true })
                        .then(async (images) => await message.channel
                            .send(
                                new Discord.RichEmbed()
                                .setColor(`#${config.colorInfo}`)
                                .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[5]}.**`)
                                .setImage(images[0].common.fileURL)
                                .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                            )
                            .then(() => console.log(`[${sites[5]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                        ).catch(() =>
                            kaori.search(sites[6], { tags: [keyword], limit: 1, random: true })
                            .then(async (images) => await message.channel
                                .send(
                                    new Discord.RichEmbed()
                                    .setColor(`#${config.colorInfo}`)
                                    .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[6]}.**`)
                                    .setImage(images[0].common.fileURL)
                                    .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                )
                                .then(() => console.log(`[${sites[6]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                            ).catch(() =>
                                kaori.search(sites[7], { tags: [keyword], limit: 1, random: true })
                                .then(async (images) => await message.channel
                                    .send(
                                        new Discord.RichEmbed()
                                        .setColor(`#${config.colorInfo}`)
                                        .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[7]}.**`)
                                        .setImage(images[0].common.fileURL)
                                        .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                    )
                                    .then(() => console.log(`[${sites[7]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                                ).catch(() =>
                                    kaori.search(sites[8], { tags: [keyword], limit: 1, random: true })
                                    .then(async (images) => await message.channel
                                        .send(
                                            new Discord.RichEmbed()
                                            .setColor(`#${config.colorInfo}`)
                                            .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[8]}.**`)
                                            .setImage(images[0].common.fileURL)
                                            .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                        )
                                        .then(() => console.log(`[${sites[8]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                                    ).catch(() =>
                                        kaori.search(sites[9], { tags: [keyword], limit: 1, random: true })
                                        .then(async (images) => await message.channel
                                            .send(
                                                new Discord.RichEmbed()
                                                .setColor(`#${config.colorInfo}`)
                                                .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[9]}.**`)
                                                .setImage(images[0].common.fileURL)
                                                .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                            )
                                            .then(() => console.log(`[${sites[9]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                                        ).catch(() =>
                                            kaori.search(sites[10], { tags: [keyword], limit: 1, random: true })
                                            .then(async (images) => await message.channel
                                                .send(
                                                    new Discord.RichEmbed()
                                                    .setColor(`#${config.colorInfo}`)
                                                    .setDescription(`**Generated random picture${(keyword) ? ' of ' + keyword + ' ' : ' '}from ${sites[10]}.**`)
                                                    .setImage(images[0].common.fileURL)
                                                    .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                                )
                                                .then(() => console.log(`[${sites[10]}] ${message.author.tag}: ${images[0].common.fileURL}`))
                                            ).catch(async () => await message.channel
                                                .send(
                                                    new Discord.RichEmbed()
                                                    .setColor(`#${config.colorDanger}`)
                                                    .setDescription(`**${keyword} can't be found in any sites.**`)
                                                    .setFooter(`${config.prefix}${helpname} ${(keyword) ? ' <' + keyword + '>' : ''} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
    return;
}

module.exports.help = {
    name: `anime`,
    desc: `Send random anime picture.`,
    category: `fun`
}