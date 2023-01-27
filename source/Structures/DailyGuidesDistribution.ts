import time from "date-fns-tz";
import type { ChatInputCommandInteraction, Client, Guild, Snowflake } from "discord.js";
import { channelMention, ChannelType, hyperlink, PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { consoleLog } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuides, { getShardEruption } from "./DailyGuides.js";

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

		// Let's build our embed.
		const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");

		const embed = new EmbedBuilder().setTitle(
			`${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(
				2,
				"0",
			)}/${date.getUTCFullYear()}`,
		);

		if (quest1) embed.addFields({ name: quest1.content, value: hyperlink("Image", quest1.url) });
		if (quest2) embed.addFields({ name: quest2.content, value: hyperlink("Image", quest2.url) });
		if (quest3) embed.addFields({ name: quest3.content, value: hyperlink("Image", quest3.url) });
		if (quest4) embed.addFields({ name: quest4.content, value: hyperlink("Image", quest4.url) });

		if (treasureCandles)
			embed.addFields({
				name: `Treasure Candles - ${treasureCandles.realm}`,
				value: treasureCandles.data.map(({ content, url }) => hyperlink(content, url)).join("\n"),
			});

		if (seasonalCandles) embed.addFields({ name: "Seasonal Candles", value: hyperlink("Image", seasonalCandles) });

		if (shardEruption) {
			const { realm, map, dangerous, timestamps, memory, data, url } = shardEruption;

			embed.addFields({
				name: SHARD_ERUPTION_NAME,
				value:
					realm !== null && map !== null && dangerous !== null && url !== null
						? `Location: ${hyperlink(`${realm} (${map})`, url)}${memory ? `\nMemory: ${memory}` : ""}\nDangerous: ${
								dangerous ? "✅" : "❌"
						  }${data ? `\nData: ${hyperlink("link", data)}` : ""}`
						: "None",
				inline: true,
			});

			if (timestamps) embed.addFields({ name: "Timestamps", value: timestamps, inline: true });
		} else {
			const shardEruptionPrediction = getShardEruption();

			if (shardEruptionPrediction) {
				const { realm, map, dangerous, timestamps } = shardEruptionPrediction;

				embed.addFields(
					{
						name: `${SHARD_ERUPTION_NAME} Prediction`,
						value: `Location: ${realm} (${map})\nDangerous: ${dangerous ? "✅" : "❌"}`,
						inline: true,
					},
					{ name: "Timestamps", value: timestamps, inline: true },
				);
			} else {
				embed.addFields({ name: SHARD_ERUPTION_NAME, value: "Unknown" });
			}
		}

		// Distribute!
		const distributions = await Promise.allSettled(
			dailyGuidesDistributionPackets.map(async (dailyGuidesDistributionPacket) => {
				// There is definitely a channel id. The query specified this.
				const dailyGuidesDistribution = new DailyGuidesDistribution(dailyGuidesDistributionPacket);
				const { guildId, channelId, messageId } = dailyGuidesDistribution;
				const channel = client.channels.resolve(channelId!);

				if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) {
					throw new Error(
						`Guild id ${guildId} had no detctable channel id ${channelId}, or was not a text channel or an announcement channel.`,
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

				// Add guild-specific colour (an object is made to avoid overwriting colour).
				const finalEmbed = { ...embed.toJSON(), color: me.displayColor };

				// We need to check if we should update the embed, if it exists.
				const message = messageId ? await channel.messages.fetch(messageId).catch(() => null) : null;

				if (message?.embeds[0]) {
					// Currently does not work as expected due to https://github.com/discordjs/discord.js/issues/9095.
					if (!message.embeds[0].equals(finalEmbed)) return message.edit({ embeds: [finalEmbed] });
					return null;
				} else {
					// There is no existing message. Send one.
					const { id } = await channel.send({ embeds: [finalEmbed] });

					const [newDailyGuidesDistributionPacket] = await pg<DailyGuidesDistributionPacket>(
						Table.DailyGuidesDistribution,
					)
						.update({ message_id: id })
						.where("guild_id", guildId)
						.returning("*");

					dailyGuidesDistribution.patch(newDailyGuidesDistributionPacket);
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
