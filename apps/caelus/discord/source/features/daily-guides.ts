import { createHash } from "node:crypto";
import { URL } from "node:url";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIContainerComponent,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APILabelComponent,
	type APIMessageChannelSelectInteractionData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
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
import { getFixedT, t } from "i18next";
import pQueue from "p-queue";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	clampPlainDate,
	currentNestingWorkshop,
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DAILY_GUIDES_DISTRIBUTION_TYPE_VALUES,
	DAILY_QUEST_VALUES,
	dailyGuidesContainer,
	dailyGuidesDate,
	DailyGuidesDistributionType,
	type DailyGuidesDistributionTypes,
	type DailyQuests,
	DailyQuestToInfographicURL,
	fetchDailyGuides,
	fetchFirstDailyGuidesDate,
	fetchNestingWorkshop,
	formatEmoji,
	isDailyQuest,
	MAXIMUM_ASSET_BANNER_DIMENSION,
	NESTING_WORKSHOP_ROTATION_CATEGORY_VALUES,
	NESTING_WORKSHOP_ROTATION_COSMETICS,
	type NestingWorkshopRotationCategories,
	NestingWorkshopRotationCategory,
	NestingWorkshopRotationCategoryToCosmetics,
	type Packet,
	parsePlainDate,
	resolveNestingWorkshopItems,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	skyNow,
	dailyQuestLabel,
} from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import database from "../database.js";
import { client } from "../discord.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import { processUploadedImage } from "../utility/assets.js";
import { itemToSelectMenuOption } from "../utility/catalogue.js";
import {
	R2_BUCKET_CDN,
	CDN_URL,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	DEVELOPER_ROLE_ID,
	MAXIMUM_CONCURRENCY_LIMIT,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	UPDATING_DAILY_GUIDES_CHANNEL_ID,
} from "../utility/configuration.js";
import {
	DAILY_GUIDES_URL,
	INFORMATION_ACCENT_COLOUR,
	LOCALE_OPTIONS,
	MAXIMUM_AUTOCOMPLETE_CHOICES_LIMIT,
	MAXIMUM_AUTOCOMPLETE_NAME_LIMIT,
	NESTING_WORKSHOP_MAXIMUM_PROPS,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import {
	diffJSON,
	formatArrayErrors,
	isThreadChannelType,
	notInCachedGuildResponse,
	snowflakeDate,
	userTag,
	validateImageAttachment,
} from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";

type DailyGuidesSetData = Partial<Omit<Packet<"daily_guides">, "date">> &
	Pick<Packet<"daily_guides">, "last_updated_user_id" | "last_updated_at">;

type DailyGuidesDistributionAllowedChannel =
	| Extract<
			// We use our own thread.
			Exclude<APIChannel, APIPublicThreadChannel>,
			{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
	  >
	| PublicThread;

const distributeQueue = new pQueue({ concurrency: MAXIMUM_CONCURRENCY_LIMIT });
let distributionLock: Promise<unknown> | null = null;

const NestingWorkshopRotationCategoryToLabel = {
	[NestingWorkshopRotationCategory.Rugs]: "Rugs",
	[NestingWorkshopRotationCategory.TablesAndDesks]: "Tables and desks",
	[NestingWorkshopRotationCategory.Seating]: "Seating",
	[NestingWorkshopRotationCategory.KitchenAndBathroom]: "Kitchen and bathroom",
	[NestingWorkshopRotationCategory.StorageLightingAndDecor]: "Storage, lighting and decor",
} as const satisfies Readonly<Record<NestingWorkshopRotationCategories, string>>;

export function questAutocomplete(focused: string, locale: Locale) {
	return focused === ""
		? []
		: DAILY_QUEST_VALUES.filter((dailyQuest) =>
				dailyQuestLabel(dailyQuest, t, { lng: locale })
					.toUpperCase()
					.includes(focused.toUpperCase()),
			)
				.map((dailyQuest) => {
					let quest = dailyQuestLabel(dailyQuest, t, { lng: locale });

					if (quest.length > MAXIMUM_AUTOCOMPLETE_NAME_LIMIT) {
						quest = `${quest.slice(0, MAXIMUM_AUTOCOMPLETE_NAME_LIMIT - 3)}...`;
					}

					return { name: quest, value: dailyQuest };
				})
				.slice(0, MAXIMUM_AUTOCOMPLETE_CHOICES_LIMIT);
}

export function questResponse(quest: DailyQuests, locale: Locale): [APIMessageTopLevelComponent] {
	const url = DailyQuestToInfographicURL[quest];

	return [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${dailyQuestLabel(quest, t, { lng: locale })}`,
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

async function updateDailyGuides(date: Temporal.PlainDate, data: DailyGuidesSetData) {
	await database
		.insertInto("daily_guides")
		.values({ date: dailyGuidesDate(date), ...data })
		.onConflict((oc) => oc.column("date").doUpdateSet(data))
		.execute();
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
			return errors;
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
				? t(`common.error-missing-permissions-thread${website ? "-website" : ""}`, {
						lng: locale,
						ns: "features",
						channel: website ? channel.name : `<#${channel.id}>`,
					})
				: t(`common.error-missing-permissions${website ? "-website" : ""}`, {
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
			feedback.push(t("common.no-channel-detected", { lng: locale, ns: "features" }));
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
								? `${t("common.stopped", { lng: locale, ns: "features", emoji: formatEmoji(MISCELLANEOUS_EMOJIS.No) })}\n${feedback.join("\n")}`
								: t("common.sending", {
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

	const channel = guild.channels.get(channelId) ?? guild.threads.get(channelId);

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
	const { components } = await distributionData({ locale: guild.preferredLocale, type });

	// Update the embed if a message exists.
	if (messageId) {
		try {
			return await client.api.channels.editMessage(channelId, messageId, { components });
		} catch (error) {
			// It is likely that the message was deleted prior to editing.
			if (!(error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.UnknownMessage)) {
				throw error;
			}
		}
	}

	// There is no existing message. Send one.
	const { id } = await client.api.channels.createMessage(channelId, {
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

interface DailyGuidesDistributionDataResponse {
	components: [APIContainerComponent, ...APIMessageTopLevelComponent[]];
	isToday: boolean;
	missingDailyQuests: boolean;
	missingTravellingRock: boolean;
	missingNestingWorkshop: boolean;
}

interface DailyGuidesDistributionDataOptions {
	locale: Locale;
	type?: DailyGuidesDistributionTypes;
	showShardTimestampStatus?: boolean;
	date?: Temporal.PlainDate;
}

async function distributionData({
	locale,
	type = DailyGuidesDistributionType.Compact,
	showShardTimestampStatus = false,
	date,
}: DailyGuidesDistributionDataOptions): Promise<DailyGuidesDistributionDataResponse> {
	const currentTime = skyNow();
	const day = date ?? currentTime.toPlainDate();
	const dailyGuides = await fetchDailyGuides(database, day);
	const nestingWorkshopPacket = await fetchNestingWorkshop(database, day);
	const upcomingUpdate = upcomingPatchNote(day.toString());

	const { container, isToday, missingDailyQuests, missingTravellingRock } = dailyGuidesContainer(
		{
			cdnURL: CDN_URL,
			currentTime,
			dailyGuides,
			date: day,
			emojis: EMOJIS,
			locale,
			nestingWorkshopItems: resolveNestingWorkshopItems(nestingWorkshopPacket?.cosmetics ?? []),
			shardEruptionButton: {
				type: ComponentType.Button,
				style: ButtonStyle.Secondary,
				custom_id: `${CustomId.DailyGuidesShardEruptionsMore}§${day.toString()}`,
				label: t("more", { lng: locale, ns: "general" }),
			},
			t: getFixedT(locale),
			upcomingUpdate: upcomingUpdate && {
				date: upcomingUpdate.date,
				version: patchNoteVersion(upcomingUpdate.identifier),
			},
			url: DAILY_GUIDES_URL,
		},
		{ showShardTimestampStatus, type },
	);

	return {
		components: [container],
		isToday,
		missingDailyQuests,
		missingTravellingRock,
		missingNestingWorkshop: nestingWorkshopPacket === null,
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

	await updateDailyGuides(skyNow().toPlainDate(), {
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

		const reason: unknown = result.reason;

		// Our own errors thrown.
		if (reason instanceof Error && reason.message.startsWith("Did not distribute")) {
			knownErrors.push(reason);
			continue;
		}

		errors.push(reason);
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

interface DailyGuidesResponseOptions {
	type?: DailyGuidesDistributionTypes;
	date?: Temporal.PlainDate | null;
	newMessage?: boolean;
}

export async function dailyGuidesResponse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	{
		type = DailyGuidesDistributionType.Compact,
		date,
		newMessage = true,
	}: DailyGuidesResponseOptions = {},
) {
	const { locale } = interaction;
	const todayDate = skyNow().toPlainDate();
	const firstDate = (await fetchFirstDailyGuidesDate(database)) ?? todayDate;
	const day = clampPlainDate(date ?? todayDate, firstDate, todayDate);

	const { components, isToday, missingDailyQuests, missingTravellingRock, missingNestingWorkshop } =
		await distributionData({
			locale,
			type,
			showShardTimestampStatus: true,
			date: day,
		});

	components[0].components.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.DailyGuidesBack}§${day.subtract({ days: 1 }).toString()}§${type}`,
				disabled: Temporal.PlainDate.compare(day, firstDate) <= 0,
				label: t("navigation-back", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.DailyGuidesToday}§${type}`,
				label: t("today", { lng: locale, ns: "general" }),
				style: ButtonStyle.Primary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.DailyGuidesNext}§${day.add({ days: 1 }).toString()}§${type}`,
				disabled: isToday,
				label: t("navigation-next", { lng: locale, ns: "general" }),
				style: ButtonStyle.Secondary,
			},
		],
	});

	const missing = [];

	if (isToday && missingDailyQuests) {
		missing.push(`- ${t("daily-quests", { lng: locale, ns: "general" })}`);
	}

	if (isToday && missingTravellingRock) {
		missing.push(`- ${t("daily-guides.travelling-rock", { lng: locale, ns: "features" })}`);
	}

	if (isToday && missingNestingWorkshop) {
		missing.push(`- ${t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop], { lng: locale })}`);
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

	if (newMessage) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

export async function dailyGuidesNavigation(
	interaction: APIMessageComponentButtonInteraction,
	date: string | undefined,
	type: string | undefined,
) {
	const parsedType = Number(type);

	await dailyGuidesResponse(interaction, {
		type: isDailyGuidesDistributionType(parsedType)
			? parsedType
			: DailyGuidesDistributionType.Compact,
		date: parsePlainDate(date),
		newMessage: false,
	});
}

export const enum InteractiveType {
	Reorder = 0,
	Distributing = 1,
	Distributed = 2,
	Locale = 3,
	Uploading = 4,
	NestingWorkshopReorder = 5,
}

interface InteractiveOptions {
	type?: InteractiveType;
	locale: Locale;
}

export async function interactive(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>
		| APIModalSubmitGuildInteraction,
	{ type, locale }: InteractiveOptions,
) {
	const now = skyNow();
	const date = now.toPlainDate();

	const {
		quest1,
		quest2,
		quest3,
		quest4,
		last_updated_at: lastUpdatedAt,
		last_updated_user_id: lastUpdatedUserId,
	} = await fetchDailyGuides(database, date);

	const nestingWorkshopPacket = await fetchNestingWorkshop(database, date);
	const nestingWorkshopStart = currentNestingWorkshop(now);
	const nestingWorkshopProps = resolveNestingWorkshopItems(nestingWorkshopPacket?.cosmetics ?? []);
	const quests = [quest1, quest2, quest3, quest4];
	const questOptions = [];

	for (const quest of quests) {
		if (quest === null || !isDailyQuest(quest)) {
			continue;
		}

		questOptions.push({
			label: dailyQuestLabel(quest, t, { lng: locale }),
			value: quest.toString(),
		});
	}

	const containerComponents: APIComponentInContainer[] = [];

	const components: APIMessageTopLevelComponent[] = [
		...(await distributionData({ locale })).components,
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
		case InteractiveType.NestingWorkshopReorder:
			message = "Nesting Workshop props reordered!";
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

	if (nestingWorkshopStart && nestingWorkshopProps.length > 1) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.DailyGuidesNestingWorkshopReorder}§${nestingWorkshopStart.toPlainDate().toString()}`,
					max_values: nestingWorkshopProps.length,
					min_values: nestingWorkshopProps.length,
					options: nestingWorkshopProps.map((item) =>
						itemToSelectMenuOption(item, undefined, locale),
					),
					placeholder: "Reorder Nesting Workshop props.",
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
			content: [
				lastUpdatedAt && lastUpdatedUserId
					? `-# Last updated by <@${lastUpdatedUserId}> <t:${Math.floor(lastUpdatedAt.getTime() / 1000)}:R>.`
					: "-# Not updated yet.",
				nestingWorkshopPacket
					? `-# Nesting Workshop last updated by <@${nestingWorkshopPacket.last_updated_user_id}> <t:${Math.floor(nestingWorkshopPacket.last_updated_at.getTime() / 1000)}:R>.`
					: "-# Nesting Workshop not updated yet.",
			].join("\n"),
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
		type === InteractiveType.NestingWorkshopReorder ||
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

	if (options.size === 0) {
		await interactive(interaction, { locale });
		return;
	}

	const interactiveOptions: InteractiveOptions = { locale };
	const date = skyNow().toPlainDate();
	const {
		quest1,
		quest2,
		quest3,
		quest4,
		travelling_rock: travellingRock,
		travelling_rock_not_spawned: travellingRockNotSpawned,
	} = await fetchDailyGuides(database, date);
	const oldQuest1 = quest1;
	const oldQuest2 = quest2;
	const oldQuest3 = quest3;
	const oldQuest4 = quest4;
	const newQuest1 = options.getInteger("quest-1") ?? oldQuest1;
	const newQuest2 = options.getInteger("quest-2") ?? oldQuest2;
	const newQuest3 = options.getInteger("quest-3") ?? oldQuest3;
	const newQuest4 = options.getInteger("quest-4") ?? oldQuest4;
	const newTravellingRock = options.getAttachment("travelling-rock");
	const newTravellingRockNotSpawned = options.getBoolean("travelling-rock-not-spawned");

	if (newTravellingRock && newTravellingRockNotSpawned) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The travelling rock cannot have an image and be marked as not spawned.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

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
		oldQuest4 === newQuest4 &&
		(newTravellingRockNotSpawned === null ||
			newTravellingRockNotSpawned === travellingRockNotSpawned)
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No changes were made. Check to see if daily guides are already distributed!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const oldData = {
		quest1: oldQuest1 === null || !isDailyQuest(oldQuest1) ? null : dailyQuestLabel(oldQuest1, t),
		quest2: oldQuest2 === null || !isDailyQuest(oldQuest2) ? null : dailyQuestLabel(oldQuest2, t),
		quest3: oldQuest3 === null || !isDailyQuest(oldQuest3) ? null : dailyQuestLabel(oldQuest3, t),
		quest4: oldQuest4 === null || !isDailyQuest(oldQuest4) ? null : dailyQuestLabel(oldQuest4, t),
		travellingRock,
		travellingRockNotSpawned,
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
				Bucket: R2_BUCKET_CDN,
				Key: `daily_guides/travelling_rocks/${hashedBuffer}.webp`,
				Body: buffer,
				ContentDisposition: "inline",
				ContentType: "image/webp",
			}),
		);

		data.travelling_rock = hashedBuffer;
		data.travelling_rock_not_spawned = false;
	} else if (newTravellingRockNotSpawned !== null) {
		data.travelling_rock_not_spawned = newTravellingRockNotSpawned;

		if (newTravellingRockNotSpawned) {
			data.travelling_rock = null;
		}
	}

	const finalTravellingRock =
		data.travelling_rock === undefined ? travellingRock : data.travelling_rock;
	const finalTravellingRockNotSpawned =
		data.travelling_rock_not_spawned ?? travellingRockNotSpawned;
	const newData = {
		quest1: newQuest1 === null || !isDailyQuest(newQuest1) ? null : dailyQuestLabel(newQuest1, t),
		quest2: newQuest2 === null || !isDailyQuest(newQuest2) ? null : dailyQuestLabel(newQuest2, t),
		quest3: newQuest3 === null || !isDailyQuest(newQuest3) ? null : dailyQuestLabel(newQuest3, t),
		quest4: newQuest4 === null || !isDailyQuest(newQuest4) ? null : dailyQuestLabel(newQuest4, t),
		travellingRock: finalTravellingRock,
		travellingRockNotSpawned: finalTravellingRockNotSpawned,
	};

	data.quest1 = newQuest1 === null || !isDailyQuest(newQuest1) ? null : newQuest1;
	data.quest2 = newQuest2 === null || !isDailyQuest(newQuest2) ? null : newQuest2;
	data.quest3 = newQuest3 === null || !isDailyQuest(newQuest3) ? null : newQuest3;
	data.quest4 = newQuest4 === null || !isDailyQuest(newQuest4) ? null : newQuest4;

	await logModification({
		user: interaction.member.user,
		content: "set daily guides.",
		diff: `\`\`\`diff\n${diffJSON(oldData, newData)}\n\`\`\``,
		travellingRock: finalTravellingRock,
	});

	await updateDailyGuides(date, data);
	await interactive(interaction, interactiveOptions);
}

export async function nestingWorkshopModal(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	const { locale } = interaction;
	const now = skyNow();
	const nestingWorkshopPacket = await fetchNestingWorkshop(database, now.toPlainDate());
	const selected = new Set(nestingWorkshopPacket?.cosmetics);

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: NESTING_WORKSHOP_ROTATION_CATEGORY_VALUES.map((category): APILabelComponent => {
			const options = resolveNestingWorkshopItems(
				NestingWorkshopRotationCategoryToCosmetics[category],
			).map((item) => itemToSelectMenuOption(item, selected, locale));

			return {
				type: ComponentType.Label,
				component: {
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.DailyGuidesNestingWorkshopModalProps}§${category}`,
					max_values: Math.min(NESTING_WORKSHOP_MAXIMUM_PROPS, options.length),
					min_values: 0,
					options,
					required: false,
				},
				label: NestingWorkshopRotationCategoryToLabel[category],
			};
		}),
		custom_id: `${CustomId.DailyGuidesNestingWorkshopModal}§${currentNestingWorkshop(now)!.toPlainDate().toString()}`,
		title: "Nesting Workshop",
	});
}

export async function setNestingWorkshop(
	interaction: APIModalSubmitGuildInteraction,
	rotation: string | undefined,
) {
	const { locale } = interaction;
	const now = skyNow();
	const start = currentNestingWorkshop(now);

	if (!start || start.toPlainDate().toString() !== rotation) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The Nesting Workshop has reset since this was opened. Run the command again!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const components = new ModalResolver(interaction.data);

	const selected = new Set(
		NESTING_WORKSHOP_ROTATION_CATEGORY_VALUES.flatMap((category) =>
			components
				.getStringSelectValues(`${CustomId.DailyGuidesNestingWorkshopModalProps}§${category}`)
				.flatMap((value) => JSON.parse(value) as readonly number[]),
		),
	);

	const oldCosmetics = (await fetchNestingWorkshop(database, now.toPlainDate()))?.cosmetics ?? [];

	const cosmetics = [
		...oldCosmetics.filter((cosmetic) => selected.has(cosmetic)),
		...NESTING_WORKSHOP_ROTATION_COSMETICS.filter(
			(cosmetic) => selected.has(cosmetic) && !oldCosmetics.includes(cosmetic),
		),
	];

	if (cosmetics.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No props were selected.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (cosmetics.length > NESTING_WORKSHOP_MAXIMUM_PROPS) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `The maximum limit is ${NESTING_WORKSHOP_MAXIMUM_PROPS}. If there are more than ${NESTING_WORKSHOP_MAXIMUM_PROPS}, reach out to a <@&${DEVELOPER_ROLE_ID}>!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		oldCosmetics.length === cosmetics.length &&
		cosmetics.every((cosmetic) => oldCosmetics.includes(cosmetic))
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No changes were made. These props are already set!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await logModification({
		user: interaction.member.user,
		content: "set the Nesting Workshop props.",
		diff: `\`\`\`diff\n${diffJSON({ cosmetics: oldCosmetics }, { cosmetics })}\n\`\`\``,
	});

	const data = {
		cosmetics,
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: snowflakeDate(interaction.id),
	};

	await database
		.insertInto("nesting_workshop")
		.values({ date: new Date(start.epochMilliseconds), ...data })
		.onConflict((onConflict) => onConflict.column("date").doUpdateSet(data))
		.execute();

	await interactive(interaction, { locale });
}

export async function questsReorder(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const {
		locale,
		data: { values },
	} = interaction;

	const date = skyNow().toPlainDate();
	const { quest1, quest2, quest3, quest4 } = await fetchDailyGuides(database, date);
	const newQuest1 = Number(values[0]);
	const newQuest2 = Number(values[1]);
	const newQuest3 = values[2] === undefined ? null : Number(values[2]);
	const newQuest4 = values[3] === undefined ? null : Number(values[3]);

	const data: DailyGuidesSetData = {
		last_updated_user_id: interaction.member.user.id,
		last_updated_at: snowflakeDate(interaction.id),
		quest1: isDailyQuest(newQuest1) ? newQuest1 : null,
		quest2: isDailyQuest(newQuest2) ? newQuest2 : null,
		quest3: newQuest3 !== null && isDailyQuest(newQuest3) ? newQuest3 : null,
		quest4: newQuest4 !== null && isDailyQuest(newQuest4) ? newQuest4 : null,
	};

	const oldQuests = {
		quest1: quest1 === null || !isDailyQuest(quest1) ? null : dailyQuestLabel(quest1, t),
		quest2: quest2 === null || !isDailyQuest(quest2) ? null : dailyQuestLabel(quest2, t),
		quest3: quest3 === null || !isDailyQuest(quest3) ? null : dailyQuestLabel(quest3, t),
		quest4: quest4 === null || !isDailyQuest(quest4) ? null : dailyQuestLabel(quest4, t),
	};

	const newQuests = {
		quest1: isDailyQuest(newQuest1) ? dailyQuestLabel(newQuest1, t) : null,
		quest2: isDailyQuest(newQuest2) ? dailyQuestLabel(newQuest2, t) : null,
		quest3: newQuest3 === null || !isDailyQuest(newQuest3) ? null : dailyQuestLabel(newQuest3, t),
		quest4: newQuest4 === null || !isDailyQuest(newQuest4) ? null : dailyQuestLabel(newQuest4, t),
	};

	await logModification({
		user: interaction.member.user,
		content: "reordered daily quests.",
		diff: `\`\`\`diff\n${diffJSON(oldQuests, newQuests)}\n\`\`\``,
	});

	await updateDailyGuides(date, data);
	await interactive(interaction, { type: InteractiveType.Reorder, locale });
}

export async function nestingWorkshopReorder(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	rotation: string | undefined,
) {
	const {
		locale,
		data: { values },
	} = interaction;

	const now = skyNow();
	const start = currentNestingWorkshop(now);

	if (!start || start.toPlainDate().toString() !== rotation) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The Nesting Workshop has reset since this was opened. Run the command again!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const oldCosmetics = (await fetchNestingWorkshop(database, now.toPlainDate()))?.cosmetics ?? [];
	const cosmetics = values.flatMap((value) => JSON.parse(value) as readonly number[]);

	if (
		oldCosmetics.length !== cosmetics.length ||
		!cosmetics.every((cosmetic) => oldCosmetics.includes(cosmetic))
	) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content:
				"The Nesting Workshop props have changed since this was opened. Run the command again!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (cosmetics.every((cosmetic, index) => cosmetic === oldCosmetics[index])) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "No changes were made. The props are already in this order!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await logModification({
		user: interaction.member.user,
		content: "reordered the Nesting Workshop props.",
		diff: `\`\`\`diff\n${diffJSON({ cosmetics: oldCosmetics }, { cosmetics })}\n\`\`\``,
	});

	await database
		.updateTable("nesting_workshop")
		.set({
			cosmetics,
			last_updated_user_id: interaction.member.user.id,
			last_updated_at: snowflakeDate(interaction.id),
		})
		.where("date", "=", new Date(start.epochMilliseconds))
		.execute();

	await interactive(interaction, { type: InteractiveType.NestingWorkshopReorder, locale });
}
