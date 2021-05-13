// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 05:31

// TODO: Be able to play playlists on a voice channel.
// * We're waiting for stage implement on discord.js

const EventEmitter = require('events');
const radio = new EventEmitter();

const YTmusic = require('../utils/YTmusic');
const unifier = require('../utils/unifier');

var settings = {
  /**
   * Setting loop:
   * - 0 = no loop
   * - 1 = playlist loop
   * - 2 = song loop
   */
  loop: 0,
};
let queue = new Array();
var i = 0;

radio.on('ready', () => (queue = new Array()));

radio.on('add', async (url) => {
  // Check if the url is from YT and return a JSON with if is a playlist or video and more!
  const info = await new YTmusic().isYT(url);
  /**
   * {
   *  isYT: true,
   *  type: 'playlist',
   *  id: 'PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi',
   *  url: 'https://www.youtube.com/playlist?list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi' // * This is gonna to be removed, bc we are gonna do a constructor URL (i.e. URL prettier)
   * }
   */

  if (info.isYT) {
    if (info.type == 'playlist') {
      // TODO: Don't push directly the url, use the URL prettier
      const songs = await new YTmusic().extractYTPlaylist(info.id);
      return songs.forEach((song) => queue.push(song));
    } else {
      const { isYT, url } = info; // TODO! Change url to id
      // TODO! Constructor URL (i.e. URL prettier)
      return queue.push({ isYT, url });
    }
  } else return queue.push({ url });
});

radio.on('start', async (conn) => {
  if (settings.loop == 0) {
    if (queue[0].isYT == true) {
      const { url } = queue.shift();
      return conn.play(await new YTmusic().playYT(url));
    }
  } else if (settings.loop == 1) {
    if (queue[i].isYT == true) {
      
    }
  }
  return;
});

radio.on('end', () => radio.emit('add'));

module.exports = radio;
