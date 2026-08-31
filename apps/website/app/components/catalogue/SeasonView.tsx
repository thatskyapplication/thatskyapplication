import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { catalogueSeasonItems, type SeasonIds, skySeasons } from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ExternalLink } from "~/components/ExternalLink";
import { SkeletonText } from "~/components/SkeletonText.js";
import { NOTE_CLASS } from "~/utility/catalogue.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import type { DateTimeLabels } from "~/utility/time.js";
import { Tooltip } from "../Tooltip";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { FriendshipTreeCarousel } from "./FriendshipTreeCarousel";
import { ItemChecklist } from "./ItemChecklist";
import { RemainingCostList } from "./RemainingCostList";
import { SpiritTreeColumn } from "./SpiritTreeColumn";

export function SeasonView({
	data,
	dateTimeLabels,
	locale,
	seasonId,
	showEverythingButton,
	timeZoneEstimated,
}: {
	data: ReadonlySet<number>;
	dateTimeLabels: DateTimeLabels;
	locale: string;
	seasonId: SeasonIds;
	showEverythingButton: boolean;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const seasons = skySeasons();
	const season = seasons.get(seasonId)!;
	const items = catalogueSeasonItems([season]);
	const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];
	const spiritTreeColumns = [];

	const timeRange = t("time-range", {
		ns: "general",
		start: dateTimeLabels[season.start.epochMilliseconds],
		end: dateTimeLabels[season.end.epochMilliseconds],
	});

	for (const spirit of season.spiritsWithGuide.values()) {
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

			<div>
				<h1 className="my-0 inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
					{seasonEmoji ? <EmojiIcon className="h-6 w-6" emoji={seasonEmoji} /> : null}
					<ExternalLink href={t(`season-wiki.${season.id}`, { ns: "general" })} icon>
						{t(`seasons.${season.id}`, { ns: "general" })}
					</ExternalLink>
				</h1>
				<p className={NOTE_CLASS}>
					{timeZoneEstimated ? <SkeletonText>{timeRange}</SkeletonText> : timeRange}
				</p>
			</div>

			<RemainingCostList data={data} items={items} locale={locale} />

			<FriendshipTreeCarousel key={season.id}>{spiritTreeColumns}</FriendshipTreeCarousel>

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
