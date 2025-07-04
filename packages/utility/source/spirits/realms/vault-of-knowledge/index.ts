import { RealmName } from "../../../kingdom.js";
import { Realm } from "../../../models/realm.js";
import ElderOfTheVault from "./elder-of-the-vault.js";
import LevitatingAdept from "./levitating-adept.js";
import MeditatingMonastic from "./meditating-monastic.js";
import MemoryWhisperer from "./memory-whisperer.js";
import PoliteScholar from "./polite-scholar.js";
import PrayingAcolyte from "./praying-acolyte.js";

export default new Realm({
	name: RealmName.VaultOfKnowledge,
	elder: ElderOfTheVault,
	spirits: [PrayingAcolyte, LevitatingAdept, PoliteScholar, MemoryWhisperer, MeditatingMonastic],
});
