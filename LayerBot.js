/*ـــــــــdefineـــــــــ*/
const Discord = require("discord.js"),
fs = require("fs");
const client = new Discord.Client();

/*ـــــــــcollectionsـــــــــ*/
client.emotes = require("./utils/Config/Config").emotes;
client.config = require("./utils/Config/Config").bot;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.login(client.config.Bot_Token);

/*ـــــــــHandlersـــــــــ*/
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventsFolders = fs.readdirSync('./events');

for (const folder of eventsFolders) {
	const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of eventsFiles) {
		const event = require(`./events/${folder}/${file}`);
                if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
        }
}
