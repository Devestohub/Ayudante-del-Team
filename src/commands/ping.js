// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 07/11/2020 13:00:8

const { MessageEmbed } = require('discord.js');
const locale = require('../modules/def_locale');

module.exports = {
  name: 'ping',
  aliases: ['pong', 'pingpong', 'p'],
  category: 'General',
  description: 'Muestra la latencia del bot con la API de Discord',
  slash: 'both',
  callback({ client, message }) {
    const reply = new MessageEmbed()
      .setColor('#5865F2')
      .setTitle(
        ':information_source: ' + locale.__('commands.ping.embed.title')
      )
      .setDescription(
        locale.__('commands.ping.embed.description', {
          API: Math.round(client.ws.ping),
        })
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
