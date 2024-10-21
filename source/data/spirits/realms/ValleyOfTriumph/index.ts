import { Realm } from "../../../../Structures/Realm.js";
import { RealmName } from "../../../../utility/Constants.js";
import BackflippingChampion from "./BackflippingChampion.js";
import BowingMedalist from "./BowingMedalist.js";
import CheerfulSpectator from "./CheerfulSpectator.js";
import ConfidentSightseer from "./ConfidentSightseer.js";
import ElderOfTheValley from "./ElderOfTheValley.js";
import HandstandingThrillseeker from "./HandstandingThrillseeker.js";
import MantaWhisperer from "./MantaWhisperer.js";
import ProudVictor from "./ProudVictor.js";

export default new Realm({
	name: RealmName.ValleyOfTriumph,
	elder: ElderOfTheValley,
	spirits: [
		ConfidentSightseer,
		HandstandingThrillseeker,
		MantaWhisperer,
		BackflippingChampion,
		CheerfulSpectator,
		BowingMedalist,
		ProudVictor,
	],
});
