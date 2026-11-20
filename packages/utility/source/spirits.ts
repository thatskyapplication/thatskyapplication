import {
	type APIButtonComponent,
	type APIComponentInContainer,
	type APIContainerComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import { resolveCostToString } from "./catalogue.js";
import { epochSeconds, skyNow } from "./dates.js";
import { formatEmoji } from "./emojis/emoji.js";
import {
	RETURNING_DATES,
	SEASONS,
	TRAVELLING_DATES,
	VISITS_ABSENT,
	visitsForSpirit,
} from "./kingdom/seasons/index.js";
import { spirits } from "./kingdom/spirits.js";
import type { SeasonalSpiritVisitTravellingErrorData, Spirit } from "./models/spirits.js";
import type { IndividualSpiritVisit, MessageFormatting } from "./types/index.js";
import { type CostEntry, sumCosts } from "./utility/functions.js";
import {
	type FriendshipTree,
	friendshipTreeFor,
	friendshipTreeToItems,
	friendshipTreeVariants,
	type ItemCost,
	type LegacyFriendshipTree,
	SPIRITS_HISTORY_TITLE_KEYS,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spiritNotReturnedTranslationKey,
} from "./utility/spirits.js";

export const MAXIMUM_SPIRITS_HISTORY_ENTRIES = 10 as const;

const SPIRITS_HISTORY_COST_UNIT_TYPES = new Set<CostEntry["type"]>([
	"candles",
	"hearts",
	"ascendedCandles",
	"seasonalCandles",
	"seasonalHearts",
]);

export function spiritWikiMarkdownLink(
	spiritId: SpiritIds,
	{ locale, t }: Pick<MessageFormatting, "locale" | "t">,
) {
	return `[${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spiritId}`, { lng: locale, ns: "general" })})`;
}

function visitField(seasonalSpiritVisit: typeof TRAVELLING_DATES | typeof RETURNING_DATES) {
	const maxLength = seasonalSpiritVisit.lastKey()!.toString().length;
	const visits = [];

	for (const [visit, { start }] of seasonalSpiritVisit) {
		const startUnix = epochSeconds(start);
		visits.push(
			`\`#${String(visit).padStart(maxLength, "0")}\` <t:${startUnix}:s> (<t:${startUnix}:R>)`,
		);
	}

	return visits.join("\n");
}

function visitErrorField(
	seasonalSpiritVisit: SeasonalSpiritVisitTravellingErrorData,
	{ locale, t }: Pick<MessageFormatting, "locale" | "t">,
) {
	return seasonalSpiritVisit
		.reduce<string[]>((visits, start) => {
			const startUnix = epochSeconds(start);
			visits.push(
				`\`${t("spirits.visit-error", { lng: locale, ns: "features" })}\` <t:${startUnix}:s> (<t:${startUnix}:R>)`,
			);
			return visits;
		}, [])
		.join("\n");
}

export function friendshipTreeTotalCost(friendshipTree: FriendshipTree | LegacyFriendshipTree) {
	const costs: ItemCost[] = [];

	for (const { cost } of friendshipTreeToItems(friendshipTree)) {
		if (cost !== null) {
			costs.push(cost);
		}
	}

	return sumCosts(costs);
}

interface SpiritsHistoryCost {
	readonly costs: readonly CostEntry[];
	readonly units: number;
}

function spiritsHistoryCost(
	friendshipTree: FriendshipTree | LegacyFriendshipTree,
): SpiritsHistoryCost {
	const costs = friendshipTreeTotalCost(friendshipTree);
	let units = 0;

	for (const { amount, type } of costs) {
		if (SPIRITS_HISTORY_COST_UNIT_TYPES.has(type)) {
			units += amount;
		}
	}

	return { costs, units };
}

const spiritsHistoryCosts = new Map<
	SpiritIds,
	{ readonly postSeason: SpiritsHistoryCost; readonly seasonal: SpiritsHistoryCost }
>();

for (const season of SEASONS.values()) {
	for (const spirit of season.spirits.values()) {
		const { postSeason, seasonal } = spirit.friendshipTrees;

		if (!postSeason) {
			continue;
		}

		spiritsHistoryCosts.set(spirit.id, {
			postSeason: spiritsHistoryCost(postSeason.friendshipTree),
			seasonal: spiritsHistoryCost(seasonal.friendshipTree),
		});
	}
}

function visitsByCost(tree: "postSeason" | "seasonal") {
	return VISITS_ABSENT.filter(({ spiritId }) => spiritsHistoryCosts.has(spiritId)).sort(
		(a, b) =>
			spiritsHistoryCosts.get(b.spiritId)![tree].units -
			spiritsHistoryCosts.get(a.spiritId)![tree].units,
	);
}

const VISITS_BY_SEASONAL_COST = visitsByCost("seasonal");

const SPIRITS_HISTORY_VISITS = {
	[SpiritsHistoryOrderType.Natural]: TRAVELLING_DATES,
	[SpiritsHistoryOrderType.Rarity]: VISITS_ABSENT,
	[SpiritsHistoryOrderType.Cost]: visitsByCost("postSeason"),
} as const satisfies Readonly<Record<SpiritsHistoryOrderTypes, unknown>>;

interface SpiritsHistoryEntry {
	readonly costs: readonly CostEntry[] | null;
	readonly number: number;
	readonly spirit: Spirit;
	readonly visit: IndividualSpiritVisit;
}

interface SpiritsHistoryDataOptions {
	seasonal?: boolean;
}

