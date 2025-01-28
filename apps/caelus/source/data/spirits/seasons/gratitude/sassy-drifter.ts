import { RealmName, SeasonId, SpiritName, SpiritStance } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Sassy;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask11;
const hairEmoji = HAIR_EMOJIS.Hair37;

export default new SeasonalSpirit({
	name: SpiritName.SassyDrifter,
	seasonId: SeasonId.Gratitude,
	stance,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy, emoji: stanceEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { seasonalCandles: 6 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SassyDrifterBlessing1, emoji: blessing2 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Weasel mask", cosmetic: Cosmetic.SassyDrifterMask, emoji: maskEmoji },
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceSassy, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SassyDrifterBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SassyDrifterHair,
				cost: { candles: 26 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SassyDrifterHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SassyDrifterWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SassyDrifterBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Weasel mask",
				cosmetic: Cosmetic.SassyDrifterMask,
				cost: { candles: 48 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: [1, 10, 39, 76, 111],
	},
	keywords: ["weasel", "weasel mask"],
});
