// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/05/2021 22:03

const locale = require('../modules/locale');
const { MessageEmbed } = require('discord.js');

module.exports = (client, instance) => {
  // client.on('message', (message) => {
  //   const { channel } = message;
  //   channel
  //     .send(
  //       new MessageEmbed()
  //         .setColor('#be1931')
  //         .setTitle(
  //           ':exclamation: ' +
  //             locale.__('onMessage.inDeveloping.title', client.user.username)
  //         )
  //         .setDescription(locale.__('onMessage.inDeveloping.description'))
  //         .setTimestamp()
  //         .setFooter(
  //           '© ' + new Date().getFullYear() + ' ' + client.user.username,
  //           client.user.displayAvatarURL()
  //         )
  //     )
  //     .then((message) =>
  //       setTimeout(function () {
  //         message.delete();
  //       }, 8000)
  //     );
  // });
};

module.exports.config = {
  displayName: 'Development Message',
  dbName: 'DEVELOPMENT MESSAGE',
};
