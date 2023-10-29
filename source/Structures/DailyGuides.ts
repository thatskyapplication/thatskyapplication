import { URL } from "node:url";
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
	inconsistentMapKeys,
	CDN_URL,
	REALM_VALUES,
	Season,
	SOCIAL_LIGHT_AREA_MAPS,
	SocialLightAreaMapToCDNString,
	VALID_REALM,
	MEDITATION_MAPS,
} from "../Utility/Constants.js";
import {
	consoleLog,
	isMeditationMap,
	isSocialLightAreaMap,
	resolveMap,
	resolveMeditationMap,
	resolveSocialLightAreaMap,
	resolveValidRealm,
	todayDate,
} from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import { Expression, spiritNames } from "./Spirits/Base.js";
import Spirits from "./Spirits/index.js";

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

export const DAILY_GUIDE_EVENT_ROTATION = ["B", "C", "A"] as const;
export type DailyGuideEventRotation = (typeof DAILY_GUIDE_EVENT_ROTATION)[number];

interface DailyGuideMessage {
	title: string;
	description: string;
}

export const QUEST_NUMBER = [1, 2, 3, 4] as const;
export type QuestNumber = (typeof QUEST_NUMBER)[number];

const FACE_THE_DARK_DRAGON = "Face the dark dragon" as const;
const KNOCK_OVER_5_DARK_CRABS = "Knock over 5 dark crabs" as const;
const RECHARGE_FROM_A_JELLYFISH = "Recharge from a jellyfish" as const;
const RECHARGE_FROM_A_LIGHT_BLOOM = "Recharge from a light bloom" as const;
const RELIVE_A_SPIRITS_MEMORIES = "Relive a spirit's memories" as const;
const RIDE_A_MANTA = "Ride a manta" as const;
const COMPLETE_THE_HOOP_SCAVENGER_HUNT = "Complete the hoop scavenger hunt" as const;
const COLLECT_GREEN_LIGHT = "Collect green light" as const;
const COLLECT_ORANGE_LIGHT = "Collect orange light" as const;
const COLLECT_BLUE_LIGHT = "Collect blue light" as const;
const COLLECT_RED_LIGHT = "Collect red light" as const;
const COLLECT_PURPLE_LIGHT = "Collect purple light" as const;
const MEDITATE_CITADEL_ARCH = `Meditate above the ${Map.Citadel}'s arch` as const;
const MEDITATE_CITADEL_HIGH_ABOVE = `Meditate high above the ${Map.Citadel}` as const;
const BOW_AT_A_PLAYER = "Bow at a player" as const;
const FOLLOW_A_FRIEND = "Follow a friend" as const;
const HUG_A_FRIEND = `${Expression.Hug} a friend` as const;
const WAVE_TO_A_FRIEND = `${Expression.Wave} to a friend` as const;
const HOLD_A_FRIENDS_HAND = "Hold a friend's hand" as const;
const SEND_A_GIFT_TO_A_FRIEND = "Send a gift to a friend" as const;
const MAKE_A_NEW_ACQUAINTANCE = "Make a new acquaintance" as const;
const HIGH_FIVE_A_FRIEND = `${Expression.HighFive} a friend` as const;
const USE_AN_EXPRESSION_NEAR_A_FRIEND = "Use an expression near a friend" as const;
const SIT_ON_A_BENCH_WITH_A_STRANGER = "Sit on a bench with a stranger" as const;

