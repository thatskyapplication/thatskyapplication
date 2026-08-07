import { captureException } from "@sentry/react-router";
import { useFetcher } from "react-router";
import type { Item } from "@thatskyapplication/utility";

export function useItemOwnership(item: Item, data: ReadonlySet<number>) {
	const fetcher = useFetcher();
	const actualOwned = item.cosmetics.every((cosmetic) => data.has(cosmetic));
	const owned = fetcher.formData ? fetcher.formData.get("owned") === "true" : actualOwned;

	const submitItemOwnership = async () => {
		try {
			await fetcher.submit(
				{
					cosmetics: JSON.stringify(item.cosmetics),
					intent: "set-items",
					owned: String(!owned),
				},
				{ method: "post" },
			);
		} catch (error) {
			captureException(error);
		}
	};

	const toggle = () => {
		void submitItemOwnership();
	};

	return { owned, toggle };
}
