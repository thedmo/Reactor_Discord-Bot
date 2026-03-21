const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} = require('discord.js');

const RSVP_PREFIX = 'rsvp';
const OPTION_YES = 'yes';
const OPTION_NO = 'no';
const OPTION_MAYBE = 'maybe';

const polls = new Map();

function getInitialCounts() {
  return {
    [OPTION_YES]: 0,
    [OPTION_NO]: 0,
    [OPTION_MAYBE]: 0,
  };
}

function buildEmbed(counts) {
  return new EmbedBuilder()
    .setTitle('RSVP')
    .setDescription(
      [
        `Yes: **${counts[OPTION_YES]}**`,
        `No: **${counts[OPTION_NO]}**`,
        `Maybe: **${counts[OPTION_MAYBE]}**`,
      ].join('\n'),
    )
    .setColor(0x2f3136);
}

function buildButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`${RSVP_PREFIX}:${OPTION_YES}`)
      .setLabel('Yes')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`${RSVP_PREFIX}:${OPTION_NO}`)
      .setLabel('No')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId(`${RSVP_PREFIX}:${OPTION_MAYBE}`)
      .setLabel('Maybe')
      .setStyle(ButtonStyle.Secondary),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rsvp')
    .setDescription('Create an RSVP poll with Yes/No/Maybe buttons.'),
  async execute(interaction) {
    const counts = getInitialCounts();

    await interaction.reply({
      embeds: [buildEmbed(counts)],
      components: [buildButtons()],
    });

    const message = await interaction.fetchReply();
    polls.set(message.id, {
      counts,
      userVotes: new Map(),
    });
  },
  async handleButton(interaction) {
    const [prefix, option] = interaction.customId.split(':');
    if (prefix !== RSVP_PREFIX) return;

    const poll = polls.get(interaction.message.id);
    if (!poll) {
      await interaction.reply({
        content: 'This RSVP poll is no longer active.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(poll.counts, option)) {
      await interaction.reply({
        content: 'Invalid RSVP option.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const previousOption = poll.userVotes.get(interaction.user.id);

    if (previousOption === option) {
      await interaction.reply({
        content: `You already selected ${option}.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (previousOption) {
      poll.counts[previousOption] -= 1;
    }

    poll.userVotes.set(interaction.user.id, option);
    poll.counts[option] += 1;

    await interaction.update({
      embeds: [buildEmbed(poll.counts)],
      components: [buildButtons()],
    });
  },
};