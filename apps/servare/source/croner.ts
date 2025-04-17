import { Cron } from "croner";
import { deleteOldMessages } from "./features/message-log.js";
import pino from "./pino.js";

export default function croner() {
	new Cron(
		"0 0 0 * * *",
		{ catch: (error) => pino.error(error, "Error deleting old messages.") },
		async () => deleteOldMessages(),
	);
}
