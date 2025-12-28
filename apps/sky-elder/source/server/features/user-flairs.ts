import { reddit, settings } from "@devvit/web/server";
import type { UserV2 } from "@devvit/web/shared";
import {
	ComponentType,
	MessageFlags,
	type RESTPostAPIWebhookWithTokenJSONBody,
} from "discord-api-types/v10";
import {
	type EnglishProfaneWord,
	englishDataset,
	englishRecommendedTransformers,
	RegExpMatcher,
} from "obscenity";
import { SETTINGS_USER_LINK_FLAIRS_WEBHOOK_URL } from "../utility/constants.js";

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

export async function userFlairsCheckFlair(user: UserV2) {
	const discordWebhookURL = await settings.get(SETTINGS_USER_LINK_FLAIRS_WEBHOOK_URL);

	if (typeof discordWebhookURL !== "string") {
		console.warn("Discord webhook URL for user flairs is not set.");
		return;
	}

	const subreddit = await reddit.getCurrentSubreddit();
	const userFlair = await subreddit.getUserFlair({ usernames: [user.name] });
	const userFlairText = userFlair.users[0]?.flairText;

	if (!userFlairText) {
		return;
	}

	const matches = matcher.getAllMatches(userFlairText);

	if (matches.length === 0) {
		return;
	}

	const result = new Set<EnglishProfaneWord>();

	for (const match of matches) {
		const { phraseMetadata } = englishDataset.getPayloadWithPhraseMetadata(match);

		if (phraseMetadata?.originalWord) {
			result.add(phraseMetadata.originalWord);
		}
	}

	await fetch(`${discordWebhookURL}?wait=true&with_components=true`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			allowed_mentions: { parse: [] },
			components: [
				{
					type: ComponentType.Container,
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `[u/${user.name}](${user.url}) flagged for potentially inappropriate user flair.`,
						},
						{
							type: ComponentType.TextDisplay,
							content: `**Flair:** ${userFlairText}\n-# Detected: ${[...result].join(" | ")}`,
						},
					],
				},
			],
			flags: MessageFlags.IsComponentsV2,
		} satisfies RESTPostAPIWebhookWithTokenJSONBody),
	});
}