export const QUESTS = [
	...VALID_REALM.map((realm) => ({
		content: `Catch the light in the ${realm}`,
		url: String(
			new URL(`daily_guides/quests/catch_the_light/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	})),
	...VALID_REALM.map((realm) => ({
		content: `Admire the sapling in the ${realm}`,
		url: String(
			new URL(`daily_guides/quests/days_of_bloom/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	})),
	...[Map.SanctuaryIslands, Map.WindPaths, Map.HermitValley, Map.TreasureReef, Map.StarlightDesert].map((map) => ({
		content: `Admire the rainbow in the ${map}`,
		url: String(
			new URL(`daily_guides/quests/days_of_rainbow/admire/${map.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	})),
	...VALID_REALM.map((realm) => ({
		content: `Find the candles at the end of the rainbow in the ${realm}`,
		url: String(
			new URL(`daily_guides/quests/days_of_rainbow/find/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	})),
	{
		content: FACE_THE_DARK_DRAGON,
		url: String(new URL(`daily_guides/quests/miscellaneous/face_the_dark_dragon.gif`, CDN_URL)),
	},
	{
		content: KNOCK_OVER_5_DARK_CRABS,
		url: String(new URL(`daily_guides/quests/miscellaneous/knock_over_5_dark_crabs.webp`, CDN_URL)),
	},
	{
		content: RECHARGE_FROM_A_JELLYFISH,
		url: String(new URL(`daily_guides/quests/miscellaneous/recharge_from_a_jellyfish.webp`, CDN_URL)),
	},
	{
		content: RECHARGE_FROM_A_LIGHT_BLOOM,
		url: String(new URL(`daily_guides/quests/miscellaneous/recharge_from_a_light_bloom.webp`, CDN_URL)),
	},
	{
		content: RELIVE_A_SPIRITS_MEMORIES,
		url: String(new URL(`daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp`, CDN_URL)),
	},
	{
		content: RIDE_A_MANTA,
		url: String(new URL(`daily_guides/quests/miscellaneous/ride_a_manta.webp`, CDN_URL)),
	},
	...SOCIAL_LIGHT_AREA_MAPS.map((map) => ({
		content: `Visit the ${resolveSocialLightAreaMap(map)}`,
		url: String(
			new URL(`daily_guides/quests/miscellaneous/visit_the_${SocialLightAreaMapToCDNString[map]}.webp`, CDN_URL),
		),
	})),
	{
		content: COMPLETE_THE_HOOP_SCAVENGER_HUNT,
		url: String(new URL(`daily_guides/quests/season_of_assembly/hoop.webp`, CDN_URL)),
	},
	{
		content: COLLECT_GREEN_LIGHT,
		url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_green_light.webp`, CDN_URL)),
	},
	{
		content: COLLECT_ORANGE_LIGHT,
		url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_orange_light.webp`, CDN_URL)),
	},
	{
		content: COLLECT_BLUE_LIGHT,
		url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_blue_light.webp`, CDN_URL)),
	},

	{
		content: COLLECT_RED_LIGHT,
		url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_red_light.webp`, CDN_URL)),
	},
	{
		content: COLLECT_PURPLE_LIGHT,
		url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_purple_light.webp`, CDN_URL)),
	},
	...MEDITATION_MAPS.flatMap((map) => {
		const cdnMap = map.toLowerCase().replaceAll(" ", "_");

		if (map === Map.Citadel) {
			return [
				{
					content: MEDITATE_CITADEL_ARCH,
					url: String(new URL(`daily_guides/quests/season_of_gratitude/${cdnMap}/arch.webp`, CDN_URL)),
				},
				{
					content: MEDITATE_CITADEL_HIGH_ABOVE,
					url: String(new URL(`daily_guides/quests/season_of_gratitude/${cdnMap}/high_above.webp`, CDN_URL)),
				},
			];
		}

		return {
			content: `Meditate ${resolveMeditationMap(map)}`,
			url: String(new URL(`daily_guides/quests/season_of_gratitude/${cdnMap}.webp`, CDN_URL)),
		};
	}),
	{
		content: BOW_AT_A_PLAYER,
		url: String(new URL(`daily_guides/quests/social/bow_at_a_player.webp`, CDN_URL)),
	},
	{
		content: FOLLOW_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/follow_a_friend.webp`, CDN_URL)),
	},
	{
		content: HUG_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/hug_a_friend.webp`, CDN_URL)),
	},
	{
		content: WAVE_TO_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/wave_to_a_friend.webp`, CDN_URL)),
	},
	{
		content: HOLD_A_FRIENDS_HAND,
		url: String(new URL(`daily_guides/quests/social/hold_a_friends_hand.webp`, CDN_URL)),
	},
	{
		content: SEND_A_GIFT_TO_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/send_a_gift_to_a_friend.webp`, CDN_URL)),
	},
	{
		content: MAKE_A_NEW_ACQUAINTANCE,
		url: String(new URL(`daily_guides/quests/social/make_a_new_acquaintance.webp`, CDN_URL)),
	},
	{
		content: HIGH_FIVE_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/high_five_a_friend.webp`, CDN_URL)),
	},
	{
		content: USE_AN_EXPRESSION_NEAR_A_FRIEND,
		url: String(new URL(`daily_guides/quests/social/use_an_expression_near_a_friend.webp`, CDN_URL)),
	},
	{
		content: SIT_ON_A_BENCH_WITH_A_STRANGER,
		url: String(new URL(`daily_guides/quests/social/sit_on_a_bench_with_a_stranger.webp`, CDN_URL)),
	},
	...Spirits.filter((spirit) => {
		if (spirit.isStandardSpirit()) return true;
		if (spirit.isSeasonalSpirit()) return spirit.season !== Season.Shattering;
		return false;
	}).map((spirit) => ({
		content: `Relive the ${spirit.name}`,
		url: String(new URL(`daily_guides/quests/spirits/${spirit.cdnName}/relive.webp`, CDN_URL)),
	})),
] as const satisfies Readonly<DailyGuideQuest[]>;

