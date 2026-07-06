import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Area } from "../models/area.js";
import type { Realm } from "../models/realm.js";
import type { Season } from "../models/season.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	StandardSpirit,
} from "../models/spirits.js";
import type { SeasonIds } from "../season.js";
import type { SpiritIds } from "../utility/spirits.js";
import { AREAS, realmForArea } from "./areas/index.js";
import type { AreaName, RealmName } from "./geography.js";
import { ELDER_SPIRITS, REALMS, STANDARD_SPIRITS } from "./realms/index.js";
import { SEASONS } from "./seasons/index.js";

export type Spirit = StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit;

export type SpiritGroup =
	| {
			readonly kind: "realm";
			readonly realm: Realm;
			readonly spirits: ReadonlyCollection<SpiritIds, StandardSpirit>;
	  }
	| { readonly kind: "elders"; readonly spirits: ReadonlyCollection<SpiritIds, ElderSpirit> }
	| {
			readonly kind: "season";
			readonly season: Season;
			readonly spirits: ReadonlyCollection<SpiritIds, GuideSpirit | SeasonalSpirit>;
	  };

export interface Kingdom {
	readonly realms: ReadonlyCollection<RealmName, Realm>;
	readonly areas: ReadonlyCollection<AreaName, Area>;
	readonly seasons: ReadonlyCollection<SeasonIds, Season>;
	readonly spirits: ReadonlyCollection<SpiritIds, Spirit>;
	readonly spiritsByRealm: ReadonlyCollection<RealmName, ReadonlyCollection<SpiritIds, Spirit>>;
	readonly spiritsByArea: ReadonlyCollection<AreaName, ReadonlyCollection<SpiritIds, Spirit>>;
	readonly spiritsBySeason: ReadonlyCollection<SeasonIds, ReadonlyCollection<SpiritIds, Spirit>>;
	realmOf(spiritId: SpiritIds): Realm | null;
	areaOf(spiritId: SpiritIds): Area | null;
	seasonOf(spiritId: SpiritIds): Season | null;
	groupFor(spiritId: SpiritIds): SpiritGroup | null;
}

class KingdomBuildError extends Error {}

function collectSpirits(): Collection<SpiritIds, Spirit> {
	const spirits = new Collection<SpiritIds, Spirit>();

	const add = (spirit: Spirit) => {
		if (spirits.has(spirit.id)) {
			throw new KingdomBuildError(`Duplicate spirit id: ${spirit.id}.`);
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
			throw new KingdomBuildError(`Spirit ${spirit.id} lives in unknown area ${spirit.area}.`);
		}

		if (spirit.isElderSpirit()) {
			if (spirit.realm === null || !realms.has(spirit.realm)) {
				throw new KingdomBuildError(`Elder ${spirit.id} has no valid realm.`);
			}

			continue;
		}

		const expected = spirit.area === null ? null : realmForArea(spirit.area);

		if (spirit.realm !== expected) {
			throw new KingdomBuildError(
				`Spirit ${spirit.id}: realm ${spirit.realm} disagrees with area ${spirit.area} → ${expected}.`,
			);
		}
	}

	for (const realm of realms.values()) {
		const derived = spirits.filter(
			(spirit) => spirit.isStandardSpirit() && spirit.realm === realm.name,
		);

		if (derived.size !== realm.spirits.size) {
			throw new KingdomBuildError(
				`Realm ${realm.name} lists ${realm.spirits.size} standard spirits but ${derived.size} resolve to it by area.`,
			);
		}

		for (const id of realm.spirits.keys()) {
			if (!derived.has(id)) {
				throw new KingdomBuildError(
					`Realm ${realm.name} lists ${id}, which does not resolve to it.`,
				);
			}
		}
	}

	for (const season of SEASONS.values()) {
		if (season.guide.seasonId !== season.id) {
			throw new KingdomBuildError(
				`Guide ${season.guide.id} does not belong to season ${season.id}.`,
			);
		}

		for (const spirit of season.spirits.values()) {
			if (spirit.seasonId !== season.id) {
				throw new KingdomBuildError(
					`Spirit ${spirit.id} is listed in season ${season.id} but belongs to ${spirit.seasonId}.`,
				);
			}
		}
	}
}

function indexBy<K>(
	spirits: ReadonlyCollection<SpiritIds, Spirit>,
	key: (spirit: Spirit) => K | null,
): Collection<K, Collection<SpiritIds, Spirit>> {
	const index = new Collection<K, Collection<SpiritIds, Spirit>>();

	for (const spirit of spirits.values()) {
		const resolved = key(spirit);

		if (resolved === null) {
			continue;
		}

		const bucket = index.ensure(resolved, () => new Collection<SpiritIds, Spirit>());
		bucket.set(spirit.id, spirit);
	}

	return index;
}

function buildKingdom(): Kingdom {
	const realms = new Collection<RealmName, Realm>(REALMS.map((realm) => [realm.name, realm]));
	const areas = new Collection<AreaName, Area>(AREAS.map((area) => [area.name, area]));
	const spirits = collectSpirits();

	validate(spirits, realms, areas);

	const spiritsByRealm = indexBy(spirits, (spirit) => spirit.realm);
	const spiritsByArea = indexBy(spirits, (spirit) => spirit.area);
	const spiritsBySeason = indexBy(spirits, (spirit) =>
		spirit.isSeasonalSpirit() || spirit.isGuideSpirit() ? spirit.seasonId : null,
	);

	const kingdom: Kingdom = {
		realms,
		areas,
		seasons: SEASONS,
		spirits,
		spiritsByRealm,
		spiritsByArea,
		spiritsBySeason,
		realmOf(spiritId) {
			const realm = spirits.get(spiritId)?.realm;
			return realm == null ? null : (realms.get(realm) ?? null);
		},
		areaOf(spiritId) {
			const area = spirits.get(spiritId)?.area;
			return area == null ? null : (areas.get(area) ?? null);
		},
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
				return { kind: "elders", spirits: ELDER_SPIRITS };
			}

			if (spirit.isStandardSpirit()) {
				const realm = realms.get(spirit.realm)!;
				return { kind: "realm", realm, spirits: realm.spirits };
			}

			const season = SEASONS.get(spirit.seasonId)!;
			const members = new Collection<SpiritIds, GuideSpirit | SeasonalSpirit>([
				[season.guide.id, season.guide],
			]).concat(season.spirits);

			return { kind: "season", season, spirits: members };
		},
	};

	return Object.freeze(kingdom);
}

export const KINGDOM: Kingdom = buildKingdom();
