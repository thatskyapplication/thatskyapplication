import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Wave;

export default new StandardSpirit({
	id: SpiritId.WavingBellmaker,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteWave1 },
				{
					cosmetic: Cosmetic.EmoteWave2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WavingBellmakerBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.WavingBellmakerHair,
					cost: { hearts: 2 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.WavingBellmakerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 1 },
					cosmetic: Cosmetic.WavingBellmakerWingBuff1,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWave3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteWave4,
					cost: { candles: 2 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WavingBellmakerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WavingBellmakerMask,
					cost: { hearts: 5 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.WingBuffMultiple, number: 2 },
					cosmetic: Cosmetic.WavingBellmakerWingBuff2,
					cost: { ascendedCandles: 6 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWave5,
					cost: { candles: 3 },
					level: 5,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWave6,
					cost: { candles: 3 },
					level: 6,
				},
			],
		],
	},
});
