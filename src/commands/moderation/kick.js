const { SlashCommandBuilder, EmbedBuilder,  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user")
        .addUserOption(option => option.setName('user').setDescription("The user you want to kick").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Why are you kicking this user").setRequired(true)),
        

    async execute(interaction, client) {
        let user = interaction.options.getMember('user')
        let member = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        try {
            await user.kick()            
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while kicking \`${member.username}#${member.discriminator}\``)
        }
        await interaction.reply(`Kicked \`${member.username}#${member.discriminator}\` for ${reason}`)
    }
}