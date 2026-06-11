import { type Item, partitionItemCosts, sumCosts } from "@thatskyapplication/utility";
import { CostList } from "./CostList";

export function RemainingCostList({
	data,
	items,
	locale,
}: {
	data: ReadonlySet<number>;
	items: Iterable<Item>;
	locale: string;
}) {
	const remaining = sumCosts(partitionItemCosts(items, data).remaining);

	if (remaining.length === 0) {
		return null;
	}

	return (
		<span className="text-sm text-gray-600 dark:text-gray-400">
			<CostList costs={remaining} locale={locale} />
		</span>
	);
}
