import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import EchoOfAnAbandonedRefuge from "./echo-of-an-abandoned-refuge.js";
import HopefulSteward from "./hopeful-steward.js";
import MemoryOfALostVillage from "./memory-of-a-lost-village.js";
import RemnantOfAForgottenHaven from "./remnant-of-a-forgotten-haven.js";
import VestigeOfADesertedOasis from "./vestige-of-a-deserted-oasis.js";

export default new Season({
	id: SeasonId.Revival,
	start: skyDate(2023, 10, 16),
	end: skyDate(2024, 1, 1),
	guide: HopefulSteward,
	spirits: [
		VestigeOfADesertedOasis,
		MemoryOfALostVillage,
		EchoOfAnAbandonedRefuge,
		RemnantOfAForgottenHaven,
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2023, 11, 5)) >= 0
			? [
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
				]
			: [
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
				],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [{ start: skyDate(2023, 11, 20), end: skyDate(2023, 11, 27) }],
	},
});
