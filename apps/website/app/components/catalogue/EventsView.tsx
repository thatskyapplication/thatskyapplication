import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	catalogueEventItems,
	cataloguePercentage,
	catalogueProgress,
	skyEventFamilies,
} from "@thatskyapplication/utility";
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
					const latest = occurrences[0]!;
					const oldest = occurrences.at(-1)!;

					return (
						<SectionCard
							emoji={EventIdToEventTicketEmoji[latest.id]}
							emptyLabel={t("catalogue.event-no-cosmetics", { ns: "features" })}
							key={family}
							note={
								oldest.start.year === latest.start.year
									? String(latest.start.year)
									: `${oldest.start.year}–${latest.start.year}`
							}
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
