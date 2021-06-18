const db = require("quick.db")
module.exports = {
	name: 'blacklist',
	description: 'test test dabi the best',
	args: true,
        botOwnerOnly:true,
	execute(client,message, args) {
            let mention = message.mentions.users.first();
            if(mention.id === "ur id") return; //ur id here
        const fetch_db = db.fetch(`is_blacklisted_${mention.id}`);
        if(fetch_db === null)
        {
                db.set(`is_blacklisted_${mention.id}`,true)
                message.reply(`${client.emotes.done}Done i blacklisted ${mention}`)
        } 
        else if(fetch_db === true) {
                return message.reply(` ${mention} is alr blacklisted`)
        }
                
        }
};