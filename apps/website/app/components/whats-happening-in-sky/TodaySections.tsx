import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp";
import { ShardRewardIcon } from "~/components/ShardRewardIcon.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { ICON_LINK_CLASS, SECTION_HEADING_CLASS } from "~/utility/styles.js";
import {
	type TodayView,
	WHATS_HAPPENING_IN_SKY_CARD_CLASS,
} from "~/utility/whats-happening-in-sky.js";
import { ChecklistToggle } from "./ChecklistToggle.js";

export function TodaySections({
	initialTimestamp,
	timeZoneEstimated,
	today: { quests, questsToggle, shard },
}: {
	initialTimestamp: number;
	timeZoneEstimated: boolean;
	today: TodayView;
}) {
	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp, initialTimestamp);

	return (
		<>
			<section className={WHATS_HAPPENING_IN_SKY_CARD_CLASS}>
				<h2 className={SECTION_HEADING_CLASS}>
					<Link className={ICON_LINK_CLASS} to="/daily-guides">
						{t("daily-guides.name", { ns: "features" })}
						<ArrowRight className="h-4 w-4" />
					</Link>
				</h2>
				{quests.length > 0 && (
					<ol className="m-0 list-decimal ps-5 text-sm text-gray-700 dark:text-gray-300">
						{quests.map((quest) => (
							<li key={quest}>{quest}</li>
						))}
					</ol>
				)}
				{questsToggle && <ChecklistToggle toggle={questsToggle} />}
			</section>
			<section className={WHATS_HAPPENING_IN_SKY_CARD_CLASS}>
				<h2 className={SECTION_HEADING_CLASS}>
					<Link className={ICON_LINK_CLASS} to="/shard-eruption">
						{t("shard-eruption.name-plural", { ns: "features" })}
						<ArrowRight className="h-4 w-4" />
					</Link>
				</h2>
				{shard ? (
					<>
						<div className="flex flex-col items-start gap-1">
							<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-gray-700 dark:text-gray-300">
								<EmojiIcon
									emoji={
										shard.strong
											? MISCELLANEOUS_EMOJIS.ShardStrong
											: MISCELLANEOUS_EMOJIS.ShardRegular
									}
								/>
								{shard.label}
								<span className="inline-flex items-center gap-1">
									{shard.reward}
									<ShardRewardIcon strong={shard.strong} />
								</span>
							</div>
							{shard.timestamps.map(({ end, start }) => (
								<ShardEruptionTimestamp
									currentUnix={Math.floor(currentTimestamp / 1_000)}
									end={end}
									key={start.unix}
									start={start}
									timeZoneEstimated={timeZoneEstimated}
									variant="daily-guides"
								/>
							))}
						</div>
						{shard.toggle && <ChecklistToggle toggle={shard.toggle} />}
					</>
				) : (
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{t("shard-eruption.no-shard-eruptions-today", { ns: "features" })}
					</p>
				)}
			</section>
		</>
	);
}
