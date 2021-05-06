// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante-del-Team (c) 2021
// Created: 06/27/2020 12:30:8

module.exports = {
  name: 'eval',
  category: 'Administración',
  description: 'Evaluate any code',
  expectedArgs: '[code]',
  permissions: ['ADMINISTRATOR'],
  hidden: true,
  ownerOnly: true,
  callback({ message, args, client }) {
    function clean(text) {
      if (typeof text === 'string')
        return text
          .replace(/`/g, '`' + String.fromCharCode(8203))
          .replace(/@/g, '@' + String.fromCharCode(8203));
      else return text;
    }

    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

      message.channel.send(clean(evaled), { code: 'xl' });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
