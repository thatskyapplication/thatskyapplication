import { catalogueSeasonItems, type SeasonIds, skySeasons } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { resolveSpiritTree, VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { Tooltip } from "../Tooltip";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EmojiIcon } from "./EmojiIcon";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { ItemChecklist } from "./ItemChecklist";
import { RemainingCostList } from "./RemainingCostList";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function SeasonView({
	data,
	locale,
	seasonId,
	showEverythingButton,
}: {
	data: ReadonlySet<number>;
	locale: string;
	seasonId: SeasonIds;
	showEverythingButton: boolean;
}) {
	const { t } = useTranslation();
	const seasons = skySeasons();
	const season = seasons.get(seasonId)!;
	const items = catalogueSeasonItems([season]);
	const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

	return (
		<>
			<Breadcrumb
				current={t(`seasons.${season.id}`, { ns: "general" })}
				trail={[
					{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" },
					{ label: t("season-plural", { ns: "general" }), to: "?view=seasons" },
				]}
			/>

			<div className="flex flex-wrap items-center gap-1.5">
				{seasons.map((option) => {
					const emoji = SeasonIdToSeasonalEmoji[option.id];

					if (!emoji) {
						return null;
					}

					const name = t(`seasons.${option.id}`, { ns: "general" });

					if (option.id === season.id) {
						return (
							<Tooltip content={name} key={option.id}>
								<span
									aria-current="page"
									aria-label={name}
									className="rounded-lg bg-gray-200 p-1.5 ring-2 ring-gray-400 dark:bg-gray-700 dark:ring-gray-500"
									role="img"
								>
									<EmojiIcon className="h-6 w-6" emoji={emoji} />
								</span>
							</Tooltip>
						);
					}

					return (
						<Tooltip content={name} key={option.id}>
							<Link
								aria-label={name}
								className="rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
								to={`?view=season&season=${option.id}`}
							>
								<EmojiIcon className="h-6 w-6" emoji={emoji} />
							</Link>
						</Tooltip>
					);
				})}
			</div>

			<div className="flex flex-wrap items-center justify-between gap-2">
				<h1 className="my-0 inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
					{seasonEmoji ? <EmojiIcon className="h-6 w-6" emoji={seasonEmoji} /> : null}
					<a
						className="regular-link"
						href={t(`season-wiki.${season.id}`, { ns: "general" })}
						rel="noopener noreferrer"
						target="_blank"
					>
						{t(`seasons.${season.id}`, { ns: "general" })}
					</a>
				</h1>
				{season.patchNotesURL && (
					<a
						className={VIEW_LINK_CLASS}
						href={season.patchNotesURL}
						rel="noopener noreferrer"
						target="_blank"
					>
						{t("catalogue.patch-notes-button-label", { ns: "features" })}
					</a>
				)}
			</div>

			<RemainingCostList data={data} items={items} locale={locale} />

			<FriendshipTreeCarousel key={season.id}>
				{[season.guide, ...season.spirits.values()]
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

			{season.items.length > 0 && (
				<div className="flex flex-col gap-2">
					<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">
						{t("catalogue.items", { ns: "features" })}
					</h2>
					<ItemChecklist data={data} items={season.items} locale={locale} />
				</div>
			)}

			{showEverythingButton && (
				<EverythingButton data={data} items={items} scope={`season:${season.id}`} />
			)}

			<BackButton to="?view=seasons" />
		</>
	);
}
