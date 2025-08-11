import { skyToday, TIME_ZONE } from "@thatskyapplication/utility";
import { Cron } from "croner";
import { request } from "undici";
import {
	distribute,
	resetDailyGuides,
	resetDailyGuidesDistribution,
} from "./features/daily-guides.js";
import { end } from "./features/giveaway.js";
import pg from "./pg.js";
import pino from "./pino.js";
import { FLIGHT_CHECK } from "./utility/configuration.js";
import { GIVEAWAY_END_DATE } from "./utility/constants.js";

export default function croner() {
	new Cron("0 0 0 * * *", { timezone: TIME_ZONE }, async () => {
		await Promise.all([resetDailyGuides(), resetDailyGuidesDistribution()]);
		await distribute();
		const today = skyToday();

		if (
			today.year === GIVEAWAY_END_DATE.year &&
			today.month === GIVEAWAY_END_DATE.month &&
			today.day === GIVEAWAY_END_DATE.day
		) {
			await end();
		}
	});

	if (FLIGHT_CHECK) {
		new Cron("*/5 * * * *", async () => {
			try {
				await pg.select(1);
			} catch (error) {
				pino.error(error, "[Flight Check] Database failed.");
				return;
			}

			await request("https://flight-check.thatskyapplication.com", {
				method: "GET",
				headers: { Authorization: `Bearer ${FLIGHT_CHECK}` },
			});
		});
	}
}
