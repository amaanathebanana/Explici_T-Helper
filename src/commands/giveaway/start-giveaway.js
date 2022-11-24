const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("start-giveaway")
        .setDescription("Start a giveaway")
        .addStringOption(option => option.setName('duration').setDescription('How long the giveaway should last for').setRequired(true))
        .addIntegerOption(option => option.setName('winners').setDescription('How many winners the giveaway should have').setRequired(true))
        .addStringOption(option => option.setName('prize').setDescription('What should the giveaway prize should be').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to start the giveaway in').setRequired(true)),
    async execute(interaction, client) {

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');

        if (!giveawayChannel.isTextBased()) {
            return interaction.reply({
                content: ':x: Selected channel is not a text channel.',
                ephemeral: true
            });
        }

        client.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinnerCount,
            hostedBy: interaction.user,
        });

        interaction.reply(`Giveaway started in ${giveawayChannel}!`);

    }

};
