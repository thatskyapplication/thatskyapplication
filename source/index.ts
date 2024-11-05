import process from "node:process";
import { Client, GatewayIntentBits } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import "./i18next.js"; // Must be first.
import events, { type Event } from "./events/index.js";
import pino from "./pino.js";
import { TOKEN } from "./utility/constants.js";

if (!TOKEN) {
	pino.fatal("Missing Discord token.");
	process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

const gateway = new WebSocketManager({
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	rest,
	token: TOKEN,
});

const client = new Client({ rest, gateway });

for (const event of events) {
	const { name, once, fire }: Event = event;
	client[once ? "once" : "on"](name, fire);
}

void gateway.connect();
