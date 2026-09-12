import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import AURORA from "./aurora.js";
import MindfulMiner from "./mindful-miner.js";
import RunningWayfarer from "./running-wayfarer.js";
import SeedOfHope from "./seed-of-hope.js";
import WarriorOfLove from "./warrior-of-love.js";

export default new Season({
	id: SeasonId.AURORA,
	start: skyDate(2022, 10, 17),
	end: skyDate(2023, 1, 2, 2),
	guide: AURORA,
	spirits: [RunningWayfarer, MindfulMiner, WarriorOfLove, SeedOfHope],
	items: [
		{
			cosmetic: Cosmetic.RunawayHairstyle,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.TiaraWeCanTouch,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.VoiceOfAURORA,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.RunawayOutfit,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.ToTheLoveOutfit,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.GivingInCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.WingsOfAURORA,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2023, 1, 2)) >= 0
			? null
			: Temporal.ZonedDateTime.compare(now, skyDate(2022, 11, 5)) >= 0
				? [
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
						{ rotation: "3", realm: RealmName.GoldenWasteland },
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
					]
				: [
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
						{ rotation: "3", realm: RealmName.GoldenWasteland },
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
					],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [{ start: skyDate(2022, 11, 14), end: skyDate(2022, 11, 21) }],
	},
});
