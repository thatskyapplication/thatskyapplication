import { clsx } from "clsx";
import { BookOpenCheck, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { spiritOriginTranslationKey, type Spirit } from "@thatskyapplication/utility";
import { BackButton } from "~/components/catalogue/BackButton.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ShareButton } from "~/components/ShareButton.js";
import { NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { SpiritFriendshipTrees } from "./SpiritFriendshipTrees.js";
import { SpiritVisits } from "./SpiritVisits.js";

export function SpiritView({
	historyURL,
	hour12,
	locale,
	now,
	spirit,
	timeZone,
}: {
	historyURL: string;
	hour12: boolean | undefined;
	locale: string;
	now: number;
	spirit: Spirit;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonEmoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;
	const spiritName = t(`spirits.${spirit.id}`, { ns: "general" });
	const origin = t(spiritOriginTranslationKey(spirit), { ns: "general" });

	return (
		<section aria-labelledby="selected-spirit-title" className="flex flex-col gap-5">
			<BackButton to={historyURL} />

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
						key={spirit.id}
						shareTitle={spiritName}
					/>
				</div>
			</div>

			<SpiritVisits hour12={hour12} locale={locale} now={now} spirit={spirit} timeZone={timeZone} />

			{spirit.isGuideSpirit() && spirit.inProgress ? (
				<p className={NOTE_CLASS}>{t("catalogue.spirit-not-fully-revealed", { ns: "features" })}</p>
			) : null}

			<SpiritFriendshipTrees locale={locale} spirit={spirit} />
		</section>
	);
}
