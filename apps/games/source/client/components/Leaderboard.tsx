import { clsx } from "clsx";
import { useMemo } from "react";
import type { LeaderboardResponse, Strings } from "../api.js";
import { ActionButton } from "./ActionButton.js";
import { Panel, PanelHeading } from "./Panel.js";

const ROW_CLASS = "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm short:py-1.5" as const;
const ROW_YOU_CLASS = "bg-candle/10 text-candle" as const;
const RANK_CLASS = "w-8 shrink-0 text-right tabular-nums text-white/45" as const;
const ICON_CLASS = "size-6 shrink-0 rounded-full bg-white/10 short:size-5" as const;
const ICON_PLACEHOLDER_CLASS = "size-6 shrink-0 short:size-5" as const;
const NAME_CLASS = "min-w-0 flex-1 truncate" as const;
const DATE_CLASS = "min-w-18 shrink-0 text-right text-xs tabular-nums text-white/35" as const;
const STREAK_CLASS = "min-w-12 shrink-0 text-right font-semibold tabular-nums" as const;
const EMPTY_CLASS = "py-6 text-center text-sm text-white/55" as const;
const VIEWER_CLASS = "text-center text-sm text-white/55" as const;

interface LeaderboardProps {
	backLabel: string;
	busy: boolean;
	leaderboard: LeaderboardResponse;
	locale: string;
	onBack: () => void;
	onPage: (page: number) => void;
	strings: Strings;
}

export function Leaderboard({
	backLabel,
	busy,
	leaderboard,
	locale,
	onBack,
	onPage,
	strings,
}: LeaderboardProps) {
	const dateFormatter = useMemo(
		() => new Intl.DateTimeFormat(locale, { dateStyle: "short" }),
		[locale],
	);

	return (
		<Panel>
			<PanelHeading>{leaderboard.title}</PanelHeading>
			{leaderboard.entries.length === 0 ? (
				<p className={EMPTY_CLASS}>{strings.leaderboardNothing}</p>
			) : (
				<ol className="flex flex-col gap-1">
					{leaderboard.entries.map((entry) => (
						<li className={clsx(ROW_CLASS, entry.you && ROW_YOU_CLASS)} key={entry.userId}>
							<span className={RANK_CLASS}>{entry.rank}</span>
							{entry.iconURL === null ? (
								<span className={ICON_PLACEHOLDER_CLASS} />
							) : (
								<img alt="" className={ICON_CLASS} loading="lazy" src={entry.iconURL} />
							)}
							<span className={NAME_CLASS}>{entry.name ?? strings.leaderboardUnnamed}</span>
							{entry.date !== null && (
								<span className={DATE_CLASS}>{dateFormatter.format(new Date(entry.date))}</span>
							)}
							<span className={STREAK_CLASS}>{entry.streak}</span>
						</li>
					))}
				</ol>
			)}
			{leaderboard.viewerLabel && <p className={VIEWER_CLASS}>{leaderboard.viewerLabel}</p>}
			{(leaderboard.hasPreviousPage || leaderboard.hasNextPage) && (
				<div className="flex gap-2">
					<ActionButton
						className="flex-1"
						disabled={busy || !leaderboard.hasPreviousPage}
						onClick={() => onPage(leaderboard.page - 1)}
						variant="option"
					>
						{strings.navigationBack}
					</ActionButton>
					<ActionButton
						className="flex-1"
						disabled={busy || !leaderboard.hasNextPage}
						onClick={() => onPage(leaderboard.page + 1)}
						variant="option"
					>
						{strings.navigationNext}
					</ActionButton>
				</div>
			)}
			<ActionButton disabled={busy} onClick={onBack} variant="quiet">
				{backLabel}
			</ActionButton>
		</Panel>
	);
}
