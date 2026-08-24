import { clsx } from "clsx";
import { BookOpenCheck, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { spiritOriginTranslationKey, type Spirit } from "@thatskyapplication/utility";
import { BackButton } from "~/components/catalogue/BackButton.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ShareButton } from "~/components/ShareButton.js";
import { NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { fromSpiritHistory } from "~/utility/spirits.js";
import type { DateTimeLabels } from "~/utility/time.js";
import { SpiritFriendshipTrees } from "./SpiritFriendshipTrees.js";
import { SpiritVisits } from "./SpiritVisits.js";

export function SpiritView({
	dateTimeLabels,
	historyURL,
	locale,
	now,
	spirit,
	timeZone,
	timeZoneEstimated,
}: {
	dateTimeLabels: DateTimeLabels;
	historyURL: string;
	locale: string;
	now: number;
	spirit: Spirit;
	timeZone: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const location = useLocation();
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonEmoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;
	const spiritName = t(`spirits.${spirit.id}`, { ns: "general" });
	const origin = t(spiritOriginTranslationKey(spirit), { ns: "general" });

	return (
		<section aria-labelledby="selected-spirit-title" className="flex flex-col gap-5">
			<BackButton restorePreviousLocation={fromSpiritHistory(location.state)} to={historyURL} />

			<div>
				<div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
					{seasonEmoji ? <EmojiIcon emoji={seasonEmoji} /> : null}
					<span>{origin}</span>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<h2
						className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100"
						id="selected-spirit-title"
					>
						<a
							className="regular-link inline-flex items-center gap-2"
							href={t(`spirit-wiki.${spirit.id}`, { ns: "general" })}
							rel="noopener noreferrer"
							target="_blank"
						>
							{spiritName}
							<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
						</a>
					</h2>
					<Link
						className={clsx(VIEW_LINK_CLASS, "inline-flex items-center gap-1.5")}
						to={`/me/catalogue?view=spirit&spirit=${spirit.id}`}
					>
						<BookOpenCheck aria-hidden="true" className="h-4 w-4" />
						{t("spirits.view-in-catalogue", { ns: "features" })}
					</Link>
					<ShareButton
						appearance="compact"
						className={VIEW_LINK_CLASS}
						href={`/spirits?spirit=${spirit.id}`}
						shareTitle={spiritName}
					/>
				</div>
			</div>

			<SpiritVisits
				dateTimeLabels={dateTimeLabels}
				locale={locale}
				now={now}
				spirit={spirit}
				timeZone={timeZone}
				timeZoneEstimated={timeZoneEstimated}
			/>

			{spirit.isGuideSpirit() && spirit.inProgress ? (
				<p className={NOTE_CLASS}>
					{t(`catalogue.spirit-kind-not-fully-revealed.${spirit.kind}`, { ns: "features" })}
				</p>
			) : null}

			<SpiritFriendshipTrees locale={locale} spirit={spirit} />
		</section>
	);
}
