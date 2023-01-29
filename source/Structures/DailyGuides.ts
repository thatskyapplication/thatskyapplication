import { AsyncQueue } from "@sapphire/async-queue";
import type { Attachment, Client, Collection, Message, Snowflake } from "discord.js";
import { time, TimestampStyles, FormattingPatterns, ChannelType, MessageFlags, SnowflakeUtil } from "discord.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID, Map, Realm } from "../Utility/Constants.js";
import { consoleLog, todayTimestamp } from "../Utility/Utility.js";
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
	shard_eruption_extra: ShardEruptionExtra | null;
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	treasureCandles: DailyGuidesPacket["treasure_candles"];
	seasonalCandles: DailyGuidesPacket["seasonal_candles"];
	shardEruptionExtra: DailyGuidesPacket["shard_eruption_extra"];
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

const VALID_REALM = [
	Realm.DaylightPrairie,
	Realm.HiddenForest,
	Realm.ValleyOfTriumph,
	Realm.GoldenWasteland,
	Realm.VaultOfKnowledge,
] as const;

type ValidRealm = (typeof VALID_REALM)[number];

enum ShardMemory {
	Jellyfish = "Jellyfish",
	DarkCrab = "Crab",
	Manta = "Manta",
	DarkDragon = "Krill",
	Whale = "Whale",
	Elder = "Elder",
}

interface ShardEruptionExtra {
	reward: string | null;
	memory: ShardMemory | null;
	data: string | null;
	url: string | null;
}

const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		maps: [Map.ButterflyFields, Map.ForestBrook, Map.IceRink, Map.BrokenTemple, Map.StarlightDesert],
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		maps: [Map.KoiPond, Map.Boneyard, Map.IceRink, Map.Battlefield, Map.StarlightDesert],
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		maps: [Map.Cave, Map.ForestEnd, Map.VillageOfDreams, Map.Graveyard, Map.JellyfishCove],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		maps: [Map.BirdNest, Map.Treehouse, Map.VillageOfDreams, Map.CrabFields, Map.JellyfishCove],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		maps: [Map.SanctuaryIslands, Map.ElevatedClearing, Map.HermitValley, Map.ForgottenArk, Map.JellyfishCove],
	},
] as const;

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

	public get shardEruption() {
		const date = todayTimestamp();
		const dayOfMonth = date.getUTCDate();
		const dayOfWeek = date.getUTCDay();
		const dangerous = dayOfMonth % 2 === 1;
		const infoIndex = dangerous ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
		const { noShardWeekDay, interval, offset, maps } = SHARD_ERUPTION_PREDICTION_DATA[infoIndex];
		// @ts-expect-error Too narrow.
		const noShardDay = noShardWeekDay.includes(dayOfWeek);
		if (noShardDay) return null;
		const realmIndex = (dayOfMonth - 1) % 5;
		let startTime = date.getTime() + offset;
		let timestamps = "";

		while (startTime < date.getTime() + 72_000_000) {
			const start = time((startTime + 520_000) / 1_000, TimestampStyles.LongTime);
			const end = time((startTime + 14_400_000) / 1_000, TimestampStyles.LongTime);
			timestamps += `${start} - ${end}\n`;
			startTime += interval * 3_600_000;
		}

		return {
			realm: VALID_REALM[realmIndex],
			map: maps[realmIndex],
			dangerous,
			timestamps: timestamps.trim(),
		};
	}

	public shardEruptionExtra: DailyGuidesData["shardEruptionExtra"] = null;

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
				shard_eruption_extra: null,
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
		this.shardEruptionExtra = data.shard_eruption_extra;
	}

	public validToParse({ channelId, flags, reference }: Message) {
		return Boolean(
			channelId === Channel.dailyGuides &&
				reference?.guildId === INFOGRAPHICS_DATABASE_GUILD_ID &&
				flags.has(MessageFlags.IsCrosspost) &&
				reference.messageId &&
				SnowflakeUtil.timestampFrom(reference.messageId) >= todayTimestamp().getTime(),
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
		const upperPureContent = pureContent.replaceAll(new RegExp(FormattingPatterns.Emoji, "gi"), "").toUpperCase();

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
		if (upperPureContent.includes("RELIVE A SPIRIT'S MEMORY")) return "Relive a Spirit's Memories";

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
		const shardEruption = this.shardEruption;
		if (!shardEruption) return;
		let reward = null;
		let memory = null;
		let data = null;

		for (const line of content.split("\n")) {
			const upperLine = line.toUpperCase();

			if (upperLine.includes("**REWARD**:"))
				reward = line.slice(line.indexOf(":") + 2, line.includes("<:") ? line.indexOf("<:") - 1 : line.length);

			if (upperLine.includes(`[Y] ${ShardMemory.Jellyfish.toUpperCase()}`)) memory = ShardMemory.Jellyfish;
			if (upperLine.includes(`[Y] ${ShardMemory.DarkCrab.toUpperCase()}`)) memory = ShardMemory.DarkCrab;
			if (upperLine.includes(`[Y] ${ShardMemory.Manta.toUpperCase()}`)) memory = ShardMemory.Manta;
			if (upperLine.includes(`[Y] ${ShardMemory.DarkDragon.toUpperCase()}`)) memory = ShardMemory.DarkDragon;
			if (upperLine.includes(`[Y] ${ShardMemory.Whale.toUpperCase()}`)) memory = ShardMemory.Whale;
			if (upperLine.includes(`[Y] ${ShardMemory.Elder.toUpperCase()}`)) memory = ShardMemory.Elder;
			if (upperLine.includes("SHARD DATA")) data = line.slice(line.lastIndexOf("`") + 1);
		}

		if (shardEruption.dangerous && !memory) {
			consoleLog("Failed to parse the shard eruption memory.");
			return;
		}

		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({
				shard_eruption_extra: {
					reward,
					memory,
					data,
					url: attachments.first()?.url ?? null,
				},
			})
			.returning("*");

		this.patch(dailyGuidesPacket);
	}

	public async reCheck(client: Client<true>) {
		const channel = client.channels.resolve(Channel.dailyGuides);
		if (channel?.type !== ChannelType.GuildText) return;

		const messages = await channel.messages.fetch({
			after: String(SnowflakeUtil.generate({ timestamp: todayTimestamp() })),
		});

		await this.reset();
		// We care about the daily quest order.
		for (const message of messages.reverse().values()) void this.parse(message);
	}
})();
