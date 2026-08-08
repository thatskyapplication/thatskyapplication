import { Combobox } from "@base-ui/react/combobox";
import { clsx } from "clsx";
import { ChevronDown, X } from "lucide-react";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";

interface SelectOption {
	value: string;
	label: string;
}

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
}

const CONTROL_CLASS =
	"flex min-h-10 w-full items-center rounded-sm border bg-[var(--select-bg)] text-[var(--select-text)]" as const;

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
}: SelectProps) {
	const { t } = useTranslation();
	const id = useId();
	const errorId = `${id}-error`;
	const describedByParts: string[] = [];

	if (ariaDescribedBy) {
		describedByParts.push(ariaDescribedBy);
	}

	if (error) {
		describedByParts.push(errorId);
	}

	const describedBy = describedByParts.join(" ") || undefined;
	const selectedOption = options.find((option) => option.value === value) ?? null;

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="text-text-tertiary text-sm font-semibold" htmlFor={id}>
					{label}
				</label>
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
								CONTROL_CLASS,
								error
									? "border-red-600"
									: "border-[var(--select-border)] hover:border-[var(--select-border-hover)]",
								state.disabled && "cursor-not-allowed opacity-60",
							)
						}
					>
						<Combobox.Input
							aria-describedby={describedBy}
							aria-invalid={error ? true : undefined}
							aria-label={ariaLabel}
							aria-labelledby={ariaLabelledBy}
							className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-[var(--select-placeholder)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
							id={id}
							placeholder={placeholder}
							{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
						/>
						{isClearable && selectedOption ? (
							<Combobox.Clear
								aria-label={t("clear", { ns: "general" })}
								className="cursor-pointer p-2 text-[var(--select-placeholder)] transition-colors hover:text-[var(--select-text)]"
								disabled={disabled}
							>
								<X className="h-4 w-4" />
							</Combobox.Clear>
						) : null}
						<Combobox.Trigger
							className={(state) =>
								clsx(
									"cursor-pointer p-2 text-[var(--select-placeholder)] transition-transform hover:text-[var(--select-text)]",
									state.open && "rotate-180",
								)
							}
							disabled={disabled}
						>
							<ChevronDown className="h-4 w-4" />
						</Combobox.Trigger>
					</Combobox.InputGroup>
					<Combobox.Portal>
						<Combobox.Positioner align="start" collisionPadding={8} sideOffset={4}>
							<Combobox.Popup className="max-h-[min(18rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-sm border border-[var(--select-border)] bg-[var(--select-menu-bg)] shadow-md">
								<Combobox.Empty>
									<p className="m-0 px-3 py-2 text-sm text-[var(--select-placeholder)]">
										{t("no-results", { ns: "general" })}
									</p>
								</Combobox.Empty>
								<Combobox.List>
									{(option: SelectOption) => (
										<Combobox.Item
											className={(state) =>
												clsx(
													"cursor-pointer px-3 py-2 text-sm text-[var(--select-text)] transition-colors",
													state.selected
														? "bg-[var(--select-option-active)]"
														: state.highlighted
															? "bg-[var(--select-option-hover)]"
															: "bg-[var(--select-option-bg)]",
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
				<span className="text-sm text-red-600 dark:text-red-400" id={errorId}>
					{error}
				</span>
			)}
		</div>
	);
}
