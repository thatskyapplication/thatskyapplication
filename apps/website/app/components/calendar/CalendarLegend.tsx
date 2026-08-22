import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import {
	CALENDAR_ENTRY_KIND_VALUES,
	CalendarEntryKindPresentations,
	type CalendarEntryKinds,
} from "~/utility/calendar";

export function CalendarLegend({
	hiddenKinds,
	onToggle,
}: {
	hiddenKinds: ReadonlySet<CalendarEntryKinds>;
	onToggle: (kind: CalendarEntryKinds) => void;
}) {
	const { t } = useTranslation();

	return (
		<ul
			aria-label={t("calendar.legend", { ns: "features" })}
			className="-mx-2 -mt-1 flex list-none flex-wrap gap-x-1 gap-y-0.5 p-0"
		>
			{CALENDAR_ENTRY_KIND_VALUES.map((kind) => {
				const hidden = hiddenKinds.has(kind);
				const presentation = CalendarEntryKindPresentations[kind];

				return (
					<li key={kind}>
						<button
							aria-pressed={!hidden}
							className={clsx(
								"inline-flex cursor-pointer items-center rounded-full border px-2 py-1 text-xs font-medium transition",
								hidden
									? "border-gray-200 bg-transparent text-gray-400 line-through hover:bg-black/5 dark:border-gray-700 dark:text-gray-600 dark:hover:bg-white/10"
									: `border-transparent hover:brightness-110 ${presentation.bar}`,
							)}
							onClick={() => onToggle(kind)}
							type="button"
						>
							{t(presentation.labelKey)}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
