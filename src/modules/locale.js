// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 5/7/2020 13:35

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
