// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/05/2021 21:26

const moment = require('moment');
require('moment-duration-format');

module.exports = (client) => {
	const server = client.guilds.cache.get('378284847048818698');
	const sText = server.channels.cache.filter((c) => c.type == 'text').size;
	const sVoice = server.channels.cache.filter((c) => c.type == 'voice').size;
	async function changeVCName(VChannel, text) {
		const vc = client.channels.cache.get(VChannel);
		vc.edit({ name: text });
	}
	// 5 SECONDS
	setInterval(function () {
		// Number of members on the server
		changeVCName('497436073052602379', `﴿ MIEMBROS: ${server.memberCount} ﴾`);
		// Number of users on the server
		changeVCName(
			'497468883180191756',
			`﴿ USUARIOS: ${server.members.cache.filter((m) => !m.user.bot).size} ﴾`
		);
		// Number of channels on the server
		changeVCName('497469987481452564', `﴿ CANALES: ${sText + sVoice} ﴾`);
		// Number of voice channels on the server
		changeVCName('499309796059512843', `﴿ DE VOZ: ${sVoice} ﴾`);
	}, 5000);
	// 10 MINUTES
	setInterval(function () {
		// Number of bots on the server
		changeVCName(
			'497469732862033941',
			`﴿ BOTS: ${server.members.cache.filter((m) => m.user.bot).size} ﴾`
		);
		// Number of categories on the server
		changeVCName(
			'509779221850226698',
			`﴿ CATEGORÍAS: ${
				server.channels.cache.filter((c) => c.type == 'category').size
			} ﴾`
		);
		// Number of text channels on the server
		changeVCName('497470853852954635', `﴿ DE TEXTO: ${sText} ﴾`);
	}, 600000);
	// 12 HORAS
	setInterval(function () {
		// Days that the server has been created
		const days = new Date().getTime() - server.createdTimestamp;
		changeVCName(
			'496300809030467584',
			`〙Desde ${moment.duration(days, 'milliseconds').format(`d`)} días`
		);
		// Number of roles on the server
		changeVCName('510417028738318337', `﴿ ROLES: ${server.roles.cache.size} ﴾`);
	}, 43200000);
};

module.exports.config = {
	displayName: 'Bot Intervals',
	dbName: 'BOT INTERVALS',
};
