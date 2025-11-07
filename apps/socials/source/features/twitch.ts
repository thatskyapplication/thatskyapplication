import { setTimeout } from "node:timers/promises";
import {
	type APIComponentInContainer,
	type APITextDisplayComponent,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	RESTJSONErrorCodes,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import {
	Table,
	type TwitchSettingsPacket,
	type TwitchWebhooksPacket,
} from "@thatskyapplication/utility";
import { ApiClient } from "@twurple/api";
import { RefreshingAuthProvider } from "@twurple/auth";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { discord } from "../discord.js";
import { WebhookExecuteError } from "../models/webbook-execute-error.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
	TWITCH_USER_ID,
} from "../utility/configuration.js";
import { TWITCH_USER_IDS } from "../utility/constants.js";

const authProvider = new RefreshingAuthProvider({
	clientId: TWITCH_CLIENT_ID,
	clientSecret: TWITCH_CLIENT_SECRET,
});

authProvider.onRefresh(
	async (_, token) =>
		await pg<TwitchSettingsPacket>(Table.TwitchSettings).update({
			refresh_token: token.refreshToken!,
			access_token: token.accessToken,
		}),
);

const twitchSettingsPacket = (await pg<TwitchSettingsPacket>(Table.TwitchSettings).first())!;

authProvider.addUser(TWITCH_USER_ID, {
	accessToken: twitchSettingsPacket.access_token,
	expiresIn: 0,
	obtainmentTimestamp: 0,
	refreshToken: twitchSettingsPacket.refresh_token,
});

const apiClient = new ApiClient({ authProvider });
export const eventSub = new EventSubWsListener({ apiClient });

async function getStream(
	event: Parameters<Parameters<EventSubWsListener["onStreamOnline"]>[1]>[0],
	count = 1,
) {
	const stream = await event.getStream();

	if (stream) {
		return stream;
	}

	// Too many tries.
	if (count > 3) {
		return null;
	}

	await setTimeout(5_000 * count);
	return await getStream(event, count + 1);
}

async function streamOnline(
	event: Parameters<Parameters<EventSubWsListener["onStreamOnline"]>[1]>[0],
) {
	const twitchWebhooksPackets = await pg<TwitchWebhooksPacket>(Table.TwitchWebhooks).select(
		"webhook_id",
		"webhook_token",
	);

	if (twitchWebhooksPackets.length === 0) {
		return;
	}

	const [stream, broadcaster] = await Promise.all([getStream(event), event.getBroadcaster()]);
	const containerComponents: APIComponentInContainer[] = [];

	const sectionComponents: APITextDisplayComponent[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${event.broadcasterDisplayName} started streaming!`,
		},
		{
			type: ComponentType.TextDisplay,
			content: `${stream ? `### ${stream.title}\n` : ""}The stream started <t:${Math.floor(event.startDate.getTime() / 1000)}:R>.`,
		},
	];

	if (stream && stream.gameName.length > 0) {
		sectionComponents.push({
			type: ComponentType.TextDisplay,
			content: `Game: ${stream.gameName}`,
		});
	}

	containerComponents.push(
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Thumbnail,
				media: { url: broadcaster.profilePictureUrl },
			},
			components: sectionComponents,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	);

	if (stream) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: [{ media: { url: stream.getThumbnailUrl(1280, 720) } }],
		});

		if (stream.tags.length > 0) {
			containerComponents.push({
				type: ComponentType.TextDisplay,
				content: stream.tags.map((tag) => `\`${tag}\``).join(" "),
			});
		}
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Link,
					url: `https://twitch.tv/${broadcaster.displayName}`,
					label: "View",
				},
			],
		},
	);

	const promises = twitchWebhooksPackets.map((twitchWebhooksPacket) =>
		discord.webhooks
			.execute(twitchWebhooksPacket.webhook_id, twitchWebhooksPacket.webhook_token, {
				allowed_mentions: { parse: [] },
				components: [
					{
						type: ComponentType.Container,
						components: containerComponents,
						accent_color: 0x9146ff,
					},
				],
				flags: MessageFlags.IsComponentsV2,
				wait: true,
				with_components: true,
			})
			.catch((error) => Promise.reject(new WebhookExecuteError(twitchWebhooksPacket, error))),
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

				await pg<TwitchWebhooksPacket>(Table.BlueskyWebhooks)
					.delete()
					.where({ webhook_id: reason.webhook.webhook_id });
			} else {
				errors.push(reason);
			}
		}
	}

	if (errors.length > 0) {
		pino.error({ event, error: new AggregateError(errors, "Failed to execute webooks.") });
	}
}

for (const userId of TWITCH_USER_IDS) {
	eventSub.onStreamOnline(userId, async (event) => await streamOnline(event));
}
