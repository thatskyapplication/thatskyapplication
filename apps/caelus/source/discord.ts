import {
	Client,
	GatewayIntentBits,
	type RESTGetAPIGatewayBotResult,
	Routes,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { DISCORD_TOKEN } from "./utility/configuration.js";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

export const gateway = new WebSocketManager({
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildExpressions |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	fetchGatewayInformation: () =>
		rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>,
	token: DISCORD_TOKEN,
});

export const client = new Client({ rest, gateway });
