// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 13:58

const ytpl = require('ytpl');

var songs = new Array();

module.exports = async ({ id }) => {
  // * https://github.com/timeforaninja/node-ytpl/blob/master/example/example_output.txt
  await ytpl('https://www.youtube.com/playlist?list=' + id, {
    limit: Infinity,
  }).then(({ items } = pl) => {
    items.forEach(({ shortUrl } = item) => songs.push(shortUrl));
  });
  return songs;
};
