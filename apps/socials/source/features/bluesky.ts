import type { Facet } from "@atproto/api";
import {
	type APIComponentInContainer,
	type APIMediaGalleryItem,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	RESTJSONErrorCodes,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { CommitType, EventType, Jetstream } from "@skyware/jetstream";
import {
	type BlueskyWebhooksPacket,
	formatEmoji,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { discord } from "../discord.js";
import { WebhookExecuteError } from "../models/webbook-execute-error.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { MAXIMUM_IMAGE_DESCRIPTION_LIMIT } from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import {
	captureError,
	embedLinksInText,
	fetchBlueskyProfile,
	formatBlueskyImageURL,
} from "../utility/functions.js";

const seenPosts = new Map<string, string>();

export const jetstream = new Jetstream({
	wantedCollections: ["app.bsky.feed.post"],
	wantedDids: ["did:plc:rkfwolx4jqhwkrzodefz7xoq"],
});

jetstream.on(EventType.Commit, async (event) => {
	if (event.commit.operation === CommitType.Create) {
		if (event.commit.record.reply) {
			// Ignore replies.
			return;
		}

		const { did } = event;

		// https://github.com/bluesky-social/jetstream#consuming-jetstream
		if (seenPosts.get(did) === event.commit.rkey) {
			pino.info(event, `Skipping ${did} (duplicate check).`);
			return;
		}

		seenPosts.set(did, event.commit.rkey);

		const blueskyWebhooksPackets = await pg<BlueskyWebhooksPacket>(Table.BlueskyWebhooks)
			.select("webhook_id", "webhook_token")
			.where({ did });

		if (blueskyWebhooksPackets.length === 0) {
			return;
		}

		const { record, rkey } = event.commit;
		const { embed, text } = record;
		let displayName: string | undefined;
		let handle: string;

		try {
			({ displayName, handle } = await fetchBlueskyProfile(did));
		} catch (error) {
			captureError(error);
			return;
		}

		const containerComponents: APIComponentInContainer[] = [
			{
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Link,
					url: `https://bsky.app/profile/${did}/post/${rkey}`,
					label: "View",
				},
				components: [
					{
						type: ComponentType.TextDisplay,
						// Display name may be an empty string.
						content: `[${displayName || handle}](https://bsky.app/profile/${did})`,
					},
				],
			},
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
		];

		if (text.length > 0) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: record.facets ? embedLinksInText(text, record.facets as Facet[]) : text,
			});
		}

		const images =
			embed?.$type === "app.bsky.embed.images"
				? embed.images.reduce<{ url: string; description: string }[]>((images, { alt, image }) => {
						if ("ref" in image && image.ref.$link) {
							images.push({
								url: formatBlueskyImageURL(did, image.ref.$link),
								description: alt,
							});
						}

						return images;
					}, [])
				: [];

		if (images.length > 0) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: images.map(({ url, description }) => {
					const mediaGalleryItem: APIMediaGalleryItem = { media: { url } };

					if (description.length > 0) {
						mediaGalleryItem.description =
							description.length > MAXIMUM_IMAGE_DESCRIPTION_LIMIT
								? `${description.slice(0, MAXIMUM_IMAGE_DESCRIPTION_LIMIT - 3)}...`
								: description;
					}

					return mediaGalleryItem;
				}),
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
				content: `-# ${formatEmoji(MISCELLANEOUS_EMOJIS.Bluesky)} [thatskyapplication](${WEBSITE_URL}) <t:${Math.floor(Date.parse(record.createdAt) / 1000)}:R>`,
			},
		);

		const promises = blueskyWebhooksPackets.map((blueskyWebhooksPacket) =>
			discord.webhooks
				.execute(blueskyWebhooksPacket.webhook_id, blueskyWebhooksPacket.webhook_token, {
					components: [
						{
							type: ComponentType.Container,
							accent_color: 0x0385ff,
							components: containerComponents,
						},
					],
					flags: MessageFlags.IsComponentsV2,
					wait: true,
					with_components: true,
				})
				.catch((error) => Promise.reject(new WebhookExecuteError(blueskyWebhooksPacket, error))),
		);

		const settled = await Promise.allSettled(promises);
		const errors = [];

		for (const result of settled) {
			if (result.status === "rejected") {
				const reason = result.reason as WebhookExecuteError;

				if (
					reason.cause instanceof DiscordAPIError &&
					reason.cause.code === RESTJSONErrorCodes.UnknownWebhook
				) {
					pino.info(`Deleting unknown webhook ${reason.webhook.webhook_id}.`);

					await pg<BlueskyWebhooksPacket>(Table.BlueskyWebhooks)
						.delete()
						.where({ webhook_id: reason.webhook.webhook_id });
				} else {
					errors.push(reason);
				}
			}
		}

		if (errors.length > 0) {
			captureError(
				{ event, error: new AggregateError(errors, "Failed to execute webooks.") },
				"Failed to execute webhooks.",
			);
		}
	}
});

jetstream.on("error", (error) => captureError(error, "Jetstream error."));
