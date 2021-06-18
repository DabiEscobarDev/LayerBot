const db = require("quick.db")
module.exports = {
	name: 'whitelist',
	description: 'test test dabi the best',
	args: true,
        botOwnerOnly:true,
	execute(client,message, args) {
            let mention = message.mentions.users.first();
            
        const fetch_db = db.fetch(`is_blacklisted_${mention.id}`);
        if(fetch_db === true)
        {
                db.delete(`is_blacklisted_${mention.id}`,true)
                message.reply(`${client.emotes.done}Done i unblacklisted ${mention}`)
        } 
        else {
                return message.reply(`${mention} is not blacklisted`)
        }
                
        }
};