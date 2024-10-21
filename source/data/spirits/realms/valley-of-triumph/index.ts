import { Realm } from "../../../../models/Realm.js";
import { RealmName } from "../../../../utility/constants.js";
import BackflippingChampion from "./backflipping-champion.js";
import BowingMedalist from "./bowing-medalist.js";
import CheerfulSpectator from "./cheerful-spectator.js";
import ConfidentSightseer from "./confident-sightseer.js";
import ElderOfTheValley from "./elder-of-the-valley.js";
import HandstandingThrillseeker from "./handstanding-thrillseeker.js";
import MantaWhisperer from "./manta-whisperer.js";
import ProudVictor from "./proud-victor.js";

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
