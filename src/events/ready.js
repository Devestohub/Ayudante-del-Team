// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 11:44:15

const moment = require('moment');
require('moment-duration-format');

module.exports = async (client) => {
  console.log(`${client.env} ${client.user.tag} / ${client.user.id}`);
  client.user.setPresence({
    status: 'dnd',
    activity: { name: 'iniciarse...', type: 'PLAYING' },
  });

  if (client.env != 'alpha')
    require('download-git-repo')(
      `github:Devestohub/Ayudante-del-team-Translations`,
      'src/database/i18n',
      function (err) {
        console.log(err ? 'Error downloading translations' : null);
      }
    );

  const server = client.guilds.cache.get(client.config.guild);
  const stext = server.channels.cache.filter((c) => c.type == 'text').size;
  const svoice = server.channels.cache.filter((c) => c.type == 'voice').size;

  async function changeVCName(vchannel, text) {
    const vc = client.channels.cache.get(vchannel);
    vc.edit({ name: text });
  }

  // 5 SECONDS
  setTimeout(function () {
    client.user.setPresence({
      status: 'idle',
      activity: { name: 'Team Hugo', type: 'WATCHING' },
    });
    // Join "Team Hugo" voice channel
    client.channels.cache.get('586618451431260163').join();
  }, 5000);

  // 5 SECONDS
  setInterval(function () {
    if (client.env != 'master') return;
    // Number of members on the server
    changeVCName('497436073052602379', `﴿ MIEMBROS: ${server.memberCount} ﴾`);
    // Number of users on the server
    changeVCName(
      '497468883180191756',
      `﴿ USUARIOS: ${server.members.cache.filter((m) => !m.user.bot).size} ﴾`
    );
    // Number of channels on the server
    changeVCName('497469987481452564', `﴿ CANALES: ${stext + svoice} ﴾`);
    // Number of voice channels on the server
    changeVCName('499309796059512843', `﴿ DE VOZ: ${svoice} ﴾`);
  }, 5000);

  // 10 MINUTES
  setInterval(function () {
    if (client.env != 'master') return;
    // Correctly establish roles
    const roles = [
      '727444149980364851',
      '727443564795265085',
      '720572925198991432',
      '720574206978293811',
    ];
    server.members.cache
      .filter((m) => !m.user.bot)
      .forEach((member) =>
        roles.forEach((rs) =>
          member.roles.add(server.roles.cache.find((r) => r.id == rs))
        )
      );
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
    changeVCName('497470853852954635', `﴿ DE TEXTO: ${stext} ﴾`);
  }, 600000);

  // 12 HORAS
  setInterval(function () {
    // Downloading translations
    if (client.env != 'alpha')
      require('download-git-repo')(
        `github:Devestohub/Ayudante-del-team-Translations#${client.env}`,
        'src/database/i18n',
        function (err) {
          console.log(err ? 'Error downloading translations' : null);
        }
      );
    if (client.env != 'master') return;
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
