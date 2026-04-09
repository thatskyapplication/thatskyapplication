import type { AreaName, RealmName } from "../kingdom/geography.js";

interface AreaData {
	name: AreaName;
	realm?: RealmName;
	wingedLight?: number;
}

export class Area {
	public readonly name: AreaName;

	public readonly realm: RealmName | null;

	public readonly wingedLight: number;

	public constructor(data: AreaData) {
		this.name = data.name;
		this.realm = data.realm ?? null;
		this.wingedLight = data.wingedLight ?? 0;
	}
}
