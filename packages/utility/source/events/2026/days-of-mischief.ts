import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.DaysOfMischief2026,
	name: "days-of-mischief",
	family: EventFamilyId.DaysOfMischief,
	start: skyDate(2026, 10, 23),
	end: skyDate(2026, 11, 13),
	offer: [
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 1 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop1,
		},
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfMischief2026Outfit,
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfMischief2026Hair,
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 2 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop2,
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 3 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop3,
		},
		{
			cosmetic: Cosmetic.MischiefMagicalHat,
		},
		{
			cosmetic: Cosmetic.MischiefImpishWings,
		},
		{
			cosmetic: Cosmetic.MischiefFelineFriend,
		},
	],
});
