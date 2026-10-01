import { useTranslation } from "react-i18next";
import { nestingWorkshopItem, sumCosts } from "@thatskyapplication/utility";
import { CostList } from "~/components/catalogue/CostList.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { Tooltip } from "~/components/Tooltip";
import { itemEmoji } from "~/utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";

export function NestingWorkshopProps({
	cosmetics,
	locale,
	owned,
}: {
	cosmetics: readonly number[];
	locale: string;
	owned: readonly number[];
}) {
	const { t } = useTranslation();

	return (
		<ul className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
			{cosmetics
				.map((cosmetic) => nestingWorkshopItem(cosmetic))
				.filter((item) => item !== null)
				.map((item) => {
					const emoji = itemEmoji(item);

					const name = t(item.translation.key, {
						ns: "general",
						number: item.translation.number,
					});

					const isOwned = item.cosmetics.every((cosmetic) => owned.includes(cosmetic));

					return (
						<li className="flex flex-col items-center gap-1" key={item.cosmetics.join(",")}>
							<Tooltip content={name}>
								<div
									aria-label={
										isOwned
											? t("daily-guides.nesting-workshop-prop-owned", {
													ns: "features",
													prop: name,
												})
											: name
									}
									className="relative flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
									role="img"
								>
									{emoji ? (
										<EmojiIcon className="size-7" emoji={emoji} />
									) : (
										<span className="px-1 text-center text-[10px] leading-tight">{name}</span>
									)}
									{isOwned && (
										<EmojiIcon
											className="absolute -top-1 -right-1 size-4"
											emoji={MISCELLANEOUS_EMOJIS.Yes}
										/>
									)}
								</div>
							</Tooltip>
							{item.cost && <CostList costs={sumCosts([item.cost])} locale={locale} />}
						</li>
					);
				})}
		</ul>
	);
}
