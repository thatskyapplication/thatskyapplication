import { URL } from "node:url";
import {
	type Attachment,
	type Collection,
	type Message,
	type Snowflake,
	FormattingPatterns,
	MessageFlags,
	SnowflakeUtil,
} from "discord.js";
import pQueue from "p-queue";
import {
	type MeditationMaps,
	type RainbowAdmireMaps,
	type SocialLightAreaMaps,
	type ValidRealm,
	CDN_URL,
	Channel,
	inconsistentMapKeys,
	INFOGRAPHICS_DATABASE_GUILD_ID,
	Map,
	MEDITATION_MAPS,
	RAINBOW_ADMIRE_MAPS,
	Realm,
	REALM_VALUES,
	SOCIAL_LIGHT_AREA_MAPS,
	SocialLightAreaMapToCDNString,
	VALID_REALM,
} from "../Utility/Constants.js";
import {
	consoleLog,
	isMeditationMap,
	isRainbowAdmireMap,
	isSocialLightAreaMap,
	resolveMap,
	resolveMeditationMap,
	resolveSocialLightAreaMap,
	resolveValidRealm,
} from "../Utility/Utility.js";
import { todayDate } from "../Utility/dates.js";
import pg, { Table } from "../pg.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import { SeasonName } from "./Season.js";
import { type SeasonalSpirit, type StandardSpirit, Emote, FriendAction } from "./Spirits/Base.js";
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
	url: string | null;
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

interface DailyGuideMessage {
	title: string;
	description: string;
}

export const QUEST_NUMBER = [1, 2, 3, 4] as const;
export type QuestNumber = (typeof QUEST_NUMBER)[number];

export const QUEST_SPIRITS_SEASONS = [
	SeasonName.Gratitude,
	SeasonName.Lightseekers,
	SeasonName.Belonging,
	SeasonName.Rhythm,
	SeasonName.Enchantment,
	SeasonName.Sanctuary,
	SeasonName.Dreams,
	SeasonName.Assembly,
] as const;

export type QuestSpiritSeasons = (typeof QUEST_SPIRITS_SEASONS)[number];

/**
 * @privateRemarks Defines a spirit that may be encountered in a daily quest. So far, that includes:
 *
 * - Standard spirits.
 * - Seasonal spirits from ({@link QuestSpiritSeasons}).
 *
 * Spirits must not be in the {@link Realm.IslesOfDawn | Isles of Dawn}.
 *
 * These spirits must have an associated infographic.
 */
export type QuestSpirit = (StandardSpirit | (SeasonalSpirit & { season: QuestSpiritSeasons })) & { realm: ValidRealm };

export function isQuestSpiritsSeason(season: SeasonName): season is QuestSpiritSeasons {
	return QUEST_SPIRITS_SEASONS.includes(season as QuestSpiritSeasons);
}

export function isQuestSpirit(spirit: (typeof Spirits)[number]): spirit is QuestSpirit {
	if (spirit.realm === Realm.IslesOfDawn) return false;
	if (spirit.isStandardSpirit()) return true;

	if (spirit.isSeasonalSpirit() && isQuestSpiritsSeason(spirit.season)) {
		return QUEST_SPIRITS_SEASONS.includes(spirit.season);
	}

	return false;
}

const COLLECT_30_PIECES_OF_LIGHT = { content: "Collect 30 pieces of light", url: null } as const;
const LIGHT_20_CANDLES = { content: "Light 20 candles", url: null } as const;
const FORGE_A_CANDLE = { content: "Forge a candle", url: null } as const;
const MELT_10_DARKNESS = { content: "Melt 10 darkness", url: null } as const;

const BOW_AT_A_PLAYER = {
	content: `${Expression.Bow} at a player`,
	url: String(new URL(`daily_guides/quests/social/bow_at_a_player.webp`, CDN_URL)),
} as const;

const FOLLOW_A_FRIEND = {
	content: "Follow a friend",
	url: String(new URL(`daily_guides/quests/social/follow_a_friend.webp`, CDN_URL)),
} as const;

