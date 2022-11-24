const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const levelSchema = require('../../schemas/level')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Shows the server leaderboard"),

    async execute(interaction, client) {
        const database = await levelSchema.find({}).sort({ xp: -1 })
        if (!database) {
            const levelEmbed = new EmbedBuilder()
                .setTitle('Leaderboard')
                .setColor('Blurple')
                .setDescription(`No one has any XP on this server yet`)
            try {
                return interaction.reply({ embeds: [levelEmbed] })
            } catch (error) {

            }
        }
        let users = []
        for (xpHolder in database) {
            if (xpHolder == 12) return
            const name = '\u200b'
            const value = `**${parseInt(xpHolder) + 1}. - <@${database[xpHolder].user_id}>**\nLevel ${database[xpHolder].level} | ${database[xpHolder].xp} XP | ${database[xpHolder].messages} messages`
            users.push({ name, value })
        }
        const embed = {
            color: 0x0099ff,
            title: `Explici_T Empire's Top Users`,
            fields: users
        };
        await interaction.reply({ embeds: [embed] })
    }
}