import { URL } from "node:url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageChannelSelectInteractionData,
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
	type CreateMessageOptions,
	Locale,
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
	communityUpcomingEvents,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_QUEST_VALUES,
	type DailyGuidesDistributionPacket,
	type DailyGuidesPacket,
	type DailyQuests,
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
import type { NonNullableInterface } from "../types/index.js";
import {
	APPLICATION_ID,
	CDN_BUCKET,
	CDN_URL,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	MAXIMUM_CONCURRENCY_LIMIT,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
} from "../utility/configuration.js";
import {
	DAILY_GUIDES_URL,
	INFORMATION_ACCENT_COLOUR,
	LOCALE_OPTIONS,
	MAXIMUM_AUTOCOMPLETE_NAME_LIMIT,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import {
	diffJSON,
	formatArrayErrors,
	isThreadChannelType,
	notInCachedGuildResponse,
	userTag,
	validateImageAttachment,
} from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

type DailyGuidesSetData = Partial<DailyGuidesPacket> &
	Pick<DailyGuidesPacket, "last_updated_user_id" | "last_updated_at">;

type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;

const distributeQueue = new pQueue({ concurrency: MAXIMUM_CONCURRENCY_LIMIT });
let distributionLock: Promise<unknown> | null = null;

export function questAutocomplete(focused: string, locale: Locale) {
	return focused === ""
		? []
		: DAILY_QUEST_VALUES.filter((dailyQuest) =>
				t(`quests.${dailyQuest}`, { lng: locale, ns: "general" })
					.toUpperCase()
					.includes(focused.toUpperCase()),
			)
				.map((dailyQuest) => {
					let quest = t(`quests.${dailyQuest}`, { lng: locale, ns: "general" });

					if (quest.length > MAXIMUM_AUTOCOMPLETE_NAME_LIMIT) {
						quest = `${quest.slice(0, MAXIMUM_AUTOCOMPLETE_NAME_LIMIT - 3)}...`;
					}

					return { name: quest, value: dailyQuest };
				})
				.slice(0, 25);
}

export function questResponse(quest: DailyQuests, locale: Locale): [APIMessageTopLevelComponent] {
	const url = DailyQuestToInfographicURL[quest];

	return [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t(`quests.${quest}`, { lng: locale, ns: "general" })}`,
				},
				url
					? { type: ComponentType.MediaGallery, items: [{ media: { url } }] }
					: {
							type: ComponentType.TextDisplay,
							content: t("daily-guides.quest-no-infographic", { lng: locale, ns: "features" }),
						},
			],
		},
	];
}

async function fetchDailyGuides() {
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

interface DailyGuidesIsDailyGuidesDistributableOptions {
	guild: Guild;
	channel: DailyGuidesDistributionAllowedChannel;
	me: GuildMember;
	locale?: Locale | undefined;
	website?: boolean;
}

export function isDailyGuidesDistributable({
	guild,
	channel,
	me,
	website,
	locale = Locale.EnglishGB,
}: DailyGuidesIsDailyGuidesDistributableOptions): readonly string[] {
	const errors = [];

	if (me.isCommunicationDisabled()) {
		errors.push(t("error-timed-out", { lng: locale, ns: "general" }));
	}

	const isThread = channel.type === ChannelType.PublicThread;
	let resolvedChannelForPermission: APITextChannel | APINewsChannel | GuildChannel;

	if (isThread) {
		if (channel.threadMetadata?.archived) {
			errors.push(t("daily-guides.error-thread-archived", { lng: locale, ns: "features" }));
		}

		const parentChannel = guild.channels.get(channel.parentId);

		if (!parentChannel) {
			pino.warn(channel, `Could not resolve a daily guides thread's parent channel.`);

			// Early exit.
			return errors.length > 1 ? errors.map((error) => `- ${error}`) : errors;
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
			errors.push(t("daily-guides.error-thread-locked", { lng: locale, ns: "features" }));
		}
	} else {
		resolvedChannelForPermission = channel;
	}

	const permissions =
		PermissionFlagsBits.ViewChannel |
		(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages);

	if (!can({ permission: permissions, guild, member: me, channel: resolvedChannelForPermission })) {
		errors.push(
			isThread
				? t(`daily-guides.error-missing-permissions-thread${website ? "-website" : ""}`, {
						lng: locale,
						ns: "features",
						channel: website ? channel.name : `<#${channel.id}>`,
					})
				: t(`daily-guides.error-missing-permissions${website ? "-website" : ""}`, {
						lng: locale,
						ns: "features",
						channel: website ? channel.name : `<#${channel.id}>`,
					}),
		);
	}

	return errors;
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
			shouldSend = true;
		}

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update(updateData)
			.where({ guild_id: guildId });
	} else {
		shouldSend = true;

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).insert({
			guild_id: guildId,
			channel_id: channelId,
			message_id: null,
		});
	}

	if (shouldSend && channelId) {
		await send({ guildId, channelId, messageId: null, enforceNonce: false });
	}
}

