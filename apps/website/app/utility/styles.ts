import { clsx } from "clsx";

export const SEARCH_INPUT_CLASS =
	"peer w-full rounded-lg border border-gray-200 py-2.5 pr-14 pl-9 pointer-coarse:pr-3 [&:not(:placeholder-shown)]:pr-3 text-sm text-gray-900 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400" as const;

export const SEARCH_INPUT_SURFACE_CLASS = "bg-gray-100 dark:bg-gray-900" as const;

export const SEARCH_ICON_CLASS =
	"pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-400" as const;

export const SEARCH_SHORTCUT_HINT_CLASS =
	"pointer-events-none absolute top-1/2 right-3 z-10 -translate-y-1/2 text-xs text-gray-500 select-none peer-focus:hidden pointer-coarse:hidden dark:text-gray-400 peer-[:not(:placeholder-shown)]:hidden" as const;

export const SELECTABLE_OPTION_CARD_CLASS =
	"rounded-lg border border-gray-300 bg-white text-left shadow-sm transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-focus-visible:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30 peer-disabled:cursor-not-allowed peer-disabled:border-gray-200 peer-disabled:bg-gray-100 peer-disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-950/40 dark:peer-disabled:border-gray-700 dark:peer-disabled:bg-gray-900" as const;

const TEXT_FIELD_CLASS =
	"w-full rounded-lg border bg-white text-gray-900 shadow-sm transition-colors outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:disabled:border-gray-700 dark:disabled:bg-gray-900 dark:disabled:text-gray-500" as const;

const TEXT_FIELD_DEFAULT_CLASS =
	"border-gray-300 focus:border-blue-500 dark:border-gray-600" as const;

const TEXT_FIELD_ERROR_CLASS = "border-red-500 focus:border-red-500 dark:border-red-500" as const;

export const DIALOGUE_BACKDROP_CLASS = "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" as const;

export const DIALOGUE_POPUP_CLASS =
	"fixed top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900" as const;

export const DIALOGUE_TITLE_CLASS =
	"my-0 text-lg font-semibold text-gray-900 dark:text-gray-100" as const;

export const WARNING_BANNER_CLASS =
	"rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40" as const;

const TEXT_FIELD_SIZE_CLASSES = {
	medium: "px-3 py-2.5 text-base",
	small: "px-3 py-1.5 text-sm",
} as const;

export function textFieldClass(hasError: boolean, size: keyof typeof TEXT_FIELD_SIZE_CLASSES) {
	return clsx(
		TEXT_FIELD_CLASS,
		TEXT_FIELD_SIZE_CLASSES[size],
		hasError ? TEXT_FIELD_ERROR_CLASS : TEXT_FIELD_DEFAULT_CLASS,
	);
}
