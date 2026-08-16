export function VisitNumber({ visit }: { visit: number }) {
	return (
		<span className="inline-flex w-11 shrink-0 justify-center rounded-md bg-gray-200 py-0.5 text-xs font-semibold text-gray-700 tabular-nums dark:bg-gray-700 dark:text-gray-200">
			#{visit}
		</span>
	);
}
