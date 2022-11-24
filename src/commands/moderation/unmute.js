const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmutes a user")
        .addUserOption(option => option.setName('user').setDescription("The user you want to unmute").setRequired(true)),
    async execute(interaction, client) {
        let member = interaction.options.getMember('user')
        let user = interaction.options.getUser('user')
        try {
            member.timeout(1000)
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while unmuting \`${user.username}#${user.discriminator}\``)
        }
        await interaction.reply(`Unmuted \`${user.username}#${user.discriminator}\``)
    }
}