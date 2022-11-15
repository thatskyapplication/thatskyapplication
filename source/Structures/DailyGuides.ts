import type { Attachment, Collection, Snowflake } from "discord.js";
import { FormattingPatterns } from "discord.js";
import { Realm } from "../Utility/Constants.js";
import { consoleLog, isRealm } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";

export interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	treasure_candles: DailyGuideTreasureCandle | null;
	seasonal_candles: string | null;
	shard_eruption: ShardEruption | null;
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	treasureCandles: DailyGuidesPacket["treasure_candles"];
	seasonalCandles: DailyGuidesPacket["seasonal_candles"];
	shardEruption: DailyGuidesPacket["shard_eruption"];
}

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

export default new (class DailyGuides {
	public quest1: DailyGuidesData["quest1"] = null;

	public quest2: DailyGuidesData["quest2"] = null;

	public quest3: DailyGuidesData["quest3"] = null;

	public quest4: DailyGuidesData["quest4"] = null;

	public treasureCandles: DailyGuidesData["treasureCandles"] = null;

	public seasonalCandles: DailyGuidesData["seasonalCandles"] = null;

	public shardEruption: DailyGuidesData["shardEruption"] = null;

	public async reset() {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({
				quest1: null,
				quest2: null,
				quest3: null,
				quest4: null,
				treasure_candles: null,
				seasonal_candles: null,
				shard_eruption: null,
			})
			.returning("*");

		this.patch(dailyGuidesPacket);
	}

	public patch(data: DailyGuidesPacket) {
		this.quest1 = data.quest1;
		this.quest2 = data.quest2;
		this.quest3 = data.quest3;
		this.quest4 = data.quest4;
		this.treasureCandles = data.treasure_candles;
		this.seasonalCandles = data.seasonal_candles;
		this.shardEruption = data.shard_eruption;
	}

	public async parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch a daily quest URL.");
			return;
		}

		// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1961
		// eslint-disable-next-line unicorn/prefer-string-replace-all
		let parsedContent = content.replace(new RegExp(FormattingPatterns.Emoji, "g"), "").replace(/\*|_/g, "").trim();
		if (parsedContent.includes("\nhttp")) parsedContent = parsedContent.slice(0, parsedContent.indexOf("\n")).trim();
		const data = { content: parsedContent, url };

		if (!this.quest1) {
			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({ quest1: data })
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		if (!this.quest2) {
			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({ quest2: data })
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		if (!this.quest3) {
			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({ quest3: data })
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		if (!this.quest4) {
			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({ quest4: data })
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		consoleLog("Attempted to parse a daily quest despite all quest variables exhausted.");
	}

	public async parseTreasureCandles(content: string, attachments: Collection<Snowflake, Attachment>) {
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

		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ treasure_candles: { realm, url } })
			.returning("*");

		this.patch(dailyGuidesPacket);
	}

	public async parseSeasonalCandles(attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch the seasonal candle locations.");
			return;
		}

		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ seasonal_candles: url })
			.returning("*");

		this.patch(dailyGuidesPacket);
	}

	public async parseShardEruption(content: string, attachments: Collection<Snowflake, Attachment>) {
		if (content.toUpperCase().includes("THERE ARE NO SHARDS")) {
			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({
					shard_eruption: {
						realm: null,
						map: null,
						dangerous: null,
						timestamps: null,
						data: null,
						url: null,
					},
				})
				.returning("*");

			this.patch(dailyGuidesPacket);
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

			if (!isShardEruptionRealm(realm)) {
				consoleLog("Failed to parse the shard eruption realm.");
				return;
			}

			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({
					shard_eruption: {
						realm,
						map,
						dangerous: color.toUpperCase() === "RED",
						// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1961
						// eslint-disable-next-line unicorn/prefer-string-replace-all
						timestamps: timestamps.replace(/ to /gi, " - ").replace(/1\. |2\. |3\. /g, ""),
						data,
						url,
					},
				})
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		consoleLog("Failed to parse shard eruptions.");
	}
})();
