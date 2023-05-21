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

    if  (message.content.includes('Trainingszeit')){
        try{
            await message.react('<:DorcaKomrade:947317312149655552>');
            await message.react('<:DorcaLurk:597873265939054595>');            
            await message.react('<:DorcaMad:597873266094243954>');
        }catch{
            await message.reply('Reactions did not work...');
        }
    }

    // Reaktionen auf "Wingabstimmung" mit: 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 
    if (message.content.includes('Wingabstimmung')){
        try{
            await message.react('1️⃣');
            await message.react('2️⃣');
            await message.react('3️⃣');
            await message.react('4️⃣');
            await message.react('5️⃣');
            await message.react('6️⃣');
            await message.react('7️⃣');
        }catch{
            await message.reply('reactions did not work...')
        }
    }

    // Reaktionen auf "Gildenabend" mit: <:aurene:857654245801459782> <:DorcaLurk:597873265939054595> <:DorcaMad:597873266094243954>
    if  (message.content.includes('Gildenabend')){
        try{
            await message.react('<:aurene:857654245801459782>');
            await message.react('<:DorcaLurk:597873265939054595>');            
            await message.react('<:DorcaMad:597873266094243954>');
        }catch{
            await message.reply('Reactions did not work...');
        }
    }


    // Reaktionen auf "Raidtag" mit: <:AureneHappy:857654884135075841> <:DorcaHeal:597873273212239898> <:DorcaLurk:597873265939054595> <:DorcaLoop:672804546673901569> <:DorcaMad:597873266094243954>
    if  (message.content.includes('Raidtag')){
        try{
            await message.react('<:AureneHappy:857654884135075841>');
            await message.react('<:DorcaHeal:597873273212239898>');            
            await message.react('<:DorcaLurk:597873265939054595>');            
            await message.react('<:DorcaLoop:672804546673901569>');            
            await message.react('<:DorcaMad:597873266094243954>');
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