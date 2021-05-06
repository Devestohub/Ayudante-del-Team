// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 07/09/2020 1:31:40

const moment = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'stats',
  perm: 'Team',
  async execute(message, embed, { client, API }) {
    try {
      return message.channel.send(
        embed
          .setColor('#77b255')
          .setTitle(
            ':white_check_mark: ' + API.langs.__('commands.stats.embed.title')
          )
          .setDescription(API.langs.__('commands.stats.embed.description'))
          .setTimestamp()
          .setFooter(
            '© ' + new Date().getFullYear() + ' ' + client.user.username,
            client.user.displayAvatarURL()
          )
      );
    } catch (error) {
      return message.channel.send(
        embed
          .setColor('#be1931')
          .setTitle(
            ':exclamation: ' + API.langs.__('commands.stats.embedError.title')
          )
          .setDescription(
            API.langs.__('commands.stats.embedError.description', error)
          )
          .setTimestamp()
          .setFooter(
            '© ' + new Date().getFullYear() + ' ' + client.user.username,
            client.user.displayAvatarURL()
          )
      );
    }
  },
};
