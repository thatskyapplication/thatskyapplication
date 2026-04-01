import React from "react";
import ReactSelect, { type SingleValue, type StylesConfig } from "react-select";

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
	const id = React.useId();

	const customStyles: StylesConfig<SelectOption, false> = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: state.isDisabled ? "var(--select-option-hover)" : "var(--select-bg)",
			borderColor: state.isDisabled
				? "var(--select-border)"
				: error
					? "#dc2626"
					: state.isFocused
						? "var(--select-border-hover)"
						: "var(--select-border)",
			borderWidth: "1px",
			borderRadius: "0.125rem",
			minHeight: "40px",
			boxShadow: "none",
			outline: "none",
			cursor: state.isDisabled ? "not-allowed" : "pointer",
			opacity: state.isDisabled ? 0.6 : 1,
			"&:hover": {
				borderColor: state.isDisabled
					? "var(--select-border)"
					: error
						? "#dc2626"
						: "var(--select-border-hover)",
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "var(--select-menu-bg)",
			border: "1px solid var(--select-border)",
			borderRadius: "0.125rem",
			boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
			zIndex: 99999,
			overflow: "hidden",
		}),
		menuList: (provided) => ({
			...provided,
			padding: "0",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? "var(--select-option-active)"
				: state.isFocused
					? "var(--select-option-hover)"
					: "var(--select-option-bg)",
			color: "var(--select-text)",
			padding: "8px 12px",
			cursor: "pointer",
			transition: "background-color 0.15s ease",
			"&:active": {
				backgroundColor: "var(--select-option-active)",
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: disabled ? "var(--select-placeholder)" : "var(--select-text)",
		}),
		placeholder: (provided) => ({
			...provided,
			color: "var(--select-placeholder)",
		}),
		input: (provided) => ({
			...provided,
			color: disabled ? "var(--select-placeholder)" : "var(--select-text)",
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			color: "var(--select-placeholder)",
			padding: "8px",
			transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
			transition: "transform 0.2s ease, color 0.15s ease",
			"&:hover": {
				color: state.isDisabled ? "var(--select-placeholder)" : "var(--select-text)",
			},
		}),
		clearIndicator: (provided, state) => ({
			...provided,
			color: "var(--select-placeholder)",
			padding: "8px",
			opacity: state.selectProps.isDisabled ? 0.4 : 1,
			"&:hover": {
				color: state.selectProps.isDisabled ? "var(--select-placeholder)" : "var(--select-text)",
			},
		}),
		indicatorSeparator: () => ({
			display: "none",
		}),
	};

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="font-semibold text-sm text-text-tertiary" htmlFor={id}>
					{label}
				</label>
			)}
			<div className={className} style={disabled ? { cursor: "not-allowed" } : undefined}>
				<div style={disabled ? { pointerEvents: "none" } : undefined}>
					<ReactSelect
						aria-describedby={ariaDescribedBy}
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledBy}
						inputId={id}
						isClearable={isClearable}
						isDisabled={disabled}
						onChange={(newValue: SingleValue<SelectOption>) => {
							onChange(newValue?.value ?? "");
						}}
						options={options}
						placeholder={placeholder}
						styles={customStyles}
						value={options.find((option) => option.value === value) || null}
					/>
				</div>
			</div>
			{error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
		</div>
	);
}
