import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { useId, useState } from "react";
import { useFetcher } from "react-router";
import { ActionButton } from "~/components/ActionButton.js";
import Select from "~/components/Select";
import type { action } from "~/routes/admin.daily-guides.js";
import { FORM_ERROR_BANNER_CLASS, SUCCESS_BANNER_CLASS } from "~/utility/styles.js";

interface DailyGuidesQuestOption {
	label: string;
	value: string;
}

export interface DailyGuidesQuests {
	loaded: string;
	options: readonly DailyGuidesQuestOption[];
	values: readonly string[];
}

function DailyGuidesQuestsFields({
	disabled,
	options,
	values: loadedValues,
}: {
	disabled: boolean;
	options: readonly DailyGuidesQuestOption[];
	values: readonly string[];
}) {
	const labelId = useId();
	const [values, setValues] = useState(loadedValues);
	const unchanged = values.every((value, index) => value === loadedValues[index]);

	function swap(first: number, second: number) {
		setValues((previous) => previous.with(first, previous[second]!).with(second, previous[first]!));
	}

	return (
		<>
			<ol className="m-0 flex list-none flex-col gap-3 p-0">
				{values.map((value, index) => {
					const questNumber = index + 1;
					const questLabelId = `${labelId}-${questNumber}`;

					return (
						<li className="flex flex-col gap-1" key={questNumber}>
							<span
								className="text-sm font-semibold text-gray-600 dark:text-gray-400"
								id={questLabelId}
							>
								Quest {questNumber}
							</span>
							<div className="flex items-center gap-2">
								<div className="min-w-0 grow">
									<Select
										ariaLabelledBy={questLabelId}
										disabled={disabled}
										isClearable
										onChange={(nextValue) =>
											setValues((previous) => previous.with(index, nextValue))
										}
										options={options}
										placeholder="Select a quest"
										value={value}
									/>
								</div>
								<input name={`quest-${questNumber}`} type="hidden" value={value} />
								<ActionButton
									aria-label={`Move quest ${questNumber} up.`}
									disabled={disabled || index === 0}
									onClick={() => swap(index, index - 1)}
									size="icon"
									variant="secondary"
								>
									<ArrowUp className="h-4 w-4" />
								</ActionButton>
								<ActionButton
									aria-label={`Move quest ${questNumber} down.`}
									disabled={disabled || index === values.length - 1}
									onClick={() => swap(index, index + 1)}
									size="icon"
									variant="secondary"
								>
									<ArrowDown className="h-4 w-4" />
								</ActionButton>
							</div>
						</li>
					);
				})}
			</ol>

			<ActionButton
				className="sm:w-fit"
				disabled={disabled || unchanged}
				type="submit"
				variant="primary"
			>
				{disabled ? "Saving..." : "Save quests"}
			</ActionButton>
		</>
	);
}

export function DailyGuidesQuestsForm({
	date,
	quests,
}: {
	date: string;
	quests: DailyGuidesQuests;
}) {
	const fetcher = useFetcher<typeof action>();
	const isSaving = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "quests" ? fetcher.data : null;

	return (
		<fetcher.Form className="flex flex-col gap-3" method="post">
			<input name="intent" type="hidden" value="quests" />
			<input name="date" type="hidden" value={date} />
			<input name="loaded" type="hidden" value={quests.loaded} />

			<DailyGuidesQuestsFields
				disabled={isSaving}
				key={quests.loaded}
				options={quests.options}
				values={quests.values}
			/>

			{result?.ok === false && <div className={FORM_ERROR_BANNER_CLASS}>{result.error}</div>}

			{result?.ok === true && (
				<div className={SUCCESS_BANNER_CLASS}>
					<Check className="h-5 w-5 shrink-0" />
					<p>{result.reordered ? "Quests reordered." : "Quests saved."}</p>
				</div>
			)}
		</fetcher.Form>
	);
}
