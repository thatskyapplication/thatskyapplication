import { useTranslation } from "react-i18next";
import type { EventFamily } from "@thatskyapplication/utility";
import type { DateTimeLabels } from "~/utility/time.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { EventFamilyHeader } from "./EventFamilyHeader";
import { EventOccurrence } from "./EventOccurrence";

export function EventFamilyView({
	data,
	dateTimeLabels,
	family,
	locale,
	showEverythingButton,
	timeZoneEstimated,
}: {
	data: ReadonlySet<number>;
	dateTimeLabels: DateTimeLabels;
	family: EventFamily;
	locale: string;
	showEverythingButton: boolean;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const { latest, occurrences } = family;

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
					dateTimeLabels={dateTimeLabels}
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
