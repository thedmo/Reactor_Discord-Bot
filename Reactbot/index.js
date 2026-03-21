const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
} = require("discord.js");
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error(
    "Missing DISCORD_TOKEN. Add it to your environment or a .env file.",
  );
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction);

  const cmd = interaction.client.commands.get(interaction.commandName);

  if (!cmd) {
    await interaction.reply({
      content: "command was not found",
      flags: MessageFlags.Ephemeral,
    });
  }

  try {
    await cmd.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// // Define Triggers
// class Trigger {
//     constructor(word, reactions) {
//         this.word = word;
//         this.reactions = reactions;
//     }
// }

// const triggers = [
//     new Trigger('ping', [
//         '🇵',
//         '🇴',
//         '🇳',
//         '🇬'
//     ]),
//     new Trigger('Trainingszeit', [
//         '<:DorcaKomrade:947317312149655552>',
//         '<:DorcaLurk:597873265939054595>',
//         '<:DorcaMad:597873266094243954>'
//     ]),
//     new Trigger('Wingabstimmung', [
//         '1️⃣',
//         '2️⃣',
//         '3️⃣',
//         '4️⃣',
//         '5️⃣',
//         '6️⃣',
//         '7️⃣',
//         '8️⃣'
//     ]),
//     new Trigger('Gildenabend', [
//         '<:aurene:857654245801459782>',
//         '<:DorcaLurk:597873265939054595>',
//         '<:DorcaMad:597873266094243954>'
//     ]),
//     new Trigger('Raidtag', [
//         '<:AureneHappy:857654884135075841>',
//         '<:DorcaHeal:597873273212239898>',
//         '<:DorcaLurk:597873265939054595>',
//         '<:DorcaLoop:672804546673901569>',
//         '<:DorcaMad:597873266094243954>'
//     ]),
// ]

// // find string in message
// function SearchForString(message, target) {
//     // console.log('looking for target...');
//     if (message.content.includes(target)) {
//         return true;
//     }

//     if (message.embeds.length < 1) {
//         return false;
//     }

//     for (let i = 0; i < message.embeds.length; i++) {
//         if (message.embeds[i].title == null) {
//             continue;
//         }

//         if (message.embeds[i].title.includes(target)) {
//             return true;
//         }
//     }

//     return false;
// }

// // Reactions upon string
// async function ReactUpon(message, reactions) {
//     for (let i = 0; i < reactions.length; i++) {
//         try {
//             await message.react(reactions[i]);
//         } catch (error) {
//             console.log('unknown Emoji');
//             message.reply('unknown Emoji: ' + reactions[i]);
//         }
//     }
// }

// client.on('messageCreate', async message => {
//     for (let i = 0; i < triggers.length; i++) {
//         const trigger = triggers[i];
//         if (!SearchForString(message, trigger.word)) {
//             continue;
//         }

//         ReactUpon(message, trigger.reactions);
//     }
// });

client.login(token);
