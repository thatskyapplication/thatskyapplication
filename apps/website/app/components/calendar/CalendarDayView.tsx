import { useState } from "react";
import {
	type CalendarDayInfographic,
	CalendarDayDetails,
} from "~/components/calendar/CalendarDayDetails";
import { InfographicPreview } from "~/components/InfographicPreview";
import type { CalendarDayDetail, CalendarEntry } from "~/utility/calendar";

export function CalendarDayView({
	allDay,
	detail,
	locale,
}: {
	allDay: readonly CalendarEntry[];
	detail: CalendarDayDetail;
	locale: string;
}) {
	const [selectedInfographic, setSelectedInfographic] = useState<CalendarDayInfographic | null>(
		null,
	);

	return (
		<>
			<div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
				<CalendarDayDetails
					allDay={allDay}
					locale={locale}
					occurrences={detail.occurrences}
					onPreview={setSelectedInfographic}
				/>
			</div>
			{selectedInfographic && (
				<InfographicPreview
					acknowledgement={selectedInfographic.acknowledgement}
					imageURL={selectedInfographic.imageURL}
					onClose={() => setSelectedInfographic(null)}
					title={selectedInfographic.title}
				/>
			)}
		</>
	);
}
