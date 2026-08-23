import { clsx } from "clsx";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { formatEmojiURL, type Snowflake } from "@thatskyapplication/utility";
import { EmojiImage } from "~/components/EmojiIcon";
import { SkeletonText } from "~/components/SkeletonText.js";
import type { CalendarEntry, CalendarSummaryEntry } from "~/utility/calendar";

const TIME_CHIP_CLASS =
	"rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300" as const;

export function CalendarEntryIcons({
	className,
	emojiIds,
}: {
	className?: string | undefined;
	emojiIds: readonly Snowflake[];
}) {
	return emojiIds.map((emojiId) => (
		<EmojiImage className={className} key={emojiId} url={formatEmojiURL(emojiId)} />
	));
}

export function CalendarTimeChips({
	estimated = false,
	times,
}: {
	estimated?: boolean;
	times: readonly string[];
}) {
	return times.map((time) => (
		<span className={TIME_CHIP_CLASS} key={time}>
			{estimated ? <SkeletonText>{time}</SkeletonText> : time}
		</span>
	));
}

export function CalendarEntryLinks({
	className,
	entry,
	iconClassName,
	linkClassName,
}: {
	className: string;
	entry: CalendarEntry | CalendarSummaryEntry;
	iconClassName: string;
	linkClassName: string;
}) {
	const { t } = useTranslation();

	if (!(entry.catalogueURL ?? entry.pageURL ?? entry.marketingURL ?? entry.wikiURL)) {
		return null;
	}

	return (
		<div className={className}>
			{entry.catalogueURL && (
				<Link className={linkClassName} to={entry.catalogueURL}>
					{t("catalogue.main-title", { ns: "features" })}
				</Link>
			)}
			{entry.pageURL && (
				<Link className={linkClassName} to={entry.pageURL}>
					{t("view", { ns: "general" })}
				</Link>
			)}
			{entry.marketingURL && (
				<a
					className={clsx(linkClassName, "inline-flex items-center gap-1")}
					href={entry.marketingURL}
					rel="noopener noreferrer"
					target="_blank"
				>
					{t("view", { ns: "general" })}
					<ExternalLinkIcon className={iconClassName} />
				</a>
			)}
			{entry.wikiURL && (
				<a
					className={clsx(linkClassName, "inline-flex items-center gap-1")}
					href={entry.wikiURL}
					rel="noopener noreferrer"
					target="_blank"
				>
					{t("wiki", { ns: "general" })}
					<ExternalLinkIcon className={iconClassName} />
				</a>
			)}
		</div>
	);
}
