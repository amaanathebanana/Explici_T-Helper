const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
const ms = require('ms')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mutes a user")
        .addUserOption(option => option.setName('user').setDescription("The user you want to mute").setRequired(true))
        .addStringOption(option => option.setName('length').setDescription("How long do you want to mute this user for?.").setRequired(true)),

    async execute(interaction, client) {
        let member = interaction.options.getMember('user')
        let user = interaction.options.getUser('user')
        let length = ms(interaction.options.getString('length'))
        if (length < 1) return interaction.reply('You cannot mute for less than a second')
        if (length > 1209600000) return interaction.reply('You cannot mute for more than 14 days')
        try {
            member.timeout(length)
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while muting \`${user.username}#${user.discriminator}\``)
        }
        await interaction.reply(`Muted \`${user.username}#${user.discriminator}\` for ${interaction.options.getString('length')}`)
    }
}