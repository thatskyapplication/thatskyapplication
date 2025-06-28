import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.DoubleFive;

export default new SeasonalSpirit({
	id: SpiritId.DoublefiveLightCatcher,
	seasonId: SeasonId.Lightseekers,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDoubleFive1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
				cost: { seasonalCandles: 4 },
			},
			{ name: "Hair", cosmetic: Cosmetic.DoublefiveLightCatcherHair },
			{
				name: "Mask",
				cosmetic: Cosmetic.DoublefiveLightCatcherMask,
				cost: { seasonalCandles: 6 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionDoubleFive2 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
				cost: { seasonalCandles: 8 },
			},
			{ name: "Flute", cosmetic: Cosmetic.DoublefiveLightCatcherFlute },
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionDoubleFive1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.DoublefiveLightCatcherMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.DoublefiveLightCatcherHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.DoublefiveLightCatcherWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.DoublefiveLightCatcherBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionDoubleFive2,
				cost: { hearts: 7 },
			},
			{
				name: "Flute",
				cosmetic: Cosmetic.DoublefiveLightCatcherFlute,
				cost: { candles: 55 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.DoublefiveLightCatcherHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 2, 14, 12), end: skyDate(2020, 2, 17) },
			{ start: skyDate(2021, 4, 15), end: skyDate(2021, 4, 19) },
			{ start: skyDate(2022, 7, 21), end: skyDate(2022, 7, 27) },
			{ start: skyDate(2024, 5, 23), end: skyDate(2024, 5, 27) },
		],
	},
});
