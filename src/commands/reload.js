// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 12:30:11

const locale = require('../modules/locale');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'reload',
  aliases: ['restart', 'rl'],
  category: 'Administración',
  description: 'Reinicia el bot',
  hidden: true,
  ownerOnly: true,
  async callback({ message, client, interaction }) {
    await client.users.cache.get('324449297951096834').send(
      new MessageEmbed()
        .setColor('#be1931')
        .setTitle(':exclamation: ' + locale.__('commands.reload.embed.title'))
        .setDescription(
          locale.__(
            'commands.reload.embed.description',
            message.author.tag + ` (${message.author.id})`
          )
        )
        .setTimestamp()
        .setFooter(
          '© ' + new Date().getFullYear() + ' ' + client.user.username,
          client.user.displayAvatarURL()
        )
    );
    await client.destroy();
    return process.exit(1);
  },
};