export async function setupResponse(
	guild: Guild,
	locale: Locale,
): Promise<APIInteractionResponseCallbackData> {
	const dailyGuidesDistributionPacket = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.select("channel_id")
		.where({ guild_id: guild.id })
		.first();

	const channelId = dailyGuidesDistributionPacket?.channel_id;

	const channel = channelId
		? (guild.channels.get(channelId) ?? guild.threads.get(channelId))
		: null;

	const feedback = [];

	if (channel) {
		if (isDailyGuidesDistributionChannel(channel)) {
			feedback.push(
				...isDailyGuidesDistributable({ guild, channel, me: await guild.fetchMe(), locale }),
			);
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
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [Daily guides](${new URL("caelus/guides/daily-guides", WEBSITE_URL)})`,
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
								custom_id: CustomId.DailyGuidesSetup,
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
	const { locale } = interaction;
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(locale),
		);

		return;
	}

	const [channelId] = interaction.data.values;

	if (channelId) {
		const channel = guild.channels.get(channelId) ?? guild.threads.get(channelId);

		if (
			!channel &&
			isThreadChannelType(
				(interaction.data as APIMessageChannelSelectInteractionData).resolved.channels[channelId]!
					.type,
			)
		) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("cannot-view-thread", { ns: "general", lng: locale }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (!(channel && isDailyGuidesDistributionChannel(channel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable({
			guild,
			channel,
			me: await guild.fetchMe(),
			locale,
		});

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: formatArrayErrors(dailyGuidesDistributable),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	await setup({ guildId: interaction.guild_id, channelId: channelId ?? null });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild, locale),
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
	guildId: Snowflake;
	channelId: Snowflake;
	messageId: Snowflake | null;
	enforceNonce: boolean;
}

async function send({ guildId, channelId, messageId, enforceNonce }: DailyGuidesSendOptions) {
	const guild = GUILD_CACHE.get(guildId);

	if (!guild) {
		throw new Error(
			`Did not distribute daily guides to guild id ${guildId} as the guild was not cached.`,
		);
	}

	const channel = guild.channels.get(channelId!) ?? guild.threads.get(channelId!);

	if (!channel) {
		throw new Error(
			`Did not distribute daily guides to guild id ${guildId} as it had no detectable channel id ${channelId}.`,
		);
	}

	if (!isDailyGuidesDistributionChannel(channel)) {
		throw new Error(
			`Did not distribute daily guides to guild id ${guildId} as it did not satisfy the allowed channel types.`,
		);
	}

	const me = await guild.fetchMe();
	const dailyGuidesDistributable = isDailyGuidesDistributable({ guild, channel, me });

	if (dailyGuidesDistributable.length > 0) {
		throw new Error(
			`Did not distribute daily guides to guild id ${guildId} as there were check errors in channel id ${channelId}: ${formatArrayErrors(dailyGuidesDistributable)}`,
		);
	}

	// Retrieve our data.
	const { components } = await distributionData(guild.preferredLocale);

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
		const name = t(`events.${id}`, { lng: locale, ns: "general" });
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("daily-guides.event-upcoming", { lng: locale, ns: "features", event: name, count: daysUntilStart })}`;
		}

		return `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("days-left.event", {
			lng: locale,
			ns: "general",
			count: Math.ceil(end.diff(date, "days").days) - 1,
			name,
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

interface DailyGuidesDistributionDataResponse {
	components: APIMessageTopLevelComponent[];
	missingDailyQuests: boolean;
	missingTravellingRock: boolean;
}

async function distributionData(locale: Locale): Promise<DailyGuidesDistributionDataResponse> {
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
	let missingDailyQuests = false;

	for (const quest of [quest1, quest2, quest3, quest4]) {
		if (quest !== null && isDailyQuest(quest)) {
			quests.push({ quest, url: DailyQuestToInfographicURL[quest] });
		} else {
			missingDailyQuests = true;
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
	} else {
		missingDailyQuests = true;
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

		const candleEmoji =
			SeasonIdToSeasonalCandleEmoji[season.id] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle;

		values.push(
			t(
				`daily-guides.${seasonalCandlesLeft === seasonalCandlesLeftWithSeasonPass ? "seasonal-candles-remain" : "seasonal-candles-remain-with-season-pass"}`,
				{
					lng: locale,
					ns: "features",
					remaining: resolveCurrencyEmoji({ emoji: candleEmoji, number: seasonalCandlesLeft }),
					remainingSeasonPass: resolveCurrencyEmoji({
						emoji: candleEmoji,
						number: seasonalCandlesLeftWithSeasonPass,
					}),
				},
			),
		);

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.seasonal-candles", { lng: locale, ns: "features" })}\n${values.join("\n")}`,
		});
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.diff(today, "days").days;
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		footerText.push(
			`${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: daysUntilStart })}`,
		);
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
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${shardEruptionInformationString(shard, true, locale)}\n${shardEruptionTimestampsString({ timestamps: shard.timestamps, locale })}`,
		});
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n${t("shard-eruption.none", { lng: locale, ns: "features" })}`,
		});
	}

	let missingTravellingRock: boolean;

	if (travellingRock) {
		missingTravellingRock = false;

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}\n[${t("view", { lng: locale, ns: "general" })}](${String(new URL(`daily_guides/travelling_rocks/${travellingRock}.webp`, CDN_URL))})`,
		});
	} else {
		missingTravellingRock = true;
	}

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const untilStart = start.diff(today, "days").days;
			const formattedName = marketingURL ? `[${name}](${marketingURL})` : name;

			footerText.push(
				untilStart >= 1
					? t("daily-guides.event-upcoming", {
							lng: locale,
							ns: "features",
							event: formattedName,
							count: Math.floor(untilStart),
						})
					: t("daily-guides.event-upcoming-time", {
							lng: locale,
							ns: "features",
							event: formattedName,
							time: `<t:${start.toUnixInteger()}:t>`,
						}),
			);
		}
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

	return {
		components: [{ type: ComponentType.Container, components: containerComponents }],
		missingDailyQuests,
		missingTravellingRock,
	};
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

	const dailyGuidesDistributionPackets = await pg<
		DailyGuidesDistributionPacket &
			NonNullableInterface<Pick<DailyGuidesDistributionPacket, "channel_id">>
	>(Table.DailyGuidesDistribution).whereNotNull("channel_id");

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			distributeQueue.add(async () =>
				send({
					guildId: dailyGuidesDistributionPacket.guild_id,
					channelId: dailyGuidesDistributionPacket.channel_id,
					messageId: dailyGuidesDistributionPacket.message_id,
					enforceNonce: true,
				}),
			),
		),
	);

	const knownErrors: unknown[] = [];
	const errors: unknown[] = [];

	for (const result of settled) {
		if (result.status !== "rejected") {
			continue;
		}

		const { reason } = result;

		if (
			// Our own errors thrown.
			(reason instanceof Error && reason.message.startsWith("Did not distribute")) ||
			// It is likely that the message was deleted prior to editing.
			(reason instanceof DiscordAPIError &&
				reason.code === RESTJSONErrorCodes.UnknownMessage &&
				reason.method === "PATCH")
		) {
			knownErrors.push(reason);
			continue;
		}

		errors.push(result.reason);
	}

	if (errors.length > 0) {
		pino.error(
			new AggregateError(errors, "Errors whilst distributing daily guides."),
			"Daily guides distribution error.",
		);
	}

	if (knownErrors.length > 0) {
		pino.info(
			new AggregateError(knownErrors, "Errors (known) whilst distributing daily guides."),
			"Daily guides distribution error (known).",
		);
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

export async function dailyGuidesResponse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const { locale } = interaction;
	const { components, missingDailyQuests, missingTravellingRock } = await distributionData(locale);
	const missing = [];

	if (missingDailyQuests) {
		missing.push(`- ${t("daily-quests", { lng: locale, ns: "general" })}`);
	}

	if (missingTravellingRock) {
		missing.push(`- ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}`);
	}

	if (missing.length > 0) {
		components.push({
			type: ComponentType.Container,
			accent_color: INFORMATION_ACCENT_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `${t("daily-guides.not-yet-updated-title", {
						lng: locale,
						ns: "features",
						url: SUPPORT_SERVER_INVITE_URL,
					})}\n${missing.join("\n")}`,
				},
			],
		});
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components,
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
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
		if (quest === null) {
			continue;
		}

		questOptions.push({
			label: t(`quests.${quest}`, { lng: locale, ns: "general" }),
			value: quest.toString(),
		});
	}

	const containerComponents: APIComponentInContainer[] = [];

	const components: APIMessageTopLevelComponent[] = [
		...(await distributionData(locale)).components,
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
					custom_id: CustomId.DailyGuidesQuestsReorder,
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
					custom_id: CustomId.DailyGuidesLocale,
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
					custom_id: CustomId.DailyGuidesDistribute,
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
		await client.api.interactions.editReply(
			interaction.application_id,
			interaction.token,
			response,
		);

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
	diff?: string;
	travellingRock?: string | null | undefined;
}

async function logModification({ user, content, diff, travellingRock }: LogModificationOptions) {
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

	const createMessageOptions: CreateMessageOptions = {
		allowed_mentions: { parse: [] },
	};

	const logContent = `<@${user.id}> (${userTag(user)}) ${content}`;

	if (diff && travellingRock) {
		createMessageOptions.components = [
			{
				type: ComponentType.TextDisplay,
				content: logContent,
			},
			{
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Thumbnail,
					media: {
						url: new URL(
							`daily_guides/travelling_rocks/${travellingRock}.webp`,
							CDN_URL,
						).toString(),
					},
					description: `Travelling rock uploaded by ${user.username}.`,
				},
				components: [
					{
						type: ComponentType.TextDisplay,
						content: diff,
					},
				],
			},
		];

		createMessageOptions.flags = MessageFlags.IsComponentsV2;
	} else if (diff) {
		createMessageOptions.content = `${logContent}\n${diff}`;
	} else {
		createMessageOptions.content = logContent;
	}

	await client.api.channels.createMessage(channel.id, createMessageOptions);
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
		await interactive(interaction, { locale });
		return;
	}

	const interactiveOptions: InteractiveOptions = { locale };
	const {
		quest1,
		quest2,
		quest3,
		quest4,
		travelling_rock: travellingRock,
	} = await fetchDailyGuides();
	const oldQuest1 = quest1;
	const oldQuest2 = quest2;
	const oldQuest3 = quest3;
	const oldQuest4 = quest4;
	const newQuest1 = options.getInteger("quest-1") ?? oldQuest1;
	const newQuest2 = options.getInteger("quest-2") ?? oldQuest2;
	const newQuest3 = options.getInteger("quest-3") ?? oldQuest3;
	const newQuest4 = options.getInteger("quest-4") ?? oldQuest4;
	const newTravellingRock = options.getAttachment("travelling-rock");

	const questNumbers = [newQuest1, newQuest2, newQuest3, newQuest4].filter(
		(quest): quest is number => quest !== null,
	);

	const uniqueQuestNumbers = new Set<number>(questNumbers);

	if (questNumbers.length !== uniqueQuestNumbers.size) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "Duplicate quests detected. Double-check what the final result will be!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		!newTravellingRock &&
		oldQuest1 === newQuest1 &&
		oldQuest2 === newQuest2 &&
		oldQuest3 === newQuest3 &&
		oldQuest4 === newQuest4
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No changes were made. Check to see if daily guides are already distributed!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const oldData = {
		quest1: oldQuest1 === null ? null : t(`quests.${oldQuest1}`, { ns: "general" }),
		quest2: oldQuest2 === null ? null : t(`quests.${oldQuest2}`, { ns: "general" }),
		quest3: oldQuest3 === null ? null : t(`quests.${oldQuest3}`, { ns: "general" }),
		quest4: oldQuest4 === null ? null : t(`quests.${oldQuest4}`, { ns: "general" }),
		travellingRock,
	};

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
	};

	if (newTravellingRock) {
		await client.api.interactions.defer(interaction.id, interaction.token, {
			flags: MessageFlags.Ephemeral,
		});

		// Allow up to 10 MB.
		if (!(await validateImageAttachment(interaction, newTravellingRock, 10_000_000))) {
			return;
		}

		interactiveOptions.type = InteractiveType.Uploading;
		const fetchedURL = await fetch(newTravellingRock.url);

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
				ContentType: "image/webp",
			}),
		);

		data.travelling_rock = hashedBuffer;
	}

	const newData = {
		quest1:
			newQuest1 === null || !isDailyQuest(newQuest1)
				? null
				: t(`quests.${newQuest1}`, { ns: "general" }),
		quest2:
			newQuest2 === null || !isDailyQuest(newQuest2)
				? null
				: t(`quests.${newQuest2}`, { ns: "general" }),
		quest3:
			newQuest3 === null || !isDailyQuest(newQuest3)
				? null
				: t(`quests.${newQuest3}`, { ns: "general" }),
		quest4:
			newQuest4 === null || !isDailyQuest(newQuest4)
				? null
				: t(`quests.${newQuest4}`, { ns: "general" }),
		travellingRock: data.travelling_rock ?? travellingRock,
	};

	data.quest1 = newQuest1 === null || !isDailyQuest(newQuest1) ? null : newQuest1;
	data.quest2 = newQuest2 === null || !isDailyQuest(newQuest2) ? null : newQuest2;
	data.quest3 = newQuest3 === null || !isDailyQuest(newQuest3) ? null : newQuest3;
	data.quest4 = newQuest4 === null || !isDailyQuest(newQuest4) ? null : newQuest4;

	await logModification({
		user: interaction.member.user,
		content: "set daily guides.",
		diff: `\`\`\`diff\n${diffJSON(oldData, newData)}\n\`\`\``,
		travellingRock: data.travelling_rock ?? travellingRock,
	});

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
		content: "reordered daily quests.",
		diff: `\`\`\`diff\n${diffJSON(oldQuests, newQuests)}\n\`\`\``,
	});

	await updateDailyGuides(data);
	await interactive(interaction, { type: InteractiveType.Reorder, locale });
}
