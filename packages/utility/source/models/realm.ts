import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { RealmName } from "../kingdom/geography.js";
import type { SeasonIds } from "../season.js";
import type { SpiritIds } from "../utility/spirits.js";
import type { Area } from "./area.js";
import type { Season } from "./season.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	Spirit,
	StandardSpirit,
} from "./spirits.js";

export interface RealmDefinition {
	name: RealmName;
	elder?: ElderSpirit;
	spirits?: readonly StandardSpirit[];
}

export class Realm {
	public readonly name: RealmName;

	public readonly elder: ElderSpirit | null;

	public readonly standardSpirits: ReadonlyCollection<SpiritIds, StandardSpirit>;

	public readonly elderSpirits: ReadonlyCollection<SpiritIds, ElderSpirit>;

	public seasonalSpirits: ReadonlyCollection<SpiritIds, SeasonalSpirit> = new Collection<
		SpiritIds,
		SeasonalSpirit
	>();

	public guideSpirits: ReadonlyCollection<SpiritIds, GuideSpirit> = new Collection<
		SpiritIds,
		GuideSpirit
	>();

	public spirits: ReadonlyCollection<SpiritIds, Spirit>;

	public areas: ReadonlyCollection<Area["name"], Area> = new Collection<Area["name"], Area>();

	public seasons: ReadonlyCollection<SeasonIds, Season> = new Collection<SeasonIds, Season>();

	public wingedLight = 0;

	public constructor(data: RealmDefinition) {
		this.name = data.name;
		this.elder = data.elder ?? null;
		this.standardSpirits = (data.spirits ?? []).reduce(
			(spirits, spirit) => spirits.set(spirit.id, spirit),
			new Collection<SpiritIds, StandardSpirit>(),
		);
		this.elderSpirits = data.elder
			? new Collection<SpiritIds, ElderSpirit>().set(data.elder.id, data.elder)
			: new Collection<SpiritIds, ElderSpirit>();
		this.spirits = this.standardSpirits.merge<ElderSpirit, Spirit>(
			this.elderSpirits,
			(value) => ({ keep: true, value }),
			(value) => ({ keep: true, value }),
			() => {
				throw new Error("Duplicate spirits detected.");
			},
		);
	}
}
