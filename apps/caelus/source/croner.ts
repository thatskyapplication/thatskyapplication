import { captureCheckIn } from "@sentry/node";
import { skyToday, TIME_ZONE } from "@thatskyapplication/utility";
import { Cron } from "croner";
import { GUILD_CACHE } from "./caches/guilds.js";
import {
	distribute,
	resetDailyGuides,
	resetDailyGuidesDistribution,
} from "./features/daily-guides.js";
import { end } from "./features/giveaway.js";
import pg from "./pg.js";
import pino from "./pino.js";
import { APPLICATION_ID, PRODUCTION, SUPPORT_SERVER_GUILD_ID } from "./utility/configuration.js";
import { GIVEAWAY_END_DATE } from "./utility/constants.js";

export default function croner() {
	new Cron(
		"0 0 0 * * *",
		{ catch: (error) => pino.error(error, "Error during changing days."), timezone: TIME_ZONE },
		async () => {
			const today = skyToday();
			const independentPromises = [];

			if (
				today.year === GIVEAWAY_END_DATE.year &&
				today.month === GIVEAWAY_END_DATE.month &&
				today.day === GIVEAWAY_END_DATE.day
			) {
				independentPromises.push(end());
			}

			const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

			if (!guild) {
				pino.error("Could not find the support server whilst resetting daily guides.");
				await Promise.all(independentPromises);
				return;
			}

			const me = await guild.fetchMe();

			await Promise.all([
				...independentPromises,
				resetDailyGuides({ user: me.user, lastUpdatedAt: today.toJSDate() }),
				resetDailyGuidesDistribution(),
			]);

			await distribute({
				user: me.user,
				lastUpdatedUserId: APPLICATION_ID,
				lastUpdatedAt: today.toJSDate(),
				force: true,
			});
		},
	);

	if (PRODUCTION) {
		new Cron(
			"*/5 * * * *",
			{ catch: () => captureCheckIn({ monitorSlug: "caelus", status: "error" }) },
			async () => {
				await pg.select(1);
				captureCheckIn({ monitorSlug: "caelus", status: "ok" });
			},
		);
	}
}
