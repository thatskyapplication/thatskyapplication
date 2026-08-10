import {
	ActivityType,
	Client,
	GatewayIntentBits,
	PresenceUpdateStatus,
	type RESTGetAPIGatewayBotResult,
	Routes,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { type CreateWebSocketManagerOptions, WebSocketManager } from "@discordjs/ws";
import database from "./database.js";
import { DISCORD_TOKEN } from "./utility/configuration.js";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const customStatus = (await database.selectFrom("admin").select("custom_status").executeTakeFirst())
	?.custom_status;

const webSocketManagerOptions: CreateWebSocketManagerOptions = {
	intents:
		GatewayIntentBits.Guilds |
		GatewayIntentBits.GuildMembers |
		GatewayIntentBits.GuildMessages |
		GatewayIntentBits.MessageContent,
	fetchGatewayInformation: () =>
		rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>,
	token: DISCORD_TOKEN,
};

if (customStatus) {
	webSocketManagerOptions.initialPresence = {
		activities: [{ type: ActivityType.Custom, name: customStatus, state: customStatus }],
		afk: false,
		since: null,
		status: PresenceUpdateStatus.Online,
	};
}

export const gateway = new WebSocketManager(webSocketManagerOptions);

export const client = new Client({ rest, gateway });
