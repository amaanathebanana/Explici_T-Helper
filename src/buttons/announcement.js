module.exports = {
    id: "announcement",
    async execute(interaction) {
        const ping = '1044524658533335070'
        const role = await interaction.guild.roles.cache.find(r => r.id === ping)
        if (interaction.member._roles.includes(ping)) {
            try {
                await interaction.member.roles.remove(role)
            } catch (error) {
                console.log(error)
                return interaction.reply({ content: `Couldn't remove the role. Report this to an admin`, ephemeral: true })
            }
            return interaction.reply({ content: `Removed <@&${ping}> from you`, ephemeral: true })
        }
        try {
            await interaction.member.roles.add(role)
        } catch (error) {
            console.log(error)
            return interaction.reply({ content: `Couldn't add the role. Report this to an admin`, ephemeral: true })
        }
        return interaction.reply({ content: `Added <@&${ping}> to you`, ephemeral: true })
    }
}