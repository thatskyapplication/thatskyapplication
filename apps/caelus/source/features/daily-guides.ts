import {
	type APIChannel,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APINewsChannel,
	type APITextChannel,
	ChannelType,
	ComponentType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	SelectMenuDefaultValueType,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import {
	formatEmoji,
	formatEmojiURL,
	RotationIdentifier,
	resolveCurrencyEmoji,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
	Table,
	TIME_ZONE,
	treasureCandles,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import pQueue from "p-queue";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import DailyGuides, { type DailyGuideQuest } from "../models/DailyGuides.js";
import type {
	DailyGuidesDistributionAllowedChannel,
	DailyGuidesDistributionData,
	DailyGuidesDistributionPacket,
} from "../models/DailyGuidesDistribution.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { MAXIMUM_CONCURRENCY_LIMIT } from "../utility/configuration.js";
import {
	CDN_URL,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_URL,
	DEFAULT_EMBED_COLOUR,
	NOT_IN_CACHED_GUILD_RESPONSE,
} from "../utility/constants.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

export const DAILY_GUIDES_SETUP_CUSTOM_ID = "DAILY_GUIDES_SETUP_CUSTOM_ID" as const;
const queue = new pQueue({ concurrency: MAXIMUM_CONCURRENCY_LIMIT });

export function isDailyGuidesDistributionChannel(
	channel: APIChannel | AnnouncementThread | PublicThread | PrivateThread,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

export function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.isCommunicationDisabled()) {
		errors.push("I am timed out.");
	}

	const isThread = channel.type === ChannelType.PublicThread;
	let resolvedChannelForPermission: APITextChannel | APINewsChannel | GuildChannel;

	if (isThread) {
		if (channel.threadMetadata?.archived) {
			errors.push("The thread is archived.");
		}

		const parentChannel = guild.channels.get(channel.parentId);

		if (!parentChannel) {
			pino.warn(channel, `Could not resolve a daily guides thread's parent channel.`);

			// Early exit.
			return returnErrors
				? errors.length > 1
					? errors.map((error) => `- ${error}`)
					: errors
				: errors.length === 0;
		}

		resolvedChannelForPermission = parentChannel;

		if (
			resolvedChannelForPermission &&
			!can({
				permission: PermissionFlagsBits.ManageThreads,
				guild,
				member: me,
				channel: resolvedChannelForPermission,
			}) &&
			channel.threadMetadata?.locked
		) {
			errors.push("The thread is locked.");
		}
	} else {
		resolvedChannelForPermission = channel;
	}

	const permissions =
		PermissionFlagsBits.ViewChannel |
		(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) |
		PermissionFlagsBits.EmbedLinks;

	if (!can({ permission: permissions, guild, member: me, channel: resolvedChannelForPermission })) {
		errors.push(
			`\`View Channel\` & \`${
				isThread ? "Send Messages in Threads" : "Send Messages"
			}\` & \`Embed Links\` are required for <#${channel.id}>.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

interface DailyGuidesSetupOptions {
	guildId: Snowflake;
	channelId: Snowflake | null;
}

export async function setup({ guildId, channelId }: DailyGuidesSetupOptions) {
	const dailyGuidesDistributionPacket = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.where({ guild_id: guildId })
		.first();

	let shouldSend = false;

	if (dailyGuidesDistributionPacket) {
		// biome-ignore lint/suspicious/noImplicitAnyLet: Effort.
		let updateData;

		if (dailyGuidesDistributionPacket.channel_id === channelId) {
			updateData = { channel_id: channelId };
		} else {
			// Delete the existing message, if present.
			if (dailyGuidesDistributionPacket.channel_id && dailyGuidesDistributionPacket.message_id) {
				await client.api.channels
					.deleteMessage(
						dailyGuidesDistributionPacket.channel_id,
						dailyGuidesDistributionPacket.message_id,
					)
					.catch(() => null);
			}

			updateData = { channel_id: channelId, message_id: null };
			shouldSend = Boolean(channelId);
		}

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update(updateData)
			.where({ guild_id: guildId })
			.returning("*");
	} else {
		shouldSend = Boolean(channelId);

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).insert(
			{ guild_id: guildId, channel_id: channelId, message_id: null },
			"*",
		);
	}

	if (shouldSend) {
		await send(false, { guildId, channelId, messageId: null });
	}
}

export async function setupResponse(guild: Guild): Promise<APIInteractionResponseCallbackData> {
	const dailyGuidesDistributionPacket = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.select("channel_id")
		.where({ guild_id: guild.id })
		.first();

	const channelId = dailyGuidesDistributionPacket?.channel_id;
	const channel = channelId ? guild.channels.get(channelId) : null;
	const feedback = [];

	if (channel) {
		if (isDailyGuidesDistributionChannel(channel)) {
			feedback.push(...isDailyGuidesDistributable(guild, channel, await guild.fetchMe(), true));
		} else {
			feedback.push("No channel detected. Was it deleted?");
		}
	} else {
		feedback.push("No channel selected.");
	}

	return {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [Daily guides](${new URL("caelus/daily-guides", WEBSITE_URL)})`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content:
							"You may choose a channel to receive daily guides in! Use the select menu below to select a channel.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: DAILY_GUIDES_SETUP_CUSTOM_ID,
								// @ts-expect-error The mutable array error is fine.
								channel_types: DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
								default_values: channelId
									? [{ id: channelId, type: SelectMenuDefaultValueType.Channel }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: "Select a channel to use for daily guides.",
							},
						],
					},
					{
						type: ComponentType.TextDisplay,
						content:
							feedback.length > 0
								? `Stopped ${formatEmoji(MISCELLANEOUS_EMOJIS.No)}\n${feedback.join("\n")}`
								: `Sending ${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`,
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);
		return;
	}

	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId);

		if (!(channel && isDailyGuidesDistributionChannel(channel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable(
			guild,
			channel,
			await guild.fetchMe(),
			true,
		);

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: dailyGuidesDistributable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({ guildId: interaction.guild_id, channelId: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

export async function reset() {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).update({
		message_id: null,
	});
}

export async function deleteDailyGuidesDistribution(guildId: Snowflake) {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
		.delete()
		.where({ guild_id: guildId });
}

async function send(
	enforceNonce: boolean,
	{ guildId, channelId, messageId }: DailyGuidesDistributionData,
) {
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as the guild was not cached.`,
		);

		return;
	}

	const channel = guild.channels.get(channelId!) ?? guild.threads.get(channelId!);

	if (!channel) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it had no detectable channel id ${channelId}.`,
		);

		return;
	}

	if (!isDailyGuidesDistributionChannel(channel)) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it did not satisfy the allowed channel types.`,
		);

		return;
	}

	const me = await guild.fetchMe();

	if (!isDailyGuidesDistributable(guild, channel, me)) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it did not have suitable permissions in channel id ${channelId}.`,
		);

		return;
	}

	// Retrieve our data.
	const components = distributionData(guild.preferredLocale);

	// Update the embed if a message exists.
	if (messageId) {
		return client.api.channels.editMessage(channelId!, messageId, { components });
	}

	// There is no existing message. Send one.
	const { id } = await client.api.channels.createMessage(channelId!, {
		components,
		enforce_nonce: enforceNonce,
		flags: MessageFlags.IsComponentsV2,
		nonce: guildId,
	});

	const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.update({ message_id: id })
		.where({ guild_id: guildId })
		.returning("*");

	return newDailyGuidesDistributionPacket;
}

