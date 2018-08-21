const moment = module.require(`moment-timezone`);
const config = module.require(`./config.json`);
const Discord = module.require(`discord.js`);
const request = module.require(`request`);
const fs = module.require(`fs`);
const bot = new Discord.Client();
const swearWords = [`homo`,`fuk`,`bakla`,`gago`,`tangina`,`puta`,`fuck`,`darn`,`shit`,`dick`,`asshole`,`bastard`,`bitch`,`damn`,`cunt`,`noob`];

bot.commands = new Discord.Collection();

fs.readdir(`./commands/`, (err, files) => {
	if (err) return;

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
		console.log(`No commands to load!`);
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);
	jsfiles.forEach((f, i) => {
		let props = module.require(`./commands/${f}`);
		console.log(`${i + 1}: ${f} loaded`);
		bot.commands.set(props.help.name, props);
	});
});

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
	if (message.author.bot) return;
	if (message.channel.type === `dm`) return;

	if (swearWords.some(word => message.content.includes(word)) && message.guild.id === config.officialguildID) {
		console.log(`Deleted: ${message.cleanContent}`);
		bot.channels.get(config.logchannelID).send(
			new Discord.RichEmbed()
			.setColor(`#${config.colorDanger}`)
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setDescription(`**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.cleanContent}`)
			.addField(`Reason`, `Swearing`)
			.setFooter(`ID: ${message.author.id} • ${moment.tz(message.createdTimestamp, config.timezone).format(config.timeformat)}`)
		);
		return;
	}
});

bot.on(`messageUpdate`, async (oldMessage, message) => {
	if (swearWords.some(word => message.content.includes(word))) {
		await message.delete().catch(() => {});
		return;
	}
});

bot.on(`message`, async (message) => {
	if (message.author.bot) return;
	if (message.channel.type === `dm`) return;
	if (swearWords.some(word => message.content.includes(word))) {
		await message.delete().catch(() => {});
		return;
	}

	if (!message.content.startsWith(config.prefix)) return;
	
	let args = message.content.split(` `);
	let command = args[0];
	let cmd = bot.commands.get(command.slice(config.prefix.length))
	
	if (cmd) cmd.run(bot, message, args);
});

bot.login(process.env.TOKEN);