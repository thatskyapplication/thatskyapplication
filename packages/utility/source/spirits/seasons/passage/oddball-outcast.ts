import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HackySack;

export default new SeasonalSpirit({
	id: SpiritId.OddballOutcast,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		seasonal: [
			{ cosmetic: Cosmetic.EmoteHackySack1 },
			{ cosmetic: Cosmetic.EmoteHackySack2 },
			{
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { seasonalCandles: 14 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.OddballOutcastBlessing1,
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
			},
			{
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.EmoteHackySack4 },
			{
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { seasonalCandles: 32 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.OddballOutcastBlessing3,
			},
			{
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteHackySack1 },
			{
				cosmetic: Cosmetic.EmoteHackySack2,
				cost: { hearts: 4 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.OddballOutcastBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.OddballOutcastHair,
				cost: { candles: 40 },
			},
			{
				cosmetic: Cosmetic.OddballOutcastSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.OddballOutcastWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteHackySack3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteHackySack4,
				cost: { hearts: 6 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.OddballOutcastBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.OddballOutcastNeckAccessory,
				cost: { candles: 65 },
			},
			{
				cosmetic: Cosmetic.OddballOutcastOutfit,
				cost: { candles: 65 },
			},
		],
	},
	visits: {
		returning: [7],
	},
});
