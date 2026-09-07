import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import migratingBellmaker from "./migrating-bellmaker.js";
import migratingBirdWhisperer from "./migrating-bird-whisperer.js";
import migratingButterflyCharmer from "./migrating-butterfly-charmer.js";
import migratingJellyWhisperer from "./migrating-jelly-whisperer.js";
import migratingMantaWhisperer from "./migrating-manta-whisperer.js";
import migrationGuide from "./migration-guide.js";

export default new Season({
	id: SeasonId.Migration,
	start: skyDate(2_025, 10, 20),
	end: skyDate(2_026, 1, 5),
	guide: migrationGuide,
	spirits: [
		migratingBellmaker,
		migratingBirdWhisperer,
		migratingButterflyCharmer,
		migratingJellyWhisperer,
		migratingMantaWhisperer,
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2025, 11, 4)) >= 0
			? [
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
				]
			: [
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
				],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2_025, 11, 17), end: skyDate(2_025, 12, 1) }],
	},
});
