import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.TripleAxel;

export default new SeasonalSpirit({
	id: SpiritId.TwirlingChampion,
	seasonId: SeasonId.Lightseekers,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTripleAxel1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteTripleAxel2 },
			{
				name: "Blessing",
				cosmetic: Cosmetic.TwirlingChampionBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ name: "Mask", cosmetic: Cosmetic.TwirlingChampionMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTripleAxel3,
				cost: { seasonalCandles: 14 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteTripleAxel4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.TwirlingChampionHair,
				cost: { seasonalCandles: 16 },
			},
			{ name: "Panflute", cosmetic: Cosmetic.TwirlingChampionPanflute },
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteTripleAxel1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteTripleAxel2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TwirlingChampionBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.TwirlingChampionMask,
				cost: { candles: 24 },
			},
			{
				name: "Heart",
				cost: { candles: 3 },
				cosmetic: Cosmetic.TwirlingChampionHeart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				cosmetic: Cosmetic.TwirlingChampionWingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteTripleAxel3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteTripleAxel4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TwirlingChampionBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Panflute",
				cosmetic: Cosmetic.TwirlingChampionPanflute,
				cost: { candles: 60 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TwirlingChampionHair,
				cost: { candles: 34 },
			},
		],
	},
	visits: {
		travelling: [18, 52, 106],
	},
});
