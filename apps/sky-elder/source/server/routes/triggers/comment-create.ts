import { redis, settings } from "@devvit/web/server";
import type { OnCommentCreateRequest } from "@devvit/web/shared";
import {
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import type { Request } from "express";
import { COMMENT_CREATE_COLOUR, SETTINGS_COMMENTS_WEBHOOK_URL } from "../../utility/constants.js";

export async function postTriggersCommentCreate(req: Request) {
	const body = req.body as OnCommentCreateRequest;
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
}
