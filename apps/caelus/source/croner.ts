import { skyToday, TIME_ZONE } from "@thatskyapplication/utility";
import { Cron } from "croner";
import { request } from "undici";
import { GUILD_CACHE } from "./caches/guilds.js";
import {
	distribute,
	resetDailyGuides,
	resetDailyGuidesDistribution,
} from "./features/daily-guides.js";
import { end } from "./features/giveaway.js";
import pg from "./pg.js";
import pino from "./pino.js";
import { APPLICATION_ID, FLIGHT_CHECK, SUPPORT_SERVER_GUILD_ID } from "./utility/configuration.js";
import { GIVEAWAY_END_DATE } from "./utility/constants.js";

export default function croner() {
	new Cron(
		"0 0 0 * * *",
		{ catch: (error) => pino.error(error, "Error during changing days."), timezone: TIME_ZONE },
		async () => {
			const today = skyToday();
			const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

			if (!guild) {
				pino.error("Could not find the support server whilst resetting daily guides.");
				return;
			}

			const me = await guild.fetchMe();

			await Promise.all([
				resetDailyGuides({ user: me.user, lastUpdatedAt: today.toJSDate() }),
				resetDailyGuidesDistribution(),
			]);

			await distribute({
				user: me.user,
				lastUpdatedUserId: APPLICATION_ID,
				lastUpdatedAt: today.toJSDate(),
				force: true,
			});

			if (
				today.year === GIVEAWAY_END_DATE.year &&
				today.month === GIVEAWAY_END_DATE.month &&
				today.day === GIVEAWAY_END_DATE.day
			) {
				await end();
			}
		},
	);

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
