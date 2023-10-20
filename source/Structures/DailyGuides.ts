import { AsyncQueue } from "@sapphire/async-queue";
import {
	type Attachment,
	type Collection,
	type Message,
	type Snowflake,
	FormattingPatterns,
	MessageFlags,
	SnowflakeUtil,
} from "discord.js";
import {
	type ValidRealm,
	Channel,
	INFOGRAPHICS_DATABASE_GUILD_ID,
	Map,
	Realm,
	inconsistentMapKeys,
} from "../Utility/Constants.js";
import { consoleLog, resolveMap, resolveValidRealm, todayDate } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import { Expression, spiritNames } from "./Spirits/Base.js";

export interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	treasure_candles: string[] | null;
	daily_message: DailyGuideMessage | null;
}

interface DailyGuidesData {
	quest1: DailyGuidesPacket["quest1"];
	quest2: DailyGuidesPacket["quest2"];
	quest3: DailyGuidesPacket["quest3"];
	quest4: DailyGuidesPacket["quest4"];
	treasureCandles: DailyGuidesPacket["treasure_candles"];
	dailyMessage: DailyGuidesPacket["daily_message"];
}

type DailyGuidesSetQuestsData = Partial<Pick<DailyGuidesData, "quest1" | "quest2" | "quest3" | "quest4">>;

export interface DailyGuideQuest {
	content: string;
	url: string;
}

const DAILY_GUIDES_RESET_DATA = {
	quest1: null,
	quest2: null,
	quest3: null,
	quest4: null,
	treasure_candles: null,
	daily_message: null,
} as const satisfies Readonly<{
	[DailyGuide in keyof DailyGuidesPacket]: null;
}>;

export const DAILY_GUIDE_EVENT_ROTATION = ["A", "B", "C"] as const;
export type DailyGuideEventRotation = (typeof DAILY_GUIDE_EVENT_ROTATION)[number];

