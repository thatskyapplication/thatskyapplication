import { useTranslation } from "react-i18next";
import type { Item } from "@thatskyapplication/utility";
import { CARD_CLASS } from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { ItemChecklist } from "./ItemChecklist";
import { RemainingCostList } from "./RemainingCostList";

export function CollectionView({
	collection,
	data,
	featured,
	locale,
	scope,
	showEverythingButton,
	title,
}: {
	collection: { readonly items: readonly Item[] };
	data: ReadonlySet<number>;
	featured?: { items: readonly Item[]; title: string };
	locale: string;
	scope: string;
	showEverythingButton: boolean;
	title: string;
}) {
	const { t } = useTranslation();

	return (
		<>
			<Breadcrumb
				current={title}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<RemainingCostList data={data} items={collection.items} locale={locale} />

			{featured && featured.items.length > 0 && (
				<div className={CARD_CLASS}>
					<h2 className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
						{featured.title}
					</h2>
					<ItemChecklist data={data} items={featured.items} locale={locale} />
				</div>
			)}

			<ItemChecklist data={data} items={collection.items} locale={locale} />

			{showEverythingButton && (
				<EverythingButton data={data} items={collection.items} scope={scope} />
			)}

			<BackButton to="/me/catalogue" />
		</>
	);
}
