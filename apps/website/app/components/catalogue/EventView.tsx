import { type EventIds, skyEvents } from "@thatskyapplication/utility";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { EventIdToEventTicketEmoji } from "~/utility/emojis.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EverythingButton } from "./EverythingButton";
import { ItemChecklist } from "./ItemChecklist";

export function EventView({
	data,
	eventId,
	locale,
	showEverythingButton,
	timeZone,
}: {
	data: ReadonlySet<number>;
	eventId: EventIds;
	locale: string;
	showEverythingButton: boolean;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const events = skyEvents();
	const event = events.get(eventId)!;
	const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];
	const before = events.get((event.id - 1) as EventIds);
	const after = events.get((event.id + 1) as EventIds);

	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
	});

	return (
		<>
			<Breadcrumb
				current={t(event.name, { ns: "general" })}
				trail={[
					{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" },
					{ label: t("catalogue.events", { ns: "features" }), to: "?view=events" },
				]}
			/>

			<div className="flex flex-wrap items-center justify-between gap-2">
				<div>
					<h1 className="my-0 inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
						{eventTicketEmoji ? <EmojiIcon className="h-6 w-6" emoji={eventTicketEmoji} /> : null}
						<a
							className="regular-link"
							href={t(`event-wiki.${event.id}`, { ns: "general" })}
							rel="noopener noreferrer"
							target="_blank"
						>
							{t(event.name, { ns: "general" })}
						</a>
					</h1>
					<p className={NOTE_CLASS}>
						{t("time-range", {
							ns: "general",
							start: dateFormat.format(event.start.toMillis()),
							end: dateFormat.format(event.end.toMillis()),
						})}
					</p>
				</div>
				{event.patchNotesURL && (
					<a
						className={VIEW_LINK_CLASS}
						href={event.patchNotesURL}
						rel="noopener noreferrer"
						target="_blank"
					>
						{t("catalogue.patch-notes-button-label", { ns: "features" })}
					</a>
				)}
			</div>

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

			<div className="flex flex-wrap items-center gap-2">
				{before && (
					<Link className={VIEW_LINK_CLASS} to={`?view=event&event=${before.id}`}>
						← {t("catalogue.event-previous-event", { ns: "features" })}
					</Link>
				)}
				{after && (
					<Link className={VIEW_LINK_CLASS} to={`?view=event&event=${after.id}`}>
						{t("catalogue.event-next-event", { ns: "features" })} →
					</Link>
				)}
			</div>

			{showEverythingButton && (
				<EverythingButton data={data} items={event.offer} scope={`event:${event.id}`} />
			)}

			<BackButton to="?view=events" />
		</>
	);
}
