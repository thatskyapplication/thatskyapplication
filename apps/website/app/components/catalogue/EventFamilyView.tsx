import { useTranslation } from "react-i18next";
import type { EventFamilyOccurrences } from "@thatskyapplication/utility";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EventFamilyHeader } from "./EventFamilyHeader";
import { EventOccurrence } from "./EventOccurrence";

export function EventFamilyView({
	data,
	locale,
	occurrences,
	showEverythingButton,
	timeZone,
}: {
	data: ReadonlySet<number>;
	locale: string;
	occurrences: EventFamilyOccurrences;
	showEverythingButton: boolean;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const latest = occurrences[0];

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

			<BackButton to="?view=events" />
		</>
	);
}
