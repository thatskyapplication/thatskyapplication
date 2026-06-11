import type { Item } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { ItemChecklist } from "./ItemChecklist";
import { RemainingCostList } from "./RemainingCostList";

export function CollectionView({
	collection,
	data,
	locale,
	scope,
	showEverythingButton,
	title,
}: {
	collection: { readonly items: readonly Item[] };
	data: ReadonlySet<number>;
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

			<ItemChecklist data={data} items={collection.items} locale={locale} />

			{showEverythingButton && (
				<EverythingButton data={data} items={collection.items} scope={scope} />
			)}

			<BackButton to="/me/catalogue" />
		</>
	);
}
