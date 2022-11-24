const { SlashCommandBuilder, EmbedBuilder,  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a user")
        .addUserOption(option => option.setName('user').setDescription("The user you want to ban").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Why are you banning this user").setRequired(true)),
        

    async execute(interaction, client) {
        let user = interaction.options.getMember('user')
        let member = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        try {
            await user.ban()            
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while banning \`${member.username}#${member.discriminator}\``)
        }
        await interaction.reply(`Banned \`${member.username}#${member.discriminator}\` for ${reason}`)
    }
}