const moment = module.require(`moment-timezone`);
const config = module.require(`./config.json`);
const Discord = module.require(`discord.js`);
const request = module.require(`request`);
const fs = module.require(`fs`);
const bot = new Discord.Client();
const swearWords = [`homo`,`fuk`,`bakla`,`gago`,`tangina`,`puta`,`fuck`,`darn`,`shit`,`dick`,`asshole`,`bastard`,`bitch`,`damn`,`cunt`,`noob`];
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

bot.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = module.require(`./commands/${file}`);
	bot.commands.set(command.help.name, command);
}

bot.on(`ready`, () => {
	moment.tz.setDefault(config.timezone);
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setPresence({
		game: {
			name: `${config.prefix}help | Serving ${bot.guilds.size} servers`,
			type: 3
		}
	});
});

bot.on(`guildCreate`, async (guild) => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	bot.user.setPresence({
		game: {
			name: `${config.prefix}help | Serving ${bot.guilds.size} servers`,
			type: 3
		}
	});
});

bot.on(`guildDelete`, async (guild) => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	bot.user.setPresence({
		game: {
			name: `${config.prefix}help | Serving ${bot.guilds.size} servers`,
			type: 3
		}
	});
});

bot.on(`messageDelete`, async (message) => {
	if (message.author.bot || message.channel.type === `dm`) return;

	if (swearWords.some(word => message.content.includes(word)) && message.guild.id === config.officialguildID) {
		console.log(`Deleted: ${message.cleanContent}`);
		bot.channels.get(config.logchannelID).send(
			new Discord.RichEmbed()
			.setColor(`#${config.colorDanger}`)
			.setDescription(`**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.cleanContent}`)
			.addField(`Reason`, `Swearing`)
			.setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
		);
		return;
	}
});

bot.on(`messageUpdate`, async (oldMessage, message) => {
	if (message.author.bot || message.channel.type === `dm`) return;

	if (swearWords.some(word => message.content.includes(word))) {
		await message.delete().catch(() => {});
		return;
	}
});

bot.on(`message`, async (message) => {
	if (swearWords.some(word => message.content.includes(word))) {
		await message.delete().catch(err => console.log(err));
		return;	
	}

	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === `dm`) return;

	const arg = message.content.slice(config.prefix.length).split(` `);
	const cmd = bot.commands.get(arg[0]);
	if (cmd) cmd.run(bot, message, arg.slice(1));
});

bot.login(process.env.TOKEN);