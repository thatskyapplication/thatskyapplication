import { Realm } from "../../../models/realm.js";
import { RealmName } from "../../geography.js";
import ApplaudingBellmaker from "./spirits/applauding-bellmaker.js";
import BirdWhisperer from "./spirits/bird-whisperer.js";
import ButterflyCharmer from "./spirits/butterfly-charmer.js";
import CeremonialWorshipper from "./spirits/ceremonial-worshiper.js";
import ElderOfThePrairie from "./spirits/elder-of-the-prairie.js";
import ExhaustedDockWorker from "./spirits/exhausted-dock-worker.js";
import LaughingLightCatcher from "./spirits/laughing-light-catcher.js";
import SlumberingShipwright from "./spirits/slumbering-shipwright.js";
import WavingBellmaker from "./spirits/waving-bellmaker.js";

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
	wingedLight: 24,
});
