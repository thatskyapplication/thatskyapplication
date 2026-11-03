import { clsx } from "clsx";
import { CheckCircle, Circle } from "lucide-react";
import { useChecklistToggle } from "~/hooks/use-checklist-toggle.js";
import { COMPLETE_CARD_CLASS } from "~/utility/styles.js";
import type { ChecklistToggleData } from "~/utility/whats-happening-in-sky.js";

export function ChecklistToggle({
	toggle: { column, complete, completeLabel, incompleteLabel },
}: {
	toggle: ChecklistToggleData;
}) {
	const [fetcher, optimisticComplete] = useChecklistToggle(column, complete);

	return (
		<fetcher.Form action="/me/checklist" method="post">
			<input name={column} type="hidden" value={Number(optimisticComplete)} />
			<button
				className={clsx(
					"flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
					optimisticComplete
						? [COMPLETE_CARD_CLASS, "text-green-800 dark:text-green-200"]
						: "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
				)}
				type="submit"
			>
				{optimisticComplete ? (
					<CheckCircle className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
				) : (
					<Circle className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500" />
				)}
				{optimisticComplete ? completeLabel : incompleteLabel}
			</button>
		</fetcher.Form>
	);
}
