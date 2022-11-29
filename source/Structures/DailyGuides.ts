import { AsyncQueue } from "@sapphire/async-queue";
import time from "date-fns-tz";
import type { Attachment, Client, Collection, Message, Snowflake } from "discord.js";
import { ChannelType, MessageFlags, SnowflakeUtil, FormattingPatterns } from "discord.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID, Realm } from "../Utility/Constants.js";
import { consoleLog } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";

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
	realm: ValidRealm;
	data: TreasureCandleData[];
}

interface TreasureCandleData {
	content: string;
	url: string;
}

type ValidRealm = Exclude<Realm, Realm.IslesOfDawn | Realm.EyeOfEden | Realm.AncientMemory>;

interface ShardEruption {
	realm: ValidRealm | null;
	map: string | null;
	dangerous: boolean | null;
	timestamps: string | null;
	data: string | null;
	url: string | null;
}

function resolveRealm(rawRealm: string) {
	const upperRawRealm = rawRealm.toUpperCase();

	for (const realm of Object.values(Realm)) {
		if (realm.toUpperCase() !== upperRawRealm) continue;
		if (Realm.IslesOfDawn === realm || Realm.EyeOfEden === realm || Realm.AncientMemory === realm) continue;
		return realm;
	}

	return null;
}

const treasureCandleRegularExpression = new RegExp(
	`(?<rotation>rotation\\s+\\d{1,2})\\s+\\|\\s+(?<realm>${Object.values(Realm).join("|").replaceAll(" ", "\\s+")})`,
	"i",
);

export default new (class DailyGuides {
	public quest1: DailyGuidesData["quest1"] = null;

	public quest2: DailyGuidesData["quest2"] = null;

	public quest3: DailyGuidesData["quest3"] = null;

	public quest4: DailyGuidesData["quest4"] = null;

	public treasureCandles: DailyGuidesData["treasureCandles"] = null;

	public seasonalCandles: DailyGuidesData["seasonalCandles"] = null;

	public shardEruption: DailyGuidesData["shardEruption"] = null;

	public get todayTimestamp() {
		const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");
		date.setUTCHours(0);
		date.setUTCMinutes(0);
		date.setUTCSeconds(0);
		date.setUTCMilliseconds(0);
		return time.zonedTimeToUtc(date, "America/Los_Angeles").getTime();
	}

	public readonly queue = new AsyncQueue();

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

	public validToParse({ channelId, flags, reference }: Message) {
		return Boolean(
			channelId === Channel.dailyGuides &&
				reference?.guildId === INFOGRAPHICS_DATABASE_GUILD_ID &&
				flags.has(MessageFlags.IsCrosspost) &&
				reference.messageId &&
				SnowflakeUtil.timestampFrom(reference.messageId) >= this.todayTimestamp,
		);
	}

	public async parse(message: Message<true>) {
		if (!this.validToParse(message)) return;
		const { attachments, client, content, flags } = message;
		if (flags.has(MessageFlags.SourceMessageDeleted)) return;
		const transformedContent = content.toUpperCase();
		await this.queue.wait();

		if (transformedContent.includes("DAILY QUEST") && transformedContent.length <= 20) {
			// This is the general photo of quests. This is redundant.
			this.queue.shift();
			return;
		} else if (
			transformedContent.includes("QUEST") ||
			transformedContent.includes("RAINBOW") ||
			transformedContent.includes("SOCIAL LIGHT") ||
			transformedContent.includes("BLOOM SAPLING")
		) {
			await this.parseQuests(content, attachments);
		} else if (transformedContent.includes("TREASURE CANDLE")) {
			await this.parseTreasureCandles(content, attachments);
		} else if (transformedContent.includes("SEASONAL CANDLE")) {
			await this.parseSeasonalCandles(attachments);
		} else if (transformedContent.includes("SHATTERING SHARD LOCATION")) {
			await this.parseShardEruption(content, attachments);
		} else {
			consoleLog("Intercepted an unparsed message.");
			this.queue.shift();
			return;
		}

		if (this.queue.queued === 0) await DailyGuidesDistribution.distribute(client);
		this.queue.shift();
	}

	public async parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch a daily quest URL.");
			return;
		}

		let parsedContent = content
			.replaceAll(new RegExp(FormattingPatterns.Emoji, "g"), "")
			.replaceAll(/\*|_/g, "")
			// eslint-disable-next-line unicorn/no-unsafe-regex
			.replace(/(?:days\s+of\s+rainbow\s\d{4}\s+-\s+)?daily\s+quest,?\s+(?:guide\s+-\s+)?/i, "")
			.replace(/\s+by\s+\w+\n/, "\n")
			.trim();

		if (/\n<?https?/.test(parsedContent)) parsedContent = parsedContent.slice(0, parsedContent.indexOf("\n")).trim();
		const data = { content: parsedContent.replaceAll(/  +/g, " "), url };

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

		const regex = treasureCandleRegularExpression.exec(content);

		if (regex?.groups) {
			const { rotation, realm } = regex.groups;
			const resolvedRotation = rotation.replaceAll(/  +/g, " ");
			const resolvedRealm = resolveRealm(realm);

			if (!resolvedRotation) {
				consoleLog("Failed to parse the rotation of a set of treasure candles.");
				return;
			}

			if (!resolvedRealm) {
				consoleLog("Failed to parse the realm the treasure candles are in.");
				return;
			}

			const data = { content: resolvedRotation, url };

			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({
					treasure_candles: {
						realm: resolvedRealm,
						data: this.treasureCandles ? [...this.treasureCandles.data, data] : [data],
					},
				})
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		consoleLog("Failed to parse the treasure candles.");
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
			// eslint-disable-next-line unicorn/no-unsafe-regex
			/\*\*realm\*\*:\s*(?<realm>[ a-z]+)\n\*\*map\*\*:\s*(?<map>[ 'a-z]+)\n\*\*shard colou?r\*\*:\s*(?<color>red|black).+\n+\*\*shard timestamps\*\*.+\n(?<timestamps>.+\n.+\n.+)(?:\n\n\*\*shard data\*\*.+\n(?<data>https:\/\/[\d./a-z]+))?/i.exec(
				content,
			);

		if (regex?.groups) {
			const { realm, map, color, timestamps, data } = regex.groups;
			const resolvedRealm = resolveRealm(realm);

			if (!resolvedRealm) {
				consoleLog("Failed to parse the shard eruption realm.");
				return;
			}

			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({
					shard_eruption: {
						realm: resolvedRealm,
						map,
						dangerous: color.toUpperCase() === "RED",
						// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1961
						// eslint-disable-next-line unicorn/prefer-string-replace-all
						timestamps: timestamps.replace(/ to /gi, " - ").replace(/1\. |2\. |3\. /g, ""),
						data: data ?? null,
						url,
					},
				})
				.returning("*");

			this.patch(dailyGuidesPacket);
			return;
		}

		consoleLog("Failed to parse shard eruptions.");
	}

	public async reCheck(client: Client<true>) {
		const channel = client.channels.resolve(Channel.dailyGuides);
		if (channel?.type !== ChannelType.GuildText) return;

		const messages = await channel.messages.fetch({
			after: String(SnowflakeUtil.generate({ timestamp: this.todayTimestamp })),
		});

		await this.reset();
		// We care about the daily quest order.
		for (const message of messages.reverse().values()) void this.parse(message);
	}
})();
