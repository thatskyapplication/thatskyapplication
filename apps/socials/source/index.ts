import { Cron } from "croner";
import { jetstream } from "./features/bluesky.js";
import { reddit } from "./features/reddit.js";
import pino from "./pino.js";

new Cron(
	"* * * * *",
	{
		catch: (error) => {
			if (error instanceof Error && error.message.includes("Internal Server Error")) {
				// Reddit returns so many internal server errors. Just ignore them.
				return;
			}

			if (typeof error === "string" && error.includes("page not found</title>")) {
				// Unsure why this happens. Probably more Reddit internal server errors.
				return;
			}

			pino.error(error, "Reddit error.");
		},
		protect: true,
	},
	reddit,
);

jetstream.start();
