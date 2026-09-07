import { Cosmetic, CosmeticPackName } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import artisticMemory from "./artistic-memory.js";
import dutchMemory from "./dutch-memory.js";
import joyfulMemory from "./joyful-memory.js";
import rusticMemory from "./rustic-memory.js";
import vaseWithFifteenSunflowers from "./vase-with-fifteen-sunflowers.js";

export default new Season({
	id: SeasonId.DearVanGogh,
	start: skyDate(2026, 7, 17),
	end: skyDate(2026, 10, 2),
	guide: vaseWithFifteenSunflowers,
	spirits: [dutchMemory, rusticMemory, artisticMemory, joyfulMemory],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2026, 9, 5)) >= 0
			? [
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2026, 8, 1)) >= 0
				? [
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					]
				: [
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					],
	items: [
		{
			cosmetic: Cosmetic.WheatfieldCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.StarryNightsVisage,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.StarryNightsKiss,
			cost: { money: 4.99 },
		},
		{
			cosmetic: [Cosmetic.StarryNightsMantleCape, Cosmetic.StarryNightsMantleNeckAccessory],
			cosmeticDisplay: Cosmetic.StarryNightsMantleCape,
			packName: CosmeticPackName.StarryNightsMantle,
			cost: { money: 24.99 },
		},
		{
			cosmetic: Cosmetic.StarryNightsCanopy,
			cost: { money: 14.99 },
		},
	],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [
			{
				start: skyDate(2026, 9, 11),
				end: skyDate(2026, 9, 25),
			},
		],
	},
});
