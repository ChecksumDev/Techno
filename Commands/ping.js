const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const m = await message.channel.send("Pinging...");
    let result = Math.floor((Math.random()));
    m.edit(`Pong!: \`${m.createdTimestamp - message.createdTimestamp} ms\` API: \`${Math.round(bot.ping)} ms\``);
};

module.exports.help = {
    name: "ping"
}
