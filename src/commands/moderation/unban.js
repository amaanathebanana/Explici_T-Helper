const { SlashCommandBuilder, EmbedBuilder,  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unbans a user")
        .addStringOption(option => option.setName('id').setDescription("The id of the user you want to unban").setRequired(true)),
        

    async execute(interaction, client) {
        const id = interaction.options.getString('id')
        try {
            await interaction.guild.members.unban(id)            
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while unbanning`)
        }
        await interaction.reply(`Unbanned ${id}`)
    }
}