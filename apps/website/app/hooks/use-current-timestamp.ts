import { TIME_ZONE } from "@thatskyapplication/utility";
import { useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";

function skyDayTimestamp(timestamp: number) {
	return Temporal.Instant.fromEpochMilliseconds(timestamp)
		.toZonedDateTimeISO(TIME_ZONE)
		.startOfDay().epochMilliseconds;
}

export function useCurrentTimestamp(initialTimestamp: number) {
	const [currentTimestamp, setCurrentTimestamp] = useState(initialTimestamp);

	useEffect(() => {
		setCurrentTimestamp((timestamp) => Math.max(timestamp, initialTimestamp));
	}, [initialTimestamp]);

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

	return currentTimestamp;
}

export function useSkyDailyResetRevalidator(currentTimestamp: number) {
	const { revalidate } = useRevalidator();
	const lastSkyDayTimestamp = useRef(skyDayTimestamp(currentTimestamp));
	const currentSkyDayTimestamp = skyDayTimestamp(currentTimestamp);

	useEffect(() => {
		if (currentSkyDayTimestamp <= lastSkyDayTimestamp.current) {
			return;
		}

		lastSkyDayTimestamp.current = currentSkyDayTimestamp;
		void revalidate();
	}, [currentSkyDayTimestamp, revalidate]);
}
