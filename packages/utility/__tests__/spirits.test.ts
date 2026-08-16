import { equal } from "node:assert/strict";
import { test } from "node:test";
import { skyDate } from "../source/dates.js";
import { skySeasons } from "../source/kingdom/seasons/index.js";
import { spirits } from "../source/kingdom/spirits.js";
import { SpiritKind } from "../source/models/spirits.js";
import { SeasonId } from "../source/season.js";
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
