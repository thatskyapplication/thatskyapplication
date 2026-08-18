import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import {
	type CalendarEntryKinds,
	CalendarEntryKindToLabelKey,
	CalendarEntryKindToSwatchClassName,
} from "~/utility/calendar";

export function CalendarLegend({
	hiddenKinds,
	kinds,
	onToggle,
}: {
	hiddenKinds: ReadonlySet<CalendarEntryKinds>;
	kinds: readonly CalendarEntryKinds[];
	onToggle: (kind: CalendarEntryKinds) => void;
}) {
	const { t } = useTranslation();

	return (
		<ul
			aria-label={t("calendar.legend", { ns: "features" })}
			className="-mx-2 -mt-1 flex list-none flex-wrap gap-x-1 gap-y-0.5 p-0"
		>
			{kinds.map((kind) => {
				const hidden = hiddenKinds.has(kind);

				return (
					<li key={kind}>
						<button
							aria-pressed={!hidden}
							className={clsx(
								"inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-sm transition-colors",
								hidden
									? "border-gray-200 bg-transparent text-gray-400 hover:bg-black/5 dark:border-gray-700 dark:text-gray-600 dark:hover:bg-white/10"
									: "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800",
							)}
							onClick={() => onToggle(kind)}
							type="button"
						>
							<span
								className={clsx(
									"h-2.5 w-2.5 shrink-0 rounded-full transition-opacity",
									CalendarEntryKindToSwatchClassName[kind],
									hidden && "opacity-30",
								)}
							/>
							<span className={clsx(hidden && "line-through")}>
								{t(CalendarEntryKindToLabelKey[kind])}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
