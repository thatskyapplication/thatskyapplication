import type { TFunction } from "i18next";
import {
	type SpiritIds,
	SPIRITS_HISTORY_ORDER_TYPE_VALUES,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spiritsHistoryData,
} from "@thatskyapplication/utility";
import type { ExternalLinkListItem } from "~/components/ExternalLinkList";
import { parsePage } from "~/utility/functions.js";

export const SPIRIT_HISTORY_LOCATION_STATE = { fromSpiritHistory: true } as const;

export const SPIRIT_HISTORY_PAGE_SIZE = 24 as const;

const SPIRIT_HISTORY_ORDER_PARAMETERS = {
	[SpiritsHistoryOrderType.Natural]: null,
	[SpiritsHistoryOrderType.Rarity]: "rarity",
	[SpiritsHistoryOrderType.Cost]: "cost",
} as const satisfies Readonly<Record<SpiritsHistoryOrderTypes, string | null>>;

export function fromSpiritHistory(state: unknown): boolean {
	return (
		typeof state === "object" &&
		state !== null &&
		"fromSpiritHistory" in state &&
		state.fromSpiritHistory === true
	);
}

export function spiritWikiLink(spiritId: SpiritIds, t: TFunction): ExternalLinkListItem {
	return {
		id: spiritId,
		label: t(`spirits.${spiritId}`, { ns: "general" }),
		href: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
	};
}

export function spiritURL(searchParams: URLSearchParams, spiritId: number) {
	const parameters = new URLSearchParams(searchParams);
	parameters.set("spirit", spiritId.toString());
	return `?${parameters.toString()}`;
}

export function spiritHistoryURL(searchParams: URLSearchParams) {
	const parameters = new URLSearchParams(searchParams);
	parameters.delete("spirit");
	const query = parameters.toString();
	return query.length > 0 ? `?${query}` : "/spirits";
}

export function spiritHistoryOrderURL(
	searchParams: URLSearchParams,
	order: SpiritsHistoryOrderTypes,
) {
	const parameters = new URLSearchParams(searchParams);
	const orderParameter = SPIRIT_HISTORY_ORDER_PARAMETERS[order];
	parameters.delete("page");
	parameters.delete("spirit");

	if (orderParameter === null) {
		parameters.delete("order");
	} else {
		parameters.set("order", orderParameter);
	}

	const query = parameters.toString();
	return query.length > 0 ? `?${query}` : "/spirits";
}

export function spiritsHistoryPagination(searchParams: URLSearchParams) {
	const orderParameter = searchParams.get("order");

	const order =
		SPIRITS_HISTORY_ORDER_TYPE_VALUES.find(
			(type) => SPIRIT_HISTORY_ORDER_PARAMETERS[type] === orderParameter,
		) ?? SpiritsHistoryOrderType.Natural;

	const { entries, maximumPage } = spiritsHistoryData(order, SPIRIT_HISTORY_PAGE_SIZE);
	return { entries, maximumPage, order, page: Math.min(parsePage(searchParams), maximumPage) };
}
