import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	catalogueEventItems,
	cataloguePercentage,
	catalogueProgress,
	skyEventFamilies,
} from "@thatskyapplication/utility";
import { eventFamilyYears } from "~/utility/catalogue.js";
import { EventIdToEventTicketEmoji } from "~/utility/emojis.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { SectionCard } from "./SectionCard";

export function EventsView({ data }: { data: ReadonlySet<number> }) {
	const { t } = useTranslation();
	const families = useMemo(() => [...skyEventFamilies()], []);

	return (
		<>
			<Breadcrumb
				current={t("catalogue.events", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{families.map(([family, occurrences]) => {
					const latest = occurrences[0];

					return (
						<SectionCard
							emoji={EventIdToEventTicketEmoji[latest.id]}
							emptyLabel={t("catalogue.event-no-cosmetics", { ns: "features" })}
							key={family}
							note={eventFamilyYears(occurrences, t)}
							percentage={cataloguePercentage(
								catalogueProgress(catalogueEventItems(occurrences), data),
							)}
							title={t(latest.name, { ns: "general" })}
							to={`?view=event-family&family=${family}`}
						/>
					);
				})}
			</div>

			<BackButton to="/me/catalogue" />
		</>
	);
}
