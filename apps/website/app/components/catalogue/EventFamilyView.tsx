import { useTranslation } from "react-i18next";
import type { EventFamily } from "@thatskyapplication/utility";
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
	timeZoneEstimated,
	hour12,
}: {
	data: ReadonlySet<number>;
	family: EventFamily;
	locale: string;
	showEverythingButton: boolean;
	timeZone: string;
	timeZoneEstimated: boolean;
	hour12: boolean | undefined;
}) {
	const { t } = useTranslation();
	const { latest, occurrences } = family;

	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
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

			<EventFamilyHeader family={family} locale={locale} />

			{occurrences.map((event) => (
				<EventOccurrence
					currentName={latest.name}
					data={data}
					dateFormat={dateFormat}
					timeZoneEstimated={timeZoneEstimated}
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
