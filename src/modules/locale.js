// Author: Hugovidafe <Hugo.vidal.ferre@gmail.com>
// Useful Api (c) 2020
// Created: 1/7/2020 12:50:1
// Modified: 10/9/2020 10:15:28

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  autoReload: true,
  directory: path.resolve('src/database/i18n'),
  defaultLocale: 'es',
  objectNotation: true,
  syncFiles: true,
  updateFiles: true,
});

module.exports = i18n;
