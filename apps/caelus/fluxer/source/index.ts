import {
	Client,
	GatewayDispatchEvents,
	type RESTGetAPIGatewayBotResult,
	Routes,
} from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { FLUXER_TOKEN } from "./utility/configuration.js";

const rest = new REST({
	api: "https://api.fluxer.app",
	version: "1",
}).setToken(FLUXER_TOKEN);

const gateway = new WebSocketManager({
	token: FLUXER_TOKEN,
	intents: 0,
	fetchGatewayInformation: () =>
		rest.get(Routes.gatewayBot()) as Promise<RESTGetAPIGatewayBotResult>,
	version: "1",
});

export const client = new Client({ rest, gateway });

client.on(GatewayDispatchEvents.MessageCreate, async ({ api, data }) => {
	if (data.content === "ping") {
		await api.channels.createMessage(data.channel_id, { content: "pong" });
	}
});

client.on(GatewayDispatchEvents.Ready, ({ data }) => {
	console.log(`Logged in as ${data.user.username}#${data.user.discriminator}`);
});

gateway.connect();
