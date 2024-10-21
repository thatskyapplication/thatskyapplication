import { Realm } from "../../../../Structures/Realm.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import ElderOfTheVault from "./ElderOfTheVault.js";
import LevitatingAdept from "./LevitatingAdept.js";
import MeditatingMonastic from "./MeditatingMonastic.js";
import MemoryWhisperer from "./MemoryWhisperer.js";
import PoliteScholar from "./PoliteScholar.js";
import PrayingAcolyte from "./PrayingAcolyte.js";

export default new Realm({
	name: RealmName.VaultOfKnowledge,
	elder: ElderOfTheVault,
	spirits: [PrayingAcolyte, LevitatingAdept, PoliteScholar, MemoryWhisperer, MeditatingMonastic],
});