const HUG_A_FRIEND = {
	content: `${FriendAction.Hug} a friend`,
	url: String(new URL(`daily_guides/quests/social/hug_a_friend.webp`, CDN_URL)),
} as const;

const WAVE_TO_A_FRIEND = {
	content: `${Emote.Wave} to a friend`,
	url: String(new URL(`daily_guides/quests/social/wave_to_a_friend.webp`, CDN_URL)),
} as const;

const HOLD_A_FRIENDS_HAND = {
	content: "Hold a friend's hand",
	url: String(new URL(`daily_guides/quests/social/hold_a_friends_hand.webp`, CDN_URL)),
} as const;

const SEND_A_GIFT_TO_A_FRIEND = {
	content: "Send a gift to a friend",
	url: String(new URL(`daily_guides/quests/social/send_a_gift_to_a_friend.webp`, CDN_URL)),
} as const;

const MAKE_A_NEW_ACQUAINTANCE = {
	content: "Make a new acquaintance",
	url: String(new URL(`daily_guides/quests/social/make_a_new_acquaintance.webp`, CDN_URL)),
} as const;

const HIGH_FIVE_A_FRIEND = {
	content: `${FriendAction.HighFive} a friend`,
	url: String(new URL(`daily_guides/quests/social/high_five_a_friend.webp`, CDN_URL)),
} as const;

const USE_AN_EXPRESSION_NEAR_A_FRIEND = {
	content: "Use an expression near a friend",
	url: String(new URL(`daily_guides/quests/social/use_an_expression_near_a_friend.webp`, CDN_URL)),
} as const;

const SIT_ON_A_BENCH_WITH_A_STRANGER = {
	content: "Sit on a bench with a stranger",
	url: String(new URL(`daily_guides/quests/social/sit_on_a_bench_with_a_stranger.webp`, CDN_URL)),
} as const;

const RECHARGE_FROM_A_JELLYFISH = {
	content: "Recharge from a jellyfish",
	url: String(new URL(`daily_guides/quests/miscellaneous/recharge_from_a_jellyfish.webp`, CDN_URL)),
} as const;

const RECHARGE_FROM_A_LIGHT_BLOOM = {
	content: "Recharge from a light bloom",
	url: String(new URL(`daily_guides/quests/miscellaneous/recharge_from_a_light_bloom.webp`, CDN_URL)),
} as const;

const RIDE_A_MANTA = {
	content: "Ride a manta",
	url: String(new URL(`daily_guides/quests/miscellaneous/ride_a_manta.webp`, CDN_URL)),
} as const;

const RELIVE_A_SPIRITS_MEMORIES = {
	content: "Relive a spirit's memories",
	url: String(new URL(`daily_guides/quests/miscellaneous/relive_a_spirits_memories.webp`, CDN_URL)),
} as const;

const FACE_THE_DARK_DRAGON = {
	content: "Face the dark dragon",
	url: String(new URL(`daily_guides/quests/miscellaneous/face_the_dark_dragon.gif`, CDN_URL)),
} as const;

const KNOCK_OVER_5_DARK_CRABS = {
	content: "Knock over 5 dark crabs",
	url: String(new URL(`daily_guides/quests/miscellaneous/knock_over_5_dark_crabs.webp`, CDN_URL)),
} as const;

const CATCH_THE_LIGHT = (realm: ValidRealm) =>
	({
		content: `Catch the light in the ${realm}`,
		url: String(
			new URL(`daily_guides/quests/catch_the_light/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	}) as const;

const SOCIAL_LIGHT_AREA = (map: SocialLightAreaMaps) =>
	({
		content: `Visit the ${resolveSocialLightAreaMap(map)}`,
		url: String(
			new URL(`daily_guides/quests/miscellaneous/visit_the_${SocialLightAreaMapToCDNString[map]}.webp`, CDN_URL),
		),
	}) as const;

const ADMIRE_THE_SAPLING = (realm: ValidRealm) =>
	({
		content: `Admire the sapling in the ${realm}`,
		url: String(new URL(`daily_guides/quests/days_of_bloom/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL)),
	}) as const;

