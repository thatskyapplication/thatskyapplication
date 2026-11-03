import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { SkeletonText } from "~/components/SkeletonText";
import { SECTION_HEADING_CLASS } from "~/utility/styles.js";
import {
	type UpcomingRow,
	WHATS_HAPPENING_IN_SKY_CARD_CLASS,
} from "~/utility/whats-happening-in-sky.js";

export function UpcomingSection({
	heading,
	locale,
	rows,
	timeZoneEstimated,
}: {
	heading: string;
	locale: string;
	rows: readonly UpcomingRow[];
	timeZoneEstimated: boolean;
}) {
	return (
		<section className={WHATS_HAPPENING_IN_SKY_CARD_CLASS}>
			<h2 className={SECTION_HEADING_CLASS}>{heading}</h2>
			<ul className="m-0 flex list-none flex-col gap-3 p-0">
				{rows.map(({ emoji, key, label, relative, spiritLinks, url, when }) => (
					<li className="flex flex-col gap-0.5" key={key}>
						{label && (
							<span className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
								{emoji && <EmojiIcon className="size-5 shrink-0" emoji={emoji} />}
								{url ? (
									<ExternalLink href={url} icon iconClassName="h-3.5 w-3.5">
										{label}
									</ExternalLink>
								) : (
									label
								)}
							</span>
						)}
						{spiritLinks && (
							<span className="text-sm text-gray-700 dark:text-gray-300">
								<ExternalLinkList items={spiritLinks} locale={locale} />
							</span>
						)}
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{timeZoneEstimated ? <SkeletonText>{when}</SkeletonText> : when}{" "}
							<span className="text-gray-400 dark:text-gray-500">({relative})</span>
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
