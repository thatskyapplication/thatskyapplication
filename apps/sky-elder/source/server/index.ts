import "./i18next.js";
import { context, createServer, getServerPort, reddit, redis, settings } from "@devvit/web/server";
import type {
	OnCommentCreateRequest,
	OnCommentDeleteRequest,
	OnPostFlairUpdateRequest,
	OnPostSubmitRequest,
	T1,
	T3,
	Toast,
} from "@devvit/web/shared";
import {
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
} from "@thatskyapplication/utility";
import {
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import express from "express";
import { t } from "i18next";
import { postFlairsUpdate } from "./features/post-flairs.js";
import {
	COMMENT_CREATE_COLOUR,
	COMMENT_DELETE_COLOUR,
	REDIS_POST_FLAIRS_BY_POST_KEY,
	REDIS_POST_FLAIRS_KEY,
	REDIS_WIDGET_DAILY_GUIDES_KEY,
	SETTINGS_COMMENTS_WEBHOOK_URL,
} from "./utility/constants.js";

const app = express().use(express.json());
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

router.post("/internal/menu/daily-guides", async (_, res) => {
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

router.post("/internal/scheduler/daily-guides", async (_, res) => {
	try {
		await dailyGuidesWidgetUpdate();
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to schedule daily guides.",
		});
	}
});

router.post("/internal/triggers/on-comment-create", async (req, res) => {
	const body = req.body as OnCommentCreateRequest;

	try {
		const discordWebhookURL = await settings.get(SETTINGS_COMMENTS_WEBHOOK_URL);

		if (typeof discordWebhookURL !== "string") {
			console.warn("Discord webhook URL is not set.");
			return;
		}

		const { comment, subreddit, author, post } = body;

		if (!(comment && subreddit && author && post)) {
			throw new Error("Comment, subreddit, or author is missing from the request body.");
		}

		const date = new Date();
		date.setUTCDate(date.getUTCDate() + 7);

		await Promise.all([
			redis.set(comment.id, comment.body, { expiration: date }),
			fetch(`${discordWebhookURL}?wait=true&with_components=true`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					allowed_mentions: { parse: [] },
					components: [
						{
							type: ComponentType.Container,
							accent_color: COMMENT_CREATE_COLOUR,
							components: [
								{
									type: ComponentType.Section,
									accessory: {
										type: ComponentType.Button,
										style: ButtonStyle.Link,
										url: `https://reddit.com${comment.permalink}`,
										label: "View",
									},
									components: [
										{
											type: ComponentType.TextDisplay,
											content: `[u/${author.name}](${author.url}) commented on [${post.title}](https://reddit.com${post.permalink})`,
										},
									],
								},
								{
									type: ComponentType.TextDisplay,
									content: comment.body,
								},
								{
									type: ComponentType.Separator,
									divider: true,
									spacing: SeparatorSpacingSize.Small,
								},
								{
									type: ComponentType.TextDisplay,
									content: `-# Karma: ${author.karma.toLocaleString()}`,
								},
							],
						},
					],
					flags: MessageFlags.IsComponentsV2,
				}),
			}),
		]);
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to trigger comment create.",
		});
	}
});

router.post("/internal/triggers/on-comment-delete", async (req, res) => {
	const body = req.body as OnCommentDeleteRequest;

	try {
		const discordWebhookURL = await settings.get(SETTINGS_COMMENTS_WEBHOOK_URL);

		if (typeof discordWebhookURL !== "string") {
			console.warn("Discord webhook URL is not set.");
			return;
		}

		const { commentId, subreddit, author, postId } = body;

		if (!(subreddit && author)) {
			throw new Error("Subreddit or author is missing from the request body.");
		}

		const [post, comment, commentBody] = await Promise.all([
			reddit.getPostById(postId as T3),
			reddit.getCommentById(commentId as T1),
			redis.get(commentId as T1),
		]);

		if (!commentBody) {
			return;
		}

		await Promise.all([
			redis.del(commentId as T1),
			fetch(`${discordWebhookURL}?wait=true&with_components=true`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					allowed_mentions: { parse: [] },
					components: [
						{
							type: ComponentType.Container,
							accent_color: COMMENT_DELETE_COLOUR,
							components: [
								{
									type: ComponentType.Section,
									accessory: {
										type: ComponentType.Button,
										style: ButtonStyle.Link,
										url: `https://reddit.com${comment.permalink}`,
										label: "View",
									},
									components: [
										{
											type: ComponentType.TextDisplay,
											content: `[u/${author.name}](${author.url}) deleted their comment on [${post.title}](https://reddit.com${post.permalink})`,
										},
									],
								},
								{
									type: ComponentType.TextDisplay,
									content: commentBody,
								},
								{
									type: ComponentType.Separator,
									divider: true,
									spacing: SeparatorSpacingSize.Small,
								},
								{
									type: ComponentType.TextDisplay,
									content: `-# Karma: ${author.karma.toLocaleString()} | Reports: ${comment.numReports.toLocaleString()}`,
								},
							],
						},
					],
					flags: MessageFlags.IsComponentsV2,
				}),
			}),
		]);
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to trigger comment delete.",
		});
	}
});

router.post("/internal/triggers/on-post-flair-update", async (req, res) => {
	const body = req.body as OnPostFlairUpdateRequest;

	try {
		const { subreddit, post } = body;

		if (!(subreddit && post)) {
			throw new Error("Subreddit or post is missing from the request body.");
		}

		// Get the prior post flair if we have it.
		const priorFlair = await redis.hGet(REDIS_POST_FLAIRS_BY_POST_KEY, post.id);

		if (priorFlair) {
			// If there is a prior flair, we should decrement its count, but only if it exists.
			const priorFlairCount = await redis.hGet(REDIS_POST_FLAIRS_KEY, priorFlair);

			if (priorFlairCount) {
				await redis.hIncrBy(REDIS_POST_FLAIRS_KEY, priorFlair, -1);
			}
		}

		// If there is a new flair, increment it. Else, remove it.
		// The payload would be present with empty values if removed.
		if (post.linkFlair?.templateId) {
			await Promise.all([
				redis.hIncrBy(REDIS_POST_FLAIRS_KEY, post.linkFlair.templateId, 1),
				redis.hSet(REDIS_POST_FLAIRS_BY_POST_KEY, { [post.id]: post.linkFlair.templateId }),
			]);
		} else {
			await redis.hDel(REDIS_POST_FLAIRS_BY_POST_KEY, [post.id]);
		}

		// Update on Discord.
		await postFlairsUpdate(subreddit.name);
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to trigger post flair update.",
		});
	}
});

router.post("/internal/triggers/on-post-submit", async (req, res) => {
	const body = req.body as OnPostSubmitRequest;

	try {
		const { subreddit, post } = body;

		if (!(subreddit && post)) {
			throw new Error("Subreddit or post is missing from the request body.");
		}

		// The payload would be present with empty values if removed.
		if (!post.linkFlair?.templateId) {
			return;
		}

		await Promise.all([
			redis.hIncrBy(REDIS_POST_FLAIRS_KEY, post.linkFlair.templateId, 1),
			// The post flair update trigger does not contain the prior flair. Store it for future use.
			redis.hSet(REDIS_POST_FLAIRS_BY_POST_KEY, { [post.id]: post.linkFlair.templateId }),
		]);

		await postFlairsUpdate(subreddit.name);
	} catch (error) {
		console.error(error);

		res.status(400).json({
			message: "Failed to trigger post submit.",
		});
	}
});

app.use(router);
const server = createServer(app);
server.on("error", (error) => console.error(error));
server.listen(getServerPort());