function dailyGuidesEventData(date: DateTime, locale: Locale) {
	const events = skyCurrentEvents(date);

	const eventEndText = skyNotEndedEvents(date).map(({ id, start, end }) => {
		const daysUntilStart = start.diff(date, "days").days;
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${
				daysUntilStart < 1
					? `${t(`events.${id}`, { lng: locale, ns: "general" })} starts today.`
					: daysUntilStart >= 2
						? `${t(`events.${id}`, { lng: locale, ns: "general" })} starts in ${Math.floor(daysUntilStart)} days.`
						: `${t(`events.${id}`, { lng: locale, ns: "general" })} starts tomorrow.`
			}`;
		}

		return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("days-left.event", {
			lng: locale,
			ns: "general",
			count: Math.ceil(end.diff(date, "days").days) - 1,
			name: t(`events.${id}`, { lng: locale, ns: "general" }),
		})}`;
	});

	const event1 = events.first();
	let iconURL = null;

	if (event1) {
		const eventTicketEmoji = EventIdToEventTicketEmoji[event1.id];

		if (eventTicketEmoji) {
			iconURL = formatEmojiURL(eventTicketEmoji.id);
		}
	}

	const currentEventsWithEventTickets = events.filter(
		(event) =>
			event.eventTickets &&
			date < event.eventTickets.end &&
			event.resolveInfographicURL(date) !== null,
	);

	const eventTickets =
		currentEventsWithEventTickets.size > 0
			? currentEventsWithEventTickets
					.map((event) => {
						const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

						return `[${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("view", {
							lng: locale,
							ns: "general",
						})}](${event.resolveInfographicURL(date)!} "${t(`events.${event.id}`, { lng: locale, ns: "general" })}")`;
					})
					.join(" | ")
			: null;

	return { eventEndText, iconURL, eventTickets };
}

