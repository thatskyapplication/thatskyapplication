import { Realm } from "../../../models/realm.js";
import { areasForRealm } from "../../areas/index.js";
import { RealmName } from "../../geography.js";
import ElderOfTheVault from "./spirits/elder-of-the-vault.js";
import LevitatingAdept from "./spirits/levitating-adept.js";
import MeditatingMonastic from "./spirits/meditating-monastic.js";
import MemoryWhisperer from "./spirits/memory-whisperer.js";
import PoliteScholar from "./spirits/polite-scholar.js";
import PrayingAcolyte from "./spirits/praying-acolyte.js";

export default new Realm({
	name: RealmName.VaultOfKnowledge,
	elder: ElderOfTheVault,
	spirits: [PrayingAcolyte, LevitatingAdept, PoliteScholar, MemoryWhisperer, MeditatingMonastic],
	areas: areasForRealm(RealmName.VaultOfKnowledge),
});
