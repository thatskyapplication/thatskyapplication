import {
	type Channel,
	type ChatInputCommandInteraction,
	type Client,
	type EmbedFooterOptions,
	type Guild,
	type GuildBasedChannel,
	type GuildMember,
	type Locale,
	type Snowflake,
	channelMention,
	ChannelType,
	EmbedBuilder,
	hyperlink,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import { treasureCandleRealm } from "../Utility/Utility.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	dateString,
	isDuring,
	todayDate,
} from "../Utility/dates.js";
import { formatEmoji, formatEmojiURL, MISCELLANEOUS_EMOJIS, resolveCurrencyEmoji } from "../Utility/emojis.js";
import {
	shardEruption,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../Utility/shardEruption.js";
import pQueue from "../pQueue.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import DailyGuides, { type DailyGuideQuest } from "./DailyGuides.js";
import { plannedEvents, resolveEvents } from "./Event.js";
import { type RotationNumber, nextSeason, resolveSeason } from "./Season.js";

export interface DailyGuidesDistributionPacket {
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

export interface DailyGuidesDistributionData {
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

type DailyGuidesDistributionPatchData = Omit<DailyGuidesDistributionPacket, "guild_id">;
type DailyGuidesDistributionInsertQuery = Omit<DailyGuidesDistributionPacket, "message_id">;
type DailyGuidesDistributionUpdateQuery = Omit<DailyGuidesDistributionInsertQuery, "guild_id">;

export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [ChannelType.GuildText, ChannelType.GuildAnnouncement] as const;

type DailyGuidesDistributionAllowedChannel = Extract<
	GuildBasedChannel,
	{ type: (typeof DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES)[number] }
>;

function isDailyGuidesDistributionChannel(channel: Channel): channel is DailyGuidesDistributionAllowedChannel {
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
	if (me.isCommunicationDisabled()) errors.push("I am timed out.");

	if (
		!channel
			.permissionsFor(me)
			.has(
				PermissionFlagsBits.ViewChannel |
					PermissionFlagsBits.SendMessages |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.UseExternalEmojis,
			)
	) {
		errors.push(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			`\`View Channel\` & \`Send Messages\` & \`Embed Links\` & \`Use External Emojis\` are required for ${channel}.`,
		);
	}

	return returnErrors ? (errors.length > 1 ? errors.map((error) => `- ${error}`) : errors) : errors.length === 0;
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

		if (!dailyGuidesDistributionPacket) throw new Error("No daily guides distribution found.");
		return new this(dailyGuidesDistributionPacket);
	}

	public static async reset() {
		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).update({ message_id: null });
	}

	public static async delete(guildId: Snowflake) {
		await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).delete().where({ guild_id: guildId });
	}

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: DailyGuidesDistributionInsertQuery | DailyGuidesDistributionUpdateQuery,
	) {
		const { client, guild, guildId } = interaction;
		let dailyGuidesDistribution = await this.fetch(guildId).catch(() => null);
		let shouldSend = false;

		if (dailyGuidesDistribution) {
			let updateData;

			if (dailyGuidesDistribution.channelId === data.channel_id) {
				updateData = data;
			} else {
				// Delete the existing message, if present.
				if (dailyGuidesDistribution.channelId && dailyGuidesDistribution.messageId) {
					const channel = guild.channels.cache.get(dailyGuidesDistribution.channelId);

					if (channel && isDailyGuidesDistributionChannel(channel)) {
						// eslint-disable-next-line promise/prefer-await-to-then
						channel.messages.delete(dailyGuidesDistribution.messageId).catch(() => null);
					}
				}

				updateData = { ...data, message_id: null };
				shouldSend = true;
			}

			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
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

		if (shouldSend) await dailyGuidesDistribution.send(client);

		await interaction.reply({
			content: "Daily guides have been modified.",
			embeds: [await dailyGuidesDistribution.embed(guild)],
			ephemeral: true,
		});
	}

	public static async unset(interaction: ChatInputCommandInteraction<"cached">) {
		const { guild, guildId } = interaction;

		const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
			.update({ channel_id: null, message_id: null })
			.where("guild_id", guildId)
			.returning("*");

		await interaction.reply({
			content: dailyGuidesDistributionPacket
				? "Daily guides have been unset."
				: "There were no daily guide updates in this server.",
			embeds: dailyGuidesDistributionPacket ? [await new this(dailyGuidesDistributionPacket).embed(guild)] : [],
			ephemeral: true,
		});
	}

	public async embed(guild: Guild) {
		const me = await guild.members.fetchMe();
		const { channelId } = this;
		const channel = channelId ? guild.channels.cache.get(channelId) : null;
		const sending = channel && isDailyGuidesDistributionChannel(channel) && isDailyGuidesDistributable(channel, me);

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
		// date = date.plus({ days: 1 });
		const events = resolveEvents(date);
		const eventEndText = plannedEvents(date).map((event) => event.daysText(date));
		const iconURL = events[0] ? formatEmojiURL(events[0].eventCurrencyEmoji.id) : null;
		const currentEventsWithEventCurrency = events.filter((event) => date <= event.eventCurrencyEnd && event.url);

		const eventCurrency =
			currentEventsWithEventCurrency.length > 0
				? {
						name: t("event-currency", { lng: locale, ns: "general" }),
						value: currentEventsWithEventCurrency
							.map(({ name, eventCurrencyEmoji, url }) =>
								hyperlink(`${formatEmoji(eventCurrencyEmoji)}${t("view", { lng: locale, ns: "general" })}`, url!, name),
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
		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setTitle(dateString(today, locale));
		if (dailyMessage) embed.addFields({ name: dailyMessage.title, value: dailyMessage.description });
		const quests = [quest1, quest2, quest3, quest4].filter((quest): quest is DailyGuideQuest => quest !== null);

		if (quests.length > 0) {
			embed.addFields({
				name: "Quests",
				value: quests
					.map(({ content, url }, index) => `${index + 1}. ${url ? hyperlink(content, url) : content}`)
					.join("\n"),
			});
		}

		if (treasureCandles) {
			embed.addFields({
				name: `Treasure Candles - ${treasureCandleRealm(today)}`,
				value: treasureCandles.map((url, index) => hyperlink(`${index * 4 + 1} - ${(index + 1) * 4}`, url)).join(" | "),
			});
		}

		const season = resolveSeason(today);
		let seasonFooterText = null;
		let iconURL = null;

		if (season) {
			const { candleEmoji, emoji } = season;
			const { rotation, realm } = season.resolveSeasonalCandlesRotation(today);
			seasonFooterText = season.daysLeft(today, locale);
			iconURL = formatEmojiURL(emoji.id);
			let rotationNumber: RotationNumber = rotation;

			if (isDuring(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, today)) {
				rotationNumber = 3;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationNumber);
			const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } = season.remainingSeasonalCandles(today);

			embed.addFields({
				name: "Seasonal Candles",
				value: `${hyperlink(`Rotation ${rotationNumber}`, url)}\n${resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeft,
				})} remain in the season.\n${resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeftWithSeasonPass,
				})} remain in the season with a Season Pass.`,
			});
		} else {
			const next = nextSeason(today);

			if (next) {
				const daysUntilSeason = next.start.diff(today, "days").days;

				seasonFooterText = `The new season starts ${
					daysUntilSeason === 1 ? "tomorrow" : `in ${daysUntilSeason} days`
				}.`;
			}
		}

		const eventData = this.eventData(today, locale);
		const eventFooterText = eventData.eventEndText.join("\n");
		iconURL ??= eventData.iconURL;

		if (seasonFooterText || eventFooterText) {
			const footer: EmbedFooterOptions = {
				text: [seasonFooterText, eventFooterText].filter((footerText) => footerText !== null).join("\n"),
			};

			if (iconURL) footer.iconURL = iconURL;
			embed.setFooter(footer);
		}

		if (eventData.eventCurrency) embed.addFields(eventData.eventCurrency);
		embed.addFields(this.shardEruptionFieldData(locale));
		return embed;
	}

	private async send(client: Client<true>) {
		const { guildId, channelId, messageId } = this;
		const channel = client.channels.cache.get(channelId!);

		if (!channel || !isDailyGuidesDistributionChannel(channel)) {
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
		} else {
			// There is no existing message. Send one.
			const { id } = await channel.send({ embeds: [embed] });

			const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
				.update({ message_id: id })
				.where({ guild_id: guildId })
				.returning("*");

			this.patch(newDailyGuidesDistributionPacket!);
			return newDailyGuidesDistributionPacket;
		}
	}

	public static async distribute(client: Client<true>) {
		const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).whereNotNull("channel_id");

		const settled = await Promise.allSettled(
			dailyGuidesDistributionPackets.map(async (dailyGuidesDistributionPacket) => {
				const dailyGuidesDistribution = new DailyGuidesDistribution(dailyGuidesDistributionPacket);
				return pQueue.add(async () => dailyGuidesDistribution.send(client));
			}),
		);

		const errors = settled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (errors.length > 0) pino.error(errors, "Error whilst distributing daily guides.");
	}
}
