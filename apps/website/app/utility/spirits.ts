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
