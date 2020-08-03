// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 27/6/2020 11:44:15
// Modified: 3/8/2020 21:3:31

const moment = require("moment");
require("moment-duration-format");

module.exports = async (client) => {
  switch (client.user.id) {
    case client.config.master.id:
      client.env = "master";
      break;
    case client.config.beta.id:
      client.env = "beta";
      break;
    default:
      client.env = "alpha";
      break;
  }
  console.log(`${client.env} ${client.user.tag} / ${client.user.id}`);
  client.user.setPresence({ status: 'dnd', activity: {name: 'iniciarse...', type: 'PLAYING' }});

  if (client.env != "alpha") require('download-git-repo')(`github:Devestohub/Ayudante-del-team-Translations#${client.env}`, 'src/database/i18n', function(err) { console.log(err? "Error downloading translations": null) })

  const server = client.guilds.cache.get(client.config.guild);
  const stext = server.channels.cache.filter(c => c.type == "text").size
  const svoice = server.channels.cache.filter(c => c.type == "voice").size

  // 5 SECONDS
  setTimeout(function() {
    client.user.setPresence({ status: 'idle', activity: { name: 'Team Hugo', type: 'WATCHING' } });
    // Join "Team Hugo" voice channel
    client.channels.cache.get('586618451431260163').join();
  }, 5000)

  // 5 SECONDS
  setInterval(function() {
    if (client.env != "master") return;
    // Number of members on the server
    const cnumber = client.channels.cache.get('497436073052602379')
    cnumber.edit({name: `﴿ MIEMBROS: ${server.memberCount} ﴾`})
    // Number of users on the server
    const cusers = client.channels.cache.get('497468883180191756')
    cusers.edit({name: `﴿ USUARIOS: ${server.members.cache.filter(m => !m.user.bot).size} ﴾`})
    // Number of channels on the server
    const cchannels = client.channels.cache.get('497469987481452564')
    cchannels.edit({name: `﴿ CANALES: ${stext + svoice} ﴾`})
    // Number of voice channels on the server
    const cvoicec = client.channels.cache.get('499309796059512843')
    cvoicec.edit({name: `﴿ DE VOZ: ${svoice} ﴾`})
  }, 5000)

  // 10 MINUTES
  setInterval(function() {
    if (client.env != "master") return;
    // Correctly establish roles
    const roles = ['727444149980364851', '727443564795265085', '720572925198991432', '720574206978293811']
    server.members.cache.filter(m => !m.user.bot).forEach(member => roles.forEach(rs => member.roles.add(server.roles.cache.find(r => r.id == rs))))
    // Number of bots on the server
    const cbots = client.channels.cache.get('497469732862033941')
    cbots.edit({name: `﴿ BOTS: ${server.members.cache.filter(m => m.user.bot).size} ﴾`})
    // Number of categories on the server
    const ccategories = client.channels.cache.get('509779221850226698')
    ccategories.edit({name: `﴿ CATEGORÍAS: ${server.channels.cache.filter(c => c.type == "category").size} ﴾`})
    // Number of text channels on the server
    const ctextc = client.channels.cache.get('497470853852954635')
    ctextc.edit({name: `﴿ DE TEXTO: ${stext} ﴾`})
    // Number of followers of Lunna
    const slfollowers = client.channels.cache.get('739893323514511430')
    client.twitch.clientID = 'gp762nuuoqcoxypju8c569th9wz7q5';
    client.twitch.channels.channelByID({ channelID: '476324921' }, (err, res) => {
      if (err) return console.log(err);
      slfollowers.edit({name: `👥❳ Seguidores: ${res.followers}`})
    })
  }, 600000)

  // 12 HORAS
  setInterval(function() {
    // Donwloading translations
    if (client.env != "alpha") require('download-git-repo')(`github:Devestohub/Ayudante-del-team-Translations#${client.env}`, 'src/database/i18n', function(err) { console.log(err? "Error downloading translations": null) })
    if (client.env != "master") return;
    // Days that the server has been created
    const cdays = client.channels.cache.get('496300809030467584');
    const days = new Date().getTime() - server.createdTimestamp;
    cdays.edit({ name: `〙Desde ${moment.duration(days, "milliseconds").format(`d`)} días` })
    // Number of roles on the server
    const croles = client.channels.cache.get('510417028738318337')
    croles.edit({ name: `﴿ ROLES: ${server.roles.cache.size} ﴾` })
  }, 43200000)
};