import {
	SPIRITS_HISTORY_PAGE_SIZE,
	SpiritsHistoryOrderType,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "@thatskyapplication/utility";

export const SPIRIT_HISTORY_LOCATION_STATE = { fromSpiritHistory: true } as const;

export function fromSpiritHistory(state: unknown): boolean {
	return (
		typeof state === "object" &&
		state !== null &&
		"fromSpiritHistory" in state &&
		state.fromSpiritHistory === true
	);
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

export function spiritsHistoryPagination(searchParams: URLSearchParams) {
	const order =
		searchParams.get("order") === "rarity"
			? SpiritsHistoryOrderType.Rarity
			: SpiritsHistoryOrderType.Natural;

	const visits = order === SpiritsHistoryOrderType.Natural ? TRAVELLING_DATES : VISITS_ABSENT;
	const maximumPage = Math.max(1, Math.ceil(visits.size / SPIRITS_HISTORY_PAGE_SIZE));
	const requestedPage = Number(searchParams.get("page") ?? 1);

	const page =
		Number.isSafeInteger(requestedPage) && requestedPage > 0
			? Math.min(requestedPage, maximumPage)
			: 1;

	return { maximumPage, order, page };
}
