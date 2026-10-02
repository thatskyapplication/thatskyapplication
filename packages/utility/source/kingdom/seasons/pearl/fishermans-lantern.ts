import { GuideSpirit, SpiritKind } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new GuideSpirit({
	id: SpiritId.FishermansLantern,
	kind: SpiritKind.Entity,
	seasonId: SeasonId.Pearl,
});
