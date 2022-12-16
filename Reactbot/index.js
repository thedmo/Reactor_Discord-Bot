const Discord = require('discord.js');
const dotenv = require('dotenv').config();

console.log(process.env)

const client = new Discord.Client();


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    console.log(message.content);

    if  (message.content.includes('New Google Calendar event')){
        message.react('👍');
        message.react('👎');
    }

    if  (message.content.includes('Dev-Meeting')){
        try{
            await message.react('<:DorcaKomrade:947317312149655552>');
            await message.react('<:DorcaMad:597873266094243954>');

        }catch{
            await message.reply('Reactions did not work...');
        }
    }

    if  (message.content.includes('Trainingszeit')){
        try{
            await message.react('<:DorcaKomrade:947317312149655552>');
            await message.react('<:DorcaLurk:597873265939054595>');            
            await message.react('<:DorcaMad:597873266094243954>');
            // await message.react('<:Dorcasignal:597873266723520512>');            
            // await message.react('<:DorcaLoop:672804546673901569>');
        }catch{
            await message.reply('Reactions did not work...');
        }
    }

    if  (message.content === '!Clearchannel'){
        if(message.author.username === 'Cleara'){
            message.channel.bulkDelete(100, true).catch(err => {
                console.error(err);
                message.channel.send('All Messages are older than two weeks. You have to delete them by yourself ;-)')
            });
        }
    }

    if  (message.content === '!ping'){
        try{
            await message.react('🇵');
            await message.react('🇴');
            await message.react('🇳');
            await message.react('🇬');
        }
        catch{
            console.log('Well, that did not work ^^')
            await message.reply('Reaction does not compute...')
        }
    }

    message.awaitReactions(filter, {max:1, time: 60000, errors: ['time']}).then(
        collected => {
            const reaction = collected.first();

            if  (reaction.emoji.name === ''){
                message.reply('Positive');
            } else {
                message.reply('Negative');
            }
        }
    )

    
});



client.login(process.env.DISCORD_TOKEN);