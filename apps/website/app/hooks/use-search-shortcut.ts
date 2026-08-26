import { type RefObject, useEffect } from "react";

const SEARCH_KEY = "k" as const;

export function useSearchShortcut(ref: RefObject<HTMLInputElement | null>) {
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.defaultPrevented ||
				event.altKey ||
				event.shiftKey ||
				!(event.metaKey || event.ctrlKey) ||
				event.key.toLowerCase() !== SEARCH_KEY
			) {
				return;
			}

			const input = ref.current;

			if (!input) {
				return;
			}

			event.preventDefault();
			input.focus();
			input.select();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [ref]);
}
