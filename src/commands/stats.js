// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 9/7/2020 1:31:40
// Modified: 4/8/2020 15:37:6

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: 'stats',
  perm: 'Team',
  async execute(message, embed, { client, API }) {

    try {

      const server = client.guilds.cache.get(client.config.guild);
      const stext = server.channels.cache.filter(c => c.type == "text").size
      const svoice = server.channels.cache.filter(c => c.type == "voice").size

      async function changevcname(vchannel, text) {
        const vc = client.channels.cache.get(vchannel)
        vc.edit({ name: text })
      }

      // Number of members on the server
      changevcname('497436073052602379', `﴿ MIEMBROS: ${server.memberCount} ﴾` )
      // Number of users on the server
      changevcname('497468883180191756', `﴿ USUARIOS: ${server.members.cache.filter(m => !m.user.bot).size} ﴾` )
      // Number of channels on the server
      changevcname('497469987481452564', `﴿ CANALES: ${stext + svoice} ﴾` )
      // Number of voice channels on the server
      changevcname('499309796059512843', `﴿ DE VOZ: ${svoice} ﴾` )

      // Number of bots on the server
      changevcname('497469732862033941', `﴿ BOTS: ${server.members.cache.filter(m => m.user.bot).size} ﴾` )
      // Number of categories on the server
      changevcname('509779221850226698', `﴿ CATEGORÍAS: ${server.channels.cache.filter(c => c.type == "category").size} ﴾` )
      // Number of text channels on the server
      changevcname('497470853852954635', `﴿ DE TEXTO: ${stext} ﴾` )
      // Number of followers of Lunna if env is master
      if (client.env == "master") {
        client.twitch.clientID = 'gp762nuuoqcoxypju8c569th9wz7q5';
        client.twitch.channels.channelByID({ channelID: '476324921' }, (err, res) => {
          if (err) return console.log(err);
          changevcname('739893323514511430', `👥❳ Seguidores: ${res.followers}` )
        })
      }

      // Days that the server has been created
      const days = new Date().getTime() - server.createdTimestamp;
      changevcname('496300809030467584', `〙Desde ${moment.duration(days, "milliseconds").format(`d`)} días` )
      // Number of roles on the server
      changevcname('510417028738318337', `﴿ ROLES: ${server.roles.cache.size} ﴾` )

      return message.channel.send(
        embed
          .setColor('#77b255')
          .setTitle(':white_check_mark: ' + API.langs.__('commands.stats.embed.title'))
          .setDescription(API.langs.__('commands.stats.embed.description'))
          .setTimestamp()
          .setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
      )

    } catch (error) {

      return message.channel.send(embed
        .setColor('#be1931')
        .setTitle(':exclamation: ' + API.langs.__('commands.stats.embedError.title' ))
        .setDescription(API.langs.__('commands.stats.embedError.description', error))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
      )

    }

  }
};