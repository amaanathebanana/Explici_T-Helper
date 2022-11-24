const { SlashCommandBuilder, EmbedBuilder,  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("yt")
        .setDescription("Displays Explici_T's youtube"),        

    async execute(interaction, client) {
        try {
            await interaction.reply('https://www.youtube.com/channel/UCBoccBHwmdGb3BJojksXm5Q')
        } catch (error) {
            console.log(error)
        }
    }
}