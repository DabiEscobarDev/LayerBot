const owner = ["ur id", "Second owner id"]
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
	name: 'message',
	execute(message,client) {
        const prefix = client.config.Bot_Prefix;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
        let is_blacklisted = db.fetch(`is_blacklisted_${message.author.id}`)
        if (is_blacklisted === true) return message.channel.send(`You are blacklisted u unable to use ${client.user.username}`)
    if (command.botOwnerOnly && !owner.includes(message.author.id)){
		let embed = new Discord.MessageEmbed()
                embed.setDescription(`:no_pedestrians: || This Command Can Only be used by the bot owner`)
                return message.channel.send(embed)
	}

    
    
    
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
	}
	},
};