const Discord = require('discord.js');
const { Client } = Discord;
const dotenv = require('dotenv').config();

const intents = [
    Discord.GatewayIntentBits?.Guilds ?? Discord.Intents?.FLAGS?.GUILDS,
    Discord.GatewayIntentBits?.GuildMessages ?? Discord.Intents?.FLAGS?.GUILD_MESSAGES,
    Discord.GatewayIntentBits?.GuildMessageReactions ?? Discord.Intents?.FLAGS?.GUILD_MESSAGE_REACTIONS,
    Discord.GatewayIntentBits?.MessageContent ?? Discord.Intents?.FLAGS?.MESSAGE_CONTENT,
    Discord.GatewayIntentBits?.DirectMessages ?? Discord.Intents?.FLAGS?.DIRECT_MESSAGES,
    Discord.GatewayIntentBits?.DirectMessageReactions ?? Discord.Intents?.FLAGS?.DIRECT_MESSAGE_REACTIONS
].filter(Boolean);

const client = new Client({
    intents
});

client.once(Discord.Events?.ClientReady ?? 'ready', () => {
	console.log(`Ready! Logged in`);
});


// Define Triggers
class Trigger {
    constructor(word, reactions){
        this.word = word;
        this.reactions = reactions;
    }
}

const triggers = [
    new Trigger('ping', [
        '🇵',
        '🇴',
        '🇳',
        '🇬'
    ]),
    new Trigger('Trainingszeit', [
        '<:DorcaKomrade:947317312149655552>',
        '<:DorcaLurk:597873265939054595>',
        '<:DorcaMad:597873266094243954>'
    ]),
    new Trigger('Wingabstimmung', [
        '1️⃣',
        '2️⃣',
        '3️⃣',
        '4️⃣',
        '5️⃣',
        '6️⃣',
        '7️⃣',
	'8️⃣'
    ]),
    new Trigger('Gildenabend', [
        '<:aurene:857654245801459782>',
        '<:DorcaLurk:597873265939054595>',
        '<:DorcaMad:597873266094243954>'
    ]),
    new Trigger('Raidtag', [
        '<:AureneHappy:857654884135075841>',
        '<:DorcaHeal:597873273212239898>',
        '<:DorcaLurk:597873265939054595>',
        '<:DorcaLoop:672804546673901569>',
        '<:DorcaMad:597873266094243954>'
    ]),
]


// find string in message
function SearchForString(message, target) {
    // console.log('looking for target...');
    if (message.content.includes(target)) {   
        return true;
    }
    
    if(message.embeds.length < 1){
        return false;
    }

    for (let i = 0; i < message.embeds.length; i++) {
        if(message.embeds[i].title == null){
            continue;
        }

        if(message.embeds[i].title.includes(target)) {
            return true;
        }
    }
    
    return false;
}


// Reactions upon string
async function ReactUpon(message, reactions){
    for(let i = 0; i < reactions.length; i++){
        try {
            await message.react(reactions[i]);
        } catch (error) {
            console.log ('unknown Emoji');
            message.reply('unknown Emoji: ' + reactions[i]);
        }
    }
}


client.on('messageCreate', async message => {
for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];        
        if  ( !SearchForString(message, trigger.word)){
            continue;
        }    

        ReactUpon(message, trigger.reactions);
    }
});


client.login(process.env.DISCORD_TOKEN);
