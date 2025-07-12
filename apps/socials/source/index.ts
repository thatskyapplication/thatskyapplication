import { Cron } from "croner";
import { jetstream } from "./features/bluesky.js";
import { reddit } from "./features/reddit.js";
import pino from "./pino.js";

new Cron(
	"* * * * *",
	{
		catch: (error) => {
			pino.error(error, "Reddit error.");
		},
		protect: true,
	},
	reddit,
);

jetstream.start();
