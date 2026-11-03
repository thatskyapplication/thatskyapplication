import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";
import { TIME_ZONE } from "@thatskyapplication/utility";

const DAILY_REVALIDATION_DELAY = 2_000 as const;

function dayTimestamp(timestamp: number, timeZone: string) {
	return Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO(timeZone).startOfDay()
		.epochMilliseconds;
}

export function useCurrentTimestamp(initialTimestamp: number) {
	const [currentTimestamp, setCurrentTimestamp] = useState(initialTimestamp);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		const updateTimestamp = () => setCurrentTimestamp(Date.now());

		const scheduleNextUpdate = () => {
			timeout = setTimeout(
				() => {
					updateTimestamp();
					scheduleNextUpdate();
				},
				60_000 - (Date.now() % 60_000),
			);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				updateTimestamp();
			}
		};

		scheduleNextUpdate();
		window.addEventListener("focus", updateTimestamp);
		window.addEventListener("online", updateTimestamp);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}

			window.removeEventListener("focus", updateTimestamp);
			window.removeEventListener("online", updateTimestamp);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return Math.max(currentTimestamp, initialTimestamp);
}

export function useDailyRevalidator(
	currentTimestamp: number,
	loaderTimestamp: number,
	timeZone: string,
) {
	const { revalidate } = useRevalidator();
	const isStale =
		dayTimestamp(currentTimestamp, timeZone) > dayTimestamp(loaderTimestamp, timeZone);

	useEffect(() => {
		if (!isStale) {
			return;
		}

		const timeout = setTimeout(() => {
			if (navigator.onLine) {
				void revalidate();
			}
		}, DAILY_REVALIDATION_DELAY);

		return () => clearTimeout(timeout);
	}, [currentTimestamp, isStale, revalidate]);
}

export function useSkyDailyResetRevalidator(currentTimestamp: number, loaderTimestamp: number) {
	useDailyRevalidator(currentTimestamp, loaderTimestamp, TIME_ZONE);
}
