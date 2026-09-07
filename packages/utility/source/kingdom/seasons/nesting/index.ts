import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import NestingAtrium from "./nesting-atrium.js";
import NestingGuide from "./nesting-guide.js";
import NestingLoft from "./nesting-loft.js";
import NestingNook from "./nesting-nook.js";
import NestingSolarium from "./nesting-solarium.js";

export default new Season({
	id: SeasonId.Nesting,
	start: skyDate(2024, 4, 15),
	end: skyDate(2024, 7, 1),
	guide: NestingGuide,
	spirits: [NestingSolarium, NestingLoft, NestingAtrium, NestingNook],
	items: [
		{
			cosmetic: Cosmetic.StoneStool,
		},
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2024, 6, 30)) >= 0
			? [
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2024, 6, 5)) >= 0
				? [
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
						{ rotation: "3", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
					]
				: Temporal.ZonedDateTime.compare(now, skyDate(2024, 5, 3)) >= 0
					? [
							{ rotation: "4", realm: RealmName.ValleyOfTriumph },
							{ rotation: "3", realm: RealmName.GoldenWasteland },
							{ rotation: "3", realm: RealmName.VaultOfKnowledge },
							{ rotation: "3", realm: RealmName.DaylightPrairie },
							{ rotation: "3", realm: RealmName.HiddenForest },
							{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							{ rotation: "4", realm: RealmName.GoldenWasteland },
							{ rotation: "4", realm: RealmName.VaultOfKnowledge },
							{ rotation: "4", realm: RealmName.DaylightPrairie },
							{ rotation: "4", realm: RealmName.HiddenForest },
						]
					: Temporal.ZonedDateTime.compare(now, skyDate(2024, 5, 1)) >= 0
						? [
								{ rotation: "3", realm: RealmName.GoldenWasteland },
								{ rotation: "3", realm: RealmName.VaultOfKnowledge },
								{ rotation: "3", realm: RealmName.DaylightPrairie },
								{ rotation: "3", realm: RealmName.HiddenForest },
								{ rotation: "4", realm: RealmName.ValleyOfTriumph },
								{ rotation: "4", realm: RealmName.GoldenWasteland },
								{ rotation: "4", realm: RealmName.VaultOfKnowledge },
								{ rotation: "4", realm: RealmName.DaylightPrairie },
								{ rotation: "4", realm: RealmName.HiddenForest },
								{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							]
						: [
								{ rotation: "4", realm: RealmName.ValleyOfTriumph },
								{ rotation: "3", realm: RealmName.GoldenWasteland },
								{ rotation: "3", realm: RealmName.VaultOfKnowledge },
								{ rotation: "3", realm: RealmName.DaylightPrairie },
								{ rotation: "3", realm: RealmName.HiddenForest },
								{ rotation: "3", realm: RealmName.ValleyOfTriumph },
								{ rotation: "4", realm: RealmName.GoldenWasteland },
								{ rotation: "4", realm: RealmName.VaultOfKnowledge },
								{ rotation: "4", realm: RealmName.DaylightPrairie },
								{ rotation: "4", realm: RealmName.HiddenForest },
							],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [
			{ start: skyDate(2024, 4, 24), end: skyDate(2024, 4, 29) },
			{ start: skyDate(2024, 6, 10), end: skyDate(2024, 6, 17) },
		],
	},
});
