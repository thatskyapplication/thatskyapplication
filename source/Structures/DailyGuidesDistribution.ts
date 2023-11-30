import {
	type Channel,
	type ChatInputCommandInteraction,
	type Client,
	type EmbedFooterOptions,
	type Guild,
	type GuildBasedChannel,
	type GuildMember,
	type Snowflake,
	channelMention,
	ChannelType,
	EmbedBuilder,
	hyperlink,
	PermissionFlagsBits,
} from "discord.js";
import type { DateTime } from "luxon";
import { DEFAULT_EMBED_COLOUR } from "../Utility/Constants.js";
import {
	treasureCandleRealm,
	shardEruption,
	dateString,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../Utility/Utility.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	isDuring,
	todayDate,
} from "../Utility/dates.js";
import { EMOJI, formatEmoji, formatEmojiURL, resolveCurrencyEmoji } from "../Utility/emojis.js";
import pQueue from "../pQueue.js";
import pg, { Table } from "../pg.js";
import DailyGuides, { type DailyGuideQuest } from "./DailyGuides.js";
import { plannedEvents, resolveEvent } from "./Event.js";
import { type RotationNumber, nextSeason, resolveSeason } from "./Season.js";

export interface DailyGuidesDistributionPacket {
	id: number;
	guild_id: Snowflake;
	channel_id: Snowflake | null;
	message_id: Snowflake | null;
}

export interface DailyGuidesDistributionData {
	id: DailyGuidesDistributionPacket["id"];
	guildId: DailyGuidesDistributionPacket["guild_id"];
	channelId: DailyGuidesDistributionPacket["channel_id"];
	messageId: DailyGuidesDistributionPacket["message_id"];
}

type DailyGuidesDistributionPatchData = Omit<DailyGuidesDistributionPacket, "id" | "guild_id">;
type DailyGuidesDistributionInsertQuery = Omit<DailyGuidesDistributionPacket, "id" | "message_id">;
type DailyGuidesDistributionUpdateQuery = Omit<DailyGuidesDistributionInsertQuery, "guild_id">;

