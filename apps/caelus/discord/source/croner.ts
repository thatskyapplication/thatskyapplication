import { captureCheckIn } from "@sentry/node";
import { Cron } from "croner";
import {
	type DailyGuidesDistributionOptions,
	dailyGuidesNewDayCheck,
	distribute,
} from "./features/daily-guides.js";
import { messageLogDeleteOldMessages } from "./features/message-log.js";
import pg from "./pg.js";
import pino from "./pino.js";

new Cron("*/5 * * * *", async () => {
	const now = Date.now();
	const checkInId = captureCheckIn({ monitorSlug: "caelus", status: "in_progress" });
	const promises = [pg.select(1), messageLogDeleteOldMessages(), dailyGuidesNewDayCheck()];
	const distributeOptions: DailyGuidesDistributionOptions | null = null;

	try {
		const settled = await Promise.allSettled(promises);
		const errors = [];

		for (const result of settled) {
			if (result.status === "fulfilled") {
				continue;
			}

			errors.push(result.reason);
		}

		if (errors.length > 0) {
			throw new AggregateError(errors, "Errors during cron job execution.");
		}

		if (distributeOptions) {
			await distribute(distributeOptions);
		}

		captureCheckIn({
			monitorSlug: "caelus",
			status: "ok",
			checkInId,
			duration: (Date.now() - now) / 1000,
		});
	} catch (error) {
		await Promise.allSettled(promises);

		pino.error(error, "Error during cron job execution.");

		captureCheckIn({
			monitorSlug: "caelus",
			status: "error",
			checkInId,
			duration: (Date.now() - now) / 1000,
		});
	}
});
