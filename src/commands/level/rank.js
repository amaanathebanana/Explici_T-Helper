const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const levelSchema = require('../../schemas/level')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Show your or another persons rank")
        .addUserOption(option => option.setName('user').setDescription("Who's xp do you want to search")),


    async execute(interaction, client) {
        let member = interaction.options.getUser('user')
        if (member) {
            const database = await levelSchema.findOne({ user_id: member.id })
            if (!database) {
                const levelEmbed = new EmbedBuilder()
                    .setTitle('Rank')
                    .setColor('Blurple')
                    .setDescription(`${member.username}#${member.discriminator} has not sent a message in this server yet`)
                return interaction.reply({ embeds: [levelEmbed] })
            }
            const levelEmbed = new EmbedBuilder()
                .setTitle('Rank')
                .setColor('Blurple')
                .setDescription(`${member.username}#${member.discriminator} has sent ${database.messages} messages, is level ${database.level} and has ${database.xp} XP.`)
            return interaction.reply({ embeds: [levelEmbed] })

        }
        const database = await levelSchema.findOne({ user_id: interaction.user.id })
        if (!database) {
            const levelEmbed = new EmbedBuilder()
                .setTitle('Rank')
                .setColor('Blurple')
                .setDescription(`${member.username}#${member.discriminator} has not sent a message in this server yet`)
            return interaction.reply({ embeds: [levelEmbed] })
        }
        const levelEmbed = new EmbedBuilder()
            .setTitle('Rank')
            .setColor('Blurple')
            .setDescription(`${interaction.user.username}#${interaction.user.discriminator} has sent ${database.messages} messages, is level ${database.level} and has ${database.xp} XP.`)
        return interaction.reply({ embeds: [levelEmbed] })

    }
}