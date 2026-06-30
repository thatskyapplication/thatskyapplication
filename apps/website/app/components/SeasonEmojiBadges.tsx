import { isSeasonId } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";

export function SeasonEmojiBadges({
	className,
	emojiClassName,
	seasons,
}: {
	className: string;
	emojiClassName: string;
	seasons: readonly number[];
}) {
	const { t } = useTranslation();

	return (
		<div className={className}>
			{seasons
				.filter((season) => isSeasonId(season))
				.toSorted((a, b) => a - b)
				.map((season) => {
					const seasonEmoji = SeasonIdToSeasonalEmoji[season];

					return seasonEmoji ? (
						<EmojiIcon
							className={emojiClassName}
							emoji={seasonEmoji}
							key={season}
							label={`${t(`seasons.${season}`, { ns: "general" })} icon.`}
						/>
					) : null;
				})}
		</div>
	);
}
