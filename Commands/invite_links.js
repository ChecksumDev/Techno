module.exports = async (message, client) => {
    const { automod } = client.settings.get(message.guild.id);
    const invite_links = automod.invite_links;
    if (invite_links.enabled === false) return;
    if (invite_links.allowed_users.includes(message.author.id)) return;
    if (invite_links.allowed_channels.includes(message.channel.id)) return;
    if (message.member.roles.some(r => invite_links.allowed_roles.includes(r.id))) return;
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig;
    if (regex.test(message.content) === true) {
        return message.delete(), message.channel.send(`${message.author} | ${client.emotes.warn} This server does not allow server invite - your message has been deleted.`);
    };
};
module.exports.help = {
    name: "invitelinks"
}
