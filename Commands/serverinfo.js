const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
       let embed = new Discord.RichEmbed()
            .setColor("#1df91d")
            .setTitle(`${message.guild} Information!`)
            .addField("ID", message.guild.id, true)
            .addField("Owner", message.guild.owner, true)
            .addField("Owner ID", message.guild.ownerID, true)
            .addField("Roles", message.guild.roles.size, true)
            .addField("Region", message.guild.region, true)
            .setThumbnail(message.guild.iconURL, true)
        message.channel.send(embed)
    }

module.exports.help = {
    name: "serverinfo"
}