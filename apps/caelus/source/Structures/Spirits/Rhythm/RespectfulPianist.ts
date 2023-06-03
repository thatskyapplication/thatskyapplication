/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/Utility.js";
import { type SeasonalSpiritVisitCollectionKey, Expression, SeasonalSpirit, SpiritName } from "../Base.js";

enum RespectfulPianistOfferFlags {
	Expression1 = 1 << 0,
	Expression2 = 1 << 1,
	Blessing1 = 1 << 2,
	Hair = 1 << 3,
	Heart = 1 << 4,
	WingBuff = 1 << 5,
	Expression3 = 1 << 6,
	Expression4 = 1 << 7,
	Blessing2 = 1 << 8,
	WinterPiano = 1 << 9,
	DuckMask = 1 << 10,
}

export const maxBit = Object.values(RespectfulPianistOfferFlags)
	.filter((bit): bit is number => typeof bit === "number")
	.reduce((bits, bit) => bits | bit, 0);

const RespectfulPianistOfferFlagsToString = {
	[RespectfulPianistOfferFlags.Expression1]: "Respect 1",
	[RespectfulPianistOfferFlags.Expression2]: "Respect 2",
	[RespectfulPianistOfferFlags.Blessing1]: "Blessing 1",
	[RespectfulPianistOfferFlags.Hair]: "Hair",
	[RespectfulPianistOfferFlags.Heart]: "Heart",
	[RespectfulPianistOfferFlags.WingBuff]: "Wing buff",
	[RespectfulPianistOfferFlags.Expression3]: "Respect 3",
	[RespectfulPianistOfferFlags.Expression4]: "Respect 4",
	[RespectfulPianistOfferFlags.Blessing2]: "Blessing 2",
	[RespectfulPianistOfferFlags.WinterPiano]: "Winter piano",
	[RespectfulPianistOfferFlags.DuckMask]: "Duck mask",
} as const;

export function resolveBitsToOffer(bits: number) {
	const offer = [];

	for (const [bit, item] of Object.entries(RespectfulPianistOfferFlagsToString)) {
		const _bit = Number(bit);
		if ((bits & _bit) === _bit) offer.push(item);
	}

	return offer;
}

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	season: Season.Rhythm,
	expression: Expression.Respect,
	realm: Realm.GoldenWasteland,
	offer: { candles: 162, hearts: 13, ascendedCandles: 2 },
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(28, skyDate(2_021, 2, 4)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
