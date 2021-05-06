// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 05:31

// TODO Play NIGHTCOREELM's playlist on a voice channel.

const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

module.exports = async () => {
  // Join "Team Hugo" voice channel
  const conn = await client.channels.cache.get('839634277071323166').join();
  // * https://github.com/timeforaninja/node-ytpl/blob/master/example/example_output.txt
  const pl = await ytpl(
    'https://www.youtube.com/playlist?list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi',
    {
      gl: 'ES',
      hl: 'es',
    }
  );
  // Do a queue
  conn.play(
    ytdl(
      'https://www.youtube.com/watch?v=wyNc0WtHw6I&list=PL_hMPVlh29xWxxbmN4EEAOlfoF99StrBi&index=1',
      { filter: 'audioonly' }
    ).on('end')
  );
};
