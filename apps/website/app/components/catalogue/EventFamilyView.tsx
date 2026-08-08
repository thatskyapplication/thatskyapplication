import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { type EventFamilies, skyEventFamilies } from "@thatskyapplication/utility";
import { VIEW_LINK_CLASS } from "~/utility/catalogue.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EventFamilyHeader } from "./EventFamilyHeader";
import { EventOccurrence } from "./EventOccurrence";

export function EventFamilyView({
	data,
	family,
	locale,
	showEverythingButton,
	timeZone,
}: {
	data: ReadonlySet<number>;
	family: EventFamilies;
	locale: string;
	showEverythingButton: boolean;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const families = skyEventFamilies();
	const occurrences = families.get(family)!;
	const latest = occurrences[0]!;
	const familyKeys = [...families.keys()];
	const familyIndex = familyKeys.indexOf(family);
	const before = familyKeys[familyIndex + 1];
	const after = familyKeys[familyIndex - 1];

	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
	});

	return (
		<>
			<Breadcrumb
				current={t(latest.name, { ns: "general" })}
				trail={[
					{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" },
					{ label: t("catalogue.events", { ns: "features" }), to: "?view=events" },
				]}
			/>

			<EventFamilyHeader locale={locale} occurrences={occurrences} />

			{occurrences.map((event) => (
				<EventOccurrence
					currentName={latest.name}
					data={data}
					dateFormat={dateFormat}
					event={event}
					key={event.id}
					locale={locale}
					showEverythingButton={showEverythingButton}
				/>
			))}

			<div className="flex flex-wrap items-center gap-2">
				{before !== undefined && (
					<Link className={VIEW_LINK_CLASS} to={`?view=event-family&family=${before}`}>
						← {t("catalogue.event-previous-event", { ns: "features" })}
					</Link>
				)}
				{after !== undefined && (
					<Link className={VIEW_LINK_CLASS} to={`?view=event-family&family=${after}`}>
						{t("catalogue.event-next-event", { ns: "features" })} →
					</Link>
				)}
			</div>

			<BackButton to="?view=events" />
		</>
	);
}
