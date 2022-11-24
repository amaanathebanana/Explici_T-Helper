const { loadCommands } = require("../../handlers/commandHandler");
const config = require("../../../config.json");
const mongoose = require("mongoose");
const { ActivityType } = require("discord.js");

module.exports = {
    id: "ready",
    once: true,
    async execute(client) {
        await loadCommands(client)
        await mongoose.connect(config.databaseURL).then(() => console.log("Connected to Explici_T Database"));
        console.log(`Logged into ${client.user.username}#${client.user.discriminator} | ${client.user.id}`)
        await client.user.setPresence({
            activities: [
                {
                    name: 'with Community',
                    type: ActivityType.Playing
                }]
        })
    }
}