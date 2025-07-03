import { clearTimeout, setTimeout } from "node:timers";
import {
	API,
	type APIComponentInContainer,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	RESTJSONErrorCodes,
	type RESTPostAPIWebhookWithTokenJSONBody,
	type RESTPostAPIWebhookWithTokenQuery,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { DiscordAPIError, REST } from "@discordjs/rest";
import {
	emojiConstants,
	formatEmoji,
	type RedditWebhooksPacket,
	Table,
} from "@thatskyapplication/utility";
import { Cron } from "croner";
import { fetchSubredditPosts } from "./features/reddit.js";
import { WebhookExecuteError } from "./models/webbook-execute-error.js";
import { pg } from "./pg.js";
import pino from "./pino.js";
import { PRODUCTION } from "./utility/configuration.js";
import { EXECUTE_TIMEOUT, REDDIT_BASE_URL, REDDIT_COLOUR } from "./utility/constants.js";

interface DiscordPayload {
	over18: boolean;
	payload: (RESTPostAPIWebhookWithTokenJSONBody & RESTPostAPIWebhookWithTokenQuery) & {
		wait: true;
	};
}

const api = new API(new REST());
const emojis = emojiConstants(PRODUCTION);

new Cron(
	"* * * * *",
	{
		catch: (error) => {
			pino.error(error, "Reddit error.");
		},
		protect: true,
	},
	async () => {
		// Fetch webhooks.
		let redditWebhooksPackets = await pg<RedditWebhooksPacket>(Table.RedditWebhooks).select(
			"webhook_id",
			"webhook_token",
		);

		// Don't fetch posts if there are no webhooks.
		if (redditWebhooksPackets.length === 0) {
			return;
		}

		const posts = await fetchSubredditPosts();
		pino.info(posts, "Processing posts.");

		// Construct the payload for Discord.
		const payloads = posts.map((post): DiscordPayload => {
			let { data } = post;
			let authorText = `[u/${data.author}](${REDDIT_BASE_URL}/user/${data.author})`;

			if (data.crosspost_parent_list) {
				if (data.crosspost_parent_list.length > 1) {
					pino.warn(post, "Multiple crossposts found!");
				}

				data = data.crosspost_parent_list[0]!;

				authorText +=
					post.data.author === data.author
						? ` crossposted their own post from [${data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${data.subreddit_name_prefixed})`
						: ` crossposted from [${data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${data.subreddit_name_prefixed}) by [u/${data.author}](${REDDIT_BASE_URL}/user/${data.author})`;
			}

			const containerComponents: APIComponentInContainer[] = [
				{
					type: ComponentType.TextDisplay,
					content: `## ${data.title.replace(/^#+/g, (match) => match.replace(/#/g, "\\#"))}`,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: `${REDDIT_BASE_URL}${post.data.permalink}`,
						label: "View",
					},
					components: [{ type: ComponentType.TextDisplay, content: authorText }],
				},
			];

			if (data.selftext.length > 0) {
				containerComponents.push({ type: ComponentType.TextDisplay, content: data.selftext });
			}

			const urls = [];

			if (data.is_video && data.secure_media) {
				urls.push(data.secure_media.reddit_video.fallback_url);
			}

			for (const mediaMetadataItem of Object.values(data.media_metadata ?? {})) {
				urls.push(mediaMetadataItem.s.u);
			}

			if (data.domain === "i.redd.it") {
				urls.push(data.url);
			}

			if (urls.length > 0) {
				containerComponents.push({
					type: ComponentType.MediaGallery,
					// Reddit has a maximum of 20 assets. Discord has a maximum of 10.
					items: urls.slice(0, 10).map((url) => ({ media: { url } })),
				});
			}

			containerComponents.push(
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `-# ${formatEmoji(emojis.MISCELLANEOUS_EMOJIS.Reddit)} [${post.data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${post.data.subreddit_name_prefixed}) (<t:${post.data.created_utc}:R>)`,
				},
			);

			return {
				over18: post.data.over_18 || data.over_18,
				payload: {
					allowed_mentions: { parse: [] },
					components: [
						{
							type: ComponentType.Container,
							components: containerComponents,
							accent_color: REDDIT_COLOUR,
							spoiler: post.data.spoiler,
						},
					],
					flags: MessageFlags.IsComponentsV2,
					wait: true,
					with_components: true,
				},
			};
		});

		// Execute webhooks.
		for (const payload of payloads) {
			if (payload.over18) {
				continue;
			}

			const abortController = new AbortController();
			const timeout = setTimeout(() => abortController.abort(), EXECUTE_TIMEOUT);

			const promises = redditWebhooksPackets.map((redditWebhooksPacket) =>
				api.webhooks
					.execute(
						redditWebhooksPacket.webhook_id,
						redditWebhooksPacket.webhook_token,
						payload.payload,
						{ signal: abortController.signal },
					)
					.catch((error) => Promise.reject(new WebhookExecuteError(redditWebhooksPacket, error))),
			);

			const settled = await Promise.allSettled(promises);
			clearTimeout(timeout);

			for (const result of settled) {
				if (result.status === "rejected") {
					const reason = result.reason as WebhookExecuteError;

					if (
						reason.error instanceof DiscordAPIError &&
						reason.error.code === RESTJSONErrorCodes.UnknownWebhook
					) {
						pino.info(`Deleting unknown webhook ${reason.webhook.webhook_id}.`);

						await pg<RedditWebhooksPacket>(Table.RedditWebhooks)
							.delete()
							.where({ webhook_id: reason.webhook.webhook_id });

						redditWebhooksPackets = redditWebhooksPackets.filter(
							(packet) => packet.webhook_id !== reason.webhook.webhook_id,
						);
					}
				}
			}
		}
	},
);
