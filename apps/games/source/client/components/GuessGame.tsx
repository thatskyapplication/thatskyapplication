import { clsx } from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { GuessTypes } from "@thatskyapplication/utility";
import { type GuessGameOver, GuessOutcome, type GuessSessionView } from "../../guess.js";
import type { GuessMode, Strings } from "../api.js";
import { ActionButton } from "./ActionButton.js";
import { Panel, PanelHeading, SPLIT_ASIDE_CLASS, SPLIT_CLASS } from "./Panel.js";

const IMAGE_CLASS =
	"size-32 self-center bg-contain bg-center bg-no-repeat [image-rendering:pixelated] sm:size-40 short:size-24 tiny:size-16" as const;
const IMAGE_HALO_CLASS =
	"pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl bg-[radial-gradient(circle,rgba(150,180,235,0.45)_0%,transparent_70%)]" as const;
const TIMER_TRACK_CLASS = "h-1.5 w-full overflow-hidden rounded-full bg-white/10" as const;
const TIMER_BAR_CLASS = "h-full rounded-full transition-[width] duration-300 ease-linear" as const;
const FOOTER_CLASS = "text-center text-sm text-white/55" as const;
const MODE_CLASS =
	"text-center text-xs font-medium tracking-wider text-white/40 uppercase short:text-[0.625rem]" as const;
const HEADER_CLASS = "flex flex-col gap-1 short:gap-0.5" as const;
const STAT_VALUE_CLASS = "font-semibold text-white/90 tabular-nums" as const;
const URGENT_FRACTION = 0.25 as const;
const COUNTDOWN_INTERVAL = 250 as const;

function useRemaining(remainingMilliseconds: number, onDeadline?: () => void) {
	const [deadline] = useState(() => Date.now() + remainingMilliseconds);
	const [now, setNow] = useState(deadline - remainingMilliseconds);
	const reachDeadline = useRef(onDeadline);

	useEffect(() => {
		reachDeadline.current = onDeadline;
	}, [onDeadline]);

	useEffect(() => {
		const interval = setInterval(() => {
			const current = Date.now();
			setNow(current);

			if (current < deadline) {
				return;
			}

			clearInterval(interval);
			reachDeadline.current?.();
		}, COUNTDOWN_INTERVAL);

		return () => clearInterval(interval);
	}, [deadline]);

	return Math.max(0, deadline - now);
}

function LeaderboardIcon() {
	return (
		<svg
			aria-hidden
			className="size-5"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
		>
			<path d="M6 20V10M12 20V4M18 20v-6" />
		</svg>
	);
}

function PuzzleImage({ source }: { source: string }) {
	return (
		<div className="relative self-center">
			<div aria-hidden className={IMAGE_HALO_CLASS} />
			<div className={IMAGE_CLASS} style={{ backgroundImage: `url("${source}")` }} />
		</div>
	);
}

function Streaks({
	highest,
	streak,
	strings,
}: {
	highest: number;
	streak: number;
	strings: Strings;
}) {
	return (
		<p className={FOOTER_CLASS}>
			{strings.streak} <span className={STAT_VALUE_CLASS}>{streak}</span>
			<span className="px-2 text-white/25">·</span>
			{strings.highest} <span className={STAT_VALUE_CLASS}>{highest}</span>
		</p>
	);
}

interface GuessBoardProps {
	busy: boolean;
	footer?: ReactNode;
	highestStreak: number;
	modeName: string | null;
	onAnswer?: ((option: number) => void) | undefined;
	onExpire?: (() => void) | undefined;
	session: GuessSessionView;
	strings: Strings;
}

