import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { StandardSpirit } from "../../../models/spirits.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Faint;

export default new StandardSpirit({
	id: SpiritId.FaintingWarrior,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFaint1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteFaint2,
				cost: { candles: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.FaintingWarriorBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.FaintingWarriorHair,
				cost: { hearts: 5 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.FaintingWarriorHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.FaintingWarriorWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFaint3,
				cost: { candles: 5 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteFaint4,
				cost: { candles: 5 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.FaintingWarriorBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.FaintingWarriorMask,
				cost: { hearts: 15 },
			},
		],
	},
});
