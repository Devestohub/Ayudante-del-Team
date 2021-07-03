// Author: Hugovidafe-OSS <hugo.vidal.ferre@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/17/2021 16:13

const locale = require('../modules/def_locale');
const { MessageEmbed } = require('discord.js');

const anilist = require('../modules/anilist');
const { gql } = require('graphql-request');

const userQuery = (userName) => gql`
	{
		User(name: "${userName}") {
			id
			name
			about
			avatar {
				large
			}
			statistics {
				anime {
					count
					meanScore
					minutesWatched
					episodesWatched
				}
				manga {
					count
					meanScore
					chaptersRead
					volumesRead
				}
			}
			unreadNotificationCount
			siteUrl
		}
	}
`;

const animesListQuery = (userId, sort) => gql`
	{
		MediaListCollection(userId: ${userId}, type: ANIME, sort: ${sort}) {
			lists {
				name
				entries {
					progress
					status
					notes
					media {
						title {
							userPreferred
						}
						format
						status
						episodes
						siteUrl
					}
				}
			}
		}
	}
`;

const emoji = (text) => {
  switch (text) {
    case 'CURRENT':
      return '👓';
    case 'PLANNING':
      return '⌛';
    case 'COMPLETED':
      return ':ballot_box_with_check:';
    case 'DROPPED':
      return '🚮';
    case 'PAUSED':
      return '⏸';
    case 'REPEATING':
      return '🔁';

    default:
      return '❓';
  }
};

module.exports = {
  name: 'anilist',
  aliases: ['al'],
  category: 'Entretenimiento',
  expectedArgs: '<Anilist username> [Anilist list]',
  description: 'Anilist',
  minArgs: 1,
  maxArgs: 3,
  hidden: true,
  async callback({ message, client, args }) {
    var episodesCompleted = 0;
    var totalEpisodes = 0;

    const getUser = (await anilist(userQuery(args[0]))).User;
    const getAnimesList = (
      await anilist(animesListQuery(getUser.id, 'UPDATED_TIME_DESC'))
    ).MediaListCollection;

    const argAnimeListName = args[1] || 'AnimeChallenge';

    const getAnimeList = getAnimesList.lists.filter(
      (list) => list.name.toLowerCase() == argAnimeListName.toLowerCase()
    )[0];
    const getAnimeListEntries = getAnimeList.entries;
    const getEntriesByStatus = (status) =>
      getAnimeListEntries.filter((entry) => entry.status == status);

    const animeProgress =
      getEntriesByStatus('COMPLETED').length +
      getEntriesByStatus('CURRENT').length;

    getAnimeListEntries.forEach(
      (entry) => (episodesCompleted += entry.progress)
    );

    getAnimeListEntries.forEach(
      (entry) => (totalEpisodes += entry.media.episodes)
    );

    const lastEntries = getAnimeListEntries
      .slice(0, 8)
      .map(
        (entry) =>
          `${emoji(entry.status)} **${entry.media.title.userPreferred}** (${
            entry.media.format
          })\n${entry.progress}${
            entry.media.episodes ? `/${entry.media.episodes}` : ''
          } - ${entry.media.siteUrl}`
      )
      .join('\n');

    const upcomingEntries =
      getEntriesByStatus('PLANNING')
        .sort((a, b) =>
          a.media.title.userPreferred > b.media.title.userPreferred
            ? 1
            : b.media.title.userPreferred > a.media.title.userPreferred
            ? -1
            : 0
        )
        .slice(0, 8)
        .map(
          (entry) =>
            `⌛ **${entry.media.title.userPreferred}** (${entry.media.format})\n${entry.progress}/${entry.media.episodes} - ${entry.media.siteUrl}`
        )
        .join('\n') +
      `\n**Plus ${getEntriesByStatus('PLANNING').length - 8}...**`;

    const reply = new MessageEmbed()
      .setColor('#5865F2')
      .setAuthor(getUser.name, getUser.avatar.large, getUser.siteUrl)
      .setTitle(`**${getAnimeList.name}**`)
      .setURL(
        `${getUser.siteUrl}/animelist/${encodeURIComponent(argAnimeListName)}`
      )
      .setThumbnail(getUser.avatar.large)
      .addField(
        `**${locale.__('commands.reto.embed.fields.status.name')}**`,
        locale.__('commands.reto.embed.fields.status.value', {
          Completed: getEntriesByStatus('COMPLETED').length,
          Current: getEntriesByStatus('CURRENT').length,
          Planning: getEntriesByStatus('PLANNING').length,
          AnimeProgress: animeProgress,
          AnimeTotal: getAnimeListEntries.length,
          EpisodesProgress: episodesCompleted,
          EpisodesTotal: totalEpisodes,
          EpisodesPerCent: ((episodesCompleted / totalEpisodes) * 100).toFixed(
            0
          ),
        }),
        true
      );

    const ddbb = JSON.parse(
      getAnimeListEntries.sort((a, b) =>
        a.media.title.userPreferred > b.media.title.userPreferred
          ? 1
          : b.media.title.userPreferred > a.media.title.userPreferred
          ? -1
          : 0
      )[0].notes
    );

    if (ddbb != null) {
      const dateStarted = ddbb.start;
      const timeToFinish = ddbb.time;
      const dateToFinish = new Date(dateStarted + timeToFinish);
      const diffDates = dateToFinish - new Date();
      reply
        .addField(
          `**${locale.__('commands.reto.embed.fields.calendar.name')}**`,
          `Established time: 2 years!\nStarted: ${new Date(
            dateStarted
          ).toLocaleString()}!\nEnd before ${dateToFinish.toLocaleString()}\nRemaining: ${require('../modules/moment')(
            diffDates
          )}`,
          true
        )
        .addField('**Reward**', `💰 ${ddbb.reward}`, true);
    }

    reply
      .addField('**Last Updates**', lastEntries)
      .addField(
        '**Upcoming to watch**',
        upcomingEntries ? upcomingEntries : 'No anime left to watch'
      )
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
