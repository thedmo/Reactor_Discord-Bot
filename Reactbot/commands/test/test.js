const {SlashCommandBuilder} = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()
	    .setName('test')
	    .setDescription('replies to test slash command'),
    
    async execute(interaction){
        await interaction.reply('It doth works!');
    }
}
