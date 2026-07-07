import { catalogueSpiritItems, KINGDOM } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { RemainingCostList } from "./RemainingCostList";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function EldersView({
	data,
	locale,
	showEverythingButton,
}: {
	data: ReadonlySet<number>;
	locale: string;
	showEverythingButton: boolean;
}) {
	const { t } = useTranslation();
	const items = catalogueSpiritItems(KINGDOM.elderSpirits.values());
	const spiritTreeColumns = [];

	for (const spirit of KINGDOM.elderSpirits.values()) {
		if (spirit.displayFriendshipTree.length === 0) {
			continue;
		}

		spiritTreeColumns.push(
			<SpiritTreeColumn data={data} key={spirit.id} locale={locale} spirit={spirit} />,
		);
	}

	return (
		<>
			<Breadcrumb
				current={t("catalogue.elders", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<RemainingCostList data={data} items={items} locale={locale} />

			<FriendshipTreeCarousel>{spiritTreeColumns}</FriendshipTreeCarousel>

			{showEverythingButton && <EverythingButton data={data} items={items} scope="elders" />}

			<BackButton to="/me/catalogue" />
		</>
	);
}
