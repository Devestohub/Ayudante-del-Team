// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/17/2021 16:13

const anilist = require('../modules/anilist');
const { MessageEmbed } = require('discord.js');
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
		console.log('Hi');
		const response = await anilist(query);

		if (response.error) return response;

		const data = response.MediaListCollection;
		const list = data.lists.filter((list) => list.name == 'Reto 200 animes')[0];
		const entries = list.entries;
		const status = (status) =>
			entries.filter((entry) => entry.status == status);

		console.log('🚀 ~ file: reto.js ~ line 44 ~ callback ~ data', entries);

		const reply = new MessageEmbed()
			.setColor('#5865F2')
			.setTitle('Reto 200 animes')
			.addField(
				'Completed',
				`${status('COMPLETED').length} / ${entries.length}`,
				true
			)
			.addField(
				'Watching',
				`${status('CURRENT').length} / ${
					entries.length - status('COMPLETED').length
				}`,
				true
			)
			.addField(
				'Planning',
				`${status('PLANNING').length} / ${
					entries.length -
					(status('COMPLETED').length - status('CURRENT').length)
				}`,
				true
			)
			.addField('Last Updates', entries.slice(0, 5))
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