const VISIT_THE_POLLUTED_GEYSER = {
	content: "Visit the polluted geyser",
	url: String(new URL(`daily_guides/quests/days_of_nature/visit_the_polluted_geyser.webp`, CDN_URL)),
} as const;

const RID_THE_SANCTUARY_VORTEX_OF_DARKNESS = {
	content: "Rid the sanctuary vortex of darkness",
	url: String(new URL(`daily_guides/quests/days_of_nature/rid_the_sanctuary_vortex_of_darkness.webp`, CDN_URL)),
} as const;

const RAINBOW_FIND = (realm: ValidRealm) =>
	({
		content: `Find the candles at the end of the rainbow in the ${realm}`,
		url: String(
			new URL(`daily_guides/quests/days_of_colour/find/${realm.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	}) as const;

const RAINBOW_ADMIRE = (map: RainbowAdmireMaps) =>
	({
		content: `Admire the rainbow in the ${map}`,
		url: String(
			new URL(`daily_guides/quests/days_of_colour/admire/${map.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	}) as const;

const MEDITATE_CITADEL_ARCH = {
	content: `Meditate above the ${Map.Citadel}'s arch`,
	url: String(new URL(`daily_guides/quests/season_of_gratitude/${Map.Citadel.toLowerCase()}/arch.webp`, CDN_URL)),
} as const;

const MEDITATE_CITADEL_HIGH_ABOVE = {
	content: `Meditate high above the ${Map.Citadel}`,
	url: String(new URL(`daily_guides/quests/season_of_gratitude/${Map.Citadel.toLowerCase()}/high_above.webp`, CDN_URL)),
} as const;

function meditate(map: Map.Citadel): [typeof MEDITATE_CITADEL_ARCH, typeof MEDITATE_CITADEL_HIGH_ABOVE];
function meditate(map: Exclude<MeditationMaps, Map.Citadel>): DailyGuideQuest;

function meditate(
	map: MeditationMaps,
): [typeof MEDITATE_CITADEL_ARCH, typeof MEDITATE_CITADEL_HIGH_ABOVE] | DailyGuideQuest;

function meditate(
	map: MeditationMaps,
): [typeof MEDITATE_CITADEL_ARCH, typeof MEDITATE_CITADEL_HIGH_ABOVE] | DailyGuideQuest {
	if (map === Map.Citadel) return [MEDITATE_CITADEL_ARCH, MEDITATE_CITADEL_HIGH_ABOVE];

	return {
		content: `Meditate ${resolveMeditationMap(map)}`,
		url: String(
			new URL(`daily_guides/quests/season_of_gratitude/${map.toLowerCase().replaceAll(" ", "_")}.webp`, CDN_URL),
		),
	};
}

const COLLECT_GREEN_LIGHT = {
	content: "Collect green light",
	url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_green_light.webp`, CDN_URL)),
} as const;

const COLLECT_ORANGE_LIGHT = {
	content: "Collect orange light",
	url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_orange_light.webp`, CDN_URL)),
} as const;

const COLLECT_BLUE_LIGHT = {
	content: "Collect blue light",
	url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_blue_light.webp`, CDN_URL)),
} as const;

const COLLECT_RED_LIGHT = {
	content: "Collect red light",
	url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_red_light.webp`, CDN_URL)),
} as const;

const COLLECT_PURPLE_LIGHT = {
	content: "Collect purple light",
	url: String(new URL(`daily_guides/quests/season_of_enchantment/collect_purple_light.webp`, CDN_URL)),
} as const;

const PRACTICE_WITH_THE_SKATER = {
	content: "Practice with the skater",
	url: String(new URL(`daily_guides/quests/season_of_dreams/practice_with_the_skater.webp`, CDN_URL)),
} as const;

