import { clsx } from "clsx";
import { Link } from "react-router";
import type { Emoji } from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { LINK_CARD_CLASS, NOTE_CLASS } from "~/utility/catalogue.js";
import { ProgressBar } from "./ProgressBar";

export function SectionCard({
	emoji,
	emptyLabel,
	note,
	percentage,
	title,
	to,
}: {
	emoji?: Emoji | null | undefined;
	emptyLabel?: string;
	note?: string;
	percentage: number | null;
	title: string;
	to: string;
}) {
	return (
		<Link className={clsx(LINK_CARD_CLASS, "flex flex-col gap-3")} to={to}>
			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between gap-2">
					<span className="inline-flex items-center gap-2">
						{emoji ? <EmojiIcon className="h-5 w-5" emoji={emoji} /> : null}
						<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">{title}</h2>
					</span>
					{percentage !== null && (
						<span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
					)}
				</div>
				{note ? <p className={NOTE_CLASS}>{note}</p> : null}
			</div>
			{percentage === null ? (
				emptyLabel === undefined ? null : (
					<p className="m-0 text-sm text-gray-600 dark:text-gray-400">{emptyLabel}</p>
				)
			) : (
				<ProgressBar label={title} percentage={percentage} />
			)}
		</Link>
	);
}
