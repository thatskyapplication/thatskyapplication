import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APINewsChannel,
	type APIPublicThreadChannel,
	type APITextChannel,
	type APIUser,
	ButtonStyle,
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
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	type DailyGuidesPacket,
	DailyQuestToInfographicURL,
	formatEmoji,
	formatEmojiURL,
	isDailyQuest,
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
import { hash } from "hasha";
import { t } from "i18next";
import type { DateTime } from "luxon";
import pQueue from "p-queue";
import sharp from "sharp";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import {
	APPLICATION_ID,
	CDN_BUCKET,
	CDN_URL,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	MAXIMUM_CONCURRENCY_LIMIT,
	SUPPORT_SERVER_GUILD_ID,
} from "../utility/configuration.js";
import {
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_URL,
	DEFAULT_EMBED_COLOUR,
	LOCALE_OPTIONS,
} from "../utility/constants.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import { notInCachedGuildResponse, userTag, validateAttachment } from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

type DailyGuidesSetData = Partial<DailyGuidesPacket> &
	Pick<DailyGuidesPacket, "last_updated_user_id" | "last_updated_at">;

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;

const distributeQueue = new pQueue({ concurrency: MAXIMUM_CONCURRENCY_LIMIT });
let distributionLock: Promise<unknown> | null = null;
export const DAILY_GUIDES_SETUP_CUSTOM_ID = "DAILY_GUIDES_SETUP_CUSTOM_ID" as const;

export async function fetchDailyGuides() {
	const dailyQuests = await pg<DailyGuidesPacket>(Table.DailyGuides).first();

	if (dailyQuests) {
		return dailyQuests;
	}

	// Use column defaults.
	const [insertedDailyQuests] = await pg<DailyGuidesPacket>(Table.DailyGuides)
		.insert({})
		.returning("*");

	return insertedDailyQuests!;
}

interface DailyGuidesResetOptions {
	user: APIUser;
	lastUpdatedAt: Date;
}

export async function resetDailyGuides({ user, lastUpdatedAt }: DailyGuidesResetOptions) {
	await logModification({ content: "reset the daily guides.", user });

	await updateDailyGuides({
		quest1: null,
		quest2: null,
		quest3: null,
		quest4: null,
		travelling_rock: null,
		last_updated_user_id: APPLICATION_ID,
		last_updated_at: lastUpdatedAt,
	});
}

async function updateDailyGuides(data: DailyGuidesSetData) {
	await pg<DailyGuidesPacket>(Table.DailyGuides).update(data);
}

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
			notInCachedGuildResponse(interaction.locale),
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

export async function resetDailyGuidesDistribution() {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).update({
		message_id: null,
	});
}

export async function deleteDailyGuidesDistribution(guildId: Snowflake) {
	await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
		.delete()
		.where({ guild_id: guildId });
}

