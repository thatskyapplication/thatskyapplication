import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
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
		now >= skyDate(2_025, 9, 5)
			? [
					{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
				]
			: now >= skyDate(2_025, 8, 1)
				? [
						{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
						{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
						{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
						{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
					]
				: [
						{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
						{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
						{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
						{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
						{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
						{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
						{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
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
			cost: { money: 9.99 },
		},
		{
			cosmetic: [Cosmetic.VestigeOfDarkDragonsTail, Cosmetic.VestigeOfDarkDragonsHeadAccessory],
			cosmeticDisplay: Cosmetic.VestigeOfDarkDragonsHeadAccessory,
			cost: { money: 11.99 },
		},
	],
	doubleSeasonalLightEventStartDate: skyDate(2_025, 8, 19),
	doubleSeasonalLightEventEndDate: skyDate(2_025, 9, 2),
	patchNotesURL: patchNotesRoute("0300"),
});
