import { Realm } from "../../../models/realm.js";
import { areasForRealm } from "../../areas.js";
import { RealmName } from "../../geography.js";

export default new Realm({
	name: RealmName.EyeOfEden,
	areas: areasForRealm(RealmName.EyeOfEden),
});
