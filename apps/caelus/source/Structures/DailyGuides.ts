import { URL } from "node:url";
import { AsyncQueue } from "@sapphire/async-queue";
import type { Attachment, Client, Collection, Message, Snowflake } from "discord.js";
import { FormattingPatterns, ChannelType, MessageFlags, SnowflakeUtil } from "discord.js";
import {
	EVENT_CURRENCY_INFOGRAPHIC_URL,
	CDN_URL,
	Channel,
	INFOGRAPHICS_DATABASE_GUILD_ID,
	Map,
	Realm,
	VALID_REALM,
	inconsistentMapKeys,
} from "../Utility/Constants.js";
import { consoleLog, resolveMap, resolveValidRealm, todayDate } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import { SpiritName } from "./Spirit.js";

export interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	treasure_candles: string[] | null;
	seasonal_candles: string | null;
	event_currency: DailyGuideEvent;
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	treasureCandles: DailyGuidesPacket["treasure_candles"];
	seasonalCandles: DailyGuidesPacket["seasonal_candles"];
	eventCurrency: DailyGuidesPacket["event_currency"];
}

interface DailyGuideQuest {
	content: string;
	url: string;
}

export const DAILY_GUIDE_EVENT_ROTATON = ["A", "B", "C"] as const;
export type DailyGuideEventRotation = typeof DAILY_GUIDE_EVENT_ROTATON[number];

interface DailyGuideEvent {
	rotation: DailyGuideEventRotation | null;
	url: typeof EVENT_CURRENCY_INFOGRAPHIC_URL;
}

function resolveShardEruptionMapURL(map: Map) {
	return new URL(`shards/${map.replaceAll(" ", "_")}.png`, CDN_URL);
}

