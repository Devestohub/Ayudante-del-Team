// Author: Hugovidafe <Hugo.vidal.ferre@gmail.com>
// Ayudante de Hugovidafe (c) 2020
// Created: 27/6/2020 12:30:3
// Modified: 5/7/2020 1:53:2

module.exports = {
	name: 'help',
    description: 'Lista de todos mis comandos o la información de un comando',
	aliases: ['comandos'],
	usage: '[nombre del comando]',
	perm: 'User',
    execute(message, embed, { client, args, API, prefixUsed, version }) {
        if (!args.length) {
            const emb = {
                color: 0x7289da,
                title: ':page_with_curl: ' + API.langs.__('commands.help.embed.title'),
                description: API.langs.__('commands.help.embed.description'),
                fields: [],
                timestamp: new Date(),
                footer: { text: "© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), icon_url: message.client.user.displayAvatarURL() }
            }

            const categories = {}
            client.commands.forEach(v => {
                const perm = v.perm;
                if (!API.roles.getProfile(API.database.get('config.rol')).hasRoles('ayudante.' + perm)) return;
                const string = v.name;
                if (categories[perm]) categories[perm].push(string);
                else categories[perm] = [string]
            });

            function keyValueForEach(obj, func) {
                Object.keys(obj).map(key => func(key, obj[key]));
            }

            keyValueForEach(categories, (k, v) => {
                emb.fields.push({
                    name: `${API.langs.__('commands.help.embed.fields.name', API.langs.__(`users.roles.${k}.multiples`).toLowerCase())}`,
                    value: '```coffeescript\n' + v.map(comando => comando + ` = ->\n"${API.langs.__('commands.' + comando + '.description')}"`).join(`\n`) + '```',
                    inline: true
                });
            })
            emb.fields.push({
                name: '\u200B',
                value: API.langs.__('commands.help.embed.fields.allCommands', { help: prefixUsed })
            })
            if (prefixUsed) emb.description = API.langs.__('commands.help.embed.description') + "\n" + API.langs.__('commands.help.embed.description.prefix', prefixUsed);
            return message.channel.send({ embed: emb })
        }

        const name = args[0].toLowerCase();
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
			return message.channel.send(embed
                .setColor('#be1931')
                .setTitle(':exclamation: ' + API.langs.__('onMessage.noCommand'))
                .setDescription('**' + API.langs.__('commands.help.embed.fields.allCommands', { help: prefixUsed }) + '**')
                .setTimestamp()
                .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
            )
		}

        const info = []

        if (command.aliases) info.push(`- ` + API.langs.__('commands.help.embedCommand.fields.aliases') + `\n+ ${command.aliases.join(', ')} `);
        if (command.description) info.push(`- ` + API.langs.__('commands.help.embedCommand.fields.description') + `\n+ ${API.langs.__('commands.' + command.name + '.description')} `);
		if (command.usage) info.push(`- ` + API.langs.__('commands.help.embedCommand.fields.usage') + `\n+ ${command.name} ${command.usage} `);
		if (command.perm) info.push(`- ` + API.langs.__('commands.help.embedCommand.fields.permissions') + `\n+ ${API.langs.__('users.roles.' + command.perm + ".one")} `)

        message.channel.send(embed
            .setColor('#7289da')
            .setTitle(':page_with_curl: ' + API.langs.__('commands.help.embedCommand.title'))
            .setDescription(`**${API.langs.__('commands.help.embedCommand.description', `\`${command.name}\``)}**\n` + '```diff\n' + info.join('\n\n') + '```')
            .addField('\u200B', '**' + API.langs.__('commands.help.embed.fields.allCommands', { help: prefixUsed }) + '**')
            .setTimestamp()
            .setFooter("© " + new Date().getFullYear() + " " + API.langs.__('bot.name'), message.client.user.displayAvatarURL())
        )
    }
};