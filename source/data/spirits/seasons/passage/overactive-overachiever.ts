import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.PullUp;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairEmoji = HAIR_EMOJIS.Hair124;
const capeEmoji = CAPE_EMOJIS.Cape103;
const heldProp = HELD_PROPS_EMOJIS.HeldProp34;

export default new SeasonalSpirit({
	name: SpiritName.OveractiveOverachiever,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePullUp1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePullUp2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.OveractiveOverachieverBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{
				name: "Manta ocarina",
				cosmetic: Cosmetic.OveractiveOverachieverMantaOcarina,
				emoji: heldProp,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePullUp3,
				cost: { seasonalCandles: 22 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePullUp4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.OveractiveOverachieverCape,
				cost: { seasonalCandles: 30 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.OveractiveOverachieverBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.OveractiveOverachieverBlessing3,
				cost: { seasonalCandles: 32 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.OveractiveOverachieverHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.OveractiveOverachieverSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
});
