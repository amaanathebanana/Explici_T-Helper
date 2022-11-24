const { Client, GatewayIntentBits, Partials, Collection, Guild, IntentsBitField } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { GiveawaysManager } = require('discord-giveaways');
const giveawaySchema = require('./src/schemas/giveaway')
const config = require("./config.json");
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.GuildMembers],
    partials: [User, Message, GuildMember, ThreadMember]
});
const { loadInteractions } = require("./src/handlers/interactionHandler")

client.commands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
loadInteractions(client)

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways() {
        return await giveawaySchema.find().lean().exec();
    }

    async saveGiveaway(messageId, giveawayData) {
        await giveawaySchema.create(giveawayData);
        return true;
    }

    async editGiveaway(messageId, giveawayData) {
        await giveawaySchema.updateOne({ messageId }, giveawayData).exec();
        return true;
    }

    async deleteGiveaway(messageId) {
        await giveawaySchema.deleteOne({ messageId }).exec();
        return true;
    }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;

client.login(config.token)