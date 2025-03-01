import {
	Cosmetic,
	RealmName,
	SeasonId,
	SeasonalSpirit,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const hairEmoji = HAIR_EMOJIS.Hair151;
const capeEmoji = CAPE_EMOJIS.Cape137;
const heldPropEmoji = HELD_PROPS_EMOJIS.HeldProp48;
const largePlaceablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp74;

export default new SeasonalSpirit({
	id: SpiritId.SpiritOfAdventure,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SpiritOfAdventureMusicSheet,
				cost: { seasonalCandles: 8 },
				emoji: musicSheet,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SpiritOfAdventureHair,
				emoji: hairEmoji,
			},
			{
				name: "Harmonica",
				cosmetic: Cosmetic.SpiritOfAdventureHarmonica,
				cost: { seasonalCandles: 20 },
				emoji: heldPropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing1,
				emoji: blessing3,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing2,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.SpiritOfAdventureProp,
				emoji: largePlaceablePropEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SpiritOfAdventureCape,
				cost: { seasonalCandles: 38 },
				emoji: capeEmoji,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing3,
				emoji: blessing3,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SpiritOfAdventureSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MoominHeart,
			},
		],
	},
});
