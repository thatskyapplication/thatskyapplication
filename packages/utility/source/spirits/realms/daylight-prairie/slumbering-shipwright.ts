import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Yawn;

export default new StandardSpirit({
	id: SpiritId.SlumberingShipwright,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			[
				{ cosmetic: Cosmetic.EmoteYawn1 },
				{
					cosmetic: Cosmetic.EmoteYawn2,
					cost: { candles: 1 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SlumberingShipwrightBlessing1,
					cost: { candles: 1 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SlumberingShipwrightHair,
					cost: { hearts: 3 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SlumberingShipwrightHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SlumberingShipwrightWingBuff,
					cost: { ascendedCandles: 1 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteYawn3,
					cost: { candles: 2 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteYawn4,
					cost: { candles: 2 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SlumberingShipwrightBlessing2,
					cost: { candles: 5 },
				},
			],
		],
	},
});
