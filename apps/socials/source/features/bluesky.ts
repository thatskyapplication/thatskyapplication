import { type APIEmbed, RESTJSONErrorCodes } from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { CommitType, EventType, Jetstream } from "@skyware/jetstream";
import { type BlueskyWebhooksPacket, Table } from "@thatskyapplication/utility";
import { discord } from "../discord.js";
import { WebhookExecuteError } from "../models/webbook-execute-error.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
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

		const did = event.did;

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
		const { embed } = record;
		let embedImages: string[] = [];

		if (embed?.$type === "app.bsky.embed.images") {
			embedImages = embed.images.map(({ image }) => formatBlueskyImageURL(did, image.ref.$link));
		}

		let description = record.text;

		if (record.facets) {
			description = embedLinksInText(description, record.facets);
		}

		const url = `https://bsky.app/profile/${did}/post/${rkey}`;
		let displayName: string | undefined;
		let handle: string | undefined;
		let avatar: string | undefined;

		try {
			({ displayName, handle, avatar } = await fetchBlueskyProfile(did));
		} catch (error) {
			pino.error(error);
		}

		const initialEmbed: APIEmbed = {
			description: `${description}\n\n-# [View Post](${url})`,
			url,
			timestamp: record.createdAt,
			color: 0x0385ff,
		};

		if (handle) {
			initialEmbed.footer = { text: handle };
		}

		const firstURL = embedImages.shift();

		if (firstURL) {
			initialEmbed.image = { url: firstURL };
		}

		const embeds: APIEmbed[] = [initialEmbed];

		for (const embedImage of embedImages) {
			embeds.push({ url, image: { url: embedImage } });
		}

		const promises = blueskyWebhooksPackets.map((blueskyWebhooksPacket) =>
			discord.webhooks
				.execute(blueskyWebhooksPacket.webhook_id, blueskyWebhooksPacket.webhook_token, {
					username: displayName ?? handle,
					avatar_url: avatar,
					embeds,
				})
				.catch((error) => Promise.reject(new WebhookExecuteError(blueskyWebhooksPacket, error))),
		);

		const settled = await Promise.allSettled(promises);

		for (const result of settled) {
			if (result.status === "rejected") {
				const reason = result.reason as WebhookExecuteError;

				if (
					reason.error instanceof DiscordAPIError &&
					reason.error.code === RESTJSONErrorCodes.UnknownWebhook
				) {
					pino.info(`Deleting unknown webhook ${reason.webhook.webhook_id}.`);

					await pg<BlueskyWebhooksPacket>(Table.BlueskyWebhooks)
						.delete()
						.where({ webhook_id: reason.webhook.webhook_id });
				}
			}
		}
	}
});

jetstream.on("error", (error) => pino.error(error, "Jetstream error."));
