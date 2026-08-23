import { Dialog } from "@base-ui/react/dialog";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { CalendarDayDetails } from "~/components/calendar/CalendarDayDetails";
import {
	type CalendarDayDetail,
	type CalendarEntry,
	type CalendarEntryKinds,
	calendarPath,
	type CalendarViews,
} from "~/utility/calendar";

const DIALOGUE_ICON_BUTTON_CLASS =
	"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" as const;

export function CalendarDayDialogue({
	allDay,
	anchorDate,
	detail,
	hiddenKinds,
	locale,
	skyTime,
	zoneEstimated,
	view,
}: {
	allDay: readonly CalendarEntry[];
	anchorDate: string;
	detail: CalendarDayDetail;
	hiddenKinds: ReadonlySet<CalendarEntryKinds>;
	locale: string;
	skyTime: boolean;
	zoneEstimated: boolean;
	view: CalendarViews;
}) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const date = Temporal.PlainDate.from(detail.date);
	const previousDay = date.subtract({ days: 1 }).toString();
	const nextDay = date.add({ days: 1 }).toString();

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				if (!open) {
					void navigate(calendarPath({ view, skyTime, hiddenKinds, date: anchorDate }), {
						preventScrollReset: true,
						replace: true,
					});
				}
			}}
			open
		>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
				<Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[min(44rem,calc(100dvh-2rem))] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
					<div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
						<Dialog.Title className="my-0 text-lg font-semibold text-gray-900 dark:text-gray-100">
							{detail.heading}
						</Dialog.Title>
						<div className="flex shrink-0 items-center gap-1">
							<Link
								aria-label={t("calendar.previous-day", { ns: "features" })}
								className={DIALOGUE_ICON_BUTTON_CLASS}
								preventScrollReset
								replace
								to={calendarPath({
									view,
									skyTime,
									hiddenKinds,
									date: previousDay,
									day: previousDay,
								})}
							>
								<ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
							</Link>
							<Link
								aria-label={t("calendar.next-day", { ns: "features" })}
								className={DIALOGUE_ICON_BUTTON_CLASS}
								preventScrollReset
								replace
								to={calendarPath({ view, skyTime, hiddenKinds, date: nextDay, day: nextDay })}
							>
								<ChevronRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
							</Link>
							<Dialog.Close
								aria-label={t("close", { ns: "general" })}
								className={clsx(DIALOGUE_ICON_BUTTON_CLASS, "-me-1")}
							>
								<X aria-hidden="true" className="h-4 w-4" />
							</Dialog.Close>
						</div>
					</div>
					<div className="overflow-y-auto px-4 py-3">
						<CalendarDayDetails
							zoneEstimated={zoneEstimated}
							allDay={allDay}
							locale={locale}
							occurrences={detail.occurrences}
						/>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
