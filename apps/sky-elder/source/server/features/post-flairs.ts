import { reddit, redis, settings } from "@devvit/web/server";
import {
	ComponentType,
	MessageFlags,
	type RESTPatchAPIWebhookWithTokenMessageJSONBody,
	type RESTPatchAPIWebhookWithTokenMessageResult,
	type RESTPostAPIWebhookWithTokenJSONBody,
	type RESTPostAPIWebhookWithTokenWaitResult,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import {
	REDIS_POST_FLAIRS_KEY,
	REDIS_POST_FLAIRS_MESSAGE_ID_KEY,
	SETTINGS_POST_FLAIRS_WEBHOOK_URL,
} from "../utility/constants.js";

async function postFlairsBody(subredditName: string, statistics: Record<string, string>) {
	const data: { name: string; count: string }[] = [];
	const postFlairTemplates = await reddit.getPostFlairTemplates(subredditName);

	for (const [templateId, count] of Object.entries(statistics)) {
		const postFlairName =
			postFlairTemplates.find((postFlairTemplate) => postFlairTemplate.id === templateId)?.text ??
			templateId;

		data.push({ name: postFlairName, count });
	}

	data.sort((a, b) => a.name.localeCompare(b.name));

	return {
		allowed_mentions: { parse: [] },
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Post flair statistics",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content:
							data.length === 0
								? "No flairs have been used yet."
								: data.map((item) => `- ${item.name}: ${item.count}`).join("\n"),
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: "-# Since 18/12/2025",
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	} satisfies RESTPostAPIWebhookWithTokenJSONBody | RESTPatchAPIWebhookWithTokenMessageJSONBody;
}

export async function postFlairsUpdate(subredditName: string) {
	const discordWebhookURL = await settings.get(SETTINGS_POST_FLAIRS_WEBHOOK_URL);

	if (!discordWebhookURL) {
		console.warn("Discord webhook URL for post flairs is not set.");
		return;
	}

	const messageId = await redis.get(REDIS_POST_FLAIRS_MESSAGE_ID_KEY);
	let url: string;
	let method: "POST" | "PATCH";

	if (messageId) {
		url = `${discordWebhookURL}/messages/${messageId}?with_components=true`;
		method = "PATCH";
	} else {
		url = `${discordWebhookURL}?wait=true&with_components=true`;
		method = "POST";
	}

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(
			await postFlairsBody(subredditName, await redis.hGetAll(REDIS_POST_FLAIRS_KEY)),
		),
	});

	const json = (await response.json()) as
		| RESTPostAPIWebhookWithTokenWaitResult
		| RESTPatchAPIWebhookWithTokenMessageResult;

	if (!response.ok) {
		throw json;
	}

	await redis.set(REDIS_POST_FLAIRS_MESSAGE_ID_KEY, json.id);
}
