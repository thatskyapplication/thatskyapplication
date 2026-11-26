import { Check, Send } from "lucide-react";
import { useFetcher } from "react-router";
import { ActionButton } from "~/components/ActionButton.js";
import type { action } from "~/routes/admin.daily-guides.js";
import { FORM_ERROR_BANNER_CLASS, SUCCESS_BANNER_CLASS } from "~/utility/styles.js";

export function DailyGuidesDistributeForm() {
	const fetcher = useFetcher<typeof action>();
	const isDistributing = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "distribute" ? fetcher.data : null;

	return (
		<fetcher.Form className="flex flex-col gap-3" method="post">
			<input name="intent" type="hidden" value="distribute" />

			<ActionButton className="sm:w-fit" disabled={isDistributing} type="submit" variant="primary">
				<Send className="h-4 w-4" />
				<span>{isDistributing ? "Distributing..." : "Distribute"}</span>
			</ActionButton>

			{result?.ok === false && <div className={FORM_ERROR_BANNER_CLASS}>{result.error}</div>}

			{result?.ok === true && (
				<div className={SUCCESS_BANNER_CLASS}>
					<Check className="h-5 w-5 shrink-0" />
					<p>Distribution started.</p>
				</div>
			)}
		</fetcher.Form>
	);
}
