import {
	type Channel,
	ChannelType,
	type ChatInputCommandInteraction,
	type Client,
	EmbedBuilder,
	type EmbedFooterOptions,
	type Guild,
	type GuildBasedChannel,
	type GuildMember,
	type Locale,
	PermissionFlagsBits,
	type PublicThreadChannel,
	type Snowflake,
	channelMention,
	hyperlink,
} from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { DEFAULT_EMBED_COLOUR, RealmName } from "../Utility/Constants.js";
import type { RotationNumber } from "../Utility/catalogue.js";
import {
	COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_1,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	dateString,
	isDuring,
	todayDate,
} from "../Utility/dates.js";
import {
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "../Utility/emojis.js";
import {
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../Utility/shardEruption.js";
import { plannedEvents, resolveEvents } from "../catalogue/events/index.js";
import { nextSeason, resolveSeason } from "../catalogue/spirits/seasons/index.js";
import pQueue from "../pQueue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import DailyGuides, { type DailyGuideQuest } from "./DailyGuides.js";

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

interface DailyGuidesDistributionData {
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

type DailyGuidesDistributionPatchData = Omit<DailyGuidesDistributionPacket, "guild_id">;
type DailyGuidesDistributionInsertQuery = Omit<DailyGuidesDistributionPacket, "message_id">;
type DailyGuidesDistributionUpdateQuery = Omit<DailyGuidesDistributionInsertQuery, "guild_id">;

export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildAnnouncement,
	ChannelType.PublicThread,
] as const;

type DailyGuidesDistributionAllowedChannel =
	| Extract<GuildBasedChannel, { type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }>
	// Public thread channels do not dynamically narrow down because of the union within the channel's class.
	| PublicThreadChannel;

function isDailyGuidesDistributionChannel(
	channel: Channel,
): channel is DailyGuidesDistributionAllowedChannel {
	return DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES.includes(
		channel.type as (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number],
	);
}

export function isDailyGuidesDistributable(
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors: true,
): string[];

export function isDailyGuidesDistributable(
	channel: DailyGuidesDistributionAllowedChannel,
	me: GuildMember,
	returnErrors?: false,
): boolean;

export function isDailyGuidesDistributable(
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

export default class DailyGuidesDistribution {
	public readonly guildId: DailyGuidesDistributionData["guildId"];

	public channelId!: DailyGuidesDistributionData["channelId"];

	public messageId!: DailyGuidesDistributionData["messageId"];

	public constructor(dailyGuidesDistribution: DailyGuidesDistributionPacket) {
		this.guildId = dailyGuidesDistribution.guild_id;
		this.patch(dailyGuidesDistribution);
	}

	private patch(data: DailyGuidesDistributionPatchData) {
		this.channelId = data.channel_id;
		this.messageId = data.message_id;
	}

	public static async fetch(guildId: Snowflake) {
		const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).where("guild_id", guildId);

		if (!dailyGuidesDistributionPacket) {
			throw new Error("No daily guides distribution found.");
		}

		return new this(dailyGuidesDistributionPacket);
	}

	public static async reset() {
		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).update({
			message_id: null,
		});
	}

	public static async delete(guildId: Snowflake) {
		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.delete()
			.where({ guild_id: guildId });
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: DailyGuidesDistributionInsertQuery | DailyGuidesDistributionUpdateQuery,
	) {
		const { client, guild, guildId } = interaction;
		let dailyGuidesDistribution = await this.fetch(guildId).catch(() => null);
		let shouldSend = false;

		if (dailyGuidesDistribution) {
			// biome-ignore lint/suspicious/noImplicitAnyLet: Effort.
			let updateData;

			if (dailyGuidesDistribution.channelId === data.channel_id) {
				updateData = data;
			} else {
				// Delete the existing message, if present.
				if (dailyGuidesDistribution.channelId && dailyGuidesDistribution.messageId) {
					const channel = guild.channels.cache.get(dailyGuidesDistribution.channelId);

					if (channel && isDailyGuidesDistributionChannel(channel)) {
						channel.messages.delete(dailyGuidesDistribution.messageId).catch(() => null);
					}
				}

				updateData = { ...data, message_id: null };
				shouldSend = true;
			}

			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
				Table.DailyGuidesDistribution,
			)
				.update(updateData)
				.where({ guild_id: dailyGuidesDistribution.guildId })
				.returning("*");

			dailyGuidesDistribution.patch(dailyGuidesDistributionPacket!);
		} else {
			shouldSend = true;

			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
				Table.DailyGuidesDistribution,
			).insert(data, "*");

			dailyGuidesDistribution = new this(dailyGuidesDistributionPacket!);
		}

		if (shouldSend) {
			await dailyGuidesDistribution.send(client, false);
		}

		await interaction.reply({
			content: "Daily guides have been modified.",
			embeds: [await dailyGuidesDistribution.embed(guild)],
			ephemeral: true,
		});
	}

	public static async unset(interaction: ChatInputCommandInteraction<"cached">) {
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
				? [await new this(dailyGuidesDistributionPacket).embed(guild)]
				: [],
			ephemeral: true,
		});
	}

	public async embed(guild: Guild) {
		const me = await guild.members.fetchMe();
		const { channelId } = this;
		const channel = channelId ? guild.channels.cache.get(channelId) : null;
		const sending =
			channel &&
			isDailyGuidesDistributionChannel(channel) &&
			isDailyGuidesDistributable(channel, me);

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

	public static eventData(date: DateTime, locale: Locale) {
		const events = resolveEvents(date);
		const eventEndText = plannedEvents(date).map((event) => event.daysText(date));
		const event0 = events[0];

		const iconURL = event0?.eventCurrencyEmoji
			? formatEmojiURL(event0.eventCurrencyEmoji.id)
			: null;

		const currentEventsWithEventCurrency = events.filter(
			(event) => date <= event.eventCurrencyEnd && event.eventCurrencyInfographicURL,
		);

		const eventCurrency =
			currentEventsWithEventCurrency.length > 0
				? {
						name: t("event-currency", { lng: locale, ns: "general" }),
						value: currentEventsWithEventCurrency
							.map((event) =>
								hyperlink(
									`${event.eventCurrencyEmoji ? formatEmoji(event.eventCurrencyEmoji) : ""}${t(
										"view",
										{
											lng: locale,
											ns: "general",
										},
									)}`,
									event.resolveInfographicURL(date)!,
									event.name,
								),
							)
							.join(" | "),
					}
				: null;

		return { eventEndText, iconURL, eventCurrency };
	}

	public static shardEruptionFieldData(locale: Locale) {
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

	public static embed(locale: Locale) {
		const { dailyMessage, quest1, quest2, quest3, quest4, treasureCandles } = DailyGuides;
		const today = todayDate();

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setTitle(dateString(today, locale));

		if (dailyMessage) {
			embed.addFields({ name: dailyMessage.title, value: dailyMessage.description });
		}

		const quests = [quest1, quest2, quest3, quest4].filter(
			(quest): quest is DailyGuideQuest => quest !== null,
		);

		if (quests.length > 0) {
			embed.addFields({
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
				embed.addFields({
					name: "Treasure Candles",
					value: values.join(" | "),
				});
			}
		}

		const season = resolveSeason(today);
		const footerText = [];
		let iconURL = null;

		if (season) {
			const { candleEmoji, emoji } = season;
			const seasonalCandlesRotation = season.resolveSeasonalCandlesRotation(today);
			const values = [];
			footerText.push(season.daysText(today, locale));
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

			embed.addFields({ name: "Seasonal Candles", value: values.join("\n") });
		} else {
			const next = nextSeason(today);

			if (next) {
				footerText.push(next.daysText(today, locale));
			}
		}

		const eventData = this.eventData(today, locale);
		footerText.push(...eventData.eventEndText);
		iconURL ??= eventData.iconURL;

		if (today < COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_1) {
			const daysUntilStart = Math.floor(
				COMMUNITY_ORGANISED_AURORA_CONCERT_START_DATE_1.diff(today, "days").days,
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
			const footer: EmbedFooterOptions = {
				text: footerText.join("\n"),
			};

			if (iconURL) {
				footer.iconURL = iconURL;
			}

			embed.setFooter(footer);
		}

		if (eventData.eventCurrency) {
			embed.addFields(eventData.eventCurrency);
		}

		embed.addFields(this.shardEruptionFieldData(locale));
		return embed;
	}

	private async send(client: Client<true>, enforceNonce: boolean) {
		const { guildId, channelId, messageId } = this;
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
		const embed = DailyGuidesDistribution.embed(channel.guild.preferredLocale);

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

		this.patch(newDailyGuidesDistributionPacket!);
		return newDailyGuidesDistributionPacket;
	}

	public static async distribute(client: Client<true>) {
		const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).whereNotNull("channel_id");

		const settled = await Promise.allSettled(
			dailyGuidesDistributionPackets.map((dailyGuidesDistributionPacket) => {
				const dailyGuidesDistribution = new DailyGuidesDistribution(dailyGuidesDistributionPacket);
				return pQueue.add(async () => dailyGuidesDistribution.send(client, true));
			}),
		);

		const errors = settled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (errors.length > 0) {
			pino.error(errors, "Error whilst distributing daily guides.");
		}
	}
}
