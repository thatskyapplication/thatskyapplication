import { deepStrictEqual, equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import {
	resolveReturningSpirits,
	RETURNING_DATES,
	skySeasons,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "../source/kingdom/seasons/index.js";
import { spirits } from "../source/kingdom/spirits.js";
import { SpiritKind } from "../source/models/spirits.js";
import { SeasonId } from "../source/season.js";
import { type BaseVisit, type Visit, VisitType } from "../source/types/index.js";
import { SpiritId, spiritNotReturnedTranslationKey } from "../source/utility/spirits.js";

test("Non-spirit seasons expose the correct spirit kinds.", () => {
	const seasons = skySeasons();
	const littlePrince = seasons.get(SeasonId.LittlePrince)!;
	const shattering = seasons.get(SeasonId.Shattering)!;
	const revival = seasons.get(SeasonId.Revival)!;
	const nesting = seasons.get(SeasonId.Nesting)!;
	const duets = seasons.get(SeasonId.Duets)!;
	const moomin = seasons.get(SeasonId.Moomin)!;
	const twoEmbersPart1 = seasons.get(SeasonId.TwoEmbersPart1)!;
	const dearVanGogh = seasons.get(SeasonId.DearVanGogh)!;

	equal(littlePrince.guide.kind, SpiritKind.Entity);

	for (const spirit of shattering.spiritsWithGuide.values()) {
		equal(spirit.kind, SpiritKind.Entity);
	}

	for (const spirit of revival.spirits.values()) {
		equal(spirit.kind, SpiritKind.Mannequin);
	}

	equal(revival.guide.kind, SpiritKind.Spirit);

	for (const spirit of nesting.spirits.values()) {
		equal(spirit.kind, SpiritKind.Entity);
	}

	equal(nesting.guide.kind, SpiritKind.Spirit);
	equal(duets.guide.kind, SpiritKind.Spirit);

	for (const spirit of duets.spirits.values()) {
		equal(
			spirit.kind,
			spirit.id === SpiritId.TheMusiciansLegacy
				? SpiritKind.Entity
				: spirit.id === SpiritId.CompassionateCellist
					? SpiritKind.Spirit
					: SpiritKind.Mannequin,
		);
	}

	equal(moomin.guide.kind, SpiritKind.Entity);

	for (const spirit of moomin.spirits.values()) {
		equal(spirit.kind, SpiritKind.Mannequin);
	}

	equal(twoEmbersPart1.guide.kind, SpiritKind.Entity);

	for (const spirit of twoEmbersPart1.spirits.values()) {
		equal(spirit.kind, SpiritKind.Spirit);
	}

	equal(dearVanGogh.guide.kind, SpiritKind.Entity);

	for (const spirit of dearVanGogh.spirits.values()) {
		equal(spirit.kind, SpiritKind.Mannequin);
	}
});

test("Not-returned spirit copy follows the spirit's kind.", () => {
	const collection = spirits();
	const beforeReturns = skyDate(2019, 1, 1);
	const afterReturns = skyDate(2030, 1, 1);
	const entity = collection.get(SpiritId.AncientLight1)!;
	const nestingEntity = collection.get(SpiritId.NestingSolarium)!;
	const mannequin = collection.get(SpiritId.EchoOfAnAbandonedRefuge)!;
	const seasonalSpirit = collection.get(SpiritId.SassyDrifter)!;
	const guide = collection.get(SpiritId.NestingGuide)!;

	equal(spiritNotReturnedTranslationKey(entity, beforeReturns), "spirits.kind-not-yet-returned.1");
	equal(
		spiritNotReturnedTranslationKey(nestingEntity, beforeReturns),
		"spirits.kind-not-yet-returned.1",
	);
	equal(
		spiritNotReturnedTranslationKey(mannequin, beforeReturns),
		"spirits.kind-not-yet-returned.2",
	);
	equal(
		spiritNotReturnedTranslationKey(seasonalSpirit, beforeReturns),
		"spirits.kind-not-yet-returned.0",
	);
	equal(spiritNotReturnedTranslationKey(seasonalSpirit, afterReturns), null);
	equal(spiritNotReturnedTranslationKey(guide, beforeReturns), null);
});

test("Returning spirit visits are grouped and numbered chronologically.", () => {
	const visits = [...RETURNING_DATES.values()];

	equal(visits.length, 14);
	deepStrictEqual(
		visits.map(({ spiritIds }) => spiritIds.length),
		[4, 3, 4, 4, 4, 4, 4, 6, 4, 4, 4, 6, 4, 4],
	);
	equal(
		visits.reduce((total, { spiritIds }) => total + spiritIds.length, 0),
		59,
	);

	for (const [index, visit] of visits.entries()) {
		equal(visit.visit, index + 1);
		equal(visit.type, VisitType.Returning);
		ok(visit.spiritIds.length > 0);

		if (index > 0) {
			ok(Temporal.ZonedDateTime.compare(visit.start, visits[index - 1]!.start) > 0);
		}
	}

	const sharedVisit = RETURNING_DATES.get(14)!;

	deepStrictEqual(sharedVisit.spiritIds, [
		SpiritId.HerbGatherer,
		SpiritId.Hunter,
		SpiritId.FeudalLord,
		SpiritId.Princess,
	]);
	equal(sharedVisit.start.toString(), skyDate(2026, 8, 28).toString());
	equal(sharedVisit.end.toString(), skyDate(2026, 9, 11).toString());
});

test("Returning periods live on spirits and preserve repeat visits.", () => {
	const spirit = spirits().get(SpiritId.FranticStagehand)!;

	ok(spirit.isSeasonalSpirit());
	const periods = spirit.visits.returning.map(({ start, end }) => [
		start.toString(),
		end.toString(),
	]);
	ok(Array.isArray(spirit.visits.returning));
	deepStrictEqual(periods, [
		[skyDate(2024, 3, 4).toString(), skyDate(2024, 3, 18).toString()],
		[skyDate(2025, 11, 17).toString(), skyDate(2025, 12, 1).toString()],
	]);
	deepStrictEqual(
		[...RETURNING_DATES.values()]
			.filter(({ spiritIds }) => spiritIds.includes(spirit.id))
			.map(({ visit }) => visit),
		[5, 11],
	);
});

test("Returning spirit visits use start-inclusive and end-exclusive active periods.", () => {
	const visit = RETURNING_DATES.get(14)!;
	const beforeStart = visit.start.subtract({ nanoseconds: 1 });
	const beforeEnd = visit.end.subtract({ nanoseconds: 1 });

	equal(resolveReturningSpirits(beforeStart), null);
	deepStrictEqual([...resolveReturningSpirits(visit.start)!.keys()], visit.spiritIds);
	deepStrictEqual([...resolveReturningSpirits(beforeEnd)!.keys()], visit.spiritIds);
	equal(resolveReturningSpirits(visit.end), null);
});

test("Visit types discriminate their spirit identifiers.", () => {
	const visits: Visit[] = [TRAVELLING_DATES.first()!, RETURNING_DATES.first()!];

	for (const visit of visits) {
		if (visit.type === VisitType.Travelling) {
			ok(Number.isInteger(visit.spiritId));
			equal("spiritIds" in visit, false);
		} else {
			ok(visit.spiritIds.length > 0);
			equal("spiritId" in visit, false);
		}
	}
});

test("Absent visits retain the latest visit for each spirit.", () => {
	const latestVisits = new Map<number, BaseVisit>();
	const retainLatest = (spiritId: number, visit: BaseVisit) => {
		const latest = latestVisits.get(spiritId);

		if (!latest || Temporal.ZonedDateTime.compare(visit.start, latest.start) >= 0) {
			latestVisits.set(spiritId, visit);
		}
	};

	for (const visit of TRAVELLING_DATES.values()) {
		retainLatest(visit.spiritId, visit);
	}

	for (const visit of RETURNING_DATES.values()) {
		for (const spiritId of visit.spiritIds) {
			retainLatest(spiritId, visit);
		}
	}

	equal(VISITS_ABSENT.length, latestVisits.size);
	equal(new Set(VISITS_ABSENT.map(({ spiritId }) => spiritId)).size, VISITS_ABSENT.length);

	for (const visit of VISITS_ABSENT) {
		const latest = latestVisits.get(visit.spiritId);
		ok(latest);
		equal(visit.type, latest.type);
		equal(visit.visit, latest.visit);
		equal(Temporal.ZonedDateTime.compare(visit.start, latest.start), 0);
		equal(Temporal.ZonedDateTime.compare(visit.end, latest.end), 0);
	}
});
