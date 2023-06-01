import {
	type BaseInteraction,
	type ChatInputCommandInteraction,
	type Client,
	type Guild,
	type GuildMember,
	type Snowflake,
	channelMention,
	ChannelType,
	hyperlink,
	PermissionFlagsBits,
	EmbedBuilder,
	TimestampStyles,
	time,
} from "discord.js";
import { Emoji, eventEndDate } from "../Utility/Constants.js";
import { consoleLog, resolveCurrencyEmoji, todayDate, treasureCandleRealm, resolveEmoji } from "../Utility/Utility.js";
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

export const SHARD_ERUPTION_NAME = "Shard Eruption" as const;

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
		const channel = channelId ? guild.channels.resolve(channelId) : null;

		const sending = channel
			?.permissionsFor(me)
			.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks);

		return new EmbedBuilder()
			.setColor(me.displayColor)
			.setFields({
				name: "Daily Guides Status",
				value: `${channelId ? channelMention(channelId) : "No channel"}\n${
					sending ? "Sending!" : "Stopped!"
				} ${resolveEmoji(me, sending ? Emoji.Yes : Emoji.No, true)}`,
				inline: true,
			})
			.setTitle(guild.name);
	}

	public static shardEruptionFieldData(interactionOrMember: BaseInteraction | GuildMember) {
		const shardEruptionToday = DailyGuides.shardEruption();

		if (shardEruptionToday) {
			const { realm, map, dangerous, reward, timestamps, url } = shardEruptionToday;

			return [
				{
					name: SHARD_ERUPTION_NAME,
					value: `Location: ${hyperlink(`${realm} (${map})`, url)}\nDangerous: ${resolveEmoji(
						interactionOrMember,
						dangerous ? Emoji.Yes : Emoji.No,
						true,
					)}\nReward: ${
						reward === 200
							? "200 pieces of light"
							: resolveCurrencyEmoji(interactionOrMember, { emoji: Emoji.AscendedCandle, number: reward })
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

		return [{ name: SHARD_ERUPTION_NAME, value: "None" }];
	}

	public static embed(me: GuildMember) {
		const { quest1, quest2, quest3, quest4, treasureCandles, seasonalCandles, eventCurrency } = DailyGuides;
		const date = todayDate();

		const embed = new EmbedBuilder()
			.setTitle(`${String(date.date()).padStart(2, "0")}/${String(date.month() + 1).padStart(2, "0")}/${date.year()}`)
			.setColor(me.displayColor);

		if (quest1)
			embed.addFields({ name: quest1.content, value: quest1.url === "" ? "\u200B" : hyperlink("Image", quest1.url) });

		if (quest2)
			embed.addFields({ name: quest2.content, value: quest2.url === "" ? "\u200B" : hyperlink("Image", quest2.url) });

		if (quest3)
			embed.addFields({ name: quest3.content, value: quest3.url === "" ? "\u200B" : hyperlink("Image", quest3.url) });

		if (quest4)
			embed.addFields({ name: quest4.content, value: quest4.url === "" ? "\u200B" : hyperlink("Image", quest4.url) });

		if (treasureCandles) {
			embed.addFields({
				name: `Treasure Candles - ${treasureCandleRealm()}`,
				value: treasureCandles.map((url, index) => hyperlink(`${index * 4 + 1} - ${(index + 1) * 4}`, url)).join(" | "),
			});
		}

		if (seasonalCandles) embed.addFields({ name: "Seasonal Candles", value: hyperlink("Image", seasonalCandles) });

		if (date.isBefore(eventEndDate) || date.isSame(eventEndDate)) {
			embed.addFields({
				name: "Event Currency",
				value: hyperlink(eventCurrency.rotation ? `Rotation ${eventCurrency.rotation}` : "Image", eventCurrency.url),
			});
		}

		embed.addFields(this.shardEruptionFieldData(me));
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
				const channel = client.channels.resolve(channelId!);

				if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) {
					throw new Error(
						`Guild id ${guildId} had no detectable channel id ${channelId}, or was not a text channel or an announcement channel.`,
					);
				}

				const me = await channel.guild.members.fetchMe();

				if (
					!channel
						.permissionsFor(me)
						.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks)
				) {
					throw new Error(
						`Guild id ${guildId} did not have suitable permissions in channel id ${channelId} (View Channel, Send Messages, Embed Links).`,
					);
				}

				// Retrieve our guild-specific embed.
				const embed = this.embed(me);

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
