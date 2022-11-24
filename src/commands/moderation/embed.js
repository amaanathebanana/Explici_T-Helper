const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder,  } = require("discord.js");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sends an embed")
        .addChannelOption(option => option.setName('channel').setDescription('Channel to send the embed to').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('Embed Title').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('Embed Message').setRequired(true))

        ,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('title')
        const message = interaction.options.getString('message')

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(title)
            .setDescription(message)
        try {
            await channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            return interaction.reply({ content: 'Failed to send embed. Check console for more info', ephemeral: true })
        }
        await interaction.reply(`Successfully sent embed to ${channel}`)
    }
}

