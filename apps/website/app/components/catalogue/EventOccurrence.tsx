import { useTranslation } from "react-i18next";
import type { Event } from "@thatskyapplication/utility";
import { CARD_CLASS, NOTE_CLASS } from "~/utility/catalogue.js";
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
		<div className={`${CARD_CLASS} flex scroll-mt-4 flex-col gap-3`} id={`event-${event.id}`}>
			<div>
				<h2 className="my-0 inline-flex flex-wrap items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
					{event.start.year}
					{event.name === currentName ? null : (
						<span className="text-sm font-normal text-gray-600 dark:text-gray-400">
							{t(event.name, { ns: "general" })}
						</span>
					)}
				</h2>
				<p className={NOTE_CLASS}>
					{t("time-range", {
						ns: "general",
						start: dateFormat.format(event.start.epochMilliseconds),
						end: dateFormat.format(event.end.epochMilliseconds),
					})}
				</p>
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
