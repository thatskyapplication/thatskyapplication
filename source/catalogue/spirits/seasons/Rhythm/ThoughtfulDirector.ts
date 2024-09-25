import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Thinking;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask25;
const capeEmoji = CAPE_EMOJIS.Cape24;
const heldProp = HELD_PROPS_EMOJIS.HeldProp16;

export default new SeasonalSpirit({
	name: SpiritName.ThoughtfulDirector,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteThinking1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteThinking2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.ThoughtfulDirectorMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteThinking3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteThinking4, emoji: emoteEmoji },
			{
				name: "Xylophone",
				cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
				cost: { seasonalCandles: 20 },
				emoji: heldProp,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThoughtfulDirectorBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing3,
				cost: { seasonalCandles: 22 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.ThoughtfulDirectorCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteThinking1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteThinking2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ThoughtfulDirectorMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ThoughtfulDirectorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ThoughtfulDirectorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteThinking3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteThinking4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ThoughtfulDirectorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Xylophone",
				cosmetic: Cosmetic.ThoughtfulDirectorXylophone,
				cost: { candles: 65 },
				emoji: heldProp,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ThoughtfulDirectorCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(35, skyDate(2_021, 5, 13))
			.set(67, skyDate(2_022, 8, 4))
			.set(116, skyDate(2_024, 6, 20)),
		returning: [3],
	},
});
