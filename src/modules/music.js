// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 05:31

// TODO Be able to play playlists on a voice channel.
// * We're waiting for stage implement on discord.js

const EventEmitter = require('events');
const radio = new EventEmitter();

const songsFromYTPlaylist = require('../utils/songsFromYTPlaylist');

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
  // Detect if the url is a YouTube playlist
  const plYT_regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  const plYT_match = url.match(plYT_regExp);
  const plYT_id = plYT_match ? plYT_match[2] : null;
  // Detect if the usl is a YouTube video
  const YT_regExp = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/;
  const YT_match = url.match(YT_regExp);
  const YT_id = YT_match ? YT_match[1] : null;
  // Add song or playlist songs to the queue!
  plYT_id
    ? (await songsFromYTPlaylist({ id: plYT_id })).forEach((song) =>
        queue.push(song)
      )
    : () => {
        queue.push('https://www.youtube.com/watch?v=' + YT_id);
      };
});

radio.on('', () => {});

radio.on('start', async ({ client }) => {
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