interface DailyGuidesSendOptions {
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

async function send(
	enforceNonce: boolean,
	{ guildId, channelId, messageId }: DailyGuidesSendOptions,
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
	const components = await distributionData(guild.preferredLocale);

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

export async function distributionData(locale: Locale): Promise<[APIMessageTopLevelComponent]> {
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

	const {
		quest1,
		quest2,
		quest3,
		quest4,
		travelling_rock: travellingRock,
	} = await fetchDailyGuides();

	const quests = [];

	for (const quest of [quest1, quest2, quest3, quest4]) {
		if (quest !== null && isDailyQuest(quest)) {
			quests.push({ quest, url: DailyQuestToInfographicURL[quest] });
		}
	}

	if (quests.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.quests-heading", { lng: locale, ns: "features" })}\n${quests
				.map(
					({ quest, url }, index) =>
						`${index + 1}. ${url ? `[${t(`quests.${quest}`, { lng: locale, ns: "general" })}](${url})` : t(`quests.${quest}`, { lng: locale, ns: "general" })}`,
				)
				.join("\n")}`,
		});
	}

	const treasureCandleURLs = treasureCandles(today);

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `### ${t("daily-guides.treasure-candles", { lng: locale, ns: "features" })}\n${
			treasureCandleURLs.length === 1
				? `[${t("view", { lng: locale, ns: "general" })}](${treasureCandleURLs[0]})`
				: treasureCandleURLs
						.map(
							(treasureCandleURL, index) =>
								`[${index * 4 + 1}–${index * 4 + 4}](${treasureCandleURL})`,
						)
						.join(" | ")
		}`,
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
			values.push(`[${t("view", { lng: locale, ns: "general" })}](${url})`);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const candleEmoji = SeasonIdToSeasonalCandleEmoji[season.id];

		values.push(
			t("daily-guides.seasonal-candles-remain", {
				lng: locale,
				ns: "features",
				remaining: resolveCurrencyEmoji({ emoji: candleEmoji, number: seasonalCandlesLeft }),
				remainingSeasonPass: resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeftWithSeasonPass,
				}),
			}),
		);

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.seasonal-candles", { lng: locale, ns: "features" })}\n${values.join("\n")}`,
		});
	} else {
		const next = skyUpcomingSeason(today);

		if (next) {
			const daysUntilStart = next.start.diff(today, "days").days;
			const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

			footerText.push(
				`${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: daysUntilStart })}`,
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
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${shardEruptionInformationString(shard, true, locale)}\n${shardEruptionTimestampsString(shard)}`,
		});
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${t("daily-guides.shard-eruption-none", { lng: locale, ns: "features" })}`,
		});
	}

	if (travellingRock) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}\n[${t("view", { lng: locale, ns: "general" })}](${String(new URL(`daily_guides/travelling_rocks/${travellingRock}.webp`, CDN_URL))})`,
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

	return [{ type: ComponentType.Container, components: containerComponents }];
}

interface DailyGuidesDistributionOptions {
	user: APIUser;
	lastUpdatedUserId: Snowflake;
	lastUpdatedAt: Date;
	force?: boolean;
}

async function distributeLogic({
	user,
	lastUpdatedUserId,
	lastUpdatedAt,
}: DailyGuidesDistributionOptions) {
	await logModification({ user, content: "distributed daily guides." });

	await updateDailyGuides({
		last_updated_user_id: lastUpdatedUserId,
		last_updated_at: lastUpdatedAt,
	});

	const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).whereNotNull("channel_id");

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			distributeQueue.add(async () =>
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

export async function distribute(options: DailyGuidesDistributionOptions) {
	if (distributionLock && !options.force) {
		await distributionLock;
		return;
	}

	const promise = distributeLogic(options).finally(() => {
		distributionLock = null;
	});

	distributionLock = promise;
	await promise;
}

export const enum InteractiveType {
	Reorder = 0,
	Distributing = 1,
	Distributed = 2,
	Locale = 3,
	Uploading = 4,
}

interface InteractiveOptions {
	type?: InteractiveType;
	locale: Locale;
}

export async function interactive(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ type, locale }: InteractiveOptions,
) {
	const {
		quest1,
		quest2,
		quest3,
		quest4,
		last_updated_at: lastUpdatedAt,
		last_updated_user_id: lastUpdatedUserId,
	} = await fetchDailyGuides();
	const quests = [quest1, quest2, quest3, quest4];
	const questOptions = [];

	for (const quest of quests) {
		if (!quest) {
			continue;
		}

		questOptions.push({
			label: t(`quests.${quest}`, { lng: locale, ns: "general" }),
			value: quest.toString(),
		});
	}

	const containerComponents: APIComponentInContainer[] = [];

	const components: APIMessageTopLevelComponent[] = [
		...(await distributionData(locale)),
		{
			type: ComponentType.Container,
			components: containerComponents,
		},
	];

	let message: string;

	switch (type) {
		case InteractiveType.Reorder:
			message = "Quests reordered!";
			break;
		case InteractiveType.Distributing:
			message = "Distributing...";
			break;
		case InteractiveType.Distributed:
			message = "Distributed daily guides!";
			break;
		default:
			message = "What would you like to do?";
			break;
	}

	containerComponents.push({ type: ComponentType.TextDisplay, content: message });

	if (questOptions.length > 1) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: DAILY_GUIDES_QUESTS_REORDER_SELECT_MENU_CUSTOM_ID,
					max_values: questOptions.length,
					min_values: questOptions.length,
					options: questOptions,
					placeholder: "Reorder quests.",
				},
			],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: DAILY_GUIDES_LOCALE_CUSTOM_ID,
					max_values: 1,
					min_values: 1,
					options: LOCALE_OPTIONS,
					placeholder: "View in a locale.",
				},
			],
		},
		{
			type: ComponentType.TextDisplay,
			content: lastUpdatedUserId
				? `-# Last updated by <@${lastUpdatedUserId}> <t:${Math.floor(lastUpdatedAt.getTime() / 1000)}:R>.`
				: `-# Last updated <t:${Math.floor(lastUpdatedAt.getTime() / 1000)}:R>.`,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Success,
					custom_id: DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
					label: "Distribute",
					disabled: type === InteractiveType.Distributing,
				},
			],
		},
	);

	const response: APIInteractionResponseCallbackData = {
		allowed_mentions: { parse: [] },
		components,
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (type === InteractiveType.Distributed || type === InteractiveType.Uploading) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, response);
		return;
	}

	if (
		type === InteractiveType.Reorder ||
		type === InteractiveType.Distributing ||
		type === InteractiveType.Locale
	) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, response);
}

