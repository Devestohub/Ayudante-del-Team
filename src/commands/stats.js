// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 9/7/2020 1:31:40
// Modified: 3/8/2020 21:4:8

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'stats',
  perm: 'Team',
  async execute(message, embed, { client, args, API, prefixUsed, version }) {

    const server = client.guilds.cache.get(client.config.guild);
    const stext = server.channels.cache.filter(c => c.type == "text").size
    const svoice = server.channels.cache.filter(c => c.type == "voice").size

    // Number of members on the server
    const cnumber = client.channels.cache.get('497436073052602379')
    await cnumber.edit({ name: `﴿ MIEMBROS: ${server.memberCount} ﴾` })
    // Number of users on the server
    const cusers = client.channels.cache.get('497468883180191756')
    await cusers.edit({ name: `﴿ USUARIOS: ${server.members.cache.filter(m => !m.user.bot).size} ﴾` })
    // Number of channels on the server
    const cchannels = client.channels.cache.get('497469987481452564')
    await cchannels.edit({ name: `﴿ CANALES: ${stext + svoice} ﴾` })
    // Number of voice channels on the server
    const cvoicec = client.channels.cache.get('499309796059512843')
    await cvoicec.edit({ name: `﴿ DE VOZ: ${svoice} ﴾` })

    // Number of bots on the server
    const cbots = client.channels.cache.get('497469732862033941')
    await cbots.edit({ name: `﴿ BOTS: ${server.members.cache.filter(m => m.user.bot).size} ﴾` })
    // Number of categories on the server
    const ccategories = client.channels.cache.get('509779221850226698')
    await ccategories.edit({ name: `﴿ CATEGORÍAS: ${server.channels.cache.filter(c => c.type == "category").size} ﴾` })
    // Number of text channels on the server
    const ctextc = client.channels.cache.get('497470853852954635')
    await ctextc.edit({ name: `﴿ DE TEXTO: ${stext} ﴾` })
    // Number of followers of Lunna
    const slfollowers = client.channels.cache.get('739893323514511430')
    client.twitch.clientID = 'gp762nuuoqcoxypju8c569th9wz7q5';
    client.twitch.channels.channelByID({ channelID: '476324921' }, (err, res) => {
      if (err) return console.log(err);
      slfollowers.edit({name: `👥❳ Seguidores: ${res.followers}`})
    })

    // Days that the server has been created
    const cdays = client.channels.cache.get('496300809030467584')
    const days = new Date().getTime() - server.createdTimestamp;
    await cdays.edit({ name: `〙Desde ${moment.duration(days, "milliseconds").format(`d`)} días` })
    // Number of roles on the server
    const croles = client.channels.cache.get('510417028738318337')
    await croles.edit({ name: `﴿ ROLES: ${server.roles.cache.size} ﴾` })

    return message.channel.send(
      embed
        .setColor('#77b255')
        .setTitle(':white_check_mark: ' + API.langs.__('commands.stats.embed.title'))
        .setDescription(API.langs.__('commands.stats.embed.description'))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
    )
  }
};