// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 05:31

// TODO Be able to play playlists on a voice channel.
// * We're waiting for stage implement on discord.js

const EventEmitter = require('events');
const radio = new EventEmitter();

const ytdl = require('ytdl-core');

var settings = {
  /**
   * Setting loop:
   * - 0 = no loop
   * - 1 = playlist loop
   * - 2 = song loop
   */
  loop: 1,
};
var queue = new Array();

radio.on('ready', async ({ conn, url }) => {
  // Detect if the url is a playlist
  const pl_regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  const pl_match = url.match(pl_regExp);
  const pl_id = pl_match ? pl_match[2] : null;
  // Extract songs from a playlist
  pl_id ? () => {} : () => {};
});

radio.on('start', async ({ client }) => {
  // * https://github.com/timeforaninja/node-ytpl/blob/master/example/example_output.txt
  await ytpl(
    'https://www.youtube.com/playlist?list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi'
  )
    .then((pl) => {
      const { items } = pl;
      items.forEach((item) => {
        queue.push(({ index, shortUrl, title } = item));
        console.log(queue);
      });
    })
    .finally(() => {});
  // Do a queue
  conn.play(
    ytdl(
      'https://www.youtube.com/watch?v=wyNc0WtHw6I&list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi&index=1',
      { filter: 'audioonly' }
    ).on('end', radio.emit('end'))
  );
});

radio.on('end', () => {});

module.exports = radio;
