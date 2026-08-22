import { useEffect } from "react";
import { useNavigate } from "react-router";

const TODAY_KEY = "t" as const;
const IGNORED_TARGETS = "input, textarea, select, [role='dialog']" as const;

export function useCalendarKeyboardNavigation({
	nextPath,
	previousPath,
	rightToLeft,
	todayPath,
}: {
	nextPath: string | null;
	previousPath: string | null;
	rightToLeft: boolean;
	todayPath: string;
}) {
	const navigate = useNavigate();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.defaultPrevented ||
				event.altKey ||
				event.ctrlKey ||
				event.metaKey ||
				event.shiftKey
			) {
				return;
			}

			const { target } = event;

			if (
				target instanceof HTMLElement &&
				(target.isContentEditable || target.closest(IGNORED_TARGETS) !== null)
			) {
				return;
			}

			let path: string | null;

			switch (event.key) {
				case "ArrowLeft":
					path = rightToLeft ? nextPath : previousPath;
					break;
				case "ArrowRight":
					path = rightToLeft ? previousPath : nextPath;
					break;
				case TODAY_KEY:
					path = todayPath;
					break;
				default:
					return;
			}

			if (path === null) {
				return;
			}

			event.preventDefault();
			void navigate(path, { preventScrollReset: true });
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [navigate, nextPath, previousPath, rightToLeft, todayPath]);
}
