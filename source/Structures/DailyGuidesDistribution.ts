import time from "date-fns-tz";
import type { ChatInputCommandInteraction, Client, Guild, Snowflake } from "discord.js";
import { channelMention, ChannelType, embedLength, hyperlink, PermissionFlagsBits, EmbedBuilder } from "discord.js";
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

			dailyGuidesDistribution.patch(dailyGuidesDistributionPacket);
		} else {
			const [dailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
				Table.DailyGuidesDistribution,
			).insert(data, "*");

			dailyGuidesDistribution = new this(dailyGuidesDistributionPacket);
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

		return new EmbedBuilder()
			.setColor(me.displayColor)
			.setFields({
				name: "Daily Guides Status",
				value: `${channelId ? channelMention(channelId) : "No channel"}\n${
					channel
						?.permissionsFor(me)
						.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks)
						? "✅ Sending!"
						: "⚠️ Stopped!"
				}`,
				inline: true,
			})
			.setTitle(guild.name);
	}

	public static async distribute(client: Client<true>) {
		const { quest1, quest2, quest3, quest4, treasureCandles, seasonalCandles, shardEruption } = DailyGuides;

		const dailyGuidesDistributionPackets = await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).whereNotNull("channel_id");

		// Require all quests and treasure candles to start.
		if (!quest1 || !quest2 || !quest3 || !quest4 || !treasureCandles) return;
		// Let's build our embed.
		const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");

		const embed = new EmbedBuilder()
			.setFields(
				{ name: quest1.content, value: hyperlink("Image", quest1.url) },
				{ name: quest2.content, value: hyperlink("Image", quest2.url) },
				{ name: quest3.content, value: hyperlink("Image", quest3.url) },
				{ name: quest4.content, value: hyperlink("Image", quest4.url) },
				{ name: `Treasure Candles - ${treasureCandles.realm}`, value: hyperlink("Image", treasureCandles.url) },
			)
			.setTitle(
				`${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(
					2,
					"0",
				)}/${date.getUTCFullYear()}`,
			);

		// Other data may have been caught. Let's check that.
		if (seasonalCandles) embed.addFields({ name: "Seasonal Candles", value: hyperlink("Image", seasonalCandles) });

		if (shardEruption) {
			const { realm, map, dangerous, timestamps, data, url } = shardEruption;

			embed.addFields({
				name: SHARD_ERUPTION_NAME,
				value:
					realm !== null && map !== null && dangerous !== null && data !== null && url !== null
						? `Location: ${hyperlink(`${realm} (${map})`, url)}\nDangerous: ${
								dangerous ? "✅" : "❌"
						  }\nData: ${hyperlink("link", data)}`
						: "None",
				inline: true,
			});

			if (timestamps) embed.addFields({ name: "Timestamps", value: timestamps, inline: true });
		} else {
			embed.addFields({ name: SHARD_ERUPTION_NAME, value: "Unknown" });
		}

		// Distribute!
		for (const dailyGuidesDistributionPacket of dailyGuidesDistributionPackets) {
			// There is definitely a channel id. The query specified this.
			const dailyGuidesDistribution = new DailyGuidesDistribution(dailyGuidesDistributionPacket);
			const { guildId, channelId, messageId } = dailyGuidesDistribution;
			const channel = client.guilds.resolve(guildId)?.channels.resolve(channelId!);

			if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement))
				return;

			const me = await channel.guild.members.fetchMe();

			if (
				!channel
					.permissionsFor(me)
					.has(PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages | PermissionFlagsBits.EmbedLinks)
			)
				return;

			// Add guild-specific colour.
			embed.setColor(me.displayColor);
			// We need to check if we should update the embed, if it exists.
			const message = messageId ? await channel.messages.fetch(messageId).catch(() => null) : null;

			if (message?.embeds[0]) {
				if (message.embeds[0].length !== embedLength(embed.data)) await message.edit({ embeds: [embed] });
			} else {
				// There is no existing message. Send one.
				const { id } = await channel.send({ embeds: [embed] });

				const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
					Table.DailyGuidesDistribution,
				)
					.update({ message_id: id })
					.where("guild_id", guildId)
					.returning("*");

				dailyGuidesDistribution.patch(newDailyGuidesDistributionPacket);
			}
		}
	}
}