const RACE_DOWN_THE_SLOPES_WITH_THE_SKATER = {
	content: "Race down the slopes with the skater",
	url: String(new URL(`daily_guides/quests/season_of_dreams/race_down_the_slopes_with_the_skater.webp`, CDN_URL)),
} as const;

const RACE_DOWN_THE_MOUNTAIN_WITH_THE_SKATER = {
	content: "Race down the mountain with the skater",
	url: String(new URL(`daily_guides/quests/season_of_dreams/race_down_the_mountain_with_the_skater.webp`, CDN_URL)),
} as const;

const REHEARSE_FOR_A_PERFORMANCE_WITH_THE_SKATER = {
	content: "Rehearse for a performance with the skater",
	url: String(new URL(`daily_guides/quests/season_of_dreams/rehearse_for_a_performance_with_the_skater.webp`, CDN_URL)),
} as const;

const COMPLETE_THE_HOOP_SCAVENGER_HUNT = {
	content: "Complete the hoop scavenger hunt",
	url: String(new URL(`daily_guides/quests/season_of_assembly/hoop.webp`, CDN_URL)),
} as const;

const SPIRIT_QUEST = (spirit: QuestSpirit) =>
	({
		content: `Relive the ${spirit.name}`,
		url: String(new URL(`daily_guides/quests/spirits/${spirit.cdnName}.webp`, CDN_URL)),
	}) as const;

