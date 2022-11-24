const levelSchema = require('../../schemas/level')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("revoke-xp")
        .setDescription("Removes XP from a user")
        .addUserOption(option => option.setName('user').setDescription("Who do you want to remove XP to?").setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription("Amount of XP to remove").setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        const xp = interaction.options.getInteger('amount')
        const database = await levelSchema.findOne({ user_id: user.id })
        if (!database) {
            try {
                return interaction.reply(`This user hasn't gotten any XP yet`)
            } catch (error) {

            }
        }
        if (database.xp < xp) return interaction.reply(`This user doesn't have this much XP.`)
        database.level = Math.floor((database.xp - xp) / 300)
        database.xp = database.xp - xp
        await database.save()
        try {
            return interaction.reply(`Removed ${xp} XP from ${user}`)
        } catch (error) {

        }
    }
}

