import { Client, GatewayIntentBits } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import pino from "./pino.js";
import { TOKEN } from "./utility/constants.js";

if (!TOKEN) {
	pino.fatal("Missing Discord token.");
	process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

export const gateway = new WebSocketManager({
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	rest,
	token: TOKEN,
});

export const client = new Client({ rest, gateway });
