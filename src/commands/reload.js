// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 27/6/2020 12:30:11
// Modified: a

module.exports = {
  name: 'reload',
  aliases: ['restart', 'rl'],
  usage: '[comando]',
  perm: 'Developer',
  async execute(message, embed, { client, args, API, prefixUsed, version }) {
    if (!args.length) {
      await message.client.users.cache.get('324449297951096834').send(embed
        .setColor('#be1931')
        .setTitle(':exclamation: ' + API.langs.__('commands.reload.embed.title'))
        .setDescription(API.langs.__('commands.reload.embed.description', message.author.tag + ` (${message.author.id})`))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL()));
      await message.client.destroy();
      return process.exit(1);
    }

    if (args[0].toLowerCase() == 'locale') {
      return require('download-git-repo')(`github:Devestohub/Ayudante-del-team-Translations#${client.env}`, 'src/database/i18n', function(err) {
        message.channel.send(embed
          .setColor(err? '#be1931': '#77b255')
          .setTitle(err? ':exclamation: ' + API.langs.__('commands.reload.embedLocale.fail'): ':white_check_mark: ' + API.langs.__('commands.reload.embedLocale.success'))
          .setTimestamp()
          .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
        )
      })
    }

    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send(embed
        .setColor('#be1931')
        .setTitle(':exclamation: ' + API.langs.__('onMessage.noCommand'))
        .setDescription('**' + API.langs.__('commands.help.embed.fields.allCommands', { prefix: prefixUsed }) + '**')
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
      )
    }

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      return message.channel.send(embed
        .setColor('#be1931')
        .setTitle(':exclamation: ' + API.langs.__('commands.reload.embedCommandError.title', command.name ))
        .setDescription(API.langs.__('commands.reload.embedCommandError.description', error))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
      )
    }
    message.channel.send(
      embed
        .setColor('#77b255')
        .setTitle(':white_check_mark: ' + API.langs.__('commands.reload.embedCommandRefreshed.title'))
        .setDescription(API.langs.__('commands.reload.embedCommandRefreshed.description', command.name))
        .setTimestamp()
        .setFooter("© " + new Date().getFullYear() + " " + client.user.username, message.client.user.displayAvatarURL())
    );
  },
};