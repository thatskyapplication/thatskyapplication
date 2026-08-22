import { Popover } from "@base-ui/react/popover";
import { clsx } from "clsx";
import { Settings as SettingsIcon } from "lucide-react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	calendarPath,
	type CalendarEntryKinds,
	CalendarView,
	type CalendarViews,
} from "~/utility/calendar";

const OPTION_CLASS =
	"inline-flex h-8 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors" as const;

const OPTION_INACTIVE_CLASS =
	"text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" as const;

const OPTION_ACTIVE_CLASS = "bg-discord-button text-white" as const;

function SettingsGroup({
	label,
	options,
}: {
	label: string;
	options: readonly { key: string; label: string; selected: boolean; to: string }[];
}) {
	const labelId = useId();

	return (
		<div>
			<p
				className="m-0 mb-1 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400"
				id={labelId}
			>
				{label}
			</p>
			<div
				aria-labelledby={labelId}
				className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-900"
				role="group"
			>
				{options.map((option) => (
					<Popover.Close
						key={option.key}
						nativeButton={false}
						render={
							<Link
								aria-current={option.selected ? "true" : undefined}
								className={clsx(
									OPTION_CLASS,
									option.selected ? OPTION_ACTIVE_CLASS : OPTION_INACTIVE_CLASS,
								)}
								preventScrollReset
								to={option.to}
							/>
						}
					>
						{option.label}
					</Popover.Close>
				))}
			</div>
		</div>
	);
}

export function CalendarSettings({
	anchorDate,
	className,
	dayDate,
	hiddenKinds,
	skyTime,
	view,
}: {
	anchorDate: string;
	className: string;
	dayDate: string;
	hiddenKinds: ReadonlySet<CalendarEntryKinds>;
	skyTime: boolean;
	view: CalendarViews;
}) {
	const { t } = useTranslation();

	return (
		<Popover.Root>
			<Popover.Trigger aria-label={t("settings.name", { ns: "features" })} className={className}>
				<SettingsIcon aria-hidden="true" className="h-4 w-4" />
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Positioner
					align="end"
					className="z-50"
					collisionPadding={8}
					side="bottom"
					sideOffset={6}
				>
					<Popover.Popup className="flex max-h-(--available-height) w-60 flex-col gap-3 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
						<SettingsGroup
							label={t("calendar.view-label", { ns: "features" })}
							options={[
								{
									key: CalendarView.Month,
									label: t("calendar.view-month", { ns: "features" }),
									selected: view === CalendarView.Month,
									to: calendarPath({
										view: CalendarView.Month,
										skyTime,
										hiddenKinds,
										date: anchorDate,
									}),
								},
								{
									key: CalendarView.Week,
									label: t("calendar.view-week", { ns: "features" }),
									selected: view === CalendarView.Week,
									to: calendarPath({
										view: CalendarView.Week,
										skyTime,
										hiddenKinds,
										date: anchorDate,
									}),
								},
								{
									key: CalendarView.Day,
									label: t("calendar.view-day", { ns: "features" }),
									selected: view === CalendarView.Day,
									to: calendarPath({ view: CalendarView.Day, skyTime, hiddenKinds, date: dayDate }),
								},
							]}
						/>
						<SettingsGroup
							label={t("calendar.time-zone-label", { ns: "features" })}
							options={[
								{
									key: "local",
									label: t("calendar.time-zone-local", { ns: "features" }),
									selected: !skyTime,
									to: calendarPath({ view, skyTime: false, hiddenKinds, date: anchorDate }),
								},
								{
									key: "sky",
									label: t("schedule.sky-time", { ns: "features" }),
									selected: skyTime,
									to: calendarPath({ view, skyTime: true, hiddenKinds, date: anchorDate }),
								},
							]}
						/>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
