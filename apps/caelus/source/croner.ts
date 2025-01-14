import process from "node:process";
import { Cron } from "croner";
import { request } from "undici";
import DailyGuides from "./models/DailyGuides.js";
import pg from "./pg.js";
import pino from "./pino.js";
import { distribute, reset } from "./services/daily-guides.js";
import { FLIGHT_CHECK, PRODUCTION } from "./utility/constants.js";
import { TIME_ZONE } from "./utility/dates.js";

export default function croner() {
	new Cron("0 0 0 * * *", { timezone: TIME_ZONE }, async () => {
		await Promise.all([DailyGuides.reset(), reset()]);
		await distribute();
	});

	if (PRODUCTION) {
		if (!FLIGHT_CHECK) {
			pino.fatal("Missing Flight Check authorisation.");
			process.exit(1);
		}

		new Cron("*/5 * * * *", async () => {
			try {
				await pg.select(1);
			} catch (error) {
				pino.error(error, "[Flight Check] Database failed.");
				return;
			}

			await request("https://flight-check.jiralite.workers.dev", {
				method: "GET",
				headers: { Authorization: `Bearer ${FLIGHT_CHECK}` },
			});
		});
	}
}
