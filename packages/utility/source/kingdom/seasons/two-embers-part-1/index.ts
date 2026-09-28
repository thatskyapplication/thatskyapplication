import { Cosmetic, CosmeticPackName } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import caringCompanion from "./caring-companion.js";
import resourcefulRecluse from "./resourceful-recluse.js";
import scarredSentry from "./scarred-sentry.js";
import sternShepherd from "./stern-shepherd.js";
import tenderToymaker from "./tender-toymaker.js";
import vaultEldersLantern from "./vault-elders-lantern.js";

export default new Season({
	id: SeasonId.TwoEmbersPart1,
	start: skyDate(2_025, 7, 21),
	end: skyDate(2_025, 10, 6),
	guide: vaultEldersLantern,
	spirits: [tenderToymaker, scarredSentry, sternShepherd, resourcefulRecluse, caringCompanion],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2_025, 10, 3)) >= 0
			? [
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2_025, 9, 5)) >= 0
				? [
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
						{ rotation: "3", realm: RealmName.GoldenWasteland },
					]
				: Temporal.ZonedDateTime.compare(now, skyDate(2_025, 8, 1)) >= 0
					? [
							{ rotation: "3", realm: RealmName.VaultOfKnowledge },
							{ rotation: "4", realm: RealmName.DaylightPrairie },
							{ rotation: "4", realm: RealmName.HiddenForest },
							{ rotation: "4", realm: RealmName.ValleyOfTriumph },
							{ rotation: "4", realm: RealmName.GoldenWasteland },
							{ rotation: "4", realm: RealmName.VaultOfKnowledge },
							{ rotation: "3", realm: RealmName.DaylightPrairie },
							{ rotation: "3", realm: RealmName.HiddenForest },
							{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							{ rotation: "3", realm: RealmName.GoldenWasteland },
						]
					: [
							{ rotation: "3", realm: RealmName.VaultOfKnowledge },
							{ rotation: "3", realm: RealmName.DaylightPrairie },
							{ rotation: "3", realm: RealmName.HiddenForest },
							{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							{ rotation: "4", realm: RealmName.GoldenWasteland },
							{ rotation: "4", realm: RealmName.VaultOfKnowledge },
							{ rotation: "4", realm: RealmName.DaylightPrairie },
							{ rotation: "4", realm: RealmName.HiddenForest },
							{ rotation: "4", realm: RealmName.ValleyOfTriumph },
							{ rotation: "3", realm: RealmName.GoldenWasteland },
						],
	items: [
		{
			cosmetic: Cosmetic.ButterflyBlossomMemento,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.CloakOfDarkness,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MiniManateeAccessory,
			cost: { money: 3.99 },
		},
		{
			cosmetic: Cosmetic.ManateePlush,
			cost: { money: 6.99 },
		},
		{
			cosmetic: [Cosmetic.SpiritedManateeTail, Cosmetic.SpiritedManateeHeadAccessory],
			cosmeticDisplay: Cosmetic.SpiritedManateeHeadAccessory,
			packName: CosmeticPackName.SpiritedManateePack,
			cost: { money: 9.99 },
		},
		{
			cosmetic: [Cosmetic.VestigeOfDarkDragonsTail, Cosmetic.VestigeOfDarkDragonsHeadAccessory],
			cosmeticDisplay: Cosmetic.VestigeOfDarkDragonsHeadAccessory,
			packName: CosmeticPackName.VestigeOfDarkDragonsPack,
			cost: { money: 11.99 },
		},
		{
			cosmetic: Cosmetic.ProjectorOfMemories,
			cost: { money: 24.99 },
		},
	],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [
			{ start: skyDate(2_025, 8, 19), end: skyDate(2_025, 9, 2) },
			{ start: skyDate(2_025, 9, 22), end: skyDate(2_025, 9, 29) },
		],
	},
});
