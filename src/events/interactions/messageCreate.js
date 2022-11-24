const levelSchema = require('../../schemas/level')
const { EmbedBuilder } = require('discord.js')
module.exports = {
    id: "messageCreate",
    async execute(interaction, client) {
        if (!interaction.guild) return;
        if (interaction.author.bot) return;
        
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1 | Max 30
        const database = await levelSchema.findOne({ user_id: interaction.author.id })
        if (!database) {
            const addDB = new levelSchema({
                user_id: interaction.author.id,
                xp: randomAmountOfXp,
                level: 0,
                messages: 1
            })
            await addDB.save()
            return;
        }
        const newXP = database.xp + randomAmountOfXp
        if (newXP > (database.level * 300 + 300)) {
            const level = database.level + 1
            const levelEmbed = new EmbedBuilder()
                .setTitle('New Level!')
                .setDescription(`**GG** ${interaction.author}, you just leveled up to level **${level}**!`)

            const sendEmbed = await interaction.channel.send({embeds: [levelEmbed]})
            database.level = database.level + 1
            database.xp = level * 300
            database.messages = database.messages + 1
            await database.save()
            return
        }
        database.xp = database.xp + randomAmountOfXp
        database.messages = database.messages + 1
        await database.save()
    }
}

