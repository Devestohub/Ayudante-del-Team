// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 11/7/2020 13:00:8
// Modified: a

module.exports = {
  name: 'ping',
  usage: '[number of times to do ping]',
  perm: "User",
  async execute(message, embed, { client, args, API, prefixUsed, version }) {
    global.msgc = message.createdTimestamp;
    if (!args[0] || args[0] === "1") {
      const msg = await message.channel.send(embed
        .setColor("#7289da")
        .setTitle(':information_source: ' + API.langs.__('commands.ping.embed.title'))
        .setDescription(API.langs.__('commands.ping.embed.description'))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
      );
      return setTimeout(function() {
        msg.edit(embed
          .setColor('#7289da')
          .setTitle(':information_source: ' + API.langs.__('commands.ping.embedPong.title'))
          .setDescription(API.langs.__('commands.ping.embedPong.description', { latency: Math.floor(message.createdTimestamp - msgc), API: Math.round(client.ws.ping) }))
          .setTimestamp()
          .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
        )
      }, 1500)
      // return message.edit(`> <a:check:717805909350547568> **Pong! My latency is ${Math.floor(message.createdTimestamp - msgc)}ms. And the API Latency is ${Math.round(msg.client.ws.ping)}ms.**\n> <a:arrowright:717805890001961001> **_Requested by: ${msg.author}_**`);
    }
    if (isNaN(args[0]) || args[0] > 3) {
      return message.channel.send("You don't introduce a number, or the number is more of 4, so I don't go to execute the command :D")
    }
    for (let i = 0; i < args[0]; i++) {
      message.channel.send(embed
        .setColor('#7289da')
        .setTitle(':information_source: ' + API.langs.__('commands.ping.embed.title'))
        .setDescription(API.langs.__('commands.ping.embed.description'))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
      ).then(message => {
        setTimeout(function() {
          message.edit(embed
            .setColor('#7289da')
            .setTitle(':information_source: ' + API.langs.__('commands.ping.embedPong.title'))
            .setDescription(API.langs.__('commands.ping.embedPong.description', { latency: Math.floor(message.createdTimestamp - msgc), API: Math.round(client.ws.ping) }))
            .setTimestamp()
            .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
          )
          msgc = message.createdTimestamp;
        }, 1500)
      })
    }
    return message.channel.send(`I finish sending ${args[0]} pongs! I win you :D`).then(m => setTimeout(function() { m.delete() }, 8000))
  }
};