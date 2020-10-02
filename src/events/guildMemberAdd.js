// Author: Devestoguy <devestoguy@gmail.com>
// Ayudante del Team (c) 2020
// Created: 4/7/2020 1:53:51
// Modified: 9/7/2020 10:52:28

module.exports = async (client, member) => {
  if (member.user.bot || member.user.system) return;
  const server = client.guilds.cache.get(client.config.guild);
  if (member.guild.id == server.id) {
    const roles = [
      '727444149980364851',
      '727443564795265085',
      '720572925198991432',
      '720574206978293811',
    ];
    roles.forEach((rs) =>
      member.roles.add(server.roles.cache.find((r) => r.id == rs))
    );
  }
};