interface LogModificationOptions {
	user: Pick<APIUser, "id" | "username" | "discriminator">;
	content: string;
}

async function logModification({ user, content }: LogModificationOptions) {
	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error("Could not find the support server whilst logging a daily guides modification.");
		return;
	}

	const channel = guild.channels.get(DAILY_GUIDES_LOG_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error("Could not find the daily guides log channel.");
		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error("Missing permissions to post in the daily guides log channel.");
		return;
	}

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { parse: [] },
		content: `<@${user.id}> (${userTag(user)}) ${content}`,
		flags: MessageFlags.SuppressEmbeds,
	});
}

export async function handleDistributeButton(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;
	await interactive(interaction, { type: InteractiveType.Distributing, locale });

	await distribute({
		user: interaction.member.user,
		lastUpdatedUserId: interaction.member.user.id,
		lastUpdatedAt: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	});

	await interactive(interaction, { type: InteractiveType.Distributed, locale });
}

export async function set(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const { locale } = interaction;

	if (options.hoistedOptions.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "At least one option must be specified.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const interactiveOptions: InteractiveOptions = { locale };
	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();
	const oldQuest1 = quest1;
	const oldQuest2 = quest2;
	const oldQuest3 = quest3;
	const oldQuest4 = quest4;
	const newQuest1 = options.getInteger("quest-1") ?? oldQuest1;
	const newQuest2 = options.getInteger("quest-2") ?? oldQuest2;
	const newQuest3 = options.getInteger("quest-3") ?? oldQuest3;
	const newQuest4 = options.getInteger("quest-4") ?? oldQuest4;
	const travellingRock = options.getAttachment("travelling-rock");

	const oldQuests = {
		quest1: oldQuest1 === null ? null : t(`quests.${oldQuest1}`, { ns: "general" }),
		quest2: oldQuest2 === null ? null : t(`quests.${oldQuest2}`, { ns: "general" }),
		quest3: oldQuest3 === null ? null : t(`quests.${oldQuest3}`, { ns: "general" }),
		quest4: oldQuest4 === null ? null : t(`quests.${oldQuest4}`, { ns: "general" }),
	};

	const newQuests = {
		quest1: newQuest1 === null ? null : t(`quests.${newQuest1}`, { ns: "general" }),
		quest2: newQuest2 === null ? null : t(`quests.${newQuest2}`, { ns: "general" }),
		quest3: newQuest3 === null ? null : t(`quests.${newQuest3}`, { ns: "general" }),
		quest4: newQuest4 === null ? null : t(`quests.${newQuest4}`, { ns: "general" }),
	};

	let logMessage = `set daily guides.\nOld:\n\`\`\`JSON\n${JSON.stringify(oldQuests)}\n\`\`\`\nNew:\n\`\`\`JSON\n${JSON.stringify(newQuests)}\n\`\`\``;

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	};

	if (travellingRock) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral,
		});

		if (!(await validateAttachment(interaction, travellingRock))) {
			return;
		}

		interactiveOptions.type = InteractiveType.Uploading;
		const fetchedURL = await fetch(travellingRock.url);

		const buffer = await sharp(await fetchedURL.arrayBuffer())
			.webp()
			.toBuffer();

		const hashedBuffer = await hash(buffer, { algorithm: "md5" });

		await S3Client.send(
			new PutObjectCommand({
				Bucket: CDN_BUCKET,
				Key: `daily_guides/travelling_rocks/${hashedBuffer}.webp`,
				Body: buffer,
				ContentDisposition: "inline",
				ContentType: fetchedURL.headers.get("content-type")!,
			}),
		);

		logMessage += `\nTravelling rock is now:\n${new URL(`daily_guides/travelling_rocks/${hashedBuffer}.webp`, CDN_URL)}`;
		data.travelling_rock = hashedBuffer;
	}

	data.quest1 = newQuest1 === null ? null : newQuest1;
	data.quest2 = newQuest2 === null ? null : newQuest2;
	data.quest3 = newQuest3 === null ? null : newQuest3;
	data.quest4 = newQuest4 === null ? null : newQuest4;
	await logModification({ user: interaction.member.user, content: logMessage });
	await updateDailyGuides(data);
	await interactive(interaction, interactiveOptions);
}

