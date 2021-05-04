// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 27/6/2020 11:13:38
// Modified: 2/4/2021 22:49:21

const fs = require('fs');
const { Client, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client();
client.commands = new Collection();
client.config = require('./database/config.json');
client.env = '';
client.dirname = __dirname;

const commandFiles = fs
  .readdirSync(__dirname + '/commands')
  .filter((file) => file.endsWith('.js') && !file.startsWith('.'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const eventFiles = fs
  .readdirSync(__dirname + '/events')
  .filter((file) => file.endsWith('.js') && !file.startsWith('.'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  eventName = file.split('.').slice(0, -1).join('.');
  client.on(eventName, event.bind(null, client));
}

client.login(process.env.TOKEN);
