import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { SpiritIds } from "../utility/spirits.js";
import type { ElderSpirit, StandardSpirit, StandardSpiritRealm } from "./spirits.js";

interface RealmData {
	name: StandardSpiritRealm;
	elder: ElderSpirit;
	spirits: readonly StandardSpirit[];
	wingedLight: number;
}

export class Realm {
	public readonly name: StandardSpiritRealm;

	public readonly elder: ElderSpirit;

	public readonly spirits: ReadonlyCollection<SpiritIds, StandardSpirit>;

	public readonly wingedLight: number;

	public constructor(data: RealmData) {
		this.name = data.name;
		this.elder = data.elder;

		this.spirits = data.spirits.reduce(
			(spirits, spirit) => spirits.set(spirit.id, spirit),
			new Collection<SpiritIds, StandardSpirit>(),
		);

		this.wingedLight = data.wingedLight;
	}
}
