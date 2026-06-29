import { catalogueSpiritItems, ELDER_SPIRITS } from "@thatskyapplication/utility";
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
	const items = catalogueSpiritItems(ELDER_SPIRITS.values());

	return (
		<>
			<Breadcrumb
				current={t("catalogue.elders", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<RemainingCostList data={data} items={items} locale={locale} />

			<FriendshipTreeCarousel>
				{ELDER_SPIRITS.filter((spirit) => spirit.current.length > 0).map((spirit) => (
					<SpiritTreeColumn
						data={data}
						key={spirit.id}
						locale={locale}
						spirit={spirit}
						tree={spirit.current}
					/>
				))}
			</FriendshipTreeCarousel>

			{showEverythingButton && <EverythingButton data={data} items={items} scope="elders" />}

			<BackButton to="/me/catalogue" />
		</>
	);
}
