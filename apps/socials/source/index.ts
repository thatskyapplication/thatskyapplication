import { Cron } from "croner";
import { jetstream } from "./features/bluesky.js";
import { reddit } from "./features/reddit.js";
import { captureError } from "./utility/functions.js";

new Cron(
	"* * * * *",
	{
		catch: (error) => {
			if (
				error instanceof Error &&
				// Reddit returns so many internal server errors. Just ignore them.
				(error.message.includes("Internal Server Error") ||
					// Unsure why this happens. Probably more Reddit internal server errors.
					error.message.includes("page not found</title>"))
			) {
				return;
			}

			captureError(error, "Reddit error.");
		},
		protect: true,
	},
	reddit,
);

jetstream.start();
