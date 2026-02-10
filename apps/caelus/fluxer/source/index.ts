import { GatewayDispatchEvents } from "@discordjs/core";
import { COMMANDS } from "./commands/index.js";
import { client, gateway } from "./fluxer.js";

client.on(GatewayDispatchEvents.MessageCreate, async ({ data }) => {
	if (!data.content.startsWith("/")) {
		return;
	}

	const name = data.content.slice(1).split(/\s/)[0];
	const command = COMMANDS.find((command) => command.names.includes(name!));

	if (command) {
		await command.execute(data);
	}
});

client.on(GatewayDispatchEvents.Ready, ({ data }) => {
	console.log(`Logged in as ${data.user.username}#${data.user.discriminator}`);
});

gateway.connect();
