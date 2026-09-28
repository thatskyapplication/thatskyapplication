import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import BeckoningRuler from "./beckoning-ruler.js";
import GloatingNarcissist from "./gloating-narcissist.js";
import SlouchingSoldier from "./slouching-soldier.js";
import SneezingGeographer from "./sneezing-geographer.js";
import StarCollector from "./star-collector.js";
import StretchingLamplighter from "./stretching-lamplighter.js";
import TheRose from "./the-rose.js";

export default new Season({
	id: SeasonId.LittlePrince,
	start: skyDate(2021, 7, 6),
	end: skyDate(2021, 9, 20),
	guide: TheRose,
	spirits: [
		BeckoningRuler,
		GloatingNarcissist,
		StretchingLamplighter,
		SlouchingSoldier,
		SneezingGeographer,
		StarCollector,
	],
	items: [
		{
			cosmetic: Cosmetic.LittlePrinceScarf,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.LittlePrinceFox,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.LittlePrinceAsteroidJacket,
			cost: { money: 24.99 },
		},
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2021, 9, 5)) >= 0
			? [
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2021, 8, 10)) >= 0
				? [
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					]
				: [
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2021, 8, 2), end: skyDate(2021, 8, 9) }],
	},
});
