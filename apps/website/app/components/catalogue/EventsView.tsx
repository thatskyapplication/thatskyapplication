import {
	cataloguePercentage,
	catalogueProgress,
	type Event,
	skyEvents,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { LINK_CARD_CLASS, NOTE_CLASS } from "~/utility/catalogue.js";
import { EventIdToEventTicketEmoji } from "~/utility/emojis.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";

export function EventsView({
	data,
	locale,
	timeZone,
}: {
	data: ReadonlySet<number>;
	locale: string;
	timeZone: string;
}) {
	const { t } = useTranslation();

	const eventsByYear = useMemo(() => {
		const map = new Map<number, Event[]>();

		for (const event of skyEvents().toReversed().values()) {
			const { year } = event.start;
			const events = map.get(year);

			if (events) {
				events.push(event);
			} else {
				map.set(year, [event]);
			}
		}

		return [...map.entries()];
	}, []);

	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
	});

	return (
		<>
			<Breadcrumb
				current={t("catalogue.events", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			{eventsByYear.map(([year, events]) => (
				<div className="flex flex-col gap-3" key={year}>
					<h2 className="my-0 text-lg font-semibold text-gray-900 dark:text-gray-100">{year}</h2>
					{events.map((event) => {
						const percentage = cataloguePercentage(catalogueProgress(event.offer, data));

						return (
							<Link
								className={clsx(LINK_CARD_CLASS, "flex items-center justify-between gap-2")}
								key={event.id}
								to={`?view=event&event=${event.id}`}
							>
								<div className="min-w-0">
									<h3 className="my-0 inline-flex flex-wrap items-center gap-2 text-base font-medium text-gray-900 dark:text-gray-100">
										{EventIdToEventTicketEmoji[event.id] ? (
											<EmojiIcon emoji={EventIdToEventTicketEmoji[event.id]!} />
										) : null}
										{t(event.name, { ns: "general" })}
										{percentage !== null && (
											<span className="text-sm font-normal text-gray-600 dark:text-gray-400">
												({percentage}%)
											</span>
										)}
									</h3>
									<p className={NOTE_CLASS}>
										{t("time-range", {
											ns: "general",
											start: dateFormat.format(event.start.epochMilliseconds),
											end: dateFormat.format(event.end.epochMilliseconds),
										})}
									</p>
								</div>
								<ChevronRight className="h-4 w-4 shrink-0 text-gray-600 dark:text-gray-400" />
							</Link>
						);
					})}
				</div>
			))}
			<BackButton to="/me/catalogue" />
		</>
	);
}
