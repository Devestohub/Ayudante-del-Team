// Author: Hugovidafe <Hugo.vidal.ferre@gmail.com>
// Ayudante de Hugovidafe (c) 2020
// Created: 11/7/2020 13:00:8
// Modified: 11/7/2020 13:05:14

module.exports = {
  name: 'ping',
  usage: '[number of times to do ping]',
  perm: "User",
  execute(message, embed, { client, args, API, prefixUsed, version }) {
    global.msgc = msg.createdTimestamp;
    if (msg.deletable) msg.delete();
    if (!args[0] || args[0] === "1") {
      const msg = await message.channel.send(embed
        .setColor("#7289da")
        .setTitle("Pinging<a:loading:718783561389441104>")
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
      );
      return setTimeout(function() {
        msg.edit(embed
          .setColor("GREEN")
          .setTitle("<a:check:717805909350547568> I pinged!")
          .setDescription(`My latency is \`${Math.floor(message.createdTimestamp - msgc)}\`ms.\nAnd the API Latency is \`${Math.round(msg.client.ws.ping)}\`ms.`)
          .setTimestamp()
          .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
        )
      }, 1500)
      // return message.edit(`> <a:check:717805909350547568> **Pong! My latency is ${Math.floor(message.createdTimestamp - msgc)}ms. And the API Latency is ${Math.round(msg.client.ws.ping)}ms.**\n> <a:arrowright:717805890001961001> **_Requested by: ${msg.author}_**`);
    }
    if (isNaN(args[0]) || args[0] > 10) {
      return message.channel.send("You don't introduce a number, or the number is more of 10, so I don't go to execute the command :D")
    }
    for (let i = 0; i < args[0]; i++) {
      message.channel.send(embed
        .setColor("#7289da")
        .setTitle("Pinging<a:loading:718783561389441104>")
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
      ).then(message => {
        setTimeout(function() {
          message.edit(embed
            .setColor("GREEN")
            .setTitle("<a:check:717805909350547568> I pinged!")
            .setDescription(`My latency is \`${Math.floor(message.createdTimestamp - msgc)}\`ms.\nAnd the API Latency is \`${Math.round(msg.client.ws.ping)}\`ms.`)
            .setTimestamp()
            .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
          )
          msgc = message.createdTimestamp;
        }, 1500)
      })
    }
    return message.channel.send(`I finish sending ${args[0]} pongs! I win you :D`).then(m => setTimeout(function() { m.delete() }, 8000))
  }
};