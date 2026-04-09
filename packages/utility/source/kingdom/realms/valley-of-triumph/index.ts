import { Realm } from "../../../models/realm.js";
import { areasForRealm } from "../../areas.js";
import { RealmName } from "../../geography.js";
import BackflippingChampion from "./spirits/backflipping-champion.js";
import BowingMedalist from "./spirits/bowing-medalist.js";
import CheerfulSpectator from "./spirits/cheerful-spectator.js";
import ConfidentSightseer from "./spirits/confident-sightseer.js";
import ElderOfTheValley from "./spirits/elder-of-the-valley.js";
import HandstandingThrillseeker from "./spirits/handstanding-thrillseeker.js";
import MantaWhisperer from "./spirits/manta-whisperer.js";
import ProudVictor from "./spirits/proud-victor.js";

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
	areas: areasForRealm(RealmName.ValleyOfTriumph),
});
