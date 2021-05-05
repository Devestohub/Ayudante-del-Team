// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/04/2021 23:36:24

module.exports = async function () {
  const server = client.guilds.cache.get(client.config.guild);
  const sText = server.channels.cache.filter((c) => c.type == 'text').size;
  const sVoice = server.channels.cache.filter((c) => c.type == 'voice').size;

  async function changeVCName(VChannel, text) {
    const vc = client.channels.cache.get(VChannel);
    vc.edit({ name: text });
  }

  // Number of members on the server
  changeVCName('497436073052602379', `﴿ MIEMBROS: ${server.memberCount} ﴾`);
  // Number of users on the server
  changeVCName(
    '497468883180191756',
    `﴿ USUARIOS: ${server.members.cache.filter((m) => !m.user.bot).size} ﴾`
  );
  // Number of channels on the server
  changeVCName('497469987481452564', `﴿ CANALES: ${sText + sVoice} ﴾`);
  // Number of voice channels on the server
  changeVCName('499309796059512843', `﴿ DE VOZ: ${sVoice} ﴾`);

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
  changeVCName('497470853852954635', `﴿ DE TEXTO: ${sText} ﴾`);

  // Days that the server has been created
  const days = new Date().getTime() - server.createdTimestamp;
  changeVCName(
    '496300809030467584',
    `〙Desde ${moment.duration(days, 'milliseconds').format(`d`)} días`
  );
  // Number of roles on the server
  changeVCName('510417028738318337', `﴿ ROLES: ${server.roles.cache.size} ﴾`);
};