export const QUESTS = [
	COLLECT_30_PIECES_OF_LIGHT,
	LIGHT_20_CANDLES,
	FORGE_A_CANDLE,
	MELT_10_DARKNESS,
	BOW_AT_A_PLAYER,
	FOLLOW_A_FRIEND,
	HUG_A_FRIEND,
	WAVE_TO_A_FRIEND,
	HOLD_A_FRIENDS_HAND,
	SEND_A_GIFT_TO_A_FRIEND,
	MAKE_A_NEW_ACQUAINTANCE,
	HIGH_FIVE_A_FRIEND,
	USE_AN_EXPRESSION_NEAR_A_FRIEND,
	SIT_ON_A_BENCH_WITH_A_STRANGER,
	RECHARGE_FROM_A_JELLYFISH,
	RECHARGE_FROM_A_LIGHT_BLOOM,
	RIDE_A_MANTA,
	RELIVE_A_SPIRITS_MEMORIES,
	FACE_THE_DARK_DRAGON,
	KNOCK_OVER_5_DARK_CRABS,
	...VALID_REALM.map((realm) => CATCH_THE_LIGHT(realm)),
	...SOCIAL_LIGHT_AREA_MAPS.map((map) => SOCIAL_LIGHT_AREA(map)),
	...VALID_REALM.map((realm) => ADMIRE_THE_SAPLING(realm)),
	VISIT_THE_POLLUTED_GEYSER,
	RID_THE_SANCTUARY_VORTEX_OF_DARKNESS,
	...VALID_REALM.map((realm) => RAINBOW_FIND(realm)),
	...RAINBOW_ADMIRE_MAPS.map((map) => RAINBOW_ADMIRE(map)),
	...MEDITATION_MAPS.flatMap((map) => meditate(map)),
	COLLECT_GREEN_LIGHT,
	COLLECT_ORANGE_LIGHT,
	COLLECT_BLUE_LIGHT,
	COLLECT_RED_LIGHT,
	COLLECT_PURPLE_LIGHT,
	PRACTICE_WITH_THE_SKATER,
	RACE_DOWN_THE_SLOPES_WITH_THE_SKATER,
	RACE_DOWN_THE_MOUNTAIN_WITH_THE_SKATER,
	REHEARSE_FOR_A_PERFORMANCE_WITH_THE_SKATER,
	COMPLETE_THE_HOOP_SCAVENGER_HUNT,
	...Spirits.filter(isQuestSpirit).map((spirit) => SPIRIT_QUEST(spirit)),
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

	public readonly queue = new pQueue({ concurrency: 1 });

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
				SnowflakeUtil.timestampFrom(reference.messageId) >= todayDate().toMillis(),
		);
	}

	public async parse(message: Message<true>) {
		if (!this.validToParse(message)) return;
		const { attachments, client, content, flags } = message;
		if (flags.has(MessageFlags.SourceMessageDeleted)) return;
		const transformedContent = content.toUpperCase();

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
			 * - The Days of Colour event currency rotation (we have a trend for this already and they were late sending this)
			 */
			return;
		}

		const parsed = await this.queue.add(async () => {
			let parsed = false;

			if (
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
			}

			return parsed;
		});

		if (parsed && this.queue.pending === 0 && this.queue.size === 0) {
			this.queue.pause();
			await DailyGuidesDistribution.distribute(client);
			this.queue.start();
		}
	}

	public async updateDailyMessage(data: DailyGuideMessage) {
		const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides)
			.update({ daily_message: data })
			.returning("*");

		this.patch(dailyGuidesPacket!);
	}

	private resolveDailyGuide(pureContent: string, realm: ValidRealm | null, map: Map | null, url: string | null) {
		const upperPureContent = pureContent.toUpperCase();

		if (upperPureContent.includes("BOW AT A PLAYER") || upperPureContent.includes("BOW TO A PLAYER")) {
			return BOW_AT_A_PLAYER;
		}

		if (upperPureContent.includes("FOLLOW A FRIEND")) return FOLLOW_A_FRIEND;
		if (upperPureContent.includes("HUG A FRIEND")) return HUG_A_FRIEND;
		if (upperPureContent.includes("WAVE TO A FRIEND")) return WAVE_TO_A_FRIEND;
		if (upperPureContent.includes("HOLD THE HAND")) return HOLD_A_FRIENDS_HAND;
		if (upperPureContent.includes("SEND A GIFT")) return SEND_A_GIFT_TO_A_FRIEND;
		if (upperPureContent.includes("ACQUAINTANCE")) return MAKE_A_NEW_ACQUAINTANCE;
		if (upperPureContent.includes("HIGH-FIVE")) return HIGH_FIVE_A_FRIEND;
		if (upperPureContent.includes("EXPRESSION NEAR A FRIEND")) return USE_AN_EXPRESSION_NEAR_A_FRIEND;
		if (upperPureContent.includes("BENCH")) return SIT_ON_A_BENCH_WITH_A_STRANGER;
		if (upperPureContent.includes("RECHARGE FROM A JELLYFISH")) return RECHARGE_FROM_A_JELLYFISH;
		if (upperPureContent.includes("RECHARGE FROM A LIGHT BLOOM")) return RECHARGE_FROM_A_LIGHT_BLOOM;
		if (upperPureContent.includes("RIDE A MANTA")) return RIDE_A_MANTA;
		if (upperPureContent.includes("RELIVE A SPIRIT'S MEMORY")) return RELIVE_A_SPIRITS_MEMORIES;
		if (upperPureContent.includes("DARK DRAGON")) return FACE_THE_DARK_DRAGON;
		if (upperPureContent.includes("KNOCK OVER 5 DARK CREATURE")) return KNOCK_OVER_5_DARK_CRABS;

		if (upperPureContent.includes("CATCH THE LIGHT")) {
			if (realm) return CATCH_THE_LIGHT(realm);
			consoleLog("Failed to match a catch the light realm.");
			return { content: `Catch the light`, url };
		}

		if (upperPureContent.includes("SOCIAL LIGHT") || upperPureContent.includes("VISIT THE ANCESTOR")) {
			if (map && isSocialLightAreaMap(map)) return SOCIAL_LIGHT_AREA(map);
			consoleLog("Failed to match a social light area map.");
			return { content: "Visit the social light area", url };
		}

		if (upperPureContent.includes("SAPLING")) {
			if (realm) return ADMIRE_THE_SAPLING(realm);
			consoleLog("Failed to match an admire the sapling realm.");
			return { content: "Admire the sapling", url };
		}

		if (upperPureContent.includes("POLLUTED GEYSER")) return VISIT_THE_POLLUTED_GEYSER;
		if (upperPureContent.includes("GREAT VORTEX")) return RID_THE_SANCTUARY_VORTEX_OF_DARKNESS;

		if (upperPureContent.includes("DAYS OF RAINBOW 2021")) {
			if (realm) return RAINBOW_FIND(realm);
			consoleLog("Failed to match a rainbow find realm.");
			return { content: "Find the candles at the end of the rainbow", url };
		}

		if (upperPureContent.includes("ADMIRE THE RAINBOW")) {
			if (map && isRainbowAdmireMap(map)) return RAINBOW_ADMIRE(map);
			consoleLog("Failed to match a rainbow admire map.");
			return { content: `Admire the rainbow${map ? ` in the ${map}` : ""}`, url };
		}

		if (upperPureContent.includes("MEDITATION")) {
			if (map === Map.Citadel) {
				if (upperPureContent.includes("ARCH")) return MEDITATE_CITADEL_ARCH;
				if (upperPureContent.includes("HIGH ABOVE")) return MEDITATE_CITADEL_HIGH_ABOVE;
			} else if (map && isMeditationMap(map)) {
				return meditate(map);
			}

			consoleLog("Failed to match a meditation map.");
			return { content: `Meditate${map ? ` at the ${map}` : ""}`, url };
		}

		if (upperPureContent.includes("GREEN LIGHT")) return COLLECT_GREEN_LIGHT;
		if (upperPureContent.includes("ORANGE LIGHT")) return COLLECT_ORANGE_LIGHT;
		if (upperPureContent.includes("BLUE LIGHT")) return COLLECT_BLUE_LIGHT;
		if (upperPureContent.includes(" RED LIGHT")) return COLLECT_RED_LIGHT; // Prefix a space because "coloured light" contains red light.
		if (upperPureContent.includes("PURPLE LIGHT")) return COLLECT_PURPLE_LIGHT;
		if (upperPureContent.includes("PRACTICE WITH THE SKATER")) return PRACTICE_WITH_THE_SKATER;
		if (upperPureContent.includes("RACE DOWN THE SLOPES")) return RACE_DOWN_THE_SLOPES_WITH_THE_SKATER;
		if (upperPureContent.includes("RACE DOWN THE MOUNTAIN")) return RACE_DOWN_THE_MOUNTAIN_WITH_THE_SKATER;
		if (upperPureContent.includes("REHEARSE FOR A PERFORMANCE")) return REHEARSE_FOR_A_PERFORMANCE_WITH_THE_SKATER;
		if (upperPureContent.includes("SCAVENGER HUNT")) return COMPLETE_THE_HOOP_SCAVENGER_HUNT;

		for (const spirit of Spirits) {
			if (upperPureContent.replaceAll("’", "'").includes(spirit.name.toUpperCase())) {
				if (isQuestSpirit(spirit)) return SPIRIT_QUEST(spirit);
				consoleLog(`Failed to match a spirit for ${spirit.name}.`);
				return { content: `Relive the ${spirit.name}`, url };
			}
		}

		return null;
	}

	public async parseQuests(content: string, attachments: Collection<Snowflake, Attachment>) {
		const { quest1, quest2, quest3, quest4 } = this;

		if (quest1 && quest2 && quest3 && quest4) {
			consoleLog("Attempted to parse daily quests despite all quest variables exhausted.");
			return false;
		}

		const url = attachments.first()?.url ?? null;

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

		// Resolve the daily guide.
		const dailyGuide = this.resolveDailyGuide(pureContent, realm, map, url);

		// Log that we will be falling back to the original string in case of no output.
		if (!dailyGuide) consoleLog("Failed to match a daily quest. Falling back to original string.");

		// Initialise the output.
		const data = {
			content: dailyGuide?.content ?? pureContent.replaceAll("**", "").replaceAll(/  +/g, " ").trim(),
			url: dailyGuide?.url ?? url,
		};

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
