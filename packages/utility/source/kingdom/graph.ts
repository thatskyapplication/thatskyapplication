import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import { type Area, createArea } from "../models/area.js";
import { Realm } from "../models/realm.js";
import type { Season } from "../models/season.js";
import type {
	ElderSpirit,
	GuideSpirit,
	SeasonalSpirit,
	Spirit,
	StandardSpirit,
} from "../models/spirits.js";
import type { SeasonIds } from "../season.js";
import type { SpiritIds } from "../utility/spirits.js";
import { AREA_DEFINITIONS } from "./areas/definitions.js";
import type { AreaName, RealmName } from "./geography.js";
import { ELDER_SPIRITS, REALM_DEFINITIONS, STANDARD_SPIRITS } from "./realms/definitions.js";
import { SEASONS } from "./seasons/index.js";

export const AREAS: ReadonlyCollection<AreaName, Area> = new Collection<AreaName, Area>(
	AREA_DEFINITIONS.map((area) => [area.name, createArea(area)]),
);

export const REALMS: ReadonlyCollection<RealmName, Realm> = new Collection<RealmName, Realm>(
	REALM_DEFINITIONS.map((realm) => [realm.name, new Realm(realm)]),
);

const seasonalSpirits: SeasonalSpirit[] = [];
const guideSpirits: GuideSpirit[] = [];
const areaDefinitionsByName = new Map(AREA_DEFINITIONS.map((area) => [area.name, area]));

for (const season of SEASONS.values()) {
	guideSpirits.push(season.guide);
	seasonalSpirits.push(...season.spirits.values());
}

for (const [areaName, area] of AREAS) {
	const definition = areaDefinitionsByName.get(areaName);

	if (!definition) {
		throw new Error(`Missing area definition for ${String(areaName)}.`);
	}

	area.realm = definition.realm ? (REALMS.get(definition.realm) ?? null) : null;
}

for (const spirit of STANDARD_SPIRITS.values()) {
	const area = AREAS.get(spirit.areaName);

	if (!area?.realm) {
		throw new Error(`Standard spirit ${spirit.id} is in an area without a realm.`);
	}

	spirit.area = area;
	spirit.realm = area.realm;
}

for (const spirit of ELDER_SPIRITS.values()) {
	const area = AREAS.get(spirit.areaName);
	const realm = REALMS.find((candidate) => candidate.elder?.id === spirit.id) ?? null;

	if (!(area && realm)) {
		throw new Error(`Elder spirit ${spirit.id} could not be linked to its area and realm.`);
	}

	spirit.area = area;
	spirit.realm = realm;
}

for (const season of SEASONS.values()) {
	const guideArea = season.guide.areaName ? (AREAS.get(season.guide.areaName) ?? null) : null;

	season.guide.area = guideArea;
	season.guide.realm = guideArea?.realm ?? null;
	season.guide.season = season;

	for (const spirit of season.spirits.values()) {
		const area = AREAS.get(spirit.areaName);

		if (!area) {
			throw new Error(`Seasonal spirit ${spirit.id} is in an unknown area.`);
		}

		spirit.area = area;
		spirit.realm = area.realm;
		spirit.season = season;
	}
}

for (const area of AREAS.values()) {
	const standardSpiritsInArea = [...STANDARD_SPIRITS.values()].filter(
		(spirit) => spirit.areaName === area.name,
	);
	const elderSpiritsInArea = [...ELDER_SPIRITS.values()].filter(
		(spirit) => spirit.areaName === area.name,
	);
	const seasonalSpiritsInArea = seasonalSpirits.filter((spirit) => spirit.areaName === area.name);
	const guideSpiritsInArea = guideSpirits.filter((spirit) => spirit.areaName === area.name);
	const seasons = [
		...new Set([...seasonalSpiritsInArea, ...guideSpiritsInArea].map((spirit) => spirit.season)),
	];

	area.standardSpirits = standardSpiritsInArea.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, StandardSpirit>(),
	);
	area.elderSpirits = elderSpiritsInArea.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, ElderSpirit>(),
	);
	area.seasonalSpirits = seasonalSpiritsInArea.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, SeasonalSpirit>(),
	);
	area.guideSpirits = guideSpiritsInArea.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, GuideSpirit>(),
	);
	area.spirits = [
		...standardSpiritsInArea,
		...elderSpiritsInArea,
		...seasonalSpiritsInArea,
		...guideSpiritsInArea,
	].reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, Spirit>(),
	);
	area.seasons = seasons.reduce(
		(collection, season) => collection.set(season.id, season),
		new Collection<SeasonIds, Season>(),
	);
}

for (const realm of REALMS.values()) {
	const areas = [...AREAS.values()].filter((area) => area.realm?.name === realm.name);
	const seasonalSpiritsInRealm = areas.flatMap((area) => [...area.seasonalSpirits.values()]);
	const guideSpiritsInRealm = areas.flatMap((area) => [...area.guideSpirits.values()]);
	const seasons = [
		...new Set([...seasonalSpiritsInRealm, ...guideSpiritsInRealm].map((spirit) => spirit.season)),
	];

	realm.areas = areas.reduce(
		(collection, area) => collection.set(area.name, area),
		new Collection<Area["name"], Area>(),
	);
	realm.seasonalSpirits = seasonalSpiritsInRealm.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, SeasonalSpirit>(),
	);
	realm.guideSpirits = guideSpiritsInRealm.reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, GuideSpirit>(),
	);
	realm.spirits = [
		...realm.standardSpirits.values(),
		...realm.elderSpirits.values(),
		...seasonalSpiritsInRealm,
		...guideSpiritsInRealm,
	].reduce(
		(collection, spirit) => collection.set(spirit.id, spirit),
		new Collection<SpiritIds, Spirit>(),
	);
	realm.seasons = seasons.reduce(
		(collection, season) => collection.set(season.id, season),
		new Collection<SeasonIds, Season>(),
	);
	realm.wingedLight = areas.reduce(
		(wingedLight, linkedArea) => wingedLight + linkedArea.wingedLight,
		0,
	);
}

for (const season of SEASONS.values()) {
	const areas = [
		...new Set(
			[...season.allSpirits.values()].flatMap((spirit) => (spirit.area ? [spirit.area] : [])),
		),
	];
	const realms = [...new Set(areas.flatMap((area) => (area.realm ? [area.realm] : [])))];

	season.areas = areas.reduce(
		(collection, area) => collection.set(area.name, area),
		new Collection<AreaName, Area>(),
	);
	season.realms = realms.reduce(
		(collection, realm) => collection.set(realm.name, realm),
		new Collection<RealmName, Realm>(),
	);
}

export { STANDARD_SPIRITS, ELDER_SPIRITS };

export const REALM_SPIRITS = STANDARD_SPIRITS.merge<ElderSpirit, StandardSpirit | ElderSpirit>(
	ELDER_SPIRITS,
	(value) => ({ keep: true, value }),
	(value) => ({ keep: true, value }),
	() => {
		throw new Error("Duplicate spirits detected.");
	},
);

export function spirits(): ReadonlyCollection<
	SpiritIds,
	StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit
> {
	return REALM_SPIRITS.merge<
		SeasonalSpirit | GuideSpirit,
		StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit
	>(
		[...guideSpirits, ...seasonalSpirits].reduce(
			(collection, spirit) => collection.set(spirit.id, spirit),
			new Collection<SpiritIds, SeasonalSpirit | GuideSpirit>(),
		),
		(value) => ({ keep: true, value }),
		(value) => ({ keep: true, value }),
		() => {
			throw new Error("Duplicate spirits detected.");
		},
	);
}
