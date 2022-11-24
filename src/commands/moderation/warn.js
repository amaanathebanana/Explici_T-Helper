const { SlashCommandBuilder, EmbedBuilder, } = require("discord.js");
const warnSchema = require('../../schemas/warn')
const warningsSchema = require('../../schemas/warnings')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warns a user")
        .addUserOption(option => option.setName('user').setDescription("The user you want to warn").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Why are you warn this user").setRequired(true)),

    async execute(interaction, client) {
        let member = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        let database = await warnSchema.findOne({ user_id: member.id })
        if (!database) {
            const addDB = new warnSchema({
                user_id: member.id,
                warnAmount: '0'
            })
            await addDB.save()
            database = await warnSchema.findOne({ user_id: member.id })
            if (!database) return interaction.reply(`An error occured while warning \`${member.username}#${member.discriminator}\``)
        }
        if (!database) return interaction.reply(`An error occured while warning \`${member.username}#${member.discriminator}\``)
        try {
            const newDB = new warningsSchema({
                user_id: member.id,
                reason: reason
            })
            await newDB.save()
            database.warnAmount = database.warnAmount + 1
            await database.save()
        } catch (error) {
            console.log(error)
            return interaction.reply(`An error occured while warning \`${member.username}#${member.discriminator}\``)
        }
        await interaction.reply(`Warned \`${member.username}#${member.discriminator}\` for ${reason}. They have ${database.warnAmount} warns`)
    }
}