// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 11:13:38

const { Client } = require('discord.js');
const WOKCommands = require('wokcommands');

const portAudio = require('naudiodon');

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

client.on('ready', () => {
  console.log(`${process.env.NODE_ENV} ${client.user.tag} / ${client.user.id}`);

  client.user.setPresence({
    status: 'dnd',
    activity: { name: 'iniciarse...', type: 'PLAYING' },
  });

  new WOKCommands(client, {
    commandsDir: 'commands',
    featuresDir: 'features',
    defaultLanguage: 'spanish',
    ignoreBots: true,
    disabledDefaultCommands: [
      'help',
      'command',
      'language',
      'prefix',
      'requiredrole',
    ],
  })
    .setDisplayName('Ayudante del Team α')
    .setBotOwner('324449297951096834')
    .setDefaultPrefix('1.')
    .setColor(0x7289da);

  // 5 SECONDS
  setTimeout(function () {
    client.user.setPresence({
      status: 'idle',
      activity: { name: 'Team Hugo', type: 'WATCHING' },
    });
    // Join "Team Hugo" voice channel
    const conn = client.channels.cache.get('839634277071323166').join();
    conn.play();
  }, 5000);
});

client.login(process.env.TOKEN);
