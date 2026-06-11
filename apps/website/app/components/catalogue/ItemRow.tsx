import { type Item, sumCosts } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { useItemOwnership } from "~/hooks/use-item-ownership.js";
import { itemEmoji } from "~/utility/catalogue.js";
import { CostList } from "./CostList";
import { EmojiIcon } from "./EmojiIcon";

export function ItemRow({
	data,
	item,
	locale,
}: {
	data: ReadonlySet<number>;
	item: Item;
	locale: string;
}) {
	const { t } = useTranslation();
	const { owned, toggle } = useItemOwnership(item, data);
	const emoji = itemEmoji(item);
	const costs = item.cost ? sumCosts([item.cost]) : [];

	return (
		<label
			className={clsx(
				"flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
				owned
					? "border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30"
					: "border-gray-200 bg-gray-100 hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50",
			)}
		>
			<input
				checked={owned}
				className="h-4 w-4 shrink-0 accent-green-600"
				onChange={toggle}
				type="checkbox"
			/>
			{emoji ? <EmojiIcon className="h-6 w-6" emoji={emoji} /> : null}
			<span className="min-w-0 flex-1 text-sm text-gray-900 dark:text-gray-100">
				{t(item.translation.key, { ns: "general", number: item.translation.number })}
			</span>
			<span className="text-sm text-gray-600 dark:text-gray-400">
				<CostList costs={costs} locale={locale} />
			</span>
		</label>
	);
}
