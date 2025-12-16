import "./i18next.js";
import { context, createServer, getServerPort, reddit, redis } from "@devvit/web/server";
import type { Toast } from "@devvit/web/shared";
import {
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
} from "@thatskyapplication/utility";
import express from "express";
import { t } from "i18next";
import { REDIS_WIDGET_DAILY_GUIDES_KEY } from "./utility/constants.js";

const app = express();
const router = express.Router();

async function dailyGuidesWidgetUpdate() {
	const today = skyToday();
	const now = skyNow();
	const season = skyCurrentSeason(today);
	const text = [];

	if (season) {
		text.push(
			`- ${t("days-left.season", {
				ns: "general",
				count: Math.ceil(season.end.diff(now, "days").days) - 1,
			})}`,
		);
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.diff(today, "days").days;
		text.push(`- ${t("daily-guides.season-upcoming", { ns: "features", count: daysUntilStart })}`);
	}

	for (const { id, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.diff(today, "days").days;
		const name = t(`events.${id}`, { ns: "general" });

		if (daysUntilStart > 0) {
			text.push(
				`${t("daily-guides.event-upcoming", { ns: "features", event: name, count: daysUntilStart })}`,
			);
		} else {
			text.push(
				`- ${t("days-left.event", {
					ns: "general",
					count: Math.ceil(end.diff(today, "days").days) - 1,
					name,
				})}`,
			);
		}
	}

	const widgetId = await redis.get(REDIS_WIDGET_DAILY_GUIDES_KEY);

	if (!widgetId) {
		console.info("Daily guides widget not found. Creating one.");

		const widget = await reddit.addWidget({
			subreddit: context.subredditName,
			type: "textarea",
			shortName: "Countdown",
			text: text.join("\n"),
		});

		await redis.set(REDIS_WIDGET_DAILY_GUIDES_KEY, widget.id);
		return;
	}

	try {
		await reddit.updateWidget({
			subreddit: context.subredditName,
			type: "textarea",
			id: widgetId,
			shortName: "Countdown",
			text: text.join("\n"),
		});
	} catch (error) {
		if (Error.isError(error) && error.message.includes("Invalid value for widget_id")) {
			console.info("Daily guides widget id found but widget does not exist. Removing Redis key.");
			await redis.del(REDIS_WIDGET_DAILY_GUIDES_KEY);
			return;
		}

		throw error;
	}
}

router.post("/internal/menu/daily-guides", async (_req, res): Promise<void> => {
	try {
		await dailyGuidesWidgetUpdate();

		res.json({
			showToast: {
				text: "Updated. Reload to see the changes!",
				appearance: "success",
			} satisfies Toast,
		});
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to update the daily guides widget.",
		});
	}
});

router.post("/internal/scheduler/daily-guides", async (_req, res): Promise<void> => {
	try {
		await dailyGuidesWidgetUpdate();
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to schedule daily guides.",
		});
	}
});

app.use(router);
const server = createServer(app);
server.on("error", (error) => console.error(error));
server.listen(getServerPort());
