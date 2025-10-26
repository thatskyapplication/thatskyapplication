import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Moping;

export default new SeasonalSpirit({
	id: SpiritId.MelancholyMope,
	seasonId: SeasonId.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteMoping1 },
				{ cosmetic: Cosmetic.EmoteMoping2, level: 2, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.MelancholyMopeHeadAccessory,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MelancholyMopeBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MelancholyMopeBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MelancholyMopeHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteMoping3,
					cost: { seasonalCandles: 26 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteMoping4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MelancholyMopeOutfit,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MelancholyMopeBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MelancholyMopeSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
