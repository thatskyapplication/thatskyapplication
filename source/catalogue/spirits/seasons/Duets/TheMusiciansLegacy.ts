import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import {
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const heldPropEmoji = HELD_PROPS_EMOJIS.HeldProp44;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp76;

export default new SeasonalSpirit({
	name: SpiritName.TheMusiciansLegacy,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Music sheet",
				cosmetic: Cosmetic.TheMusiciansLegacyMusicSheet,
				cost: { seasonalCandles: 14 },
				emoji: musicSheet,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheMusiciansLegacyBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheMusiciansLegacyBlessing2,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.TheMusiciansLegacyProp1,
				emoji: smallPlaceablePropEmoji,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.TheMusiciansLegacyProp2,
				cost: { seasonalCandles: 34 },
				emoji: heldPropEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TheMusiciansLegacyBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheMusiciansLegacySeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
