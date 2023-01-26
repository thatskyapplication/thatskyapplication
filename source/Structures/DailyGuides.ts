import { AsyncQueue } from "@sapphire/async-queue";
import time from "date-fns-tz";
import type { Attachment, Client, Collection, Message, Snowflake } from "discord.js";
import { ChannelType, MessageFlags, SnowflakeUtil } from "discord.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID, Map, Realm } from "../Utility/Constants.js";
import { consoleLog } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import { SpiritName } from "./Spirit.js";

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

enum ShardMemory {
	Jellyfish = "Jellyfish",
	DarkCrab = "Crabs",
	Manta = "Manta",
	DarkDragon = "Krill",
	Whale = "Whale",
	Elder = "Elder",
}

interface ShardEruption {
	realm: ValidRealm | null;
	map: string | null;
	dangerous: boolean | null;
	timestamps: string | null;
	memory: ShardMemory | null;
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

function resolveMap(rawMap: string) {
	const upperRawMap = rawMap.toUpperCase();

	// Account for wonderful inconsistencies.
	switch (upperRawMap) {
		case "FOREST'S BROOK":
			return Map.ForestBrook;
		case "RACE END":
			return Map.Coliseum;
	}

	return Object.values(Map).find((map) => map.toUpperCase() === upperRawMap) ?? null;
}

function resolveMemory(rawMemory: string) {
	// eslint-disable-next-line unicorn/better-regex, prefer-named-capture-group
	const upperRawMemory = /\[y\] ([a-z]+)/i.exec(rawMemory)?.[1].toUpperCase();
	if (!upperRawMemory) return null;

	for (const memory of Object.values(ShardMemory)) {
		if (memory.toUpperCase() !== upperRawMemory) continue;
		return memory;
	}

	return null;
}

const regularExpressionRealms = Object.values(Realm).join("|").replaceAll(" ", "\\s+");
const mapRegExp = Object.values(Map).join("|").replaceAll(" ", "\\s+");

const treasureCandleRegularExpression = new RegExp(
	`(?<rotation>rotation\\s+\\d{1,2})\\s*\\|\\s*(?<realm>${regularExpressionRealms})`,
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
			transformedContent.includes("SAPLING")
		) {
			await this.parseQuests(content, attachments);
		} else if (transformedContent.includes("TREASURE CANDLE")) {
			await this.parseTreasureCandles(content, attachments);
		} else if (transformedContent.includes("SEASONAL CANDLE")) {
			await this.parseSeasonalCandles(attachments);
		} else if (
			transformedContent.includes("SHATTERING SHARD SUMMARY") ||
			transformedContent.includes("SHATTERING SHARD LOCATION")
		) {
			await this.parseShardEruption(content, attachments);
		} else {
			consoleLog("Intercepted an unparsed message.");
			this.queue.shift();
			return;
		}

