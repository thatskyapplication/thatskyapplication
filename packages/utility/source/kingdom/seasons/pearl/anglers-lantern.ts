import { GuideSpirit, SpiritKind } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new GuideSpirit({
	id: SpiritId.AnglersLantern,
	kind: SpiritKind.Entity,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
});
