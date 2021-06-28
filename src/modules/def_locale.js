// Author: Hugovidafe-OSS <hugo.vidal.ferre@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 07/01/2020 12:50

const i18n = require('i18n');

i18n.configure({
  autoReload: true,
  directory: require('path').resolve('src/database/i18n'),
  defaultLocale: 'es',
  objectNotation: true,
  syncFiles: true,
  updateFiles: true,
});

module.exports = i18n;
