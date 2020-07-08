// Author: Hugovidafe <Hugo.vidal.ferre@gmail.com>
// Ayudante de Hugovidafe (c) 2020
// Created: 9/7/2020 1:31:40
// Modified: 9/7/2020 1:32:20

module.exports = {
  name: 'stats',
  perm: 'Team',
  execute(message, embed, { client, args, API, prefixUsed, version }) {

    // Number of members on the server
    const cnumber = client.channels.cache.get('497436073052602379')
    cnumber.edit({ name: `﴿ MIEMBROS: ${server.memberCount} ﴾` })
    // Number of users on the server
    const cusers = client.channels.cache.get('497468883180191756')
    cusers.edit({ name: `﴿ USUARIOS: ${server.members.cache.filter(m => !m.user.bot).size} ﴾` })
    // Number of channels on the server
    const cchannels = client.channels.cache.get('497469987481452564')
    cchannels.edit({ name: `﴿ CANALES: ${stext + svoice} ﴾` })
    // Number of voice channels on the server
    const cvoicec = client.channels.cache.get('499309796059512843')
    cvoicec.edit({ name: `﴿ DE VOZ: ${svoice} ﴾` })

    // Number of bots on the server
    const cbots = client.channels.cache.get('497469732862033941')
    cbots.edit({ name: `﴿ BOTS: ${server.members.cache.filter(m => m.user.bot).size} ﴾` })
    // Number of categories on the server
    const ccategories = client.channels.cache.get('509779221850226698')
    ccategories.edit({ name: `﴿ CATEGORÍAS: ${server.channels.cache.filter(c => c.type == "category").size} ﴾` })
    // Number of text channels on the server
    const ctextc = client.channels.cache.get('497470853852954635')
    ctextc.edit({ name: `﴿ DE TEXTO: ${stext} ﴾` })

    // Days that the server has been created
    const cdays = client.channels.cache.get('496300809030467584')
    const days = new Date().getTime() - server.createdTimestamp;
    cdays.edit({ name: `〙Desde ${moment.duration(days, "milliseconds").format(`d`)} días` })
    // Number of roles on the server
    const croles = client.channels.cache.get('510417028738318337')
    croles.edit({ name: `﴿ ROLES: ${server.roles.cache.size} ﴾` })
  }
};