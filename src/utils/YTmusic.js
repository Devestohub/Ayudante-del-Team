// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/06/2021 13:58

const ytpl = require('ytpl');

var songs = new Array();

/**
 * Functions related to YT
 *
 * @author Created by Hugovidafe <hugo.vidal.ferre@gmail.com>
 * @github https://github.com/Devestohub/Ayudante-del-Team
 * @license http://opensource.org/licenses/MIT
 */
class YT {
  constructor() {
    /**
     * @private
     * @readonly
     */
    this.YT_regexp = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed|playlist)?(\S+)?/;
  }

  /**
   * Check if the url is from the YouTube site
   *
   * @param {URL} url URL to inspect
   * @returns {JSON | false} `false` in case the link is not from YT
   */
  async isYT(url) {
    // Get params string if the url is from YouTube site
    const URLParams = await url.match(this.YT_regexp)[6];
    // Return false if the url is not from YouTube site
    if (!URLParams) return false;
    // Separate parameters
    const params = new URLSearchParams(URLParams);
    // Check if there is a list param
    const Pl = params.get('list');
    // Return the JSON with the correct information
    return {
      type: Pl ? 'playlist' : 'video', // `playlist` or `video`
      id: Pl || params.get('v'),
      url, // TODO: To remove
    };
  }

  // TODO! Remove this method!
  /**
   * @private
   * @param {*} param0
   * @returns
   */
  async isYTPlaylist({ id }) {
    // * https://github.com/timeforaninja/node-ytpl/blob/master/example/example_output.txt
    await ytpl('https://www.youtube.com/playlist?list=' + id, {
      limit: Infinity,
    }).then(({ items } = pl) => {
      items.forEach(({ shortUrl } = item) => songs.push(shortUrl));
    });
    return songs;
  }
}

module.exports = YT;
