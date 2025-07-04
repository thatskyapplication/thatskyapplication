import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

const action = FriendAction.HairTousle;

export default new SeasonalSpirit({
	id: SpiritId.HairtousleTeen,
	seasonId: SeasonId.Belonging,
	action,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHairTousle1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HairtousleTeenBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HairtousleTeenBlessing2 },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.HairtousleTeenMusicSheet,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${action} 2`, cosmetic: Cosmetic.FriendActionHairTousle2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.HairtousleTeenBlessing3,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Earmuffs", cosmetic: Cosmetic.HairtousleTeenEarmuffs },
			{
				name: "Ukelele",
				cosmetic: Cosmetic.HairtousleTeenUkulele,
				cost: { seasonalCandles: 18 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.HairtousleTeenBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${action} 1`, cosmetic: Cosmetic.FriendActionHairTousle1 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HairtousleTeenBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.HairtousleTeenMusicSheet,
				cost: { candles: 15 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.HairtousleTeenSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.HairtousleTeenWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HairtousleTeenBlessing2,
				cost: { candles: 5 },
			},
			{
				name: `${action} 2`,
				cosmetic: Cosmetic.FriendActionHairTousle2,
				cost: { hearts: 9 },
			},
			{
				name: "Ukulele",
				cosmetic: Cosmetic.HairtousleTeenUkulele,
				cost: { candles: 70 },
			},
			{
				name: "Earmuffs",
				cosmetic: Cosmetic.HairtousleTeenEarmuffs,
				cost: { candles: 50 },
			},
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 6, 11), end: skyDate(2020, 6, 15) },
			{ start: skyDate(2022, 6, 9), end: skyDate(2022, 6, 13) },
			{ start: skyDate(2024, 3, 28), end: skyDate(2024, 4, 1) },
		],
	},
});
