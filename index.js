const tokenfile = require("./token.json");
const botconfig = require("./botconfig");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
	disableEveryone: true
});
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if (jsfile.length <= 0) {
		return;
	}
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded.`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("message", async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    const prefix = "$";
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, msg, args);
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("In progress.", { type: "Playing" });
});

bot.login(tokenfile.token);
