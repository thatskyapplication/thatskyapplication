import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import {
	resolveReturningSpirits,
	RETURNING_DATES,
	SEASONS,
	skySeasons,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "../source/kingdom/seasons/index.js";
import { spirits } from "../source/kingdom/spirits.js";
import { SpiritKind } from "../source/models/spirits.js";
import { SeasonId } from "../source/season.js";
import { type BaseVisit, type Visit, VisitType } from "../source/types/index.js";
import {
	SpiritId,
	type SpiritIds,
	spiritNotReturnedTranslationKey,
} from "../source/utility/spirits.js";

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
	const inlinePeriods: {
		spiritId: SpiritIds;
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
	}[] = [];
	const samePeriod = (
		left: Pick<BaseVisit, "start" | "end">,
		right: Pick<BaseVisit, "start" | "end">,
	) =>
		Temporal.ZonedDateTime.compare(left.start, right.start) === 0 &&
		Temporal.ZonedDateTime.compare(left.end, right.end) === 0;
	let expectedVisit = 1;
	let associations = 0;
	let previous: Pick<BaseVisit, "start" | "end"> | undefined;

	for (const season of SEASONS.values()) {
		for (const spirit of season.spirits.values()) {
			for (const period of spirit.visits.returning) {
				inlinePeriods.push({ ...period, spiritId: spirit.id });
			}
		}
	}

	for (const [visitNumber, visit] of RETURNING_DATES) {
		equal(visitNumber, expectedVisit);
		equal(visit.type, VisitType.Returning);
		ok(visit.spiritIds.length > 0);
		equal(new Set(visit.spiritIds).size, visit.spiritIds.length);

		if (previous) {
			const startComparison = Temporal.ZonedDateTime.compare(visit.start, previous.start);

			ok(
				startComparison > 0 ||
					(startComparison === 0 && Temporal.ZonedDateTime.compare(visit.end, previous.end) > 0),
			);
		}

		for (const spiritId of visit.spiritIds) {
			equal(
				inlinePeriods.filter((period) => period.spiritId === spiritId && samePeriod(period, visit))
					.length,
				1,
			);
		}

		expectedVisit++;
		associations += visit.spiritIds.length;
		previous = visit;
	}

	equal(associations, inlinePeriods.length);

	for (const period of inlinePeriods) {
		equal(
			RETURNING_DATES.filter(
				(visit) => visit.spiritIds.includes(period.spiritId) && samePeriod(visit, period),
			).size,
			1,
		);
	}
});

test("Returning spirit visits use start-inclusive and end-exclusive active periods.", () => {
	const visit = RETURNING_DATES.first()!;
	const beforeStart = visit.start.subtract({ nanoseconds: 1 });
	const beforeEnd = visit.end.subtract({ nanoseconds: 1 });
	const beforeStartSpirits = resolveReturningSpirits(beforeStart);
	const atStartSpirits = resolveReturningSpirits(visit.start);
	const beforeEndSpirits = resolveReturningSpirits(beforeEnd);
	const atEndSpirits = resolveReturningSpirits(visit.end);

	for (const spiritId of visit.spiritIds) {
		equal(beforeStartSpirits?.has(spiritId) ?? false, false);
		equal(atStartSpirits?.has(spiritId) ?? false, true);
		equal(beforeEndSpirits?.has(spiritId) ?? false, true);
		equal(atEndSpirits?.has(spiritId) ?? false, false);
	}
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

	equal(VISITS_ABSENT.size, latestVisits.size);
	let previous: BaseVisit | undefined;

	for (const [spiritId, visit] of VISITS_ABSENT) {
		equal(visit.spiritId, spiritId);

		if (previous) {
			ok(Temporal.ZonedDateTime.compare(visit.start, previous.start) >= 0);
		}

		const latest = latestVisits.get(spiritId);
		ok(latest);
		equal(visit.type, latest.type);
		equal(Temporal.ZonedDateTime.compare(visit.start, latest.start), 0);
		equal(Temporal.ZonedDateTime.compare(visit.end, latest.end), 0);
		previous = visit;
	}
});
