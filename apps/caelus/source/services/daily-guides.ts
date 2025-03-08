import {
	type APIChannel,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIComponentInContainer,
	type APIMessageTopLevelComponent,
	type APINewsChannel,
	type APITextChannel,
	ChannelType,
	ComponentType,
	type Locale,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import {
	type RotationNumber,
	TIME_ZONE,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
	treasureCandles,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import DailyGuides, { type DailyGuideQuest } from "../models/DailyGuides.js";
import type {
	DailyGuidesDistributionAllowedChannel,
	DailyGuidesDistributionData,
	DailyGuidesDistributionPacket,
} from "../models/DailyGuidesDistribution.js";
import type { GuildMember } from "../models/discord/guild-member.js";
import type { Guild, GuildChannel } from "../models/discord/guild.js";
import type { AnnouncementThread, PrivateThread, PublicThread } from "../models/discord/thread.js";
import pQueue from "../p-queue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
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
import type { OptionResolver } from "../utility/option-resolver.js";
import { can } from "../utility/permissions.js";
import {
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

function isDailyGuidesDistributionChannel(
	channel: APIChannel | AnnouncementThread | PublicThread | PrivateThread,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

function isDailyGuidesDistributable(
	guild: Guild,
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

function isDailyGuidesDistributable(
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

export async function setup(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const channelId = options.getChannel("channel", true).id;
	const channel = guild.channels.get(channelId) ?? guild.threads.get(channelId);

	if (!(channel && isDailyGuidesDistributionChannel(channel))) {
		pino.error(interaction, "Received an unknown channel type whilst setting up daily guides.");
		throw new Error("Received an unknown channel type whilst setting up daily guides.");
	}

	const me = await guild.fetchMe();
	const dailyGuidesDistributable = isDailyGuidesDistributable(guild, channel, me, true);

	if (dailyGuidesDistributable.length > 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: dailyGuidesDistributable.join("\n"),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).where({ guild_id: guild.id });

	let shouldSend = false;

	if (dailyGuidesDistributionPacket) {
		// biome-ignore lint/suspicious/noImplicitAnyLet: Effort.
		let updateData;

		if (dailyGuidesDistributionPacket.channel_id === channel.id) {
			updateData = { channel_id: channel.id };
		} else {
			// Delete the existing message, if present.
			if (dailyGuidesDistributionPacket.channel_id && dailyGuidesDistributionPacket.message_id) {
				const channel = guild.channels.get(dailyGuidesDistributionPacket.channel_id);

				if (channel) {
					await client.api.channels
						.deleteMessage(channel.id, dailyGuidesDistributionPacket.message_id)
						.catch(() => null);
				}
			}

			updateData = { channel_id: channel.id, message_id: null };
			shouldSend = true;
		}

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update(updateData)
			.where({ guild_id: guild.id })
			.returning("*");
	} else {
		shouldSend = true;

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).insert(
			{ guild_id: guild.id, channel_id: channel.id, message_id: null },
			"*",
		);
	}

	if (shouldSend) {
		await send(false, { guildId: guild.id, channelId: channel.id, messageId: null });
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Daily guides have been modified.",
		embeds: [await statusEmbed(guild, channel.id)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function status(interaction: APIChatInputApplicationCommandGuildInteraction) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).where({ guild_id: guild.id });

	if (!dailyGuidesDistributionPacket) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "This server does not have this feature set up.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [await statusEmbed(guild, dailyGuidesDistributionPacket.channel_id)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(interaction: APIChatInputApplicationCommandGuildInteraction) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.update({ channel_id: null, message_id: null })
		.where({ guild_id: guild.id })
		.returning("*");

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: dailyGuidesDistributionPacket
			? "Daily guides have been unset."
			: "There were no daily guide updates in this server.",
		embeds: dailyGuidesDistributionPacket
			? [await statusEmbed(guild, dailyGuidesDistributionPacket.channel_id)]
			: [],
		flags: MessageFlags.Ephemeral,
	});
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

async function statusEmbed(guild: Guild, channelId: Snowflake | null) {
	const channel = channelId ? guild.channels.get(channelId) : null;

	const sending =
		channel &&
		isDailyGuidesDistributionChannel(channel) &&
		isDailyGuidesDistributable(guild, channel, await guild.fetchMe());

	return {
		color: DEFAULT_EMBED_COLOUR,
		fields: [
			{
				name: "Daily Guides",
				value: `${channelId ? `<#${channelId}>` : "No channel"}\n${
					sending ? "Sending!" : "Stopped!"
				} ${formatEmoji(sending ? MISCELLANEOUS_EMOJIS.Yes : MISCELLANEOUS_EMOJIS.No)}`,
				inline: true,
			},
		],
		title: guild.name,
	};
}

export function dailyGuidesEventData(date: DateTime, locale: Locale) {
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

		footerText.push(
			`${formatEmoji(SeasonIdToSeasonalEmoji[season.id])} ${t("days-left.season", {
				lng: locale,
				ns: "general",
				count: Math.ceil(season.end.diff(now, "days").days) - 1,
			})}`,
		);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationNumber: RotationNumber = rotation;

			if (season.isDuringDoubleSeasonalLightEvent(today)) {
				rotationNumber = 3;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationNumber);
			values.push(`[Rotation ${rotationNumber}](${url})`);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

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

			footerText.push(
				`${formatEmoji(SeasonIdToSeasonalEmoji[next.id])} ${daysUntilStart <= 1 ? "The new season starts tomorrow." : daysUntilStart >= 2 ? `The new season starts in ${Math.floor(daysUntilStart)} days.` : "The new season starts in 1 day."}`,
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
			pQueue.add(async () =>
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
