import { clsx } from "clsx";
import { ExternalLinkIcon, Link2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { Event } from "@thatskyapplication/utility";
import { CARD_CLASS, eventAnchor, NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { EverythingButton } from "./EverythingButton";
import { ItemChecklist } from "./ItemChecklist";
import { RemainingCostList } from "./RemainingCostList";

export function EventOccurrence({
	currentName,
	data,
	dateFormat,
	event,
	locale,
	showEverythingButton,
}: {
	currentName: Event["name"];
	data: ReadonlySet<number>;
	dateFormat: Intl.DateTimeFormat;
	event: Event;
	locale: string;
	showEverythingButton: boolean;
}) {
	const { t } = useTranslation();

	return (
		<div
			className={clsx(
				CARD_CLASS,
				"flex scroll-mt-[calc(var(--site-top-bar-height,0)+1rem)] flex-col gap-3",
			)}
			id={eventAnchor(event.id)}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<h2 className="group my-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
						<Link
							className="inline-flex flex-wrap items-center gap-2 text-inherit no-underline hover:underline"
							to={`?view=event-family&family=${event.family}#${eventAnchor(event.id)}`}
						>
							{event.start.year}
							{event.name === currentName ? null : (
								<span className="text-sm font-normal text-gray-600 dark:text-gray-400">
									{t(event.name, { ns: "general" })}
								</span>
							)}
							<Link2
								aria-hidden="true"
								className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
							/>
						</Link>
					</h2>
					<p className={NOTE_CLASS}>
						{t("time-range", {
							ns: "general",
							start: dateFormat.format(event.start.epochMilliseconds),
							end: dateFormat.format(event.end.epochMilliseconds),
						})}
					</p>
				</div>
				<a
					className={clsx(VIEW_LINK_CLASS, "inline-flex items-center gap-1")}
					href={t(`event-wiki.${event.id}`, { ns: "general" })}
					rel="noopener noreferrer"
					target="_blank"
				>
					{t("wiki", { ns: "general" })}
					<ExternalLinkIcon className="h-3 w-3" />
				</a>
			</div>

			<RemainingCostList data={data} items={event.offer} locale={locale} />

			{event.offer.length > 0 ? (
				<ItemChecklist data={data} items={event.offer} locale={locale} />
			) : (
				<p className="m-0 text-base text-gray-600 dark:text-gray-400">
					{t("catalogue.event-no-cosmetics", { ns: "features" })}
				</p>
			)}

			{event.offerInfographicURL ? (
				<img
					alt={t(event.name, { ns: "general" })}
					className="mx-auto aspect-square w-full max-w-xl rounded-lg object-contain"
					loading="lazy"
					src={event.offerInfographicURL}
				/>
			) : null}

			{showEverythingButton && (
				<EverythingButton data={data} items={event.offer} scope={`event:${event.id}`} />
			)}
		</div>
	);
}