		if (this.queue.queued === 0) await DailyGuidesDistribution.distribute(client);
		this.queue.shift();
	}

	private resolveDailyGuideContent(pureContent: string) {
		const upperPureContent = pureContent.toUpperCase();
		if (upperPureContent.includes("BOW AT A PLAYER") || upperPureContent.includes("BOW TO A PLAYER"))
			return "Bow at a Player";

		if (upperPureContent.includes("KNOCK OVER 5 DARK CREATURE")) return "Knock over 5 Dark Creatures Crabs";
		if (upperPureContent.includes("FOLLOW A FRIEND")) return "Follow a Friend";
		if (upperPureContent.includes("HUG A FRIEND")) return "Hug a Friend";
		if (upperPureContent.includes("WAVE TO A FRIEND")) return "Wave to a Friend";
		if (upperPureContent.includes("HOLD THE HAND")) return "Hold the Hand of a Friend";
		if (upperPureContent.includes("ACQUAINTANCE")) return "Make a New Acquaintance";
		if (upperPureContent.includes("HIGH-FIVE")) return "High-Five a Friend";
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return "Use an Expression Near a Friend";
		if (upperPureContent.includes("BENCH")) return "Sit at a bench with a stranger.";
		if (upperPureContent.includes("RIDE A MANTA")) return "Ride a Manta";
		if (upperPureContent.includes("DARK DRAGON")) return "Face the Dark Dragon";
		if (upperPureContent.includes("RECHARGE FROM A LIGHT BLOOM")) return "Recharge from a Light Bloom";
		if (upperPureContent.includes("RECHARGE FROM A JELLYFISH")) return "Recharge from a Jellyfish";
		if (upperPureContent.includes("RAINBOW")) return "Find the Candles at the End of the Rainbow";
		if (upperPureContent.includes("CATCH THE LIGHT")) return "Catch the Light";
		if (upperPureContent.includes("MEDITATION")) return "Meditate";
		if (upperPureContent.includes("BLUE LIGHT")) return "Collect Blue Light";
		if (upperPureContent.includes("GREEN LIGHT")) return "Collect Green Light";
		if (upperPureContent.includes("ORANGE LIGHT")) return "Collect Orange Light";
		if (upperPureContent.includes("PURPLE LIGHT")) return "Collect Purple Light";
		if (upperPureContent.includes("RED LIGHT")) return "Collect Red Light";
		if (upperPureContent.includes("SAPLING")) return "Admire the Sapling";
		if (upperPureContent.includes("SOCIAL LIGHT")) return "Visit the Social Light area";
		if (upperPureContent.includes("SCAVENGER HUNT")) return "Complete the Hoop Scavenger Hunt";
		if (upperPureContent.includes("RACE DOWN THE SLOPES")) return "Race Down the Slopes with the Skater";
		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) return "Race Down the Mountain with the Skater";
		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) return "Practice with the Skater";
		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) return "Rehearse for a Performance with the Skater";

		for (const spiritName of Object.values(SpiritName))
			if (upperPureContent.replaceAll("’", "'").includes(spiritName.toUpperCase())) return `Relive ${spiritName}`;

		return null;
	}

	public async parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch a daily quest URL.");
			return;
		}

		// Remove the message link, if any.
		const pureContent = /\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")).trim() : content;

		// Attempt to manually set the daily guide.
		const dailyGuideContent = this.resolveDailyGuideContent(pureContent);

		// Attempt to find a realm.
		const potentialRealmRegExp = new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;
		const realm = potentialRealmRegExp ? resolveRealm(potentialRealmRegExp) : null;

		// Attempt to find a map.
		const potentialMapRegExp = new RegExp(`(${mapRegExp})`, "i").exec(pureContent)?.[1] ?? null;
		const map = potentialMapRegExp ? resolveMap(potentialMapRegExp) : null;

		// Generate the final output.
		let output = null;
		if (dailyGuideContent) output = `${dailyGuideContent}${realm ? ` - ${realm}` : ""}${map ? ` - ${map}` : ""}`;

		// Fallback in case of no output.
		if (!output) {
			consoleLog("Failed to match a daily quest. Falling back to original string.");
			output = pureContent;
		}

		const data = { content: output, url };

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
						memory: null,
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
			/\*\*realm\*\*:\s*(?<realm>[ a-z]+)\n\*\*map\*\*:\s*(?<map>[ '()/a-z]+)\n\*\*shard colou?r\*\*:\s*(?<color>red|black).+\n\n```timestamps.+```(?<timestamps>.+\n.+\n.+)\n\n```shard memory```(?<memory>.+\n.+\n.+\n.+\n.+\n.+)(?:\n\n```shard data.+```(?<data>https:\/\/[\d./a-z]+))?/i.exec(
				content,
			);

		if (regex?.groups) {
			const { realm, map, color, timestamps, memory, data } = regex.groups;
			const resolvedRealm = resolveRealm(realm);
			const dangerous = color.toUpperCase() === "RED";
			const resolvedMemory = resolveMemory(memory);

			if (!resolvedRealm) {
				consoleLog("Failed to parse the shard eruption realm.");
				return;
			}

			if (dangerous && !resolvedMemory) {
				consoleLog("Failed to parse the shard eruption memory.");
				return;
			}

			const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
				.update({
					shard_eruption: {
						realm: resolvedRealm,
						map,
						dangerous,
						timestamps: timestamps.replaceAll(/ to /gi, " - ").replaceAll(/1\. |2\. |3\. /g, ""),
						memory: resolvedMemory,
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
