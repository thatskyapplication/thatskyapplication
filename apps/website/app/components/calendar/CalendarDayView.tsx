import { CalendarDayDetails } from "~/components/calendar/CalendarDayDetails";
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
	return (
		<div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
			<CalendarDayDetails allDay={allDay} locale={locale} occurrences={detail.occurrences} />
		</div>
	);
}
