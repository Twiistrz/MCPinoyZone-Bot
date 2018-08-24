const Discord = module.require("discord.js");
const ranksName = ["servant","peasant","squire","knight","noble","regent","warlord","champion","legend","emperor"];
const ranksPerm = [
    "\n»Help\n»Helpop\n»Spawn\n»RTP (Random Teleport)\n»Factions (Main Commands|Top|Chat)\n»Player Shop (Open|Create)\n»Custom Enchantments (Access|Tinker|Blacksmit|Info)\n»Custom Enchantments Limit 1\n»Jobs Limit 1\n»Lockette or LWC (Chest Protection)\n»mcMMO Ability Use\n»mcMMO Redeem\n»Pay\n»Rules\n»Balance\n»Delete Home\n»Mail\n»Motd (Message of the day)\n»Send Private Message\n»Check the realname of Nick Player\n»TPA\n»TPAccept\n»TPAHere\n»TPDeny\n»Warps (?)\n»Sign use of (Disposal|Repair)\n»Rankup\n»Spawner Place (Not Break)",
    "\n»Inherit Servant\n»Custom Enchantments Limit 2\n»Player Vaults Limit 1\n»Set home +1\n»Sign create Disposal",
    "\n»Inherit Peasant\n»Player Shop (Buy Slot|Rent)\n»Enderchest Command",
    "\n»Inherit Squire\n»Custom Enchantments Limit 3\n»Player Vaults Limit 2\n»Nick Command\n»Workbench Command\n»Set home +1",
    "\n»Inherit Knight\n»Jobs Max 3\n»Back Command\n»Condensed Command\n»Mine Spawners (Silk Touch)\n»Kit Noble",
    "\n»Inherit Noble\n»Custom Enchantments Limit 4\n»Player Vaults Limit 3\n»Back on death\n»Kit Regent\n»Set home +1",
    "\n»Inherit Regent\n»Custom Enchantments Limit 5\n»Keep XP on death\n»Nick color\n»Kit Warlord",
    "\n»Kit Champion (Gkitz)\n»Can join the server even its full\n»Jobs Max 5\n»Jobs boost all 1.4\n»Player Vaults Limit 5\n»Custom Enchantments Limit 6\n»Can chat with color\n»Nick with (Color|Format|Magic)\n»Fly\n»Set home limit 5 (does not stack with normal ranks)\n»Mine Spawner (Silk Touch)",
    "\n»Inherit Champion\n»Cannot use kit of Champion\n»Kit Legend (Gkitz)\n»Jobs boost all 1.7\n»Player Vaults Limit 6\n»Custom Enchantments Limit 7\n»Feed\n»Heal\n»Ignore\n»Near (Check players on your surroundings)\n»Can chat with format and magic\n»Set home limit 8\n»Can create a sign with color text",
    "\n»Inherit Legend\n»Cannot use kit of Legend\n»Kit Emperor (Gkitz)\n»Jobs boost all 2.0\n»Player Vaults Legend 7\n»Custom Enchantments Limit 8\n»Jobs Max 8\n»Feed and heal other\n»Set home limit 10\n»Can create a sign with color magic and format"
];

module.exports.execute = async (bot, message, content, config, moment, request) => {
    let errorEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorDanger}`)
        .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
    let usageEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setTitle(`Correct usage for ${config.prefix}${this.help.name} command.`)
        .setDescription(`\`${config.prefix}${this.help.name} ${this.help.usage}\` - *${this.help.description}*`);
    let ranksEmbed = new Discord.RichEmbed()
        .setColor(`#${config.colorInfo}`)
        .setDescription(`**In-Game Rankup**\n**Servant** » Default\n**Peasant** » $650k\n**Squire** » $1.5M\n**Knight** » $3.5M\n**Noble** » $7M\n**Regent** » $15M\n**Warlord** » $25M\n\n**Permanent Ranks (Donator)**\n**Champion** » 9.99 USD\n**Legend** » 14.99 USD\n**Emperor** » 34.99 USD`);

    if (message.guild.id != config.officialGuildID) {
        let errorEmbed = new Discord.RichEmbed()
            .setColor(`#${config.colorDanger}`)
            .setDescription(`**<@${message.author.id}>, ${config.notOfficial}**`);
        await message.channel.send(errorEmbed).catch(O_o => {});
        return;
    }

    if (content[0]) {
        let rankFound = false;
        let rank = content[0].toLowerCase();
        for (let i = 0; i < ranksName.length; i++) {
            if (rank === ranksName[i]) {
                rankFound = true;
                let ranksPermEmbed = new Discord.RichEmbed()
                    .setColor(`#${config.colorInfo}`)
                    .setDescription(`**${rank.replace(/^\w/, c => c.toUpperCase())} Commands/Permissions**\n${ranksPerm[i]}`);
                await message.channel.send(ranksPermEmbed).catch(O_o => {});
                return;
            }
        }

        if (!rankFound) {
            await message.channel.send(usageEmbed).catch(O_o => {});
            return;
        }
    }

    await message.channel.send(ranksEmbed).catch(O_o => {});
    return;
}

module.exports.help = {
    name: "ranks",
    usage: ["<rank>"],
    category: "official",
    description: "Display available ranks in-game or view the commands/permissions."
}