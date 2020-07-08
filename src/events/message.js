// Author: Hugovidafe <Hugo.vidal.ferre@gmail.com>
// Ayudante de Hugovidafe (c) 2020
// Created: 27/6/2020 12:30:26
// Modified: 8/7/2020 17:39:34

const { Api, version } = require('@hugovidafe/useful-api')
const { MessageEmbed } = require('discord.js')
const ISO6391 = require('iso-639-1');
const { prefix, TeamRole } = require('../database/config.json')

const roles = { applications: { ayudante: [ 'Developer', 'Team', 'User' ] }, profiles: { Developer: [ 'ayudante.*' ], Team: [ 'ayudante.Team', 'ayudante.User' ], User: [ 'ayudante.User' ] } }

module.exports = async (client, message) => {
	if (message.author.bot || message.author.system) return;

	// API / Databases
	const API = new Api({ path_langs: `${client.dirname}/database/i18n`, roles: roles, file_db: `${client.dirname}/database/users/${message.author.id}.json` });
	API.database.set('discord', message.author)

	// Prefixes
	const userPrefix = API.database.has('config.prefix')? API.database.get('config.prefix'): API.database.set('config.prefix', prefix);
	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const mentionRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`)
	const prefixRegex = userPrefix? new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(userPrefix)})\\s*`): new RegExp(`^(<@!?${client.user.id}>)\\s*`);
	var args = "";
	var prefixUsed = "";
	if (message.channel.type == "dm" && !prefixRegex.test(message.content)) {
		args = message.content.split(/ +/);
	} else if (prefixRegex.test(message.content)) {
		const [, matchedPrefix] = message.content.match(prefixRegex);
		args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
		prefixUsed = mentionRegex.test(matchedPrefix)? matchedPrefix + " ": matchedPrefix;
	} else return;

	// LANGS
	const i18n = require('fs').readdirSync(`${client.dirname}/database/i18n`).filter(file => file.endsWith('.json') && !file.startsWith('.'))
	const lang = i18n.map(lang => {
		const Langs = lang.substring(0, lang.lastIndexOf('.'));
		return '<' + ISO6391.getNativeName(Langs) + '/' + ISO6391.getName(Langs) + '/' + Langs + `>\n> ${prefixUsed}user config lang ` + Langs;
	}).join(`\n`);

	// Check if the bot can send messages
	if (!message.channel.type == "dm" && !message.guild.members.cache.get(client.user.id).hasPermission('SEND_MESSAGES')) message.author.send(embed
		.setColor('#be1931')
		.setTitle(':exclamation: ' + API.langs.__l('onMessage.noLang').join("\n:exclamation: "))
		.setDescription('```md\n# ' + API.langs.__l('onMessage.noSend.description.one', { permRequired: 'SEND_MESSAGES' }).join("\n# ") + '\n\n' + lang + '```')
		.setTimestamp()
		.setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
	);

	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!API.database.get('config.lang')) API.database.set('config.rol', 'es')

	// if (!API.database.get('config.lang') && (!message.content.includes("user config lang") && !message.content.includes("eval"))) return message.channel.send(new MessageEmbed()
	// 	.setColor('#be1931')
	// 	.setTitle(':exclamation: ' + API.langs.__l('onMessage.noLang.title').join("\n:exclamation: "))
	// 	.setDescription('```md\n# ' + API.langs.__l('onMessage.noLang.description').join("\n# ") + '\n\n' + lang + '```')
	// 	.setTimestamp()
	// 	.setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
	// )

	if (API.database.get('config.lang')) {
		API.langs.setLocale(API.database.get('config.lang'));
		message.channel.send(new MessageEmbed()
			.setColor('#be1931')
			.setTitle(':exclamation: ' + API.langs.__('onMessage.inDeveloping.title', client.user.username))
			.setDescription(API.langs.__('onMessage.inDeveloping.description'))
			.setTimestamp()
			.setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
		).then(message => setTimeout(function() {
			message.delete()
		}, 8000))
	}

	if (!command) return message.channel.send(new MessageEmbed()
		.setColor('#be1931')
		.setTitle(':exclamation: ' + API.langs.__('onMessage.noCommand'))
		.setDescription('**' + API.langs.__('commands.help.embed.fields.allCommands', { help: prefixUsed }) + '**')
		.setTimestamp()
		.setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
	)

	// GET ROLE OF THE MEMBER
	var roleMember = 'User';
	if (message.member.roles.cache.has(TeamRole)) roleMember = 'Team';
	if (message.author.id == client.keys.discord.owner) roleMember = 'Developer';

	if (command.perm) {
		if (!API.roles.getProfile(roleMember).hasRoles('ayudante.' + command.perm) ) return message.channel.send(new MessageEmbed()
			.setColor('#be1931')
			.setTitle(':exclamation: ' + API.langs.__('onMessage.noPerms.title', command.name))
			.setDescription(API.langs.__('onMessage.noPerms.description', { userPerm: API.langs.__('users.roles.' + roleMember + '.one'), commandPerm: API.langs.__('users.roles.' + command.perm + '.one') }))
			.setTimestamp()
			.setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
		);
	}

	if (command.args && !args.length) {
		if (command.usage) {
			return message.channel.send(new MessageEmbed()
			.setColor('#be1931')
			.setTitle(':exclamation: ' + API.langs.__('onMessage.noArgs.title'))
			.setDescription(API.langs.__('onMessage.noArgs.usage', `${command.name} ${command.usage}`))
			.setTimestamp()
			.setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL()))
		}
		return message.channel.send(new MessageEmbed()
			.setColor('#be1931')
			.setTitle(':exclamation: ' + API.langs.__('onMessage.noArgs.title'))
			.setDescription(API.langs.__('onMessage.noArgs.noUsage'))
			.setTimestamp()
			.setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
		);
	}

	try {
		command.execute(message, new MessageEmbed(), {
			client, args, API, prefixUsed, version
		});
	} catch (error) {
		console.error(error);
		message.channel.send(new MessageEmbed()
			.setColor('#be1931')
			.setTitle(':exclamation: ' + API.langs.__('onMessage.commandError.title', command.name))
			.setDescription(API.langs.__('onMessage.commandError.description'))
			.setTimestamp()
			.setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
		);
	}
}