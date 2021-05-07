// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 05:31

// TODO: Be able to play playlists on a voice channel.
// * We're waiting for stage implement on discord.js

const EventEmitter = require('events');
const radio = new EventEmitter();

const YTmusic = require('../utils/YTmusic');

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
  // Check if the url is from YT and return a JSON with if is a playlist or video and more!
  const info = await new YTmusic().isYT(url);
  /**
   * {
   *  type: 'playlist',
   *  id: 'PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi',
   *  url: 'https://www.youtube.com/playlist?list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi' // * This is gonna to be removed, bc we are gonna do a constructor URL (i.e. URL prettier)
   * }
   */

  // TODO! Constructor URL (i.e. URL prettier)

  // TODO! Add song or playlist songs to the queue!
  // plYT_id
  //   ? (await YTmusic({ id: plYT_id })).forEach((song) => queue.push(song))
  //   : () => {
  //       queue.push('https://www.youtube.com/watch?v=' + YT_id);
  //     };
});

radio.on('add', (url) => {
  return queue.push(url);
});

radio.on('start', async ({ client }) => {
  // Do a queue
  conn.play();
});

radio.on('end', () => {});

module.exports = radio;
