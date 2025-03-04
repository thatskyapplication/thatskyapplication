import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Crying;

export default new StandardSpirit({
	id: SpiritId.TearfulLightMiner,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCrying1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCrying2,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TearfulLightMinerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TearfulLightMinerHair,
				cost: { hearts: 3 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TearfulLightMinerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff 1",
				cosmetic: Cosmetic.TearfulLightMinerWingBuff1,
				cost: { ascendedCandles: 1 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCrying3,
				cost: { candles: 4 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCrying4,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TearfulLightMinerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Wing buff 2",
				cosmetic: Cosmetic.TearfulLightMinerWingBuff2,
				cost: { ascendedCandles: 3 },
			},
			{
				name: `${emote} 5`,
				cosmetic: Cosmetic.EmoteCrying5,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 6`,
				cosmetic: Cosmetic.EmoteCrying6,
				cost: { candles: 5 },
			},
		],
	},
});
