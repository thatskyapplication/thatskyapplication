import { reddit, redis, settings } from "@devvit/web/server";
import type { OnCommentDeleteRequest, T1, T3 } from "@devvit/web/shared";
import {
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import type { Request } from "express";
import { COMMENT_DELETE_COLOUR, SETTINGS_COMMENTS_WEBHOOK_URL } from "../../utility/constants.js";

export async function postTriggersCommentDelete(req: Request) {
	const body = req.body as OnCommentDeleteRequest;
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
		redis.del(commentId),
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
										content: `[u/${author.name}](${author.url})'s comment was deleted on [${post.title}](https://reddit.com${post.permalink})`,
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
}
