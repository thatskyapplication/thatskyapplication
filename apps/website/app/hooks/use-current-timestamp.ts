import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";
import { TIME_ZONE } from "@thatskyapplication/utility";

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
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}

			window.removeEventListener("focus", updateTimestamp);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return Math.max(currentTimestamp, initialTimestamp);
}

export function useDailyRevalidator(currentTimestamp: number, timeZone: string) {
	const { revalidate } = useRevalidator();
	const lastDayTimestamp = useRef(dayTimestamp(currentTimestamp, timeZone));
	const currentDayTimestamp = dayTimestamp(currentTimestamp, timeZone);

	useEffect(() => {
		if (currentDayTimestamp <= lastDayTimestamp.current) {
			return;
		}

		lastDayTimestamp.current = currentDayTimestamp;
		void revalidate();
	}, [currentDayTimestamp, revalidate]);
}

export function useSkyDailyResetRevalidator(currentTimestamp: number) {
	useDailyRevalidator(currentTimestamp, TIME_ZONE);
}
