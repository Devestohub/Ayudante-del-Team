// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/17/2021 16:13

const locale = require('../modules/def_locale');
const { MessageEmbed } = require('discord.js');

const anilist = require('../modules/anilist');
const { gql } = require('graphql-request');

const query = (userName) => gql`
	{
		MediaListCollection(userName: "${userName}", type: ANIME, sort: UPDATED_TIME_DESC) {
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
			user {
				name
				avatar {
					large
				}
				siteUrl
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
  name: 'animechallenge',
  aliases: ['ac', 'reto'],
  category: 'Entretenimiento',
  expectedArgs: '<Anilist username> [Anilist list]',
  description: 'Reto de Anilist',
  minArgs: 1,
  maxArgs: 3,
  hidden: true,
  async callback({ message, client, args }) {
    var episodesCompleted = 0;
    var totalEpisodes = 0;

    const response = await anilist(query(args[0]));

    if (response.error) return response;

    const argAnimeList = args[1] || 'AnimeChallenge';

    const data = response.MediaListCollection;
    const animeList = data.lists.filter(
      (list) => list.name.toLowerCase() == argAnimeList.toLowerCase()
    )[0];
    const entries = animeList.entries;
    const status = (status) =>
      entries.filter((entry) => entry.status == status);

    const animeProgress = status('COMPLETED').length + status('CURRENT').length;

    entries.forEach((entry) => (episodesCompleted += entry.progress));

    entries.forEach((entry) => (totalEpisodes += entry.media.episodes));

    const lastEntries = entries
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

    const upcomingEntries = status('PLANNING')
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
      .join('\n');

    const reply = new MessageEmbed()
      .setColor('#5865F2')
      .setAuthor(data.user.name, data.user.avatar.large, data.user.siteUrl)
      .setTitle(`**${animeList.name}**`)
      .setURL(
        `${data.user.siteUrl}/animelist/${encodeURIComponent(argAnimeList)}`
      )
      .setThumbnail(data.user.avatar.large)
      .addField(
        `**${locale.__('commands.reto.embed.fields.status.name')}**`,
        locale.__('commands.reto.embed.fields.status.value', {
          Completed: status('COMPLETED').length,
          Current: status('CURRENT').length,
          Planning: status('PLANNING').length,
          AnimeProgress: animeProgress,
          AnimeTotal: entries.length,
          EpisodesProgress: episodesCompleted,
          EpisodesTotal: totalEpisodes,
          EpisodesPerCent: ((episodesCompleted / totalEpisodes) * 100).toFixed(
            0
          ),
        }),
        true
      );
    const ddbb = JSON.parse(
      entries.sort((a, b) =>
        a.media.title.userPreferred > b.media.title.userPreferred
          ? 1
          : b.media.title.userPreferred > a.media.title.userPreferred
          ? -1
          : 0
      )[0].notes
    );

    if (ddbb == null) {
      const reply = new MessageEmbed();

      if (message) {
        message.reply(reply);
      }

      reply;
    } else {
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
