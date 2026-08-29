import process from "node:process";
import database from "./database.js";
import { jetstream } from "./features/bluesky.js";
import pino from "./pino.js";

jetstream.start();

let shuttingDown = false;

async function shutdown(signal: NodeJS.Signals) {
	if (shuttingDown) {
		return;
	}

	shuttingDown = true;
	pino.info(`Received ${signal}. Shutting down.`);

	let exitCode = 0;

	try {
		jetstream.close();
		await database.destroy();
	} catch (error) {
		exitCode = 1;
		pino.error(error, "Error whilst shutting down.");
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
