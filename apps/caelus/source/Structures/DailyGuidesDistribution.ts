import {
	type Channel,
	type ChatInputCommandInteraction,
	type Client,
	type Guild,
	type GuildBasedChannel,
	type GuildMember,
	type Snowflake,
	channelMention,
	ChannelType,
	hyperlink,
	PermissionFlagsBits,
	EmbedBuilder,
	TimestampStyles,
	time,
	formatEmoji,
} from "discord.js";
import {
	Emoji,
	doubleSeasonalLightEventEndDate,
	doubleSeasonalLightEventStartDate,
	eventEndDate,
} from "../Utility/Constants.js";
import {
	consoleLog,
	resolveCurrencyEmoji,
	todayDate,
	treasureCandleRealm,
	resolveEmbedColor,
	seasonalCandlesRotation,
	inSeason,
	remainingSeasonalCandles,
	resolveCurrentSeasonalCandleEmoji,
} from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuides from "./DailyGuides.js";

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
			`\`View Channel\` & \`Send Messages\` & \`Embed Links\` & and \`Use External Emojis\` are required for ${channel}.`,
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

	public static async setup(
		interaction: ChatInputCommandInteraction<"cached">,
		data: DailyGuidesDistributionInsertQuery | DailyGuidesDistributionUpdateQuery,
	) {
		const { guild, guildId } = interaction;
		let dailyGuidesDistribution = await this.fetch(guildId).catch(() => null);

		if (dailyGuidesDistribution) {
			const updateData = dailyGuidesDistribution.channelId === data.channel_id ? data : { ...data, message_id: null };

			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
				.update(updateData)
				.where("id", dailyGuidesDistribution.id)
				.returning("*");

			dailyGuidesDistribution.patch(dailyGuidesDistributionPacket!);
		} else {
			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
				Table.DailyGuidesDistribution,
			).insert(data, "*");

			dailyGuidesDistribution = new this(dailyGuidesDistributionPacket!);
		}

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
			.setColor(await resolveEmbedColor(guild))
			.setFields({
				name: "Daily Guides Status",
				value: `${channelId ? channelMention(channelId) : "No channel"}\n${
					sending ? "Sending!" : "Stopped!"
				} ${formatEmoji(sending ? Emoji.Yes : Emoji.No, true)}`,
				inline: true,
			})
			.setTitle(guild.name);
	}

	public static eventCurrencyFieldData() {
		const date = todayDate();
		const { eventCurrency } = DailyGuides;

		if (date.isBefore(eventEndDate) || date.isSame(eventEndDate)) {
			return { name: "Event Currency", value: hyperlink("Image", eventCurrency.url) };
		}

		return null;
	}

	public static shardEruptionFieldData() {
		const shardEruptionToday = DailyGuides.shardEruption();

		if (shardEruptionToday) {
			const { realm, map, dangerous, reward, timestamps, url } = shardEruptionToday;

			return [
				{
					name: SHARD_ERUPTION_NAME,
					value: `Location: ${hyperlink(`${realm} (${map})`, url)}\nDangerous: ${formatEmoji(
						dangerous ? Emoji.Yes : Emoji.No,
						true,
					)}\nReward: ${
						reward === 200
							? "200 pieces of light"
							: resolveCurrencyEmoji({ emoji: Emoji.AscendedCandle, number: reward })
					}`,
					inline: true,
				},
				{
					name: "Timestamps",
					value: timestamps
						.map(
							({ start, end }) =>
								`${time(start.unix(), TimestampStyles.LongTime)} - ${time(end.unix(), TimestampStyles.LongTime)}`,
						)
						.join("\n"),
					inline: true,
				},
			];
		}

		return [{ name: SHARD_ERUPTION_NAME, value: SHARD_ERUPTION_NONE }];
	}

	public static embed(embedColor: number) {
		const { quest1, quest2, quest3, quest4, treasureCandles } = DailyGuides;
		const date = todayDate();
		const embed = new EmbedBuilder().setTitle(date.format("dddd, D MMMM YYYY")).setColor(embedColor);

		if (quest1) {
			embed.addFields({ name: quest1.content, value: quest1.url === "" ? "\u200B" : hyperlink("Image", quest1.url) });
		}

		if (quest2) {
			embed.addFields({ name: quest2.content, value: quest2.url === "" ? "\u200B" : hyperlink("Image", quest2.url) });
		}

		if (quest3) {
			embed.addFields({ name: quest3.content, value: quest3.url === "" ? "\u200B" : hyperlink("Image", quest3.url) });
		}

		if (quest4) {
			embed.addFields({ name: quest4.content, value: quest4.url === "" ? "\u200B" : hyperlink("Image", quest4.url) });
		}

		if (treasureCandles) {
			embed.addFields({
				name: `Treasure Candles - ${treasureCandleRealm()}`,
				value: treasureCandles.map((url, index) => hyperlink(`${index * 4 + 1} - ${(index + 1) * 4}`, url)).join(" | "),
			});
		}

		if (inSeason()) {
			const { rotation, url } = seasonalCandlesRotation();
			let rotationNumber = String(rotation);

			if (
				(date.isAfter(doubleSeasonalLightEventStartDate) || date.isSame(doubleSeasonalLightEventStartDate)) &&
				(date.isBefore(doubleSeasonalLightEventEndDate) || date.isSame(doubleSeasonalLightEventEndDate))
			) {
				rotationNumber = "1 & 2";
			}

			const remainingCandles = remainingSeasonalCandles();
			let seasonalCandlesLeft;
			let seasonalCandlesLeftWithSeasonPass;
			if (remainingCandles) ({ seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } = remainingCandles);
			const emoji = resolveCurrentSeasonalCandleEmoji();

			embed.addFields({
				name: "Seasonal Candles",
				value: `${hyperlink(`Rotation ${rotationNumber}`, url)}\n${resolveCurrencyEmoji({
					emoji,
					number: seasonalCandlesLeft!,
				})} remain in the season.\n${resolveCurrencyEmoji({
					emoji,
					number: seasonalCandlesLeftWithSeasonPass!,
				})} remain in the season with a Season Pass.`,
			});
		}

		const eventCurrencyFieldData = this.eventCurrencyFieldData();
		if (eventCurrencyFieldData) embed.addFields(eventCurrencyFieldData);
		embed.addFields(this.shardEruptionFieldData());
		return embed;
	}

	public static async distribute(client: Client<true>) {
		const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).whereNotNull("channel_id");

		const distributions = await Promise.allSettled(
			dailyGuidesDistributionPackets.map(async (dailyGuidesDistributionPacket) => {
				// There is definitely a channel id. The query specified this.
				const dailyGuidesDistribution = new DailyGuidesDistribution(dailyGuidesDistributionPacket);
				const { guildId, channelId, messageId } = dailyGuidesDistribution;
				const channel = client.channels.cache.get(channelId!);

				if (!channel || !isDailyGuidesDistributionChannel(channel)) {
					throw new Error(
						`Guild id ${guildId} had no detectable channel id ${channelId}, or did not satisfy the allowed channel types.`,
					);
				}

				const me = await channel.guild.members.fetchMe();

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
					throw new Error(
						`Guild id ${guildId} did not have suitable permissions in channel id ${channelId} (View Channel, Send Messages, Embed Links).`,
					);
				}

				// Retrieve our guild-specific embed.
				const embed = this.embed(await resolveEmbedColor(me.guild));

				// We need to check if we should update the embed, if it exists.
				const message = messageId ? await channel.messages.fetch(messageId).catch(() => null) : null;

				if (message?.embeds[0]) {
					// Currently does not work as expected due to https://github.com/discordjs/discord.js/issues/9095.
					if (!message.embeds[0].equals(embed.data)) return message.edit({ embeds: [embed] });
					return null;
				} else {
					// There is no existing message. Send one.
					const { id } = await channel.send({ embeds: [embed] });

					const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
						Table.DailyGuidesDistribution,
					)
						.update({ message_id: id })
						.where("guild_id", guildId)
						.returning("*");

					dailyGuidesDistribution.patch(newDailyGuidesDistributionPacket!);
					return newDailyGuidesDistributionPacket;
				}
			}),
		);

		const rejected = [];
		for (const settled of distributions) if (settled.status === "rejected") rejected.push(settled.reason);
		consoleLog("- - - - - Distribution Status Start - - - - -");

		if (rejected.length > 0) {
			for (const reject of rejected) consoleLog(reject);
		} else {
			consoleLog("All good.");
		}

		consoleLog("- - - - - Distribution Status End - - - - -");
	}
}