const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 0], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [Map.ButterflyFields, Map.ForestBrook, Map.IceRink, Map.BrokenTemple, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [0, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [Map.KoiPond, Map.Boneyard, Map.IceRink, Map.Battlefield, Map.StarlightDesert].map((map) => ({
			map,
			url: resolveShardEruptionMapURL(map),
			reward: 200,
		})),
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{ map: Map.Cave, url: resolveShardEruptionMapURL(Map.Cave), reward: 2 },
			{ map: Map.ForestEnd, url: resolveShardEruptionMapURL(Map.ForestEnd), reward: 2.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.Graveyard, url: resolveShardEruptionMapURL(Map.Graveyard), reward: 2 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{ map: Map.BirdNest, url: resolveShardEruptionMapURL(Map.BirdNest), reward: 2.5 },
			{ map: Map.Treehouse, url: resolveShardEruptionMapURL(Map.Treehouse), reward: 3.5 },
			{ map: Map.VillageOfDreams, url: resolveShardEruptionMapURL(Map.VillageOfDreams), reward: 2.5 },
			{ map: Map.CrabFields, url: resolveShardEruptionMapURL(Map.CrabFields), reward: 2.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{ map: Map.SanctuaryIslands, url: resolveShardEruptionMapURL(Map.SanctuaryIslands), reward: 3.5 },
			{ map: Map.ElevatedClearing, url: resolveShardEruptionMapURL(Map.ElevatedClearing), reward: 3.5 },
			{ map: Map.HermitValley, url: resolveShardEruptionMapURL(Map.HermitValley), reward: 3.5 },
			{ map: Map.ForgottenArk, url: resolveShardEruptionMapURL(Map.ForgottenArk), reward: 3.5 },
			{ map: Map.JellyfishCove, url: resolveShardEruptionMapURL(Map.JellyfishCove), reward: 3.5 },
		],
	},
] as const;

export const QUEST_NUMBER = [1, 2, 3, 4] as const;
export type QuestNumber = (typeof QUEST_NUMBER)[number];
const regularExpressionRealms = Object.values(Realm).join("|").replaceAll(" ", "\\s+");
const mapRegExp = [...Object.values(Map), ...inconsistentMapKeys].join("|").replaceAll(" ", "\\s+");

export default new (class DailyGuides {
	public quest1: DailyGuidesData["quest1"] = null;

	public quest2: DailyGuidesData["quest2"] = null;

	public quest3: DailyGuidesData["quest3"] = null;

	public quest4: DailyGuidesData["quest4"] = null;

	public treasureCandles: DailyGuidesData["treasureCandles"] = null;

	public seasonalCandles: DailyGuidesData["seasonalCandles"] = null;

	public eventCurrency: DailyGuidesData["eventCurrency"] = { rotation: null, url: EVENT_CURRENCY_INFOGRAPHIC_URL };

	public shardEruption(this: void, daysOffset = 0) {
		const date = todayDate().add(daysOffset, "days");
		const dayOfMonth = date.date();
		const dayOfWeek = date.day();
		const dangerous = dayOfMonth % 2 === 1;
		const infoIndex = dangerous ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
		const { noShardWeekDay, interval, offset, area } = SHARD_ERUPTION_PREDICTION_DATA[infoIndex]!;
		// @ts-expect-error Too narrow.
		const noShardDay = noShardWeekDay.includes(dayOfWeek);
		if (noShardDay) return null;
		const realmIndex = (dayOfMonth - 1) % 5;
		const { map, url, reward } = area[realmIndex]!;
		const timestamps = [];

		for (
			let startTime = date.add(offset, "milliseconds");
			timestamps.length < 3;
			startTime = startTime.add(interval * 3_600_000, "milliseconds")
		) {
			timestamps.push({ start: startTime.add(520, "seconds"), end: startTime.add(4, "hours") });
		}

		return { realm: VALID_REALM[realmIndex]!, map, dangerous, reward, timestamps, url };
	}

	public readonly queue = new AsyncQueue();

	public async reset(insert = false) {
		const data = {
			quest1: null,
			quest2: null,
			quest3: null,
			quest4: null,
			treasure_candles: null,
			seasonal_candles: null,
			event_currency: { rotation: null, url: EVENT_CURRENCY_INFOGRAPHIC_URL },
		};

		let query = pg<DailyGuidesPacket>(Table.DailyGuides);
		query = insert ? query.insert(data) : query.update(data);
		const [dailyGuidesPacket] = await query.returning("*");
		this.patch(dailyGuidesPacket!);
	}

	public patch(data: Partial<DailyGuidesPacket>) {
		if ("quest1" in data) this.quest1 = data.quest1;
		if ("quest2" in data) this.quest2 = data.quest2;
		if ("quest3" in data) this.quest3 = data.quest3;
		if ("quest4" in data) this.quest4 = data.quest4;
		if ("treasure_candles" in data) this.treasureCandles = data.treasure_candles;
		if ("seasonal_candles" in data) this.seasonalCandles = data.seasonal_candles;
		if ("event_currency" in data) this.eventCurrency = data.event_currency;
	}

	public validToParse({ channelId, flags, reference }: Message) {
		return Boolean(
			channelId === Channel.dailyGuides &&
				reference?.guildId === INFOGRAPHICS_DATABASE_GUILD_ID &&
				flags.has(MessageFlags.IsCrosspost) &&
				reference.messageId &&
				SnowflakeUtil.timestampFrom(reference.messageId) >= todayDate().valueOf(),
		);
	}

	public async parse(message: Message<true>) {
		if (!this.validToParse(message)) return;
		const { attachments, client, content, flags } = message;
		if (flags.has(MessageFlags.SourceMessageDeleted)) return;
		const transformedContent = content.toUpperCase();
		await this.queue.wait();

		if (
			(transformedContent.includes("DAILY QUEST") && transformedContent.length <= 20) ||
			transformedContent.includes("SHATTERING SHARD SUMMARY")
		) {
			// This is the general photo of quests or the shard eruption infographic. This is redundant.
			this.queue.shift();
			return;
		} else if (
			transformedContent.includes("QUEST") ||
			transformedContent.includes("RAINBOW") ||
			transformedContent.includes("SOCIAL LIGHT") ||
			transformedContent.includes("SAPLING") ||
			transformedContent.includes("NATURE")
		) {
			await this.parseQuests(content, attachments);
		} else if (transformedContent.includes("TREASURE CANDLE")) {
			await this.parseTreasureCandles(attachments);
		} else if (transformedContent.includes("SEASONAL CANDLE")) {
			await this.parseSeasonalCandles(attachments);
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
		if (upperPureContent.includes("SEND A GIFT")) return "Send a Gift to a Friend";
		if (upperPureContent.includes("ACQUAINTANCE")) return "Make a New Acquaintance";
		if (upperPureContent.includes("HIGH-FIVE")) return "High-Five a Friend";
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return "Use an Expression Near a Friend";
		if (upperPureContent.includes("BENCH")) return "Sit at a Bench with a Stranger";
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

		if (upperPureContent.includes("SOCIAL LIGHT") || upperPureContent.includes("VISIT THE ANCESTOR"))
			return "Visit the Social Light Area";

		if (upperPureContent.includes("POLLUTED GEYSER")) return "Visit the Polluted Geyser";
		if (upperPureContent.includes("SCAVENGER HUNT")) return "Complete the Hoop Scavenger Hunt";
		if (upperPureContent.includes("RACE DOWN THE SLOPES")) return "Race Down the Slopes with the Skater";
		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) return "Race Down the Mountain with the Skater";
		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) return "Practice with the Skater";
		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) return "Rehearse for a Performance with the Skater";
		if (upperPureContent.includes("GREAT VORTEX")) return "Rid the Sanctuary Vortex of Darkness";
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
		const pureContent = (/\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")) : content).replaceAll(
			new RegExp(FormattingPatterns.Emoji, "gi"),
			"",
		);

		// Attempt to manually set the daily guide.
		const dailyGuideContent = this.resolveDailyGuideContent(pureContent);

		// Attempt to find a realm.
		const potentialRealmRegExp = new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;
		const realm = potentialRealmRegExp ? resolveValidRealm(potentialRealmRegExp) : null;

		// Attempt to find a map.
		const potentialMapRegExp = new RegExp(`\\s(${mapRegExp})`, "i").exec(pureContent)?.[1] ?? null;
		const map = potentialMapRegExp ? resolveMap(potentialMapRegExp) : null;

		// Generate the final output.
		let output = null;
		if (dailyGuideContent) output = `${dailyGuideContent}${realm ? ` - ${realm}` : ""}${map ? ` - ${map}` : ""}`;

		// Fallback in case of no output.
		if (!output) {
			consoleLog("Failed to match a daily quest. Falling back to original string.");

			// Ensure no bold markdown is present.
			output = pureContent.replaceAll("**", "").replaceAll(/  +/g, " ").trim();
		}

		const data = { content: output, url };

		// Duplicate check in case of manually updating.
		if ([this.quest1, this.quest2, this.quest3, this.quest4].some((quest) => quest?.content === data.content)) return;

		if (!this.quest1) {
			await this.updateQuest(data, 1);
			return;
		}

		if (!this.quest2) {
			await this.updateQuest(data, 2);
			return;
		}

		if (!this.quest3) {
			await this.updateQuest(data, 3);
			return;
		}

		if (!this.quest4) {
			await this.updateQuest(data, 4);
			return;
		}

		consoleLog("Attempted to parse a daily quest despite all quest variables exhausted.");
	}

	public async updateQuest(questData: DailyGuideQuest, number: QuestNumber) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ [`quest${number}`]: questData })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	public async parseTreasureCandles(attachments: Collection<Snowflake, Attachment>) {
		const urls = [...attachments.values()].map(({ url }) => url);

		if (urls.length === 0) {
			consoleLog("Failed to fetch the treasure candle locations.");
			return;
		}

		if (Array.isArray(this.treasureCandles)) {
			consoleLog("Attempted to update the treasure candles which were already updated.");
			return;
		}

		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			// @ts-expect-error Arrays must be stringified. TypeScript does not like this.
			.update({ treasure_candles: JSON.stringify(urls) })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	public async parseSeasonalCandles(attachments: Collection<Snowflake, Attachment>) {
		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch the seasonal candle locations.");
			return;
		}

		await this.updateSeasonalCandles(url);
	}

	public async updateSeasonalCandles(url: string) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ seasonal_candles: url })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	public async updateEventCurrency(rotation: DailyGuideEventRotation) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ event_currency: { rotation, url: EVENT_CURRENCY_INFOGRAPHIC_URL } })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	public async reCheck(client: Client<true>) {
		const channel = client.channels.resolve(Channel.dailyGuides);
		if (channel?.type !== ChannelType.GuildText) return;

		const messages = await channel.messages.fetch({
			after: String(SnowflakeUtil.generate({ timestamp: todayDate().valueOf() })),
		});

		await this.reset();
		await Promise.all(messages.map(async (message) => this.parse(message)));
	}
})();
