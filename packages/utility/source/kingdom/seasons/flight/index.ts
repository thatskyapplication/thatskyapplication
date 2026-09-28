import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import FlightGuide from "./flight-guide.js";
import LightWhisperer from "./light-whisperer.js";
import LivelyNavigator from "./lively-navigator.js";
import TalentedBuilder from "./talented-builder.js";
import TinkeringChimesmith from "./tinkering-chimesmith.js";

export default new Season({
	id: SeasonId.Flight,
	start: skyDate(2021, 10, 4),
	end: skyDate(2021, 12, 20),
	guide: FlightGuide,
	spirits: [LivelyNavigator, LightWhisperer, TinkeringChimesmith, TalentedBuilder],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2021, 11, 5)) >= 0
			? [
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
				]
			: [
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
				],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [{ start: skyDate(2021, 11, 23), end: skyDate(2021, 11, 30) }],
	},
});
