import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Area } from "../models/area.js";
import type { Realm } from "../models/realm.js";
import type { Season } from "../models/season.js";
import type { ElderSpirit, Spirit, StandardSpirit } from "../models/spirits.js";
import type { SpiritIds } from "../utility/spirits.js";
import { AREAS } from "./areas/index.js";
import type { AreaName, RealmName } from "./geography.js";
import { ELDER_SPIRITS, REALMS, STANDARD_SPIRITS } from "./realms/index.js";
import { SEASONS } from "./seasons/index.js";

interface Kingdom {
	readonly realms: ReadonlyCollection<RealmName, Realm>;
	readonly standardSpirits: ReadonlyCollection<SpiritIds, StandardSpirit>;
	readonly elderSpirits: ReadonlyCollection<SpiritIds, ElderSpirit>;
	seasonOf(spiritId: SpiritIds): Season | null;
	groupFor(spiritId: SpiritIds): ReadonlyCollection<SpiritIds, Spirit> | null;
	adjacentSpirits(spiritId: SpiritIds): {
		readonly previous: Spirit | null;
		readonly next: Spirit | null;
	};
}

function collectSpirits(): ReadonlyCollection<SpiritIds, Spirit> {
	const spirits = new Collection<SpiritIds, Spirit>();

	const add = (spirit: Spirit) => {
		if (spirits.has(spirit.id)) {
			throw new Error(`Duplicate spirit id: ${spirit.id}.`);
		}

		spirits.set(spirit.id, spirit);
	};

	for (const spirit of STANDARD_SPIRITS.values()) {
		add(spirit);
	}

	for (const spirit of ELDER_SPIRITS.values()) {
		add(spirit);
	}

	for (const season of SEASONS.values()) {
		add(season.guide);

		for (const spirit of season.spirits.values()) {
			add(spirit);
		}
	}

	return spirits;
}

function validate(
	spirits: ReadonlyCollection<SpiritIds, Spirit>,
	realms: ReadonlyCollection<RealmName, Realm>,
	areas: ReadonlyCollection<AreaName, Area>,
): void {
	for (const spirit of spirits.values()) {
		if (spirit.area !== null && !areas.has(spirit.area)) {
			throw new Error(`Spirit ${spirit.id} lives in unknown area ${spirit.area}.`);
		}

		if (
			spirit.isElderSpirit() &&
			(spirit.realm === null || realms.get(spirit.realm)?.elder?.id !== spirit.id)
		) {
			throw new Error(`Elder ${spirit.id} is not the registered elder of realm ${spirit.realm}.`);
		}
	}

	for (const realm of realms.values()) {
		const derived = spirits.filter(
			(spirit) => spirit.isStandardSpirit() && spirit.realm === realm.name,
		);

		if (derived.size !== realm.spirits.size) {
			throw new Error(
				`Realm ${realm.name} lists ${realm.spirits.size} standard spirits but ${derived.size} resolve to it by area.`,
			);
		}

		for (const id of realm.spirits.keys()) {
			if (!derived.has(id)) {
				throw new Error(`Realm ${realm.name} lists ${id}, which does not resolve to it.`);
			}
		}
	}

	for (const season of SEASONS.values()) {
		if (season.guide.seasonId !== season.id) {
			throw new Error(`Guide ${season.guide.id} does not belong to season ${season.id}.`);
		}

		for (const spirit of season.spirits.values()) {
			if (spirit.seasonId !== season.id) {
				throw new Error(
					`Spirit ${spirit.id} is listed in season ${season.id} but belongs to ${spirit.seasonId}.`,
				);
			}
		}
	}
}

const realms = new Collection<RealmName, Realm>(REALMS.map((realm) => [realm.name, realm]));
const areas = new Collection<AreaName, Area>(AREAS.map((area) => [area.name, area]));
const spirits = collectSpirits();

validate(spirits, realms, areas);

export const KINGDOM: Kingdom = {
	realms,
	standardSpirits: STANDARD_SPIRITS,
	elderSpirits: ELDER_SPIRITS,
	seasonOf(spiritId) {
		const spirit = spirits.get(spiritId);

		if (spirit?.isSeasonalSpirit() || spirit?.isGuideSpirit()) {
			return SEASONS.get(spirit.seasonId) ?? null;
		}

		return null;
	},
	groupFor(spiritId) {
		const spirit = spirits.get(spiritId);

		if (!spirit) {
			return null;
		}

		if (spirit.isElderSpirit()) {
			return ELDER_SPIRITS;
		}

		if (spirit.isStandardSpirit()) {
			return realms.get(spirit.realm)!.spirits;
		}

		return SEASONS.get(spirit.seasonId)!.spiritsWithGuide;
	},
	adjacentSpirits(spiritId) {
		const group = KINGDOM.groupFor(spiritId);

		if (!group) {
			return { previous: null, next: null };
		}

		const members = [...group.values()];
		const index = members.findIndex((spirit) => spirit.id === spiritId);
		return { previous: members[index - 1] ?? null, next: members[index + 1] ?? null };
	},
};
