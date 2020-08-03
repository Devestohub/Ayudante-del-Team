// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 28/6/2020 12:9:44
// Modified: 8/7/2020 17:31:47

const moment = require("moment");
require("moment-duration-format");
const os = require('os');

require('child_process').exec('npm -v', { windowsHide: true }, readVersion)
function readVersion(err, stdout) {
  versionnpm = stdout;
}

module.exports = {
  name: 'info',
  aliases: ['information', 'información', 'i'],
  perm: 'User',
  execute(message, embed, { client, args, API, prefixUsed, version }) {
    // console.log(version);
    moment.updateLocale('en', {
      durationLabelsStandard: {
        s: API.langs.__('time.second'),
        ss: API.langs.__('time.seconds'),
        m: API.langs.__('time.minute'),
        mm: API.langs.__('time.minutes'),
        h: API.langs.__('time.hour'),
        hh: API.langs.__('time.hours'),
        d: API.langs.__('time.day'),
        dd: API.langs.__('time.days'),
        w: API.langs.__('time.week'),
        ww: API.langs.__('time.weeks'),
        M: API.langs.__('time.month'),
        MM: API.langs.__('time.months'),
        y: API.langs.__('time.year'),
        yy: API.langs.__('time.years')
      }
    })

    if (!args.length) {
      const duration = moment.duration(client.uptime).format(`y __, M __, w __, d __, h __, m __ [${API.langs.__('words.and')}] s __`);
      message.channel.send(embed
        .setColor('#7289da')
        .setTitle(':information_source: ' + API.langs.__('commands.info.embed.title'))
        .setDescription(API.langs.__('commands.info.embed.description'))
        .addFields(
          { name: '<:_gears_:529706543235465228> ' + API.langs.__('commands.info.embed.fields.versions.name'), value: `✭ ${API.langs.__('commands.info.embed.fields.versions.value', {botVersion: `*__v${require('../../package.json').version}__ - __v${require('@hugovidafe/useful-api').version}__*`, discordJsVersion: `*__v${require('discord.js').version}__*`, systemVersion: `*__${process.version}__ - __v${versionnpm}__*` })}`, inline: true },
          { name: '<:_staff_:529711058328354817> ' + API.langs.__('users.roles.Developer.one'), value: '<@324449297951096834>\nHugovidafe#2728\n`<@324449297951096834>`', inline: true },
          { name: '\u200B', value: '**- ' + API.langs.__('commands.info.embed.fields.systemStatistics') + '**', inline: false },
          { name: API.langs.__('commands.info.embed.fields.within.name'), value: `${os.platform()} ${os.arch()}`, inline: true },
          { name: API.langs.__('commands.info.embed.fields.using.name'), value: API.langs.__('commands.info.embed.fields.using.value', { RAM: (100 - ( ( os.totalmem() - os.freemem() ) / os.totalmem() * 100) ).toFixed(2) }), inline: true },
          { name: API.langs.__('commands.info.embed.fields.running.name'), value: duration, inline: true },
        )
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, client.user.displayAvatarURL())
      )
    }
  }
};
