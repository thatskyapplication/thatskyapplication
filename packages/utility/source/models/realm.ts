import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { RealmName } from "../kingdom/geography.js";
import type { SpiritIds } from "../utility/spirits.js";
import type { Area } from "./area.js";
import type { ElderSpirit, StandardSpirit } from "./spirits.js";

interface RealmData {
	name: RealmName;
	elder?: ElderSpirit;
	spirits?: readonly StandardSpirit[];
	areas?: readonly Area[];
}

export class Realm {
	public readonly name: RealmName;

	public readonly elder: ElderSpirit | null;

	public readonly spirits: ReadonlyCollection<SpiritIds, StandardSpirit>;

	public readonly areas: readonly Area[];

	public readonly wingedLight: number;

	public constructor(data: RealmData) {
		this.name = data.name;
		this.elder = data.elder ?? null;

		this.spirits = (data.spirits ?? []).reduce(
			(spirits, spirit) => spirits.set(spirit.id, spirit),
			new Collection<SpiritIds, StandardSpirit>(),
		);

		this.areas = data.areas ?? [];

		this.wingedLight = this.areas.reduce(
			(wingedLightCount, area) => wingedLightCount + area.wingedLight,
			0,
		);
	}
}
