// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/17/2021 16:13

const { MessageEmbed } = require('discord.js');
const capitalize = require('../utils/capitalize');

const anilist = require('../modules/anilist');
const { gql } = require('graphql-request');

const query = gql`
	{
		MediaListCollection(userId: 686048, type: ANIME, sort: UPDATED_TIME_DESC) {
			lists {
				name
				isCustomList
				entries {
					id
					progress
					status
					media {
						title {
							userPreferred
						}
						format
						episodes
						siteUrl
					}
					user {
						avatar {
							large
						}
					}
				}
			}
		}
	}
`;

module.exports = {
	name: 'reto',
	category: 'Administración',
	description: 'Reto de Anilist',
	permissions: ['ADMINISTRATOR'],
	hidden: true,
	async callback({ message, client }) {
		const response = await anilist(query);

		if (response.error) return response;

		const data = response.MediaListCollection;
		const list = data.lists.filter((list) => list.name == 'Reto 200 animes')[0];
		const entries = list.entries;
		const status = (status) =>
			entries.filter((entry) => entry.status == status);

		const lastEntries = entries.slice(0, 8);
		const lastUpdates = (array) => {
			const newArr = [];
			array.forEach((entry) =>
				newArr.push(
					`[${capitalize(entry.status)}] **${
						entry.media.title.userPreferred
					}** (${entry.media.format})\n${entry.progress}/${
						entry.media.episodes
					} - ${entry.media.siteUrl}`
				)
			);
			return newArr.join('\n');
		};

		const reply = new MessageEmbed()
			.setColor('#5865F2')
			.setAuthor(
				'xXgfreecssXx',
				client.users.cache.get('689870106716536866').avatarURL(),
				'https://anilist.co/user/XxFreecssxX/'
			)
			.setTitle('**200 anime challenge**')
			.setURL(
				'https://anilist.co/user/XxFreecssxX/animelist/Reto%20200%20animes'
			)
			.setThumbnail(entries[0].user.avatar.large)
			.setDescription(
				'If the user successfully completes this challenge in the set time, the user will get his reward.'
			)
			.addField(
				'**Status**',
				`**✔ Completed**: ${status('COMPLETED').length}\n**👓 Watching**: ${
					status('CURRENT').length
				}\n**⌛ Planning**: ${status('PLANNING').length}\n**💫 Total**: ${
					entries.length
				}`,
				true
			)
			.addField(
				'**Calendar**',
				`Established time: 2 years!\n👌🏻 Not started yet`,
				true
			)
			.addField('**Reward**', '💰 25€', true)
			.addField('**Last Updates**', lastUpdates(lastEntries))
			// .setDescription(entries)
			.setTimestamp()
			.setFooter(
				'© ' + new Date().getFullYear() + ' ' + client.user.username,
				client.user.displayAvatarURL()
			);

		if (message) {
			message.reply(reply);
		}

		return reply;
	},
};
