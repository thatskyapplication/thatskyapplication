import { AsyncQueue } from "@sapphire/async-queue";
import type { Attachment, Client, Collection, Message, Snowflake } from "discord.js";
import { time, TimestampStyles, FormattingPatterns, ChannelType, MessageFlags, SnowflakeUtil } from "discord.js";
import type { ValidRealm } from "../Utility/Constants.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID, Map, Realm, VALID_REALM } from "../Utility/Constants.js";
import { consoleLog, resolveMap, resolveValidRealm, todayDate } from "../Utility/Utility.js";
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
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	treasureCandles: DailyGuidesPacket["treasure_candles"];
	seasonalCandles: DailyGuidesPacket["seasonal_candles"];
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

const SHARD_ERUPTION_PREDICTION_DATA = [
	{
		noShardWeekDay: [6, 7], // Saturday, Sunday
		interval: 8,
		// 1 hour and 50 minutes.
		offset: 6_600_000,
		area: [
			{ map: Map.ButterflyFields, url: "https://i.gyazo.com/19930feb1be18cafc73dcd4f76aa5ad2.webp", reward: 200 },
			{ map: Map.ForestBrook, url: "https://i.gyazo.com/502c327fe0a7a4fe4943004cccd09388.webp", reward: 200 },
			{ map: Map.IceRink, url: "https://i.gyazo.com/2f40f4818a530b06ed5de970a6bf4351.webp", reward: 200 },
			{ map: Map.BrokenTemple, url: "https://i.gyazo.com/f36eb44e3d55fa70fb34169a1fa40d99.webp", reward: 200 },
			{ map: Map.StarlightDesert, url: "https://i.gyazo.com/71878ab538f11edbe0b82a51145a0dd2.webp", reward: 200 },
		],
	},
	{
		noShardWeekDay: [7, 1], // Sunday, Monday
		interval: 8,
		// 2 hours and 10 minutes.
		offset: 7_800_000,
		area: [
			{ map: Map.KoiPond, url: "https://i.gyazo.com/7ba7af41ad9295ef176ff5b3afdb8b23.webp", reward: 200 },
			{ map: Map.Boneyard, url: "https://i.gyazo.com/72efea087458097b0afc03f5eca62da2.webp", reward: 200 },
			{ map: Map.IceRink, url: "https://i.gyazo.com/2f40f4818a530b06ed5de970a6bf4351.webp", reward: 200 },
			{ map: Map.Battlefield, url: "https://i.gyazo.com/40a1add1741413e45781c96e916aa80a.webp", reward: 200 },
			{ map: Map.StarlightDesert, url: "https://i.gyazo.com/71878ab538f11edbe0b82a51145a0dd2.webp", reward: 200 },
		],
	},
	{
		noShardWeekDay: [1, 2], // Monday, Tuesday
		interval: 6,
		// 7 hours and 40 minutes.
		offset: 27_600_000,
		area: [
			{ map: Map.Cave, url: "https://i.gyazo.com/5dd6597f82decdb0d878eda81683c564.webp", reward: 2 },
			{ map: Map.ForestEnd, url: "https://i.gyazo.com/9cef57ca70eddd12cb95641da2d5e384.webp", reward: 2.5 },
			{ map: Map.VillageOfDreams, url: "https://i.gyazo.com/cde4340bca0211820d100e42671c80e0.webp", reward: 2.5 },
			{ map: Map.Graveyard, url: "https://i.gyazo.com/46301cb5e5eb31043c75b3b2f46ee8ec.png", reward: null },
			{ map: Map.JellyfishCove, url: "https://i.gyazo.com/0b39ab966a0aa9e51b05fcd2a130c54b.webp", reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [2, 3], // Tuesday, Wednesday
		interval: 6,
		// 2 hours and 20 minutes.
		offset: 8_400_000,
		area: [
			{ map: Map.BirdNest, url: "https://i.gyazo.com/bd856ba3effe737c3f4e928af2e12a54.webp", reward: 2.5 },
			{ map: Map.Treehouse, url: "https://i.gyazo.com/e46b7c1b85e409b993875ef50bbf245f.webp", reward: 3.5 },
			{ map: Map.VillageOfDreams, url: "https://i.gyazo.com/cde4340bca0211820d100e42671c80e0.webp", reward: 2.5 },
			{ map: Map.CrabFields, url: "https://i.gyazo.com/f17e546074ee72ad677bbb0a3492ec7f.webp", reward: 2.5 },
			{ map: Map.JellyfishCove, url: "https://i.gyazo.com/0b39ab966a0aa9e51b05fcd2a130c54b.webp", reward: 3.5 },
		],
	},
	{
		noShardWeekDay: [3, 4], // Wednesday, Thursday
		interval: 6,
		// 3 hours and 30 minutes.
		offset: 12_600_000,
		area: [
			{ map: Map.SanctuaryIslands, url: "https://i.gyazo.com/31c7665bb358dee7ac5442bb1b916efe.webp", reward: 3.5 },
			{ map: Map.ElevatedClearing, url: "https://i.gyazo.com/130b7887552630347cfc11d91ce39d6f.webp", reward: null },
			{ map: Map.HermitValley, url: "https://i.gyazo.com/1e9e902a101162495815f40cb030cdfe.webp", reward: 3.5 },
			{ map: Map.ForgottenArk, url: "https://i.gyazo.com/2e470de7e0258f64fdd71971bef67d36.webp", reward: 3.5 },
			{ map: Map.JellyfishCove, url: "https://i.gyazo.com/0b39ab966a0aa9e51b05fcd2a130c54b.webp", reward: 3.5 },
		],
	},
] as const;

export const QUEST_NUMBER = [1, 2, 3, 4] as const;
export type QuestNumber = (typeof QUEST_NUMBER)[number];

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
		const date = todayDate();
		const dayOfMonth = date.getUTCDate();
		const dayOfWeek = date.getUTCDay();
		const dangerous = dayOfMonth % 2 === 1;
		const infoIndex = dangerous ? (((dayOfMonth - 1) / 2) % 3) + 2 : (dayOfMonth / 2) % 2;
		const { noShardWeekDay, interval, offset, area } = SHARD_ERUPTION_PREDICTION_DATA[infoIndex];
		// @ts-expect-error Too narrow.
		const noShardDay = noShardWeekDay.includes(dayOfWeek);
		if (noShardDay) return null;
		const realmIndex = (dayOfMonth - 1) % 5;
		const { map, url, reward } = area[realmIndex];
		let startTime = date.getTime() + offset;
		let timestamps = "";

		while (startTime < date.getTime() + 72_000_000) {
			const start = time((startTime + 520_000) / 1_000, TimestampStyles.LongTime);
			const end = time((startTime + 14_400_000) / 1_000, TimestampStyles.LongTime);
			timestamps += `${start} - ${end}\n`;
			startTime += interval * 3_600_000;
		}

		return { realm: VALID_REALM[realmIndex], map, dangerous, reward, timestamps: timestamps.trim(), url };
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
	}

	public validToParse({ channelId, flags, reference }: Message) {
		return Boolean(
			channelId === Channel.dailyGuides &&
				reference?.guildId === INFOGRAPHICS_DATABASE_GUILD_ID &&
				flags.has(MessageFlags.IsCrosspost) &&
				reference.messageId &&
				SnowflakeUtil.timestampFrom(reference.messageId) >= todayDate().getTime(),
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
			transformedContent.includes("SAPLING")
		) {
			await this.parseQuests(content, attachments);
		} else if (transformedContent.includes("TREASURE CANDLE")) {
			await this.parseTreasureCandles(content, attachments);
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
		if (upperPureContent.includes("ACQUAINTANCE")) return "Make a New Acquaintance";
		if (upperPureContent.includes("HIGH-FIVE")) return "High-Five a Friend";
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return "Use an Expression Near a Friend";
		if (upperPureContent.includes("BENCH")) return "Sit at a bench with a stranger";
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
		if (upperPureContent.includes("SOCIAL LIGHT")) return "Visit the Social Light Area";
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
		const pureContent = (/\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")) : content)
			.replaceAll(new RegExp(FormattingPatterns.Emoji, "gi"), "")
			.trim();

		// Attempt to manually set the daily guide.
		const dailyGuideContent = this.resolveDailyGuideContent(pureContent);

		// Attempt to find a realm.
		const potentialRealmRegExp = new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;
		const realm = potentialRealmRegExp ? resolveValidRealm(potentialRealmRegExp) : null;

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

		this.patch(dailyGuidesPacket);
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
			const resolvedRealm = resolveValidRealm(realm);

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

	public async reCheck(client: Client<true>) {
		const channel = client.channels.resolve(Channel.dailyGuides);
		if (channel?.type !== ChannelType.GuildText) return;

		const messages = await channel.messages.fetch({
			after: String(SnowflakeUtil.generate({ timestamp: todayDate() })),
		});

		await this.reset();
		await Promise.all(messages.map(async (message) => this.parse(message)));
	}
})();