export function spiritsHistoryData(
	type: SpiritsHistoryOrderTypes,
	pageSize: number,
	{ seasonal = false }: SpiritsHistoryDataOptions = {},
) {
	const availableSpirits = spirits();
	const entries: SpiritsHistoryEntry[] = [];
	const cost = type === SpiritsHistoryOrderType.Cost;
	const visits = cost && seasonal ? VISITS_BY_SEASONAL_COST : SPIRITS_HISTORY_VISITS[type];

	for (const [key, visit] of visits) {
		const spirit = availableSpirits.get(visit.spiritId);

		if (spirit) {
			entries.push({
				costs: cost
					? (spiritsHistoryCosts.get(visit.spiritId)?.[seasonal ? "seasonal" : "postSeason"]
							.costs ?? null)
					: null,
				number: type === SpiritsHistoryOrderType.Natural ? key : entries.length + 1,
				spirit,
				visit,
			});
		}
	}

	return { entries, maximumPage: Math.max(1, Math.ceil(entries.length / pageSize)) };
}

interface SpiritContainerData extends MessageFormatting {
	spirit: Spirit;
	friendshipTreeImageURLs: readonly string[];
}

export function spiritContainer({
	emojis,
	locale,
	spirit,
	t,
	friendshipTreeImageURLs,
}: SpiritContainerData): APIContainerComponent {
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const description = [];
	const visits = [];

	if (isSeasonalSpirit) {
		const { travellingErrors } = spirit.visits;
		const { returning, travelling } = visitsForSpirit(spirit.id);
		const travellingValue = [];

		if (travelling.size > 0) {
			travellingValue.push(visitField(travelling));
		}

		if (travellingErrors.size > 0) {
			travellingValue.push(visitErrorField(travellingErrors, { locale, t }));
		}

		if (travellingValue.length > 0) {
			visits.push(
				`### ${t("spirits.travelling", { lng: locale, ns: "features" })}\n${travellingValue.join("\n")}`,
			);
		}

		if (returning.size > 0) {
			visits.push(
				`### ${t("spirits.returning", { lng: locale, ns: "features" })}\n${visitField(returning)}`,
			);
		}

		const notReturnedKey = spiritNotReturnedTranslationKey(spirit, skyNow());

		if (notReturnedKey) {
			description.push(`⚠️ ${t(notReturnedKey, { lng: locale, ns: "features" })}`);
		}
	}

	const totalOffer = [];

	for (const variant of friendshipTreeVariants(spirit)) {
		const totalCost = friendshipTreeTotalCost(friendshipTreeFor(spirit, variant)!);
		const totalCostString = resolveCostToString(totalCost, { emojis, locale }).join("");

		if (totalCostString.length > 0) {
			totalOffer.push(totalCostString);
		}
	}

	if (totalOffer.length > 0) {
		description.push(totalOffer.join("\n"));
	}

	const seasonEmoji = spiritSeason === null ? null : emojis.SeasonIdToSeasonalEmoji[spiritSeason];

	const components: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `##${seasonEmoji ? ` ${formatEmoji(seasonEmoji)}` : ""} ${spiritWikiMarkdownLink(spirit.id, { locale, t })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	if (description.length > 0) {
		components.push({
			type: ComponentType.TextDisplay,
			content: description.join("\n"),
		});
	}

	if (visits.length > 0) {
		components.push({
			type: ComponentType.TextDisplay,
			content: visits.join("\n"),
		});
	}

	if (friendshipTreeImageURLs.length > 0) {
		components.push({
			type: ComponentType.MediaGallery,
			items: friendshipTreeImageURLs.map((url) => ({ media: { url } })),
		});
	}

	if (isGuideSpirit && spirit.friendshipTrees.seasonal.inProgress) {
		components.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t(`catalogue.spirit-kind-not-fully-revealed.${spirit.kind}`, { lng: locale, ns: "features" })}`,
		});
	}

	return { type: ComponentType.Container, components };
}

interface SpiritsHistoryContainerData extends MessageFormatting {
	maximumEntries?: number;
	page: number;
	pageSize: number;
	seasonal?: boolean;
	type: SpiritsHistoryOrderTypes;
	viewButton: (spiritId: SpiritIds, index: number) => APIButtonComponent;
}

export function spiritsHistoryContainer({
	emojis,
	locale,
	maximumEntries = MAXIMUM_SPIRITS_HISTORY_ENTRIES,
	page,
	pageSize,
	seasonal = false,
	t,
	type,
	viewButton,
}: SpiritsHistoryContainerData) {
	const offset = (page - 1) * pageSize;
	const limit = offset + Math.min(pageSize, maximumEntries);
	const { entries, maximumPage } = spiritsHistoryData(type, pageSize, { seasonal });

	const components: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t(SPIRITS_HISTORY_TITLE_KEYS[type], { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (let index = offset; index < limit; index++) {
		const entry = entries.at(index);

		if (!entry) {
			break;
		}

		const { costs, number, spirit, visit } = entry;

		// Need to escape # otherwise Discord will not render the heading correctly.
		const heading = `### \\#${number} ${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}`;

		let detail: string;

		if (costs === null) {
			const startUnix = epochSeconds(visit.start);
			detail = `<t:${startUnix}:s> (<t:${startUnix}:R>)`;
		} else {
			detail = resolveCostToString(costs, { emojis, locale }).join("");
		}

		components.push({
			type: ComponentType.Section,
			accessory: viewButton(spirit.id, index),
			components: [{ type: ComponentType.TextDisplay, content: `${heading}\n\n${detail}` }],
		});
	}

	components.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: `-# ${t("page", { lng: locale, ns: "general" })} ${page}/${maximumPage}`,
		},
	);

	const container: APIContainerComponent = { type: ComponentType.Container, components };
	return { container, maximumPage };
}
