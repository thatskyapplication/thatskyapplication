import { Realm } from "../../../../models/Realm.js";
import { RealmName } from "../../../../utility/Constants.js";
import ApplaudingBellmaker from "./ApplaudingBellmaker.js";
import BirdWhisperer from "./BirdWhisperer.js";
import ButterflyCharmer from "./ButterflyCharmer.js";
import CeremonialWorshipper from "./CeremonialWorshiper.js";
import ElderOfThePrairie from "./ElderOfThePrairie.js";
import ExhaustedDockWorker from "./ExhaustedDockWorker.js";
import LaughingLightCatcher from "./LaughingLightCatcher.js";
import SlumberingShipwright from "./SlumberingShipwright.js";
import WavingBellmaker from "./WavingBellmaker.js";

export default new Realm({
	name: RealmName.DaylightPrairie,
	elder: ElderOfThePrairie,
	spirits: [
		ButterflyCharmer,
		ApplaudingBellmaker,
		WavingBellmaker,
		SlumberingShipwright,
		LaughingLightCatcher,
		BirdWhisperer,
		ExhaustedDockWorker,
		CeremonialWorshipper,
	],
});
