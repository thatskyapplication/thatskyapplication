import type { Item } from "@thatskyapplication/utility";
import { useFetcher } from "react-router";

export function useItemOwnership(item: Item, data: ReadonlySet<number>) {
	const fetcher = useFetcher();
	const actualOwned = item.cosmetics.every((cosmetic) => data.has(cosmetic));
	const owned = fetcher.formData ? fetcher.formData.get("owned") === "true" : actualOwned;

	const toggle = () =>
		fetcher.submit(
			{
				cosmetics: JSON.stringify(item.cosmetics),
				intent: "set-items",
				owned: String(!owned),
			},
			{ method: "post" },
		);

	return { owned, toggle };
}
