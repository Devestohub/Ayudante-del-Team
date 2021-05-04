// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 11:13:38

const fs = require('fs');
const { Client, Collection } = require('discord.js');

const client = new Client();
client.commands = new Collection();
client.config = require('./database/config.json');
client.env = process.env.NODE_ENV;
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
