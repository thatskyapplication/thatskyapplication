import { Combobox } from "@base-ui/react/combobox";
import { Field } from "@base-ui/react/field";
import { clsx } from "clsx";
import { ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";

interface SelectOption {
	value: string;
	label: string;
}

type SelectSurface = "card" | "page";

interface SelectProps {
	ariaDescribedBy?: string;
	ariaLabel?: string;
	ariaLabelledBy?: string;
	label?: string;
	isClearable?: boolean;
	value: string;
	options: readonly SelectOption[];
	onChange: (value: string) => void;
	error?: string | null | undefined;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	surface?: SelectSurface;
}

const CONTROL_CLASS =
	"min-h-10 w-full rounded-lg border py-2.5 pl-3 text-sm text-gray-900 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed dark:text-gray-100 dark:placeholder:text-gray-400" as const;

const SURFACE_CLASSES = {
	card: "bg-white dark:bg-gray-800",
	page: "bg-gray-100 dark:bg-gray-900",
} as const satisfies Readonly<Record<SelectSurface, string>>;

const ICON_BUTTON_CLASS =
	"cursor-pointer p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" as const;

export default function Select({
	ariaDescribedBy,
	ariaLabel,
	ariaLabelledBy,
	label,
	value,
	isClearable = false,
	options,
	onChange,
	error,
	placeholder,
	className,
	disabled = false,
	surface = "card",
}: SelectProps) {
	const { t } = useTranslation();
	const selectedOption = options.find((option) => option.value === value) ?? null;
	const showClearButton = isClearable && selectedOption !== null;

	return (
		<Field.Root className="flex flex-col gap-1" disabled={disabled} invalid={Boolean(error)}>
			{label && (
				<Field.Label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
					{label}
				</Field.Label>
			)}
			<div className={className}>
				<Combobox.Root
					autoHighlight
					disabled={disabled}
					isItemEqualToValue={(option, selected) => option.value === selected.value}
					itemToStringLabel={(option) => option.label}
					itemToStringValue={(option) => option.value}
					items={options}
					onValueChange={(nextValue) => {
						if (nextValue === null) {
							if (isClearable) {
								onChange("");
							}

							return;
						}

						onChange(nextValue.value);
					}}
					value={selectedOption}
				>
					<Combobox.InputGroup
						className={(state) =>
							clsx(
								"relative flex w-full items-center",
								state.disabled && "cursor-not-allowed opacity-60",
							)
						}
					>
						<Combobox.Input
							aria-describedby={ariaDescribedBy}
							aria-label={ariaLabel}
							aria-labelledby={ariaLabelledBy}
							className={clsx(
								CONTROL_CLASS,
								SURFACE_CLASSES[surface],
								error
									? "border-red-600"
									: "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600",
								showClearButton ? "pr-16" : "pr-8",
							)}
							placeholder={placeholder}
							{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
						/>
						<div className="absolute inset-y-0 right-0 flex items-center">
							{showClearButton && (
								<Combobox.Clear
									aria-label={t("clear", { ns: "general" })}
									className={clsx(ICON_BUTTON_CLASS, "transition-colors")}
									disabled={disabled}
								>
									<X className="h-4 w-4" />
								</Combobox.Clear>
							)}
							<Combobox.Trigger
								className={(state) =>
									clsx(ICON_BUTTON_CLASS, "transition-transform", state.open && "rotate-180")
								}
								disabled={disabled}
							>
								<ChevronDown className="h-4 w-4" />
							</Combobox.Trigger>
						</div>
					</Combobox.InputGroup>
					<Combobox.Portal>
						<Combobox.Positioner
							align="start"
							className="z-50"
							collisionPadding={12}
							side="bottom"
							sideOffset={8}
						>
							<Combobox.Popup className="max-h-[min(20rem,var(--available-height))] w-(--anchor-width) overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-900">
								<Combobox.Empty>
									<p className="px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400">
										{t("no-results", { ns: "general" })}
									</p>
								</Combobox.Empty>
								<Combobox.List>
									{(option: SelectOption) => (
										<Combobox.Item
											className={(state) =>
												clsx(
													"cursor-pointer px-3 py-2.5 text-sm text-gray-900 transition-colors dark:text-gray-100",
													state.highlighted
														? "bg-gray-300 font-medium dark:bg-gray-700"
														: state.selected && "bg-gray-200 font-medium dark:bg-gray-800",
												)
											}
											key={option.value}
											value={option}
										>
											{option.label}
										</Combobox.Item>
									)}
								</Combobox.List>
							</Combobox.Popup>
						</Combobox.Positioner>
					</Combobox.Portal>
				</Combobox.Root>
			</div>
			{error && (
				<Field.Error className="text-sm text-red-600 dark:text-red-400" match>
					{error}
				</Field.Error>
			)}
		</Field.Root>
	);
}
