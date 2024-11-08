import type { APIEmbed, APIEmbedFooter, LocaleString } from "@discordjs/core";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { skyCurrentEvents, skyNotEndedEvents } from "../data/events/index.js";
import { skyCurrentSeason, skyUpcomingSeason } from "../data/spirits/seasons/index.js";
import DailyGuides, { type DailyGuideQuest } from "../models/DailyGuides.js";
import type {
	DailyGuidesDistributionAllowedChannel,
	DailyGuidesDistributionData,
	DailyGuidesDistributionPacket,
} from "../models/DailyGuidesDistribution.js";
import pQueue from "../p-queue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { RotationNumber } from "../utility/catalogue.js";
import {
	DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES,
	DEFAULT_EMBED_COLOUR,
	RealmName,
} from "../utility/constants.js";
import {
	COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_2,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	dateString,
	isDuring,
	skyNow,
	skyToday,
} from "../utility/dates.js";
import {
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "../utility/emojis.js";
import {
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

function isDailyGuidesDistributionChannel(
	channel: Channel,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

function isDailyGuidesDistributable(
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

function isDailyGuidesDistributable(
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

function isDailyGuidesDistributable(
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors = false,
) {
	const errors = [];

	if (me.isCommunicationDisabled()) {
		errors.push("I am timed out.");
	}

	const isThread = channel.type === ChannelType.PublicThread;

	if (isThread) {
		if (channel.archived) {
			errors.push("The thread is archived.");
		}

		if (!channel.permissionsFor(me).has(PermissionFlagsBits.ManageThreads) && channel.locked) {
			errors.push("The thread is locked.");
		}
	}

	const permissions =
		PermissionFlagsBits.ViewChannel |
		(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) |
		PermissionFlagsBits.EmbedLinks |
		PermissionFlagsBits.UseExternalEmojis;

	if (!channel.permissionsFor(me).has(permissions)) {
		errors.push(
			`\`View Channel\` & \`${
				isThread ? "Send Messages in Threads" : "Send Messages"
			}\` & \`Embed Links\` & \`Use External Emojis\` are required for ${channel}.`,
		);
	}

	return returnErrors
		? errors.length > 1
			? errors.map((error) => `- ${error}`)
			: errors
		: errors.length === 0;
}

export async function setup(interaction: ChatInputCommandInteraction<"cached">) {
	const { client, guild, guildId, options } = interaction;
	const channel = options.getChannel("channel", true, DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES);
	const me = await channel.guild.members.fetchMe();
	const dailyGuidesDistributable = isDailyGuidesDistributable(channel, me, true);

	if (dailyGuidesDistributable.length > 0) {
		await interaction.reply({
			content: dailyGuidesDistributable.join("\n"),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).where("guild_id", guildId);

	let shouldSend = false;

	if (dailyGuidesDistributionPacket) {
		// biome-ignore lint/suspicious/noImplicitAnyLet: Effort.
		let updateData;

		if (dailyGuidesDistributionPacket.channel_id === channel.id) {
			updateData = { channel_id: channel.id };
		} else {
			// Delete the existing message, if present.
			if (dailyGuidesDistributionPacket.channel_id && dailyGuidesDistributionPacket.message_id) {
				const channel = guild.channels.cache.get(dailyGuidesDistributionPacket.channel_id);

				if (channel && isDailyGuidesDistributionChannel(channel)) {
					channel.messages.delete(dailyGuidesDistributionPacket.message_id).catch(() => null);
				}
			}

			updateData = { channel_id: channel.id, message_id: null };
			shouldSend = true;
		}

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update(updateData)
			.where({ guild_id: guildId })
			.returning("*");
	} else {
		shouldSend = true;

		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).insert(
			{ guild_id: guildId, channel_id: channel.id, message_id: null },
			"*",
		);
	}

	if (shouldSend) {
		await send(client, false, { guildId, channelId: channel.id, messageId: null });
	}

	await interaction.reply({
		content: "Daily guides have been modified.",
		embeds: [await statusEmbed(guild, channel.id)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function status(interaction: ChatInputCommandInteraction<"cached">) {
	const { guild, guildId } = interaction;

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).where("guild_id", guildId);

	if (!dailyGuidesDistributionPacket) {
		await interaction.reply({
			content: "This server does not have this feature set up.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await interaction.reply({
		embeds: [await statusEmbed(guild, dailyGuidesDistributionPacket.channel_id)],
		flags: MessageFlags.Ephemeral,
	});
}

export async function unset(interaction: ChatInputCommandInteraction<"cached">) {
	const { guild, guildId } = interaction;

	const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.update({ channel_id: null, message_id: null })
		.where("guild_id", guildId)
		.returning("*");

	await interaction.reply({
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
	client: Client<true>,
	enforceNonce: boolean,
	{ guildId, channelId, messageId }: DailyGuidesDistributionData,
) {
	const channel = client.channels.cache.get(channelId!);

	if (!(channel && isDailyGuidesDistributionChannel(channel))) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it had no detectable channel id ${channelId}, or did not satisfy the allowed channel types.`,
		);

		return;
	}

	const me = await channel.guild.members.fetchMe();

	if (!isDailyGuidesDistributable(channel, me)) {
		pino.info(
			`Did not distribute daily guides to guild id ${guildId} as it did not have suitable permissions in channel id ${channelId}.`,
		);

		return;
	}

	// Retrieve our embed.
	const embed = distributionEmbed(channel.guild.preferredLocale);

	// Update the embed if a message exists.
	if (messageId) {
		return channel.messages.edit(messageId, { embeds: [embed] });
	}

	// There is no existing message. Send one.
	const { id } = await channel.send({ embeds: [embed], enforceNonce, nonce: guildId });

	const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	)
		.update({ message_id: id })
		.where({ guild_id: guildId })
		.returning("*");

	return newDailyGuidesDistributionPacket;
}

async function statusEmbed(guild: Guild, channelId: Snowflake | null) {
	const me = await guild.members.fetchMe();
	const channel = channelId ? guild.channels.cache.get(channelId) : null;

	const sending =
		channel && isDailyGuidesDistributionChannel(channel) && isDailyGuidesDistributable(channel, me);

	return new EmbedBuilder()
		.setColor(DEFAULT_EMBED_COLOUR)
		.setFields({
			name: "Daily Guides",
			value: `${channelId ? channelMention(channelId) : "No channel"}\n${
				sending ? "Sending!" : "Stopped!"
			} ${formatEmoji(sending ? MISCELLANEOUS_EMOJIS.Yes : MISCELLANEOUS_EMOJIS.No)}`,
			inline: true,
		})
		.setTitle(guild.name);
}

export function dailyGuidesEventData(date: DateTime, locale: Locale) {
	const events = skyCurrentEvents(date);
	const eventEndText = skyNotEndedEvents(date).map((event) => event.daysText(date, locale));
	const event0 = events[0];

	const iconURL = event0?.eventCurrency?.emoji
		? formatEmojiURL(event0.eventCurrency?.emoji.id)
		: null;

	const currentEventsWithEventCurrency = events.filter(
		(event) =>
			event.eventCurrency &&
			date < event.eventCurrency.end &&
			event.resolveInfographicURL(date) !== null,
	);

	const eventCurrency =
		currentEventsWithEventCurrency.length > 0
			? {
					name: t("event-currency", { lng: locale, ns: "general" }),
					value: currentEventsWithEventCurrency
						.map((event) =>
							hyperlink(
								`${event.eventCurrency?.emoji ? formatEmoji(event.eventCurrency.emoji) : ""}${t(
									"view",
									{
										lng: locale,
										ns: "general",
									},
								)}`,
								event.resolveInfographicURL(date)!,
								t(`events.${event.id}`, { lng: locale, ns: "general" }),
							),
						)
						.join(" | "),
				}
			: null;

	return { eventEndText, iconURL, eventCurrency };
}

export function dailyGuidesShardEruptionData(locale: Locale) {
	const shard = shardEruption();

	if (shard) {
		return [
			{
				name: t("shard-eruption", { lng: locale, ns: "general" }),
				value: shardEruptionInformationString(shard, true, locale),
				inline: true,
			},
			{
				name: t("timestamps", { lng: locale, ns: "general" }),
				value: shardEruptionTimestampsString(shard),
				inline: true,
			},
		];
	}

	return [
		{
			name: t("shard-eruption", { lng: locale, ns: "general" }),
			value: t("shard-eruption-none", { lng: locale, ns: "general" }),
		},
	];
}

export function distributionEmbed(locale: LocaleString) {
	const { dailyMessage, quest1, quest2, quest3, quest4, treasureCandles } = DailyGuides;
	const today = skyToday();
	const now = skyNow();

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		title: dateString(now, locale),
	};

	const fields = [];

	if (dailyMessage) {
		fields.push({ name: dailyMessage.title, value: dailyMessage.description });
	}

	const quests = [quest1, quest2, quest3, quest4].filter(
		(quest): quest is DailyGuideQuest => quest !== null,
	);

	if (quests.length > 0) {
		fields.push({
			name: "Quests",
			value: quests
				.map(
					({ content, url }, index) => `${index + 1}. ${url ? hyperlink(content, url) : content}`,
				)
				.join("\n"),
		});
	}

	if (treasureCandles) {
		const values = [];
		let number = 1;

		for (const hashes of [
			treasureCandles[RealmName.DaylightPrairie],
			treasureCandles[RealmName.HiddenForest],
			treasureCandles[RealmName.ValleyOfTriumph],
			treasureCandles[RealmName.GoldenWasteland],
			treasureCandles[RealmName.VaultOfKnowledge],
		]) {
			if (hashes.length === 0) {
				continue;
			}

			for (const hash of hashes) {
				values.push(hyperlink(`${number} - ${number + 3}`, DailyGuides.treasureCandlesURL(hash)));
				number += 4;
			}
		}

		if (values.length > 0) {
			fields.push({
				name: "Treasure Candles",
				value: values.join(" | "),
			});
		}
	}

	const season = skyCurrentSeason(today);
	const footerText = [];
	let iconURL = null;

	if (season) {
		const { candleEmoji, emoji } = season;
		const seasonalCandlesRotation = season.resolveSeasonalCandlesRotation(today);
		const values = [];
		footerText.push(season.daysText(now, locale));
		iconURL = formatEmojiURL(emoji.id);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationNumber: RotationNumber = rotation;

			if (
				isDuring(
					DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
					DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
					today,
				)
			) {
				rotationNumber = 3;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationNumber);
			values.push(hyperlink(`Rotation ${rotationNumber}`, url));
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		values.push(
			`${resolveCurrencyEmoji({
				emoji: candleEmoji,
				number: seasonalCandlesLeft,
			})} remain in the season.\n${resolveCurrencyEmoji({
				emoji: candleEmoji,
				number: seasonalCandlesLeftWithSeasonPass,
			})} remain in the season with a Season Pass.`,
		);

		fields.push({ name: "Seasonal Candles", value: values.join("\n") });
	} else {
		const next = skyUpcomingSeason(today);

		if (next) {
			footerText.push(next.daysText(now, locale));
		}
	}

	const eventData = dailyGuidesEventData(today, locale);
	footerText.push(...eventData.eventEndText);
	iconURL ??= eventData.iconURL;

	if (now < COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_2) {
		const daysUntilStart = Math.floor(
			COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_2.diff(today, "days").days,
		);

		footerText.push(
			daysUntilStart === 0
				? "The SkyFest AURORA Mega Concert starts at 06:00 and 18:00 today."
				: daysUntilStart === 1
					? "The SkyFest AURORA Mega Concert starts tomorrow."
					: `The SkyFest AURORA Mega Concert starts in ${daysUntilStart} days.`,
		);
	}

	if (footerText.length > 0) {
		const footer: APIEmbedFooter = {
			text: footerText.join("\n"),
		};

		if (iconURL) {
			footer.icon_url = iconURL;
		}

		embed.footer = footer;
	}

	if (eventData.eventCurrency) {
		fields.push(eventData.eventCurrency);
	}

	fields.push(...dailyGuidesShardEruptionData(locale));
	embed.fields = fields;
	return embed;
}

export async function distribute(client: Client<true>) {
	const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
		Table.DailyGuidesDistribution,
	).whereNotNull("channel_id");

	const settled = await Promise.allSettled(
		dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) =>
			pQueue.add(async () =>
				send(client, true, {
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
