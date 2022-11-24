const { InteractionType } = require("discord.js");
const config = require('../../../config.json')
module.exports = {
    id: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            if (command.developer && (!interaction.member._roles.includes(config.botManagerRole)))
                return interaction.reply({
                    content: "You do not have access to this command!",
                    ephemeral: true
                });
            try {
                command.execute(interaction, client);                
            } catch (error) {
                console.log(error)
            }
        }
        else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return;
            if (button == undefined) return;
            if (button.developer && (!interaction.member._roles.includes(config.botManagerRole)))
                return interaction.reply({
                    content: "You do not have access to this button!",
                    ephemeral: true
                });
            button.execute(interaction, client);
        }

        else if (interaction.isSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);
            if (!selectMenu) return;
            if (selectMenu == undefined) return;
            if (selectMenu.developer && (!interaction.member._roles.includes(config.botManagerRole)))
                return interaction.reply({
                    content: "You do not have permission to use this!",
                    ephemeral: true
                });
            await selectMenu.execute(interaction, client);
        }
        else if (interaction.type == InteractionType.ModalSubmit) {
            const modal = client.modals.get(interaction.customId);
            if (!modal) return;
            if (modal == undefined) return;
            if (modal.developer && (!interaction.member._roles.includes(config.botManagerRole)))
                return interaction.reply({
                    content: "You do not have access to this modal!",
                    ephemeral: true
                });
            modal.execute(interaction, client);
        }
        else return;
    }
}

