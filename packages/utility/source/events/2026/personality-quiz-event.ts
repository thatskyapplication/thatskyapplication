import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.PersonalityQuizEvent2026,
	start: skyDate(2026, 1, 9),
	end: skyDate(2026, 1, 24),
	offer: [
		{
			translation: { key: CosmeticCommon.FaceAccessoryMultiple, number: 1 },
			cosmetic: Cosmetic.PersonalityQuizEventFaceAccessory1,
			cost: { candles: 35 },
		},
		{
			translation: { key: CosmeticCommon.FaceAccessoryMultiple, number: 2 },
			cosmetic: Cosmetic.PersonalityQuizEventFaceAccessory2,
			cost: { candles: 35 },
		},
		{
			translation: { key: CosmeticCommon.HairAccessoryMultiple, number: 1 },
			cosmetic: Cosmetic.PersonalityQuizEventHairAccessory1,
			cost: { candles: 35 },
		},
		{
			translation: { key: CosmeticCommon.HairAccessoryMultiple, number: 1 },
			cosmetic: Cosmetic.PersonalityQuizEventHairAccessory2,
			cost: { candles: 35 },
		},
		{
			cosmetic: Cosmetic.BluePinnedCap,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.PurpleSpectacles,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.GreenFoldedEars,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.YellowPaintbrush,
			cost: { money: 2.99 },
		},
	],
});