export function distributionData(locale: Locale): [APIMessageTopLevelComponent] {
	const { quest1, quest2, quest3, quest4, travellingRock } = DailyGuides;
	const today = skyToday();
	const now = skyNow();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(now.toMillis())}](${DAILY_GUIDES_URL})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const quests = [quest1, quest2, quest3, quest4].filter(
		(quest): quest is DailyGuideQuest => quest !== null,
	);

	if (quests.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### Quests\n${quests
				.map(
					({ id, url }, index) =>
						`${index + 1}. ${url ? `[${t(`quests.${id}`, { lng: locale, ns: "general" })}](${url})` : t(`quests.${id}`, { lng: locale, ns: "general" })}`,
				)
				.join("\n")}`,
		});
	}

	const treasureCandleURLs = treasureCandles(today);

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `### Treasure Candles\n${treasureCandleURLs
			.map(
				(treasureCandleURL, index) => `[${index * 4 + 1} - ${index * 4 + 4}](${treasureCandleURL})`,
			)
			.join(" | ")}`,
	});

	const season = skyCurrentSeason(today);
	const footerText = [];

	if (season) {
		const seasonalCandlesRotation = season.resolveSeasonalCandlesRotation(today);
		const values = [];
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		footerText.push(
			`${seasonEmoji ? `${formatEmoji(seasonEmoji)} ` : ""}${t("days-left.season", {
				lng: locale,
				ns: "general",
				count: Math.ceil(season.end.diff(now, "days").days) - 1,
			})}`,
		);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationIdentifier: RotationIdentifier = rotation;

			if (season.isDuringDoubleSeasonalLightEvent(today)) {
				rotationIdentifier = RotationIdentifier.Double;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationIdentifier);
			values.push(`[Rotation ${rotationIdentifier}](${url})`);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		// @ts-expect-error New season not yet announced.
		const candleEmoji = SeasonIdToSeasonalCandleEmoji[season.id];

		values.push(
			`${resolveCurrencyEmoji({
				emoji: candleEmoji,
				number: seasonalCandlesLeft,
			})} remain in the season.\n${resolveCurrencyEmoji({
				emoji: candleEmoji,
				number: seasonalCandlesLeftWithSeasonPass,
			})} remain in the season with a Season Pass.`,
		);

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### Seasonal Candles\n${values.join("\n")}`,
		});
	} else {
		const next = skyUpcomingSeason(today);

		if (next) {
			const daysUntilStart = next.start.diff(now, "days").days;
			const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

			footerText.push(
				`${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${daysUntilStart <= 1 ? "The new season starts tomorrow." : daysUntilStart >= 2 ? `The new season starts in ${Math.floor(daysUntilStart)} days.` : "The new season starts in 1 day."}`,
			);
		}
	}

	const eventData = dailyGuidesEventData(today, locale);
	footerText.push(...eventData.eventEndText);

	if (eventData.eventTickets) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("event-tickets", { lng: locale, ns: "general" })}\n${eventData.eventTickets}`,
		});
	}

	const shard = shardEruption();

	if (shard) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("shard-eruption", { lng: locale, ns: "general" })}\n${shardEruptionInformationString(shard, true, locale)}\n${shardEruptionTimestampsString(shard)}`,
		});
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("shard-eruption", { lng: locale, ns: "general" })}\n${t("shard-eruption-none", { lng: locale, ns: "general" })}`,
		});
	}

	if (travellingRock) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### Travelling Rock\n[View](${String(new URL(`daily_guides/travelling_rocks/${travellingRock}.webp`, CDN_URL))})`,
		});
	}

	if (footerText.length > 0) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content: footerText.map((text) => `-# ${text}`).join("\n"),
			},
		);
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];
}

export async function distribute() {
	const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).whereNotNull("channel_id");

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			queue.add(async () =>
				send(true, {
					guildId: dailyGuidesDistributionPacket.guild_id,
					channelId: dailyGuidesDistributionPacket.channel_id,
					messageId: dailyGuidesDistributionPacket.message_id,
				}),
			),
		),
	);

	const knownErrors: unknown[] = [];

	const errors = settled
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map((result) => result.reason)
		.filter((error) => {
			if (
				error instanceof DiscordAPIError &&
				error.code === RESTJSONErrorCodes.UnknownMessage &&
				error.method === "PATCH"
			) {
				// It is likely that the message was deleted prior to editing.
				knownErrors.push(error);
				return false;
			}

			return true;
		});

	if (errors.length > 0) {
		pino.error(errors, "Error whilst distributing daily guides.");
	}

	if (knownErrors.length > 0) {
		pino.info(knownErrors, "Known errors whilst distributing daily guides.");
	}
}
