const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Deletes a number of messages")
        .addIntegerOption(option => option.setName('amount').setDescription("Amount of messages to clear").setRequired(true)),

    async execute(interaction, client) {
        let amount = interaction.options.getInteger('amount')
        const channel = interaction.channel
        try {
            await channel.bulkDelete(amount, true)
        } catch (error) {
            console.log(error)
            return interaction.reply('Error while clearing')
        }
        try {
            await interaction.reply(`Successfully deleted ${amount} messages`)
        } catch (error) {}
    }
}