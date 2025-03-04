import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Shiver;

export default new StandardSpirit({
	id: SpiritId.ShiveringTrailblazer,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShiver1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShiver2,
				cost: { candles: 2 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShiveringTrailblazerBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ShiveringTrailblazerOutfit,
				cost: { hearts: 2 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ShiveringTrailblazerHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ShiveringTrailblazerWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShiver3,
				cost: { candles: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShiver4,
				cost: { candles: 3 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShiveringTrailblazerBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ShiveringTrailblazerHair,
				cost: { hearts: 5 },
			},
		],
	},
});
