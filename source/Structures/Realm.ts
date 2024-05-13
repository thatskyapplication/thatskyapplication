import type { ElderSpirit, StandardSpirit, StandardSpiritRealm } from "./Spirits.js";

interface RealmData {
	name: StandardSpiritRealm;
	elder: ElderSpirit;
	spirits: readonly StandardSpirit[];
}

export class Realm {
	public readonly name: StandardSpiritRealm;

	public readonly elder: ElderSpirit;

	public readonly spirits: readonly StandardSpirit[];

	public constructor(data: RealmData) {
		this.name = data.name;
		this.elder = data.elder;
		this.spirits = data.spirits;
	}
}
