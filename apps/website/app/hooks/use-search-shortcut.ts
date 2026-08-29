import { type RefObject, useEffect, useSyncExternalStore } from "react";

const SEARCH_KEY = "k" as const;
const APPLE_PLATFORM_REGULAR_EXPRESSION = /mac|iphone|ipad|ipod/i;

const subscribeToNothing = () => () => {};

function hintSnapshot() {
	const modifier = APPLE_PLATFORM_REGULAR_EXPRESSION.test(navigator.userAgent) ? "⌘" : "Ctrl ";
	return `${modifier}${SEARCH_KEY.toUpperCase()}`;
}

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

	return useSyncExternalStore(subscribeToNothing, hintSnapshot, () => null);
}
