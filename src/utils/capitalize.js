// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 05/18/2021 00:06

/**
 * Capitalize the first letter
 *
 * @param {String} str What do you want to uppercase the first letter.
 * @returns {String}
 */
module.exports = (str) => {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1).toLowerCase();
};
