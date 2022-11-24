const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("send-roles")
        .setDescription("Send the reaction role panel")
        .addChannelOption(option => option.setName('channel').setDescription('Channel to send the panel message to').setRequired(true))
    ,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel')
        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('Reaction Roles')
            .setDescription('Choose which events you want to be pinged for')
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('giveaway')
                    .setLabel('Giveaway Ping')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('video')
                    .setLabel('Video Ping')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('announcement')
                    .setLabel('Announcement Ping')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('event')
                    .setLabel('Event Ping')
                    .setStyle(ButtonStyle.Success)

            )
        try {
            await channel.send({ embeds: [embed], components: [row] })
        } catch (error) {
            console.log(error)
            return interaction.reply({ content: 'Failed to send embed. Check console for more info', ephemeral: true })
        }
        await interaction.reply(`Successfully sent panel message to ${channel}`)
    }
}

