const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //-warn @user <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have the permission to use the command.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find the user.");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user cannot be warned.");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#1df91d")
        .addField(`${wUser} was warned!`)
    message.channel.send(embed)

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#1df91d")
  .addField("Warned User", `${wUser} with ID ${(wUser.id)}`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(c => c.name === "logs");
    if (!warnchannel) return message.reply("Couldn't find logs.");
    warnchannel.send(warnEmbed)

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("You should create a Muted role.");

    let mutetime = "10m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted for 10m.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).kick(reason);
    message.reply(`<@${wUser.id}> has been kicked.`)
    }
    if (warns[wUser.id].warns == 4) {
        message.guild.member(wUser).ban(reason);
        message.reply(`<@${wUser.id}> has been banned.`)
    }

}

module.exports.help = {
  name: "warn"
}
