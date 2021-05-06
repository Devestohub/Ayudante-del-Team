// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 11:13:38

const { Client } = require('discord.js');
const WOKCommands = require('wokcommands');

const client = new Client({
  partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
});

client.on('ready', async () => {
  console.log(`${process.env.NODE_ENV} ${client.user.tag} / ${client.user.id}`);

  client.user.setPresence({
    status: 'dnd',
    activity: { name: 'iniciarse...', type: 'PLAYING' },
  });

  new WOKCommands(client, {
    commandsDir: 'commands',
    featuresDir: 'features',
    defaultLanguage: 'spanish',
    showWarns: false,
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
  setTimeout(async function () {
    client.user.setPresence({
      status: 'idle',
      activity: { name: 'Team Hugo', type: 'WATCHING' },
    });
    // TODO! ~ modules/music.js ~ CHECK!
    require('./modules/music');
  }, 5000);
});

client.login(process.env.TOKEN);
