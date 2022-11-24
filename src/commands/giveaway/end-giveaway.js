const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("end-giveaway")
        .setDescription("End a giveaway via message id")
        .addStringOption(option => option.setName('giveaway').setDescription('Giveaway ID').setRequired(true)),
    async execute(interaction, client) {
        const query = interaction.options.getString('giveaway');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        if (!giveaway) {
            return interaction.reply({
                content: 'Unable to find a giveaway for `' + query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'This giveaway is already ended.',
                ephemeral: true
            });
        }

        client.giveawaysManager.end(giveaway.messageId)
            .then(() => {
                interaction.reply('Giveaway ended!');
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};
