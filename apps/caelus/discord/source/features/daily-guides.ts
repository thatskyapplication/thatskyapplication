import { createHash } from "node:crypto";
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
import {
	communityUpcomingEvents,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_DISTRIBUTION_TYPE_VALUES,
	DAILY_QUEST_VALUES,
	type DailyGuidesDaysCountItem,
	DailyGuidesDistributionType,
	type DailyGuidesDistributionTypes,
	type DailyQuests,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	DOUBLE_HEART_EVENTS,
	epochSeconds,
	formatEmoji,
	formatEmojiURL,
	isDailyQuest,
	MAINTENANCE_PERIODS,
	MAXIMUM_ASSET_BANNER_DIMENSION,
	type Packet,
	RADIANCE_EVENTS,
	resolveCurrencyEmoji,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
	sortDaysCountItems,
	TIME_ZONE,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import pQueue from "p-queue";
import { GUILD_CACHE } from "../caches/guilds.js";
import database from "../database.js";
import { client } from "../discord.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import { processUploadedImage } from "../utility/assets.js";
import {
	APPLICATION_ID,
	CDN_BUCKET,
	CDN_URL,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	MAXIMUM_CONCURRENCY_LIMIT,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	UPDATING_DAILY_GUIDES_CHANNEL_ID,
} from "../utility/configuration.js";
import {
	DAILY_GUIDES_URL,
	INFORMATION_ACCENT_COLOUR,
	LOCALE_OPTIONS,
	MAXIMUM_AUTOCOMPLETE_NAME_LIMIT,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import {
	DyeTypeToEmoji,
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
	snowflakeDate,
	userTag,
	validateImageAttachment,
} from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

type DailyGuidesSetData = Partial<Packet<"daily_guides">> &
	Pick<Packet<"daily_guides">, "last_updated_user_id" | "last_updated_at">;

type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;

interface DailyQuestWithMedia {
	acknowledgement: string | null;
	index: number;
	quest: DailyQuests;
	url: string;
}

interface DailyGuidesFooterItem extends DailyGuidesDaysCountItem {
	text: string;
}

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
	const dailyQuests = await database.selectFrom("daily_guides").selectAll().executeTakeFirst();

	if (dailyQuests) {
		return dailyQuests;
	}

	// Use column defaults.
	const insertedDailyQuests = await database
		.insertInto("daily_guides")
		.defaultValues()
		.returningAll()
		.executeTakeFirstOrThrow();

	return insertedDailyQuests;
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
	await database.updateTable("daily_guides").set(data).execute();
}

function isDailyGuidesDistributionChannel(
	channel: APIChannel | AnnouncementThread | PublicThread | PrivateThread,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

function isDailyGuidesDistributionType(value: number): value is DailyGuidesDistributionTypes {
	return DAILY_GUIDES_DISTRIBUTION_TYPE_VALUES.includes(value as DailyGuidesDistributionTypes);
}

interface DailyGuidesIsDailyGuidesDistributableOptions {
	guild: Guild;
	channel: DailyGuidesDistributionAllowedChannel;
	me: GuildMember;
	locale?: Locale | undefined;
	website?: boolean;
}

function isDailyGuidesDistributable({
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
	channelId?: Snowflake | null;
	type?: DailyGuidesDistributionTypes;
}

type DailyGuidesSetupPayload = Pick<Packet<"daily_guides_distribution">, "guild_id"> &
	Partial<Pick<Packet<"daily_guides_distribution">, "type" | "channel_id" | "message_id">>;

async function setup({ guildId, channelId, type }: DailyGuidesSetupOptions) {
	const dailyGuidesDistributionPacket = await database
		.selectFrom("daily_guides_distribution")
		.selectAll()
		.where("guild_id", "=", guildId)
		.executeTakeFirst();

	const channelChanged =
		channelId !== undefined && dailyGuidesDistributionPacket?.channel_id !== channelId;

	const typeChanged = type !== undefined && dailyGuidesDistributionPacket?.type !== type;

	const targetChannelId =
		channelId === undefined ? dailyGuidesDistributionPacket?.channel_id : channelId;

	let messageId = dailyGuidesDistributionPacket?.message_id ?? null;
	const updateData: DailyGuidesSetupPayload = { guild_id: guildId };

	if (type !== undefined) {
		updateData.type = type;
	}

	if (channelId !== undefined) {
		updateData.channel_id = channelId;
	}

	if (dailyGuidesDistributionPacket) {
		if (channelChanged) {
			// Delete the existing message, if present.
			if (channelId && dailyGuidesDistributionPacket.channel_id && messageId) {
				await client.api.channels
					.deleteMessage(dailyGuidesDistributionPacket.channel_id, messageId)
					.catch(() => null);
			}

			updateData.message_id = null;
			messageId = null;
		}

		await database
			.updateTable("daily_guides_distribution")
			.set(updateData)
			.where("guild_id", "=", guildId)
			.execute();
	} else {
		await database
			.insertInto("daily_guides_distribution")
			.values({
				guild_id: guildId,
				type: DailyGuidesDistributionType.Compact,
				channel_id: updateData.channel_id ?? null,
				message_id: null,
			})
			.execute();
	}

	if (targetChannelId && (channelChanged || typeChanged)) {
		await send({
			guildId,
			type:
				type ??
				(dailyGuidesDistributionPacket?.type as DailyGuidesDistributionTypes | undefined) ??
				DailyGuidesDistributionType.Compact,
			channelId: targetChannelId,
			messageId,
			enforceNonce: false,
		});
	}
}

export async function setupResponse(
	guild: Guild,
	locale: Locale,
): Promise<APIInteractionResponseCallbackData> {
	const dailyGuidesDistributionPacket = await database
		.selectFrom("daily_guides_distribution")
		.select(["channel_id", "type"])
		.where("guild_id", "=", guild.id)
		.executeTakeFirst();

	const channelId = dailyGuidesDistributionPacket?.channel_id;
	const type = dailyGuidesDistributionPacket?.type ?? DailyGuidesDistributionType.Compact;

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
			feedback.push(t("daily-guides.setup-no-channel-detected", { lng: locale, ns: "features" }));
		}
	} else {
		feedback.push(t("daily-guides.setup-no-channel-selected", { lng: locale, ns: "features" }));
	}

	return {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [${t("daily-guides.name", { lng: locale, ns: "features" })}](https://guide.thatskyapplication.com/caelus/daily-guides)`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: t("daily-guides.setup-description", { lng: locale, ns: "features" }),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: CustomId.DailyGuidesSetupChannel,
								// @ts-expect-error The mutable array error is fine.
								channel_types: DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
								default_values: channelId
									? [{ id: channelId, type: SelectMenuDefaultValueType.Channel }]
									: [],
								max_values: 1,
								min_values: 0,
								placeholder: t("daily-guides.setup-channel-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CustomId.DailyGuidesSetupType,
								options: DAILY_GUIDES_DISTRIBUTION_TYPE_VALUES.map(
									(dailyGuidesDistributionType) => ({
										label: t(
											`daily-guides.distribution-type-label.${dailyGuidesDistributionType}`,
											{ lng: locale, ns: "features" },
										),
										description: t(
											`daily-guides.distribution-type-description.${dailyGuidesDistributionType}`,
											{ lng: locale, ns: "features" },
										),
										value: dailyGuidesDistributionType.toString(),
										default: dailyGuidesDistributionType === type,
									}),
								),
								max_values: 1,
								min_values: 1,
								placeholder: t("daily-guides.setup-type-string-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
							},
						],
					},
					{
						type: ComponentType.TextDisplay,
						content:
							feedback.length > 0
								? `${t("daily-guides.setup-stopped", { lng: locale, ns: "features", emoji: formatEmoji(MISCELLANEOUS_EMOJIS.No) })}\n${feedback.join("\n")}`
								: t("daily-guides.setup-sending", {
										lng: locale,
										ns: "features",
										emoji: formatEmoji(MISCELLANEOUS_EMOJIS.Yes),
									}),
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

export async function dailyGuidesSetupChannel(
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

export async function dailyGuidesSetupType(
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

	const [typeString] = interaction.data.values;
	const type = typeString === undefined ? undefined : Number(typeString);

	if (type !== undefined && !isDailyGuidesDistributionType(type)) {
		throw new Error("Received an unknown distribution type whilst setting up daily guides.");
	}

	await setup({ guildId: interaction.guild_id, type: type ?? DailyGuidesDistributionType.Compact });

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild, locale),
	);
}

export async function resetDailyGuidesDistribution() {
	await database.updateTable("daily_guides_distribution").set({ message_id: null }).execute();
}

interface DailyGuidesSendOptions {
	guildId: Snowflake;
	type: DailyGuidesDistributionTypes;
	channelId: Snowflake;
	messageId: Snowflake | null;
	enforceNonce: boolean;
}

async function send({ guildId, type, channelId, messageId, enforceNonce }: DailyGuidesSendOptions) {
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
	const { components } = await distributionData(guild.preferredLocale, type);

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

	const newDailyGuidesDistributionPacket = await database
		.updateTable("daily_guides_distribution")
		.set({ message_id: id })
		.where("guild_id", "=", guildId)
		.returningAll()
		.executeTakeFirst();

	return newDailyGuidesDistributionPacket;
}

function dailyGuidesEventData(date: Temporal.ZonedDateTime, locale: Locale) {
	const events = skyCurrentEvents(date);

	const eventEndText = skyNotEndedEvents(date).map(({ id, name, start, end }) => {
		const daysUntilStart = start.since(date).total({ unit: "days", relativeTo: date });
		const eventName = t(name, { lng: locale, ns: "general" });
		const eventTicketEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			return {
				end,
				start,
				text: `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("daily-guides.event-upcoming", { lng: locale, ns: "features", event: eventName, count: Math.floor(daysUntilStart) })}`,
			};
		}

		return {
			end,
			start,
			text: `${eventTicketEmoji ? `${formatEmoji(eventTicketEmoji)} ` : ""}${t("days-left.event", {
				lng: locale,
				ns: "general",
				count: Math.ceil(end.since(date).total({ unit: "days", relativeTo: date })) - 1,
				name: eventName,
			})}`,
		};
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
			Temporal.ZonedDateTime.compare(date, event.eventTickets.end) < 0 &&
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
						})}](${event.resolveInfographicURL(date)!} "${t(event.name, { lng: locale, ns: "general" })}")`;
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

async function distributionData(
	locale: Locale,
	type: DailyGuidesDistributionTypes = DailyGuidesDistributionType.Compact,
): Promise<DailyGuidesDistributionDataResponse> {
	const today = skyToday();
	const now = skyNow();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(now.epochMilliseconds)}](${DAILY_GUIDES_URL})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const todayMaintenance = [];
	const upcomingMaintenance: DailyGuidesFooterItem[] = [];
	const seenMaintenanceDays = new Set<number>();

	for (const maintenance of MAINTENANCE_PERIODS) {
		const daysUntilStart = maintenance.start
			.since(today)
			.total({ unit: "days", relativeTo: today });

		if (daysUntilStart < 1) {
			if (Temporal.ZonedDateTime.compare(maintenance.end, now) > 0) {
				todayMaintenance.push(maintenance);
			}

			continue;
		}

		const floorDays = Math.floor(daysUntilStart);

		if (floorDays >= 2) {
			if (!seenMaintenanceDays.has(floorDays)) {
				seenMaintenanceDays.add(floorDays);

				upcomingMaintenance.push({
					end: maintenance.end,
					start: maintenance.start,
					text: t("daily-guides.maintenance-upcoming", {
						ns: "features",
						lng: locale,
						count: floorDays,
					}),
				});
			}
		} else {
			upcomingMaintenance.push({
				end: maintenance.end,
				start: maintenance.start,
				text: t("daily-guides.maintenance-upcoming", {
					ns: "features",
					lng: locale,
					count: 1,
					time: new Intl.DateTimeFormat(locale, {
						timeZone: TIME_ZONE,
						timeStyle: "short",
					}).format(maintenance.start.epochMilliseconds),
				}),
			});
		}
	}

	if (todayMaintenance.length > 0) {
		let maintenanceString: string;

		if (todayMaintenance.length > 1) {
			maintenanceString = t("maintenance-description-many-with-times", {
				lng: locale,
				ns: "general",
				times: todayMaintenance
					.map(
						(maintenance) =>
							`- ${t("time-range", {
								lng: locale,
								ns: "general",
								start: `<t:${epochSeconds(maintenance.start)}:t>`,
								end: `<t:${epochSeconds(maintenance.end)}:t>`,
							})}`,
					)
					.join("\n"),
			});
		} else {
			maintenanceString = t("maintenance-description-singular", {
				lng: locale,
				ns: "general",
				start: `<t:${epochSeconds(todayMaintenance[0]!.start)}:t>`,
				end: `<t:${epochSeconds(todayMaintenance[0]!.end)}:t>`,
			});
		}

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("maintenance", { lng: locale, ns: "general" })}\n\n${formatEmoji(MISCELLANEOUS_EMOJIS.Report)} ${maintenanceString}`,
		});
	}

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
			quests.push({
				quest,
				url: DailyQuestToInfographicURL[quest],
				acknowledgement: DailyQuestToAcknowledgement[quest],
			});
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
						`${index + 1}. ${type === DailyGuidesDistributionType.Compact && url ? `[${t(`quests.${quest}`, { lng: locale, ns: "general" })}](${url})` : t(`quests.${quest}`, { lng: locale, ns: "general" })}`,
				)
				.join("\n")}`,
		});

		if (type === DailyGuidesDistributionType.Media) {
			const questsWithMedia: DailyQuestWithMedia[] = [];
			let questMediaIndex = 1;

			for (const quest of quests) {
				if (quest.url) {
					questsWithMedia.push({
						acknowledgement: quest.acknowledgement,
						index: questMediaIndex++,
						quest: quest.quest,
						url: quest.url,
					});
				}
			}

			if (questsWithMedia.length > 0) {
				const acknowledgementContent: string[] = [];

				for (const { acknowledgement, index } of questsWithMedia) {
					if (acknowledgement) {
						acknowledgementContent.push(
							t("daily-guides.infographic-acknowledgement-item", {
								lng: locale,
								ns: "features",
								infographic: index,
								acknowledgement,
							}),
						);
					}
				}

				containerComponents.push({
					type: ComponentType.MediaGallery,
					items: questsWithMedia.map(({ quest, url }) => ({
						media: { url },
						description: t(`quests.${quest}`, { lng: locale, ns: "general" }),
					})),
				});

				if (acknowledgementContent.length > 0) {
					containerComponents.push({
						type: ComponentType.TextDisplay,
						content: `-# ${acknowledgementContent.join(" | ")}`,
					});
				}
			}
		}
	} else {
		missingDailyQuests = true;
	}

	const treasureCandleURLs = treasureCandles(today);
	let treasureCandlesContent = `### ${t("daily-guides.treasure-candles", { lng: locale, ns: "features" })}`;

	if (type === DailyGuidesDistributionType.Compact) {
		treasureCandlesContent += `\n\n${
			treasureCandleURLs.length === 1
				? `[${t("view", { lng: locale, ns: "general" })}](${treasureCandleURLs[0]})`
				: treasureCandleURLs
						.map(
							(treasureCandleURL, index) =>
								`[${index * 4 + 1}–${index * 4 + 4}](${treasureCandleURL})`,
						)
						.join(" | ")
		}`;
	}

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: treasureCandlesContent,
	});

	if (type === DailyGuidesDistributionType.Media) {
		for (let index = 0; index < treasureCandleURLs.length; index += 10) {
			const chunk = treasureCandleURLs.slice(index, index + 10);

			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: chunk.map((url) => ({ media: { url } })),
			});
		}
	}

	const season = skyCurrentSeason(today);
	const footerItems: DailyGuidesFooterItem[] = [];
	const doubleTreasureCandlePrefix = formatEmoji(MISCELLANEOUS_EMOJIS.TreasureCandle);

	if (season) {
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		footerItems.push({
			end: season.end,
			start: season.start,
			text: `${seasonEmoji ? `${formatEmoji(seasonEmoji)} ` : ""}${t("days-left.season", {
				lng: locale,
				ns: "general",
				count: Math.ceil(season.end.since(now).total({ unit: "days", relativeTo: now })) - 1,
			})}`,
		});

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const candleEmoji =
			SeasonIdToSeasonalCandleEmoji[season.id] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle;

		for (const doubleSeasonalLight of season.doubleSeasonalLight?.filter(
			({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
		) ?? []) {
			const candlePrefix = formatEmoji(candleEmoji);

			footerItems.push({
				end: doubleSeasonalLight.end,
				start: doubleSeasonalLight.start,
				text:
					Temporal.ZonedDateTime.compare(today, doubleSeasonalLight.start) >= 0
						? `${candlePrefix} ${t("days-left.double-seasonal-light", {
								lng: locale,
								ns: "general",
								count:
									Math.ceil(
										doubleSeasonalLight.end.since(today).total({ unit: "days", relativeTo: today }),
									) - 1,
							})}`
						: `${candlePrefix} ${t("daily-guides.double-seasonal-light-upcoming", {
								lng: locale,
								ns: "features",
								count: Math.floor(
									doubleSeasonalLight.start.since(today).total({ unit: "days", relativeTo: today }),
								),
							})}`,
			});
		}

		const seasonalCandlesRotation = season.seasonalCandles(today);

		const seasonalCandlesRemaining = t("daily-guides.seasonal-candles-remain-with-season-pass", {
			lng: locale,
			ns: "features",
			remaining: resolveCurrencyEmoji({
				emoji: candleEmoji,
				amount: seasonalCandlesLeft.toLocaleString(locale),
			}),
			remainingSeasonPass: resolveCurrencyEmoji({
				emoji: candleEmoji,
				amount: seasonalCandlesLeftWithSeasonPass.toLocaleString(locale),
			}),
		});

		let seasonalCandlesContent = `### ${t("daily-guides.seasonal-candles", { lng: locale, ns: "features" })}\n\n`;

		if (type === DailyGuidesDistributionType.Compact && seasonalCandlesRotation) {
			seasonalCandlesContent += `[${t("view", { lng: locale, ns: "general" })}](${seasonalCandlesRotation})\n`;
		}

		seasonalCandlesContent += seasonalCandlesRemaining;

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: seasonalCandlesContent,
		});

		if (type === DailyGuidesDistributionType.Media && seasonalCandlesRotation) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: seasonalCandlesRotation } }],
			});
		}
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.since(today).total({ unit: "days", relativeTo: today });
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		footerItems.push({
			end: next.end,
			start: next.start,
			text: `${nextSeasonEmoji ? `${formatEmoji(nextSeasonEmoji)} ` : ""}${t("daily-guides.season-upcoming", { lng: locale, ns: "features", count: Math.floor(daysUntilStart) })}`,
		});
	}

	const eventData = dailyGuidesEventData(today, locale);
	footerItems.push(...eventData.eventEndText);

	if (eventData.eventTickets) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `### ${t("event-tickets", { lng: locale, ns: "general" })}\n\n${eventData.eventTickets}`,
		});
	}

	const shard = shardEruption();
	let shardEruptionContent = `### ${t("daily-guides.shard-eruption", { lng: locale, ns: "features" })}\n\n`;

	if (shard) {
		if (type === DailyGuidesDistributionType.Compact) {
			shardEruptionContent += `${shardEruptionInformationString(shard, true, locale)}\n`;
		}

		shardEruptionContent += shardEruptionTimestampsString({ timestamps: shard.timestamps, locale });
	} else {
		shardEruptionContent += t("shard-eruption.none", { lng: locale, ns: "features" });
	}

	containerComponents.push({
		type: ComponentType.Section,
		accessory: {
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: CustomId.DailyGuidesShardEruptionsMore,
			label: t("more", { lng: locale, ns: "general" }),
		},
		components: [
			{
				type: ComponentType.TextDisplay,
				content: shardEruptionContent,
			},
		],
	});

	if (type === DailyGuidesDistributionType.Media && shard) {
		containerComponents.push(
			{
				type: ComponentType.MediaGallery,
				items: [{ media: { url: shard.url } }],
			},
			{
				type: ComponentType.TextDisplay,
				content: `-# ${t("infographic-by", { lng: locale, ns: "general", acknowledgement: shard.acknowledgement })}`,
			},
		);
	}

	let missingTravellingRock: boolean;

	if (travellingRock) {
		missingTravellingRock = false;
		let travellingRockContent = `### ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}\n\n`;
		const travellingRockURL = new URL(
			`daily_guides/travelling_rocks/${travellingRock}.webp`,
			CDN_URL,
		).href;

		if (type === DailyGuidesDistributionType.Compact) {
			travellingRockContent += `[${t("view", { lng: locale, ns: "general" })}](${travellingRockURL})`;
		}

		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: travellingRockContent,
		});

		if (type === DailyGuidesDistributionType.Media) {
			containerComponents.push({
				type: ComponentType.MediaGallery,
				items: [{ media: { url: travellingRockURL } }],
			});
		}
	} else {
		missingTravellingRock = true;
	}

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const untilStart = start.since(today).total({ unit: "days", relativeTo: today });
			const formattedName = marketingURL ? `[${name}](${marketingURL})` : name;

			footerItems.push({
				start,
				text:
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
								time: `<t:${epochSeconds(start)}:t>`,
							}),
			});
		}
	}

	const radianceEvents = RADIANCE_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	);

	if (radianceEvents.length > 0) {
		const radianceName = t("event-names.radiance-event", { lng: locale, ns: "general" });
		const dyePrefix = formatEmoji(MISCELLANEOUS_EMOJIS.Dye);

		for (const radianceEvent of radianceEvents) {
			const dyeEmojis = radianceEvent.dyes.map((dye) => formatEmoji(DyeTypeToEmoji[dye])).join("");

			if (Temporal.ZonedDateTime.compare(today, radianceEvent.start) >= 0) {
				footerItems.push({
					end: radianceEvent.end,
					start: radianceEvent.start,
					text: `${dyePrefix} ${t("days-left.event", {
						lng: locale,
						ns: "general",
						count:
							Math.ceil(radianceEvent.end.since(today).total({ unit: "days", relativeTo: today })) -
							1,
						name: radianceName,
					})} ${dyeEmojis}`,
				});
			} else {
				footerItems.push({
					end: radianceEvent.end,
					start: radianceEvent.start,
					text: `${t("daily-guides.event-upcoming", {
						lng: locale,
						ns: "features",
						event: `${dyePrefix} ${radianceName}`,
						count: Math.floor(
							radianceEvent.start.since(today).total({ unit: "days", relativeTo: today }),
						),
					})} ${dyeEmojis}`,
				});
			}
		}
	}

	for (const doubleTreasureCandleEvent of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		footerItems.push({
			end: doubleTreasureCandleEvent.end,
			start: doubleTreasureCandleEvent.start,
			text:
				Temporal.ZonedDateTime.compare(today, doubleTreasureCandleEvent.start) >= 0
					? `${doubleTreasureCandlePrefix} ${t("days-left.double-treasure-candles", {
							lng: locale,
							ns: "general",
							count:
								Math.ceil(
									doubleTreasureCandleEvent.end
										.since(today)
										.total({ unit: "days", relativeTo: today }),
								) - 1,
						})}`
					: `${doubleTreasureCandlePrefix} ${t("daily-guides.double-treasure-candles-upcoming", {
							lng: locale,
							ns: "features",
							count: Math.floor(
								doubleTreasureCandleEvent.start
									.since(today)
									.total({ unit: "days", relativeTo: today }),
							),
						})}`,
		});
	}

	const doubleHeartEvents = DOUBLE_HEART_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	);

	if (doubleHeartEvents.length > 0) {
		const heartPrefix = formatEmoji(MISCELLANEOUS_EMOJIS.Heart);

		for (const doubleHeartEvent of doubleHeartEvents) {
			if (Temporal.ZonedDateTime.compare(today, doubleHeartEvent.start) >= 0) {
				footerItems.push({
					end: doubleHeartEvent.end,
					start: doubleHeartEvent.start,
					text: `${heartPrefix} ${t("days-left.double-hearts", {
						lng: locale,
						ns: "general",
						count:
							Math.ceil(
								doubleHeartEvent.end.since(today).total({ unit: "days", relativeTo: today }),
							) - 1,
					})}`,
				});
			} else {
				footerItems.push({
					end: doubleHeartEvent.end,
					start: doubleHeartEvent.start,
					text: `${heartPrefix} ${t("daily-guides.double-hearts-upcoming", {
						lng: locale,
						ns: "features",
						count: Math.floor(
							doubleHeartEvent.start.since(today).total({ unit: "days", relativeTo: today }),
						),
					})}`,
				});
			}
		}
	}

	footerItems.push(...upcomingMaintenance);

	if (footerItems.length > 0) {
		sortDaysCountItems(footerItems, today);

		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.TextDisplay,
				content: footerItems.map(({ text }) => `-# ${text}`).join("\n"),
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

	const dailyGuidesDistributionPackets = await database
		.selectFrom("daily_guides_distribution")
		.selectAll()
		.where("channel_id", "is not", null)
		.$narrowType<{ channel_id: string }>()
		.execute();

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			distributeQueue.add(async () =>
				send({
					guildId: dailyGuidesDistributionPacket.guild_id,
					type: dailyGuidesDistributionPacket.type as DailyGuidesDistributionTypes,
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
	type: DailyGuidesDistributionTypes = DailyGuidesDistributionType.Compact,
) {
	const { locale } = interaction;
	const { components, missingDailyQuests, missingTravellingRock } = await distributionData(
		locale,
		type,
	);
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
					content: `${t(
						interaction.guild_id === SUPPORT_SERVER_GUILD_ID
							? "daily-guides.not-yet-updated-support-server"
							: "daily-guides.not-yet-updated",
						{
							lng: locale,
							ns: "features",
							url: SUPPORT_SERVER_INVITE_URL,
							channel: `<#${UPDATING_DAILY_GUIDES_CHANNEL_ID}>`,
						},
					)}\n${missing.join("\n")}`,
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
					disabled: type === InteractiveType.Distributing,
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
					disabled: type === InteractiveType.Distributing,
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
		lastUpdatedAt: snowflakeDate(interaction.id),
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
		last_updated_at: snowflakeDate(interaction.id),
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

		const buffer = await processUploadedImage(await fetchedURL.arrayBuffer(), {
			animated: false,
			gif: false,
			maximumDimension: MAXIMUM_ASSET_BANNER_DIMENSION,
		});

		const hashedBuffer = createHash("md5").update(buffer).digest("hex");

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
		last_updated_at: snowflakeDate(interaction.id),
	};

	data.quest1 = isDailyQuest(newQuest1) ? newQuest1 : null;
	data.quest2 = isDailyQuest(newQuest2) ? newQuest2 : null;
	data.quest3 = newQuest3 !== null && isDailyQuest(newQuest3) ? newQuest3 : null;
	data.quest4 = newQuest4 !== null && isDailyQuest(newQuest4) ? newQuest4 : null;

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