const regularExpressionRealms = REALM_VALUES.join("|").replaceAll(" ", "\\s+");
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

	private resolveDailyGuideContent(pureContent: string, realm: ValidRealm | null, map: Map | null) {
		const upperPureContent = pureContent.toUpperCase();

		if (upperPureContent.includes("BOW AT A PLAYER") || upperPureContent.includes("BOW TO A PLAYER")) {
			return BOW_AT_A_PLAYER;
		}

		if (upperPureContent.includes("KNOCK OVER 5 DARK CREATURE")) return KNOCK_OVER_5_DARK_CRABS;
		if (upperPureContent.includes("FOLLOW A FRIEND")) return FOLLOW_A_FRIEND;
		if (upperPureContent.includes("HUG A FRIEND")) return HUG_A_FRIEND;
		if (upperPureContent.includes("WAVE TO A FRIEND")) return WAVE_TO_A_FRIEND;
		if (upperPureContent.includes("HOLD THE HAND")) return HOLD_A_FRIENDS_HAND;
		if (upperPureContent.includes("SEND A GIFT")) return SEND_A_GIFT_TO_A_FRIEND;
		if (upperPureContent.includes("ACQUAINTANCE")) return MAKE_A_NEW_ACQUAINTANCE;
		if (upperPureContent.includes("HIGH-FIVE")) return HIGH_FIVE_A_FRIEND;
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return USE_AN_EXPRESSION_NEAR_A_FRIEND;
		if (upperPureContent.includes("BENCH")) return SIT_ON_A_BENCH_WITH_A_STRANGER;
		if (upperPureContent.includes("RIDE A MANTA")) return RIDE_A_MANTA;
		if (upperPureContent.includes("DARK DRAGON")) return FACE_THE_DARK_DRAGON;
		if (upperPureContent.includes("RECHARGE FROM A JELLYFISH")) return RECHARGE_FROM_A_JELLYFISH;
		if (upperPureContent.includes("RECHARGE FROM A LIGHT BLOOM")) return RECHARGE_FROM_A_LIGHT_BLOOM;
		if (upperPureContent.includes("ADMIRE THE RAINBOW")) return `Admire the rainbow${map ? ` in the ${map}` : ""}`;

		if (upperPureContent.includes("RAINBOW")) {
			return `Find the candles at the end of the rainbow${realm ? ` in the ${realm}` : ""}`;
		}

		if (upperPureContent.includes("CATCH THE LIGHT")) return `Catch the light${realm ? ` in the ${realm}` : ""}`;

		if (upperPureContent.includes("MEDITATION")) {
			if (upperPureContent.includes(Map.Citadel.toUpperCase())) {
				if (upperPureContent.includes("ARCH")) return MEDITATE_CITADEL_ARCH;
				if (upperPureContent.includes("HIGH ABOVE")) return MEDITATE_CITADEL_HIGH_ABOVE;
			}

			if (map && isMeditationMap(map)) return `Meditate ${resolveMeditationMap(map)}`;
			consoleLog("Failed to match a meditation map.");
			return `Meditate at the ${map}`;
		}

		if (upperPureContent.includes("GREEN LIGHT")) return COLLECT_GREEN_LIGHT;
		if (upperPureContent.includes("ORANGE LIGHT")) return COLLECT_ORANGE_LIGHT;
		if (upperPureContent.includes("BLUE LIGHT")) return COLLECT_BLUE_LIGHT;
		if (upperPureContent.includes("RED LIGHT")) return COLLECT_RED_LIGHT;
		if (upperPureContent.includes("PURPLE LIGHT")) return COLLECT_PURPLE_LIGHT;
		if (upperPureContent.includes("SAPLING")) return `Admire the sapling${realm ? ` in the ${realm}` : ""}`;

		if (upperPureContent.includes("SOCIAL LIGHT") || upperPureContent.includes("VISIT THE ANCESTOR")) {
			if (map && isSocialLightAreaMap(map)) return `Visit the ${resolveSocialLightAreaMap(map)}`;
			consoleLog("Failed to match a social light area map.");
			return "Visit the social light area";
		}

		if (upperPureContent.includes("POLLUTED GEYSER")) return "Visit the polluted geyser";
		if (upperPureContent.includes("SCAVENGER HUNT")) return COMPLETE_THE_HOOP_SCAVENGER_HUNT;
		if (upperPureContent.includes("RACE DOWN THE SLOPES")) return "Race down the slopes with the skater";
		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) return "Race down the mountain with the skater";
		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) return "Practice with the skater";
		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) return "Rehearse for a performance with the skater";
		if (upperPureContent.includes("GREAT VORTEX")) return "Rid the sanctuary vortex of darkness";
		if (upperPureContent.includes("RELIVE A SPIRIT'S MEMORY")) return RELIVE_A_SPIRITS_MEMORIES;

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
