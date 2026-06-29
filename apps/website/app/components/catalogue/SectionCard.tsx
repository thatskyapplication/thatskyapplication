import type { Emoji } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LINK_CARD_CLASS } from "~/utility/catalogue.js";
import { EmojiIcon } from "./EmojiIcon";
import { ProgressBar } from "./ProgressBar";

export function SectionCard({
	emoji,
	percentage,
	title,
	to,
}: {
	emoji?: Emoji | null | undefined;
	percentage: number | null;
	title: string;
	to: string;
}) {
	const { t } = useTranslation();

	return (
		<Link className={clsx(LINK_CARD_CLASS, "flex flex-col gap-3")} to={to}>
			<div className="flex items-center justify-between gap-2">
				<span className="inline-flex items-center gap-2">
					{emoji ? <EmojiIcon className="h-5 w-5" emoji={emoji} /> : null}
					<h2 className="my-0 text-base font-medium text-gray-900 dark:text-gray-100">{title}</h2>
				</span>
				<span className="text-sm text-gray-600 dark:text-gray-400">
					{percentage === null
						? t("catalogue.main-no-progress", { ns: "features" })
						: `${percentage}%`}
				</span>
			</div>
			<ProgressBar percentage={percentage ?? 0} />
		</Link>
	);
}
