import process from "node:process";
import { GatewayDispatchEvents } from "@discordjs/core";
import { COMMANDS } from "./commands/index.js";
import { client, gateway } from "./fluxer.js";

// oxlint-disable-next-line typescript/no-misused-promises -- AsyncEventEmitter captures rejected listener promises and emits an error event.
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

client.on("error", (error) => console.error(error));

await gateway.connect();

let shuttingDown = false;

async function shutdown(signal: NodeJS.Signals) {
	if (shuttingDown) {
		return;
	}

	shuttingDown = true;
	console.log(`Received ${signal}. Shutting down.`);

	let exitCode = 0;

	try {
		await gateway.destroy();
	} catch (error) {
		exitCode = 1;
		console.error("Error whilst shutting down.", error);
	} finally {
		process.exit(exitCode);
	}
}

process.once("SIGINT", () => {
	void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
	void shutdown("SIGTERM");
});
