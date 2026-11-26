import { clsx } from "clsx";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";
import { useState } from "react";
import { useFetcher } from "react-router";
import {
	type Emoji,
	NESTING_WORKSHOP_MAXIMUM_PROPS,
	type NestingWorkshopRotationCategories,
	NestingWorkshopRotationCategory,
} from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import type { action } from "~/routes/admin.daily-guides.js";
import { FORM_ERROR_BANNER_CLASS, SUCCESS_BANNER_CLASS } from "~/utility/styles.js";

const NestingWorkshopRotationCategoryToLabel = {
	[NestingWorkshopRotationCategory.RugsAndPillows]: "Rugs and pillows",
	[NestingWorkshopRotationCategory.TablesFurnitureAndStorage]: "Tables, furniture and storage",
	[NestingWorkshopRotationCategory.ChairsAndBeds]: "Chairs and beds",
	[NestingWorkshopRotationCategory.CookingCountersAndBathing]: "Cooking, counters and bathing",
	[NestingWorkshopRotationCategory.WallMountedLightsPlantsAndDecorations]:
		"Wall mounted, lights, plants and decorations",
} as const satisfies Readonly<Record<NestingWorkshopRotationCategories, string>>;

interface DailyGuidesNestingWorkshopProp {
	cosmetic: number;
	emoji: Emoji;
	name: string;
}

interface DailyGuidesNestingWorkshopCategory {
	category: NestingWorkshopRotationCategories;
	props: readonly DailyGuidesNestingWorkshopProp[];
}

export interface DailyGuidesNestingWorkshop {
	categories: readonly DailyGuidesNestingWorkshopCategory[];
	cosmetics: readonly number[];
	loaded: string;
	rotation: string;
	rotationLabel: string;
}

function DailyGuidesNestingWorkshopFields({
	categories,
	cosmetics: loadedCosmetics,
	disabled,
}: {
	categories: readonly DailyGuidesNestingWorkshopCategory[];
	cosmetics: readonly number[];
	disabled: boolean;
}) {
	const [cosmetics, setCosmetics] = useState(loadedCosmetics);
	const full = cosmetics.length >= NESTING_WORKSHOP_MAXIMUM_PROPS;
	const props = new Map<number, DailyGuidesNestingWorkshopProp>();

	for (const category of categories) {
		for (const prop of category.props) {
			props.set(prop.cosmetic, prop);
		}
	}

	const unchanged =
		cosmetics.length === loadedCosmetics.length &&
		cosmetics.every((cosmetic, index) => cosmetic === loadedCosmetics[index]);

	function toggle(cosmetic: number) {
		setCosmetics((previous) =>
			previous.includes(cosmetic)
				? previous.filter((selected) => selected !== cosmetic)
				: [...previous, cosmetic],
		);
	}

	function swap(first: number, second: number) {
		setCosmetics((previous) =>
			previous.with(first, previous[second]!).with(second, previous[first]!),
		);
	}

	return (
		<>
			{cosmetics.length === 0 ? (
				<p className="text-sm text-gray-600 dark:text-gray-400">No props selected.</p>
			) : (
				<ol className="m-0 flex list-none flex-col gap-2 p-0">
					{cosmetics.map((cosmetic, index) => {
						const prop = props.get(cosmetic);
						const name = prop?.name ?? String(cosmetic);

						return (
							<li className="flex items-center gap-2" key={cosmetic}>
								{prop && <EmojiIcon className="h-8 w-8 shrink-0" emoji={prop.emoji} />}
								<span className="min-w-0 grow truncate text-sm text-gray-900 dark:text-gray-100">
									{name}
								</span>
								<input name="cosmetic" type="hidden" value={cosmetic} />
								<ActionButton
									aria-label={`Move ${name} up.`}
									disabled={disabled || index === 0}
									onClick={() => swap(index, index - 1)}
									size="icon"
									variant="secondary"
								>
									<ArrowUp className="h-4 w-4" />
								</ActionButton>
								<ActionButton
									aria-label={`Move ${name} down.`}
									disabled={disabled || index === cosmetics.length - 1}
									onClick={() => swap(index, index + 1)}
									size="icon"
									variant="secondary"
								>
									<ArrowDown className="h-4 w-4" />
								</ActionButton>
								<ActionButton
									aria-label={`Remove ${name}.`}
									disabled={disabled}
									onClick={() => toggle(cosmetic)}
									size="icon"
									variant="secondary"
								>
									<X className="h-4 w-4" />
								</ActionButton>
							</li>
						);
					})}
				</ol>
			)}

			<p className="text-sm text-gray-600 dark:text-gray-400">
				{cosmetics.length} of {NESTING_WORKSHOP_MAXIMUM_PROPS} props selected.
			</p>

			{categories.map((category) => (
				<fieldset className="flex flex-col gap-2" key={category.category}>
					<legend className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
						{NestingWorkshopRotationCategoryToLabel[category.category]}
					</legend>
					<div className="flex flex-wrap gap-2">
						{category.props.map((prop) => {
							const selected = cosmetics.includes(prop.cosmetic);

							return (
								<button
									aria-pressed={selected}
									className={clsx(
										"inline-flex cursor-pointer items-center gap-1.5 rounded-full border py-1 pr-3 pl-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
										selected
											? "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
											: "border-gray-300 bg-transparent text-gray-700 hover:bg-black/5 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/10",
									)}
									disabled={disabled || (full && !selected)}
									key={prop.cosmetic}
									onClick={() => toggle(prop.cosmetic)}
									type="button"
								>
									<EmojiIcon className="h-6 w-6 shrink-0" emoji={prop.emoji} />
									<span>{prop.name}</span>
								</button>
							);
						})}
					</div>
				</fieldset>
			))}

			<ActionButton
				className="sm:w-fit"
				disabled={disabled || unchanged || cosmetics.length === 0}
				type="submit"
				variant="primary"
			>
				{disabled ? "Saving..." : "Save Nesting Workshop"}
			</ActionButton>
		</>
	);
}

export function DailyGuidesNestingWorkshopForm({
	nestingWorkshop,
}: {
	nestingWorkshop: DailyGuidesNestingWorkshop;
}) {
	const fetcher = useFetcher<typeof action>();
	const isSaving = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "nesting-workshop" ? fetcher.data : null;

	return (
		<fetcher.Form className="flex flex-col gap-3" method="post">
			<input name="intent" type="hidden" value="nesting-workshop" />
			<input name="rotation" type="hidden" value={nestingWorkshop.rotation} />
			<input name="loaded" type="hidden" value={nestingWorkshop.loaded} />

			<p className="text-sm text-gray-600 dark:text-gray-400">
				The rotation from {nestingWorkshop.rotationLabel}.
			</p>

			<DailyGuidesNestingWorkshopFields
				categories={nestingWorkshop.categories}
				cosmetics={nestingWorkshop.cosmetics}
				disabled={isSaving}
				key={nestingWorkshop.loaded}
			/>

			{result?.ok === false && <div className={FORM_ERROR_BANNER_CLASS}>{result.error}</div>}

			{result?.ok === true && (
				<div className={SUCCESS_BANNER_CLASS}>
					<Check className="h-5 w-5 shrink-0" />
					<p>{result.reordered ? "Props reordered." : "Props saved."}</p>
				</div>
			)}
		</fetcher.Form>
	);
}
