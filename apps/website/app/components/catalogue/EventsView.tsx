import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
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
	const families = useMemo(() => [...skyEventFamilies().values()], []);

	return (
		<>
			<Breadcrumb
				current={t("catalogue.events", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{families.map((family) => (
					<SectionCard
						emoji={EventIdToEventTicketEmoji[family.latest.id]}
						emptyLabel={t("catalogue.event-no-cosmetics", { ns: "features" })}
						key={family.id}
						note={eventFamilyYears(family.occurrences, t)}
						percentage={cataloguePercentage(catalogueProgress(family.offer, data))}
						title={t(family.latest.name, { ns: "general" })}
						to={`?view=event-family&family=${family.id}`}
					/>
				))}
			</div>

			<BackButton to="/me/catalogue" />
		</>
	);
}
