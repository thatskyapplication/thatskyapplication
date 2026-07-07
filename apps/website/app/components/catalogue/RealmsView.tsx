import {
	cataloguePercentage,
	catalogueProgress,
	catalogueSpiritItems,
	KINGDOM,
	partitionItemCosts,
	sumCosts,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { Link2 } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { realmAnchor } from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { InfoBox } from "./InfoBox";
import { RemainingCostList } from "./RemainingCostList";
import { RemainingCurrency } from "./RemainingCurrency";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function RealmsView({
	data,
	locale,
	showEverythingButton,
}: {
	data: ReadonlySet<number>;
	locale: string;
	showEverythingButton: boolean;
}) {
	const { t } = useTranslation();

	const remainingCosts = useMemo(
		() =>
			sumCosts(
				partitionItemCosts(catalogueSpiritItems(KINGDOM.standardSpirits.values()), data).remaining,
			),
		[data],
	);

	const realms = useMemo(
		() =>
			KINGDOM.realms
				.filter((realm) => realm.spirits.size > 0)
				.map((realm) => {
					const items = catalogueSpiritItems(realm.spirits.values());

					return {
						items,
						percentage: cataloguePercentage(catalogueProgress(items, data)),
						realm,
						spirits: realm.spirits.filter((spirit) => spirit.displayFriendshipTree.length > 0),
					};
				}),
		[data],
	);

	return (
		<>
			<Breadcrumb
				current={t("catalogue.standard-spirits", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<InfoBox>{t("catalogue.realms-percentage-note", { ns: "features" })}</InfoBox>

			<RemainingCurrency costs={remainingCosts} locale={locale} />

			{realms.map(({ items, percentage, realm, spirits }, index) => (
				<Fragment key={realm.name}>
					<div
						className={clsx(
							"flex flex-col gap-1 scroll-mt-[calc(var(--site-top-bar-height,0)+1rem)]",
							index > 0 && "border-t border-gray-200 pt-5 dark:border-gray-700",
						)}
						id={realmAnchor(realm.name)}
					>
						<h2 className="group my-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
							<Link
								className="inline-flex items-center gap-2 text-inherit no-underline hover:underline"
								to={`?view=realms#${realmAnchor(realm.name)}`}
							>
								{t(`realms.${realm.name}`, { ns: "general" })}
								{percentage !== null && (
									<span className="text-sm font-normal text-gray-600 dark:text-gray-400">
										({percentage}%)
									</span>
								)}
								<Link2
									aria-hidden="true"
									className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</Link>
						</h2>

						<RemainingCostList data={data} items={items} locale={locale} />
					</div>

					<FriendshipTreeCarousel>
						{spirits.map((spirit) => (
							<SpiritTreeColumn data={data} key={spirit.id} locale={locale} spirit={spirit} />
						))}
					</FriendshipTreeCarousel>

					{showEverythingButton && (
						<EverythingButton data={data} items={items} scope={`realm:${realm.name}`} />
					)}
				</Fragment>
			))}
			<BackButton to="/me/catalogue" />
		</>
	);
}