export const DAILY_GUIDES_DISTRIBUTION_CHANNEL_TYPES = [ChannelType.GuildText, ChannelType.GuildAnnouncement] as const;
export const SHARD_ERUPTION_NAME = "Shard Eruption" as const;
export const SHARD_ERUPTION_NONE = "None" as const;

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
	public readonly id: DailyGuidesDistributionData["id"];

	public readonly guildId: DailyGuidesDistributionData["guildId"];

	public channelId!: DailyGuidesDistributionData["channelId"];

	public messageId!: DailyGuidesDistributionData["messageId"];

	public constructor(dailyGuidesDistribution: DailyGuidesDistributionPacket) {
		this.id = dailyGuidesDistribution.id;
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
				.where({ id: dailyGuidesDistribution.id })
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
			embeds: [await dailyGuidesDistribution.overview(guild)],
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
			embeds: dailyGuidesDistributionPacket ? [await new this(dailyGuidesDistributionPacket).overview(guild)] : [],
		});
	}

	public async overview(guild: Guild) {
		const me = await guild.members.fetchMe();
		const { channelId } = this;
		const channel = channelId ? guild.channels.cache.get(channelId) : null;
		const sending = channel && isDailyGuidesDistributionChannel(channel) && isDailyGuidesDistributable(channel, me);

		return new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFields({
				name: "Daily Guides Status",
				value: `${channelId ? channelMention(channelId) : "No channel"}\n${
					sending ? "Sending!" : "Stopped!"
				} ${formatEmoji(sending ? EMOJI.Yes : EMOJI.No)}`,
				inline: true,
			})
			.setTitle(guild.name);
	}

	public static eventData(date: DateTime) {
		const events = plannedEvents(date);
		const currentEvent = resolveEvent(date);
		const eventEndText = [];
		let iconURL = null;
		let eventCurrency = null;

		for (const event of events) {
			const { end, eventCurrencyEmoji, eventCurrencyEnd, name, start, url } = event;

			if (currentEvent?.name === event.name) {
				const daysLeftInEvent = end.diff(date, "days").days;

				eventEndText.push(
					daysLeftInEvent === 0
						? `${name} ends today.`
						: `${daysLeftInEvent === 1 ? `${daysLeftInEvent} day` : `${daysLeftInEvent} days`} left in ${name}.`,
				);

				iconURL = formatEmojiURL(eventCurrencyEmoji.id);

				if (date <= eventCurrencyEnd && url) {
					// eventCurrency = { name: "Event Currency", value: hyperlink(`Rotation ${event.rotation(date)}`, url) };
					eventCurrency = { name: "Event Currency", value: hyperlink("View", url) };
				}
			} else {
				const daysUntilEvent = start.diff(date, "days").days;
				eventEndText.push(`${name} starts ${daysUntilEvent === 1 ? "tomorrow" : `in ${daysUntilEvent} days`}.`);
			}
		}

		return { eventEndText, iconURL, eventCurrency };
	}

	public static shardEruptionFieldData() {
		const shard = shardEruption();

		if (shard) {
			return [
				{ name: SHARD_ERUPTION_NAME, value: shardEruptionInformationString(shard, true), inline: true },
				{ name: "Timestamps", value: shardEruptionTimestampsString(shard), inline: true },
			];
		}

		return [{ name: SHARD_ERUPTION_NAME, value: SHARD_ERUPTION_NONE }];
	}

	public static embed() {
		const { dailyMessage, quest1, quest2, quest3, quest4, treasureCandles } = DailyGuides;
		const today = todayDate();
		const embed = new EmbedBuilder().setColor(DEFAULT_EMBED_COLOUR).setTitle(dateString(today));
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
			const { candleEmoji, emoji, end } = season;
			const daysLeftInSeason = end.diff(today, "days").days;

			seasonFooterText =
				daysLeftInSeason === 0
					? "The season ends today."
					: `${daysLeftInSeason === 1 ? `${daysLeftInSeason} day` : `${daysLeftInSeason} days`} left in the season.`;

			iconURL = formatEmojiURL(emoji.id);

			const { rotation, realm } = season.resolveSeasonalCandlesRotation(today);
			let rotationNumber: RotationNumber = rotation;

			if (isDuring(DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE, DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE, today)) {
				rotationNumber = 3;
			}

			const url = season.seasonalCandlesRotationURL(realm, rotationNumber);
			const remainingCandles = season.remainingSeasonalCandles(today);
			let seasonalCandlesLeft;
			let seasonalCandlesLeftWithSeasonPass;
			if (remainingCandles) ({ seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } = remainingCandles);

			embed.addFields({
				name: "Seasonal Candles",
				value: `${hyperlink(`Rotation ${rotationNumber}`, url)}\n${resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeft!,
				})} remain in the season.\n${resolveCurrencyEmoji({
					emoji: candleEmoji,
					number: seasonalCandlesLeftWithSeasonPass!,
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

		const eventData = this.eventData(today);
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
		embed.addFields(this.shardEruptionFieldData());
		return embed;
	}

	private async send(client: Client<true>) {
		const { guildId, channelId, messageId } = this;
		const channel = client.channels.cache.get(channelId!);

		if (!channel || !isDailyGuidesDistributionChannel(channel)) {
			throw new Error(
				`Guild id ${guildId} had no detectable channel id ${channelId}, or did not satisfy the allowed channel types.`,
			);
		}

		const me = await channel.guild.members.fetchMe();

		if (!isDailyGuidesDistributable(channel, me)) {
			throw new Error(`Guild id ${guildId} did not have suitable permissions in channel id ${channelId}.`);
		}

		// Retrieve our embed.
		const embed = DailyGuidesDistribution.embed();

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

		if (errors.length > 0) void client.log({ content: "Error whilst distributing daily guides.", error: errors });
	}
}