interface DailyGuideMessage {
	title: string;
	description: string;
}

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

	public dailyMessage: DailyGuidesData["dailyMessage"] = null;

	public readonly queue = new AsyncQueue();

	public async reset(insert = false) {
		let query = pg<DailyGuidesPacket>(Table.DailyGuides);
		query = insert ? query.insert(DAILY_GUIDES_RESET_DATA) : query.update(DAILY_GUIDES_RESET_DATA);
		const [dailyGuidesPacket] = await query.returning("*");
		this.patch(dailyGuidesPacket!);
	}

	public patch(data: Partial<DailyGuidesPacket>) {
		if ("quest1" in data) this.quest1 = data.quest1;
		if ("quest2" in data) this.quest2 = data.quest2;
		if ("quest3" in data) this.quest3 = data.quest3;
		if ("quest4" in data) this.quest4 = data.quest4;
		if ("treasure_candles" in data) this.treasureCandles = data.treasure_candles;
		if ("daily_message" in data) this.dailyMessage = data.daily_message;
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
		let parsed;

		if (
			(transformedContent.includes("DAILY QUEST") && transformedContent.length <= 20) ||
			transformedContent.includes("SEASONAL CANDLE") ||
			transformedContent.includes("SHATTERING SHARD SUMMARY") ||
			transformedContent.includes("DAYS OF COLOUR 2023")
		) {
			/*
			 * Parsing for the following are redundant:
			 * - The general photo of quests (not needed)
			 * - The seasonal candles infographic (automated)
			 * - The shard eruption infographic (automated)
			 * - The Days of Color event currency rotation (we have a trend for this already and they were late sending this)
			 */
			this.queue.shift();
			return;
		} else if (
			transformedContent.includes("QUEST") ||
			transformedContent.includes("RAINBOW") ||
			transformedContent.includes("SOCIAL LIGHT") ||
			transformedContent.includes("SAPLING") ||
			transformedContent.includes("NATURE")
		) {
			parsed = await this.parseQuests(content, attachments);
		} else if (transformedContent.includes("TREASURE CANDLE")) {
			parsed = await this.parseTreasureCandles(attachments);
		} else {
			consoleLog("Intercepted an unparsed message.");
			this.queue.shift();
			return;
		}

		if (parsed && this.queue.queued === 0) await DailyGuidesDistribution.distribute(client);
		this.queue.shift();
	}

	public async updateDailyMessage(data: DailyGuideMessage) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ daily_message: data })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	private resolveMeditateMap(map: Map | null) {
		switch (map) {
			case Map.ForestBrook:
			case Map.Citadel:
				return `above the ${map}`;
			case Map.SanctuaryIslands:
			case Map.Boneyard:
			case Map.ForestClearing:
			case Map.Coliseum:
			case Map.VaultEntrance:
			case Map.VaultSummit:
				return `at the ${map}`;
			case Map.KoiPond:
				return `by the ${map}`;
			case Map.ButterflyFields:
			case Map.Cave:
			case Map.ElevatedClearing:
			case Map.BrokenTemple:
			case Map.ForgottenArk:
			case Map.Graveyard:
			case Map.VaultSecondFloor:
				return `in the ${map}`;
			case Map.Battlefield:
			case Map.Boat:
				return `on the ${map}`;
			default:
				consoleLog("Failed to match a meditation map.");
				return `at the ${map}`;
		}
	}

	private resolveSocialLightAreaMap(map: Map | null) {
		switch (map) {
			case Map.Cave:
				return `cosy hideout in the ${map}`;
			case Map.ElevatedClearing:
				return `ancestor's table of belonging in the ${map}`;
			case Map.Graveyard:
				return `bonfire at the ${map}`;
			case Map.VillageOfDreams:
				return `hot spring in the ${map}`;
			default:
				consoleLog("Failed to match a social light area map.");
				return "social light area";
		}
	}

	private resolveDailyGuideContent(pureContent: string, realm: ValidRealm | null, map: Map | null) {
		const upperPureContent = pureContent.toUpperCase();

		if (upperPureContent.includes("BOW AT A PLAYER") || upperPureContent.includes("BOW TO A PLAYER")) {
			return "Bow at a player";
		}

		if (upperPureContent.includes("KNOCK OVER 5 DARK CREATURE")) return "Knock over 5 dark crabs";
		if (upperPureContent.includes("FOLLOW A FRIEND")) return "Follow a friend";
		if (upperPureContent.includes("HUG A FRIEND")) return `${Expression.Hug} a friend`;
		if (upperPureContent.includes("WAVE TO A FRIEND")) return `${Expression.Wave} to a friend`;
		if (upperPureContent.includes("HOLD THE HAND")) return "Hold a friend's hand";
		if (upperPureContent.includes("SEND A GIFT")) return "Send a gift to a friend";
		if (upperPureContent.includes("ACQUAINTANCE")) return "Make a new acquaintance";
		if (upperPureContent.includes("HIGH-FIVE")) return `${Expression.HighFive} a friend`;
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return "Use an expression near a friend";
		if (upperPureContent.includes("BENCH")) return "Sit on a bench with a stranger";
		if (upperPureContent.includes("RIDE A MANTA")) return "Ride a manta";
		if (upperPureContent.includes("DARK DRAGON")) return "Face the dark dragon";
		if (upperPureContent.includes("RECHARGE FROM A LIGHT BLOOM")) return "Recharge from a light bloom";
		if (upperPureContent.includes("RECHARGE FROM A JELLYFISH")) return "Recharge from a jellyfish";
		if (upperPureContent.includes("ADMIRE THE RAINBOW")) return `Admire the rainbow${map ? ` in the ${map}` : ""}`;

		if (upperPureContent.includes("RAINBOW")) {
			return `Find the candles at the end of the rainbow${realm ? ` in the ${realm}` : ""}`;
		}

		if (upperPureContent.includes("CATCH THE LIGHT")) return `Catch the light${realm ? ` in the ${realm}` : ""}`;
		if (upperPureContent.includes("MEDITATION")) return `Meditate ${this.resolveMeditateMap(map)}`;
		if (upperPureContent.includes("BLUE LIGHT")) return "Collect blue light";
		if (upperPureContent.includes("GREEN LIGHT")) return "Collect green light";
		if (upperPureContent.includes("ORANGE LIGHT")) return "Collect orange light";
		if (upperPureContent.includes("PURPLE LIGHT")) return "Collect purple light";
		if (upperPureContent.includes("RED LIGHT")) return "Collect red light";
		if (upperPureContent.includes("SAPLING")) return `Admire the sapling${realm ? ` in the ${realm}` : ""}`;

		if (upperPureContent.includes("SOCIAL LIGHT") || upperPureContent.includes("VISIT THE ANCESTOR")) {
			return `Visit the ${this.resolveSocialLightAreaMap(map)}`;
		}

		if (upperPureContent.includes("POLLUTED GEYSER")) return "Visit the polluted geyser";
		if (upperPureContent.includes("SCAVENGER HUNT")) return "Complete the hoop scavenger hunt";
		if (upperPureContent.includes("RACE DOWN THE SLOPES")) return "Race down the slopes with the skater";
		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) return "Race down the mountain with the skater";
		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) return "Practice with the skater";
		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) return "Rehearse for a performance with the skater";
		if (upperPureContent.includes("GREAT VORTEX")) return "Rid the sanctuary vortex of darkness";
		if (upperPureContent.includes("RELIVE A SPIRIT'S MEMORY")) return "Relive a spirit's memories";

		for (const spiritName of spiritNames) {
			if (upperPureContent.replaceAll("’", "'").includes(spiritName.toUpperCase())) return `Relive the ${spiritName}`;
		}

		return null;
	}

	public async parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const { quest1, quest2, quest3, quest4 } = this;

		if (quest1 && quest2 && quest3 && quest4) {
			consoleLog("Attempted to parse daily quests despite all quest variables exhausted.");
			return false;
		}

		const url = attachments.first()?.url;

		if (!url) {
			consoleLog("Failed to fetch a daily quest URL.");
			return false;
		}

		// Remove the message link, if any.
		const pureContent = (/\n<?https?/.test(content) ? content.slice(0, content.indexOf("\n")) : content).replaceAll(
			new RegExp(FormattingPatterns.Emoji, "gi"),
			"",
		);

		// Attempt to find a realm.
		const potentialRealmRegExp = new RegExp(`(${regularExpressionRealms})`, "i").exec(pureContent)?.[1] ?? null;
		const realm = potentialRealmRegExp ? resolveValidRealm(potentialRealmRegExp) : null;

		// Attempt to find a map.
		const potentialMapRegExp = new RegExp(`\\s(${mapRegExp})`, "i").exec(pureContent)?.[1] ?? null;
		const map = potentialMapRegExp ? resolveMap(potentialMapRegExp) : null;

		// Attempt to manually set the daily guide.
		const dailyGuideContent = this.resolveDailyGuideContent(pureContent, realm, map);

		// Initialise the output.
		let output = dailyGuideContent;

		// Fallback in case of no output.
		if (!output) {
			consoleLog("Failed to match a daily quest. Falling back to original string.");

			// Ensure no bold markdown is present.
			output = pureContent.replaceAll("**", "").replaceAll(/  +/g, " ").trim();
		}

		const data = { content: output, url };

		// Duplicate check in case of manually updating.
		if ([quest1, quest2, quest3, quest4].some((quest) => quest?.content === data.content)) return false;

		// Update a quest variable.
		if (!quest1) {
			await this.updateQuests({ quest1: data });
			return true;
		}

		if (!quest2) {
			await this.updateQuests({ quest2: data });
			return true;
		}

		if (!quest3) {
			await this.updateQuests({ quest3: data });
			return true;
		}

		if (!quest4) {
			await this.updateQuests({ quest4: data });
			return true;
		}

		// This is needed to prevent TypeScript from stating not all code paths return a value.
		return true;
	}

	public async updateQuests(data: DailyGuidesSetQuestsData) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides).update(data).returning("*");
		this.patch(dailyGuidesPacket!);
	}

	public async parseTreasureCandles(attachments: Collection<Snowflake, Attachment>) {
		if (Array.isArray(this.treasureCandles)) {
			consoleLog("Attempted to update the treasure candles which were already updated.");
			return false;
		}

		const urls = attachments.map(({ url }) => url);

		if (urls.length === 0) {
			consoleLog("Failed to fetch the treasure candle locations.");
			return false;
		}

		await this.updateTreasureCandles(urls);
		return true;
	}

	public async updateTreasureCandles(urls: string[]) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			// @ts-expect-error Arrays must be stringified. TypeScript does not like this.
			.update({ treasure_candles: JSON.stringify(urls) })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}
})();
