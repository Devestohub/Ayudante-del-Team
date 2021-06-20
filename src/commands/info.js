// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/28/2020 12:9:44

const locale = require('../modules/def_locale');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  aliases: ['information', 'información', 'i'],
  category: 'General',
  description: 'Muestra información del bot',
  slash: 'both',
  callback({ client, message }) {
    const duration = require('../modules/moment')(client.uptime);

    const reply = new MessageEmbed()
      .setColor('#5865F2')
      .setTitle(
        ':information_source: ' + locale.__('commands.info.embed.title')
      )
      .setDescription(locale.__('commands.info.embed.description'))
      .addFields(
        {
          name:
            '<:_gears_:529706543235465228> ' +
            locale.__('commands.info.embed.fields.versions.name'),
          value: `✭ ${locale.__('commands.info.embed.fields.versions.value', {
            botVersion: `*__${process.env.NODE_ENV} v${
              require('../../package.json').version
            }__*`,
            discordJsVersion: `*__v${require('discord.js').version}__*`,
            systemVersion: `*__${process.version}__*`,
          })}`,
          inline: true,
        },
        {
          name:
            '<:_staff_:529711058328354817> ' +
            locale.__('users.roles.Developer.one'),
          value:
            '<@324449297951096834>\nHugovidafe#2728\n`<@324449297951096834>`',
          inline: true,
        },
        {
          name: '\u200B',
          value: `**- ${locale.__(
            'commands.info.embed.fields.systemStatistics'
          )}**`,
          inline: false,
        },
        {
          name: locale.__('commands.info.embed.fields.within.name'),
          value: `${process.platform} ${process.arch}`,
          inline: true,
        },
        {
          name: locale.__('commands.info.embed.fields.using.name'),
          value: locale.__('commands.info.embed.fields.using.value', {
            RAM: (process.memoryUsage().heapUsed / 1000000).toFixed(2),
          }),
          inline: true,
        },
        {
          name: locale.__('commands.info.embed.fields.running.name'),
          value: duration,
          inline: true,
        }
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
