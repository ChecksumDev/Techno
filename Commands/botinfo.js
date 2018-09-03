const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#1df91d")
        .setThumbnail(bicon)
        .addField("Bot Name:", bot.user.username)
        .addField("Created On:", bot.user.createdAt)
        .addField("Creator:", "Tech#0002");

    message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}
