import time from "date-fns-tz";
import type { Attachment, Client, Collection, Message, Snowflake, TextChannel } from "discord.js";
import { FormattingPatterns, embedLength, EmbedBuilder, hyperlink } from "discord.js";
import { Realm } from "../Utility/Constants.js";
import { consoleLog, isRealm } from "../Utility/Utility.js";

interface DailyGuideQuest {
	content: string;
	url: string;
}

interface DailyGuideTreasureCandle {
	realm: Realm;
	url: string;
}

type ShardEruptionRealm = Exclude<Realm, Realm.IslesOfDawn | Realm.EyeOfEden | Realm.AncientMemory>;

interface ShardEruption {
	any: boolean | null;
	realm: ShardEruptionRealm | null;
	map: string | null;
	dangerous: boolean | null;
	timestamps: string | null;
	data: string | null;
	url: string | null;
}

function isShardEruptionRealm(rawRealm: string): rawRealm is ShardEruptionRealm {
	for (const realm of Object.values(Realm)) {
		if ([Realm.IslesOfDawn, Realm.EyeOfEden, Realm.AncientMemory].includes(realm)) continue;
		if (realm === rawRealm) return true;
	}

	return false;
}

const DEFAULT_SHARD_ERUPTION = {
	any: null,
	realm: null,
	map: null,
	dangerous: null,
	timestamps: null,
	data: null,
	url: null,
} as const;

export default new (class DailyGuides {
	public message: Message<true> | null = null;

	public quest1: DailyGuideQuest | null = null;

	public quest2: DailyGuideQuest | null = null;

	public quest3: DailyGuideQuest | null = null;

	public quest4: DailyGuideQuest | null = null;

	public treasureCandles: DailyGuideTreasureCandle | null = null;

	public seasonalCandles: string | null = null;

	public shardEruption: ShardEruption = { ...DEFAULT_SHARD_ERUPTION };

	public reset() {
		this.message = null;
		this.quest1 = null;
		this.quest2 = null;
		this.quest3 = null;
		this.quest4 = null;
		this.treasureCandles = null;
		this.seasonalCandles = null;
		this.shardEruption = { ...DEFAULT_SHARD_ERUPTION };
	}

	public async healthCheck(client: Client<true>) {
		const { message, quest1, quest2, quest3, quest4, treasureCandles, seasonalCandles, shardEruption } = this;

		// We'll only send once we have all quests and treasure candles.
		if (message === null && quest1 && quest2 && quest3 && quest4 && treasureCandles) {
			const channel = client.channels.cache.get("1041463334433738802") as TextChannel;
			const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");

			const embed = new EmbedBuilder()
				.setColor((await channel.guild.members.fetchMe()).displayColor)
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

			// During a season, let's save a possible edit.
			if (seasonalCandles) embed.addFields({ name: "Seasonal Candles", value: hyperlink("Image", seasonalCandles) });
			this.message = await channel.send({ embeds: [embed] });
		}

		// Let's check for seasonal candles and shard eruptions.
		if (this.message) {
			const embed = EmbedBuilder.from(this.message.embeds[0]);
			const oldLength = embedLength(embed.data);

			if (seasonalCandles && !embed.data.fields?.some(({ name }) => name === "Seasonal Candles")) {
				embed.addFields({ name: "Seasonal Candles", value: hyperlink("Image", seasonalCandles) });
			}

			if (shardEruption.any !== null && !embed.data.fields?.some(({ name }) => name === "Shard Eruption")) {
				embed.addFields(
					{
						name: "Shard Eruption",
						value: shardEruption
							? `Location: ${hyperlink(
									`${shardEruption.realm} (${shardEruption.map})`,
									shardEruption.url!,
							  )}\nDangerous: ${shardEruption.dangerous ? "✅" : "❎"}\nData: ${hyperlink(
									"link",
									shardEruption.data!,
							  )}`
							: "None",
						inline: true,
					},
					{
						name: "Timestamps",
						value: shardEruption.timestamps!,
						inline: true,
					},
				);
			}

			if (oldLength !== embedLength(embed.data)) await this.message.edit({ embeds: [embed] });
		}
	}

	public parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch a daily quest URL.");
			return;
		}

		// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1961
		// eslint-disable-next-line unicorn/prefer-string-replace-all
		let parsedContent = content.replace(new RegExp(FormattingPatterns.Emoji, "g"), "").replace(/\*|_/g, "").trim();
		if (parsedContent.includes("\nhttp")) parsedContent = parsedContent.slice(0, parsedContent.indexOf("\n"));

		if (!this.quest1) {
			this.quest1 = { content: parsedContent, url };
			return;
		}

		if (!this.quest2) {
			this.quest2 = { content: parsedContent, url };
			return;
		}

		if (!this.quest3) {
			this.quest3 = { content: parsedContent, url };
			return;
		}

		if (!this.quest4) {
			this.quest4 = { content: parsedContent, url };
			return;
		}

		consoleLog("Attempted to parse a daily quest despite all quest variables exhausted.");
	}

	public parseTreasureCandles(content: string, attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch the treasure candle locations.");
			return;
		}

		const realm = content.slice(content.indexOf("|") + 2);

		if (!isRealm(realm)) {
			consoleLog("Failed to parse the realm the treasure candles are in.");
			return;
		}

		this.treasureCandles = { realm, url };
	}

	public parseSeasonalCandles(attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch the seasonal candle locations.");
			return;
		}

		this.seasonalCandles = url;
	}

	public parseShardEruption(content: string, attachments: Collection<Snowflake, Attachment>) {
		if (content.includes("THERE ARE NO SHARDS")) {
			this.shardEruption.any = false;
			return;
		}

		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch the shard eruption location.");
			return;
		}

		const regex =
			/\*\*realm\*\*:\s*(?<realm>[ a-z]+)\n\*\*map\*\*:\s*(?<map>[ a-z]+)\n\*\*shard colou?r\*\*:\s*(?<color>red|black).+\n+\*\*shard timestamps\*\*.+\n(?<timestamps>.+\n.+\n.+)\n\n\*\*shard data\*\*.+\n(?<data>https:\/\/[\d./a-z]+)/i.exec(
				content,
			);

		if (regex?.groups) {
			const { realm, map, color, timestamps, data } = regex.groups;

			if (isShardEruptionRealm(realm)) {
				this.shardEruption.realm = realm;
			} else {
				consoleLog("Failed to parse the shard eruption realm.");
			}

			this.shardEruption.any = true;
			this.shardEruption.map = map;
			this.shardEruption.dangerous = color.toUpperCase() === "RED";
			// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1961
			// eslint-disable-next-line unicorn/prefer-string-replace-all
			this.shardEruption.timestamps = timestamps.replace(/ to /gi, " - ").replace(/1\. |2\. |3\. /g, "");
			this.shardEruption.data = data;
			this.shardEruption.url = url;
			return;
		}

		consoleLog("Failed to parse shard eruptions.");
	}
})();
