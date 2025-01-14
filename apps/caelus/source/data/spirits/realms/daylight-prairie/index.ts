import { RealmName } from "@thatskyapplication/utility";
import { Realm } from "../../../../models/Realm.js";
import ApplaudingBellmaker from "./applauding-bellmaker.js";
import BirdWhisperer from "./bird-whisperer.js";
import ButterflyCharmer from "./butterfly-charmer.js";
import CeremonialWorshipper from "./ceremonial-worshiper.js";
import ElderOfThePrairie from "./elder-of-the-prairie.js";
import ExhaustedDockWorker from "./exhausted-dock-worker.js";
import LaughingLightCatcher from "./laughing-light-catcher.js";
import SlumberingShipwright from "./slumbering-shipwright.js";
import WavingBellmaker from "./waving-bellmaker.js";

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