export async function questsReorder(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const {
		locale,
		data: { values },
	} = interaction;

	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides();
	const newQuest1 = Number(values[0]);
	const newQuest2 = Number(values[1]);
	const newQuest3 = values[2] === undefined ? null : Number(values[2]);
	const newQuest4 = values[3] === undefined ? null : Number(values[3]);

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	};

	if (isDailyQuest(newQuest1)) {
		data.quest1 = newQuest1;
	}

	if (isDailyQuest(newQuest2)) {
		data.quest2 = newQuest2;
	}

	if (newQuest3 !== null && isDailyQuest(newQuest3)) {
		data.quest3 = newQuest3;
	}

	if (newQuest4 !== null && isDailyQuest(newQuest4)) {
		data.quest4 = newQuest4;
	}

	const oldQuests = {
		quest1: quest1 === null ? null : t(`quests.${quest1}`, { ns: "general" }),
		quest2: quest2 === null ? null : t(`quests.${quest2}`, { ns: "general" }),
		quest3: quest3 === null ? null : t(`quests.${quest3}`, { ns: "general" }),
		quest4: quest4 === null ? null : t(`quests.${quest4}`, { ns: "general" }),
	};

	const newQuests = {
		quest1: t(`quests.${newQuest1}`, { ns: "general" }),
		quest2: t(`quests.${newQuest2}`, { ns: "general" }),
		quest3: newQuest3 === null ? null : t(`quests.${newQuest3}`, { ns: "general" }),
		quest4: newQuest4 === null ? null : t(`quests.${newQuest4}`, { ns: "general" }),
	};

	await logModification({
		user: interaction.member.user,
		content: `reordered daily quests.\nOld:\n\`\`\`JSON\n${JSON.stringify(oldQuests)}\n\`\`\`\nNew:\n\`\`\`JSON\n${JSON.stringify(newQuests)}\n\`\`\``,
	});

	await updateDailyGuides(data);
	await interactive(interaction, { type: InteractiveType.Reorder, locale });
}