export function GuessBoard({
	busy,
	footer,
	highestStreak,
	modeName,
	onAnswer,
	onExpire,
	session,
	strings,
}: GuessBoardProps) {
	const remaining = useRemaining(session.remainingMilliseconds, onExpire);
	const expired = remaining === 0;
	const fraction = Math.min(1, remaining / session.durationMilliseconds);
	const urgent = fraction <= URGENT_FRACTION;

	return (
		<Panel>
			<div className={HEADER_CLASS}>
				{modeName !== null && <p className={MODE_CLASS}>{modeName}</p>}
				<PanelHeading>{strings.title}</PanelHeading>
			</div>
			<div className={SPLIT_CLASS}>
				<PuzzleImage source={session.emojiURL} />
				<div className={SPLIT_ASIDE_CLASS}>
					<div className={TIMER_TRACK_CLASS}>
						<div
							className={clsx(TIMER_BAR_CLASS, urgent ? "bg-red-400/80" : "bg-candle/80")}
							style={{ width: `${fraction * 100}%` }}
						/>
					</div>
					<div className="flex flex-col gap-2">
						{session.options.map((option) => (
							<ActionButton
								className="w-full"
								disabled={busy || expired || onAnswer === undefined}
								key={option.id}
								onClick={() => onAnswer?.(option.id)}
								size="large"
								variant="option"
							>
								{option.name}
							</ActionButton>
						))}
					</div>
				</div>
			</div>
			<Streaks highest={highestStreak} streak={session.streak} strings={strings} />
			{footer}
		</Panel>
	);
}

interface GuessGameOverPanelProps {
	footer?: ReactNode;
	gameOver: GuessGameOver;
	modeName: string | null;
	strings: Strings;
}

export function GuessGameOverPanel({
	footer,
	gameOver,
	modeName,
	strings,
}: GuessGameOverPanelProps) {
	return (
		<Panel>
			<div className={HEADER_CLASS}>
				{modeName !== null && <p className={MODE_CLASS}>{modeName}</p>}
				<PanelHeading>{strings.gameOver}</PanelHeading>
			</div>
			<div className={SPLIT_CLASS}>
				<PuzzleImage source={gameOver.emojiURL} />
				<div className={SPLIT_ASIDE_CLASS}>
					<div className="flex flex-col gap-1 text-center">
						<p className="text-white/55">{strings.answer}</p>
						<p className="text-candle text-lg font-semibold">{gameOver.answer.name}</p>
					</div>
					{gameOver.option && (
						<p className="text-center text-sm text-white/55">
							{strings.yourGuess} <span className="text-white/80">{gameOver.option.name}</span>
						</p>
					)}
					{gameOver.outcome === GuessOutcome.Expired && (
						<p className="text-center text-sm text-red-300/80">{strings.tooLate}</p>
					)}
				</div>
			</div>
			<Streaks highest={gameOver.highestStreak} streak={gameOver.streak} strings={strings} />
			{footer}
		</Panel>
	);
}

interface GuessModePickerProps {
	busy: boolean;
	heading: string;
	modes: readonly GuessMode[];
	onLeaderboard: (type: GuessTypes) => void;
	onStart: ((type: GuessTypes) => void) | null;
	strings: Strings;
}

export function GuessModePicker({
	busy,
	heading,
	modes,
	onLeaderboard,
	onStart,
	strings,
}: GuessModePickerProps) {
	return (
		<Panel>
			<PanelHeading>{heading}</PanelHeading>
			<div className="flex flex-col gap-2">
				{modes.map((mode) => (
					<div className="flex gap-2" key={mode.type}>
						<ActionButton
							className="flex-1"
							disabled={busy || onStart === null}
							onClick={() => onStart?.(mode.type)}
							size="large"
							variant="option"
						>
							{mode.name}
						</ActionButton>
						<ActionButton
							aria-label={`${mode.name}–${strings.leaderboardLabel}`}
							className="shrink-0"
							disabled={busy}
							onClick={() => onLeaderboard(mode.type)}
							size="icon"
							title={strings.leaderboardLabel}
							variant="option"
						>
							<LeaderboardIcon />
						</ActionButton>
					</div>
				))}
			</div>
		</Panel>
	);
}
