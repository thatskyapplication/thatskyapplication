import { resolveReturningSpirits, skyNow } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { resolveSpiritTree } from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function ReturningSpiritsView({
	data,
	locale,
}: {
	data: ReadonlySet<number>;
	locale: string;
}) {
	const { t } = useTranslation();
	const returningSpirits = resolveReturningSpirits(skyNow());

	return (
		<>
			<Breadcrumb
				current={t("catalogue.returning-spirits", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			{returningSpirits && (
				<FriendshipTreeCarousel>
					{returningSpirits
						.map((spirit) => ({ spirit, tree: resolveSpiritTree(spirit) }))
						.filter(({ tree }) => tree.length > 0)
						.map(({ spirit, tree }) => (
							<SpiritTreeColumn
								data={data}
								key={spirit.id}
								locale={locale}
								spirit={spirit}
								tree={tree}
							/>
						))}
				</FriendshipTreeCarousel>
			)}
			<BackButton to="/me/catalogue" />
		</>
	);
}
