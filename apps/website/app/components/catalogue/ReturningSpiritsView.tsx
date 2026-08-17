import { useTranslation } from "react-i18next";
import { resolveReturningSpirits } from "@thatskyapplication/utility";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function ReturningSpiritsView({
	data,
	locale,
	now,
}: {
	data: ReadonlySet<number>;
	locale: string;
	now: Temporal.ZonedDateTime;
}) {
	const { t } = useTranslation();
	const returningSpirits = resolveReturningSpirits(now);
	const spiritTreeColumns = [];

	if (returningSpirits) {
		for (const spirit of returningSpirits.values()) {
			if (spirit.displayFriendshipTree.length === 0) {
				continue;
			}

			spiritTreeColumns.push(
				<SpiritTreeColumn data={data} key={spirit.id} locale={locale} spirit={spirit} />,
			);
		}
	}

	return (
		<>
			<Breadcrumb
				current={t("returning-spirits", { ns: "general" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			{spiritTreeColumns.length > 0 && (
				<FriendshipTreeCarousel>{spiritTreeColumns}</FriendshipTreeCarousel>
			)}
			<BackButton to="/me/catalogue" />
		</>
	);
}
