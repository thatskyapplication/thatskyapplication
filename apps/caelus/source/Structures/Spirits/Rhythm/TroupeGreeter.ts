/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

enum TroupeGreeterOfferFlags {
	Expression1 = 1 << 0,
	Expression2 = 1 << 1,
	Blessing1 = 1 << 2,
	MusicSheet = 1 << 3,
	Heart = 1 << 4,
	WingBuff = 1 << 5,
	Expression3 = 1 << 6,
	Expression4 = 1 << 7,
	Blessing2 = 1 << 8,
	Outfit = 1 << 9,
	Mask = 1 << 10,
}

export const maxBit = Object.values(TroupeGreeterOfferFlags)
	.filter((bit): bit is number => typeof bit === "number")
	.reduce((bits, bit) => bits | bit, 0);

const TroupeGreeterOfferFlagsToString = {
	[TroupeGreeterOfferFlags.Expression1]: `${Expression.Welcome} 1`,
	[TroupeGreeterOfferFlags.Expression2]: `${Expression.Welcome} 2`,
	[TroupeGreeterOfferFlags.Blessing1]: "Blessing 1",
	[TroupeGreeterOfferFlags.MusicSheet]: "Music sheet",
	[TroupeGreeterOfferFlags.Heart]: "Heart",
	[TroupeGreeterOfferFlags.WingBuff]: "Wing buff",
	[TroupeGreeterOfferFlags.Expression3]: `${Expression.Welcome} 3`,
	[TroupeGreeterOfferFlags.Expression4]: `${Expression.Welcome} 4`,
	[TroupeGreeterOfferFlags.Blessing2]: "Blessing 2",
	[TroupeGreeterOfferFlags.Outfit]: "Outfit",
	[TroupeGreeterOfferFlags.Mask]: "Mask",
} as const;

export function resolveBitsToOffer(bits: number) {
	const offer = [];

	for (const [bit, item] of Object.entries(TroupeGreeterOfferFlagsToString)) {
		const _bit = Number(bit);
		if ((bits & _bit) === _bit) offer.push(item);
	}

	return offer;
}

export default new SeasonalSpirit({
	name: SpiritName.TroupeGreeter,
	season: Season.Rhythm,
	expression: Expression.Welcome,
	realm: Realm.IslesOfDawn,
	offer: { candles: 146, hearts: 13, ascendedCandles: 12 },
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(25, skyDate(2_020, 12, 24))
			.set(56, skyDate(2_022, 3, 3)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
