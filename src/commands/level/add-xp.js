const levelSchema = require('../../schemas/level')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("add-xp")
        .setDescription("Add XP to a user")
        .addUserOption(option => option.setName('user').setDescription("Who do you want to add XP to?").setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription("Amount of XP to add").setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        const xp = interaction.options.getInteger('amount')
        const database = await levelSchema.findOne({ user_id: user.id })
        if (!database) {
            const addDB = new levelSchema({
                user_id: interaction.author.id,
                xp: xp,
                level: Math.floor(xp / 300),
                messages: 1
            })
            await addDB.save()
            return interaction.reply(`Added ${xp} XP to ${user}`)
        }
        database.xp = database.xp + xp
        database.level = database.level + Math.floor(xp / 300)
        await database.save()
        return interaction.reply(`Added ${xp} XP to ${user}`)
    }
}

