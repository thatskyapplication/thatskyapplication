"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useEffect, useState } from "react";

dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(utc);

const herBirthday = dayjs.tz("2023-05-13 00:00", "Europe/Madrid");

function countdownData() {
	const date = dayjs.tz(Date.now(), "Europe/Madrid");
	const diff = herBirthday.diff(date);
	const duration = dayjs.duration(diff);
	const untilH = duration.days() * 24 + duration.hours();
	const untilM = duration.minutes();
	const untilS = duration.seconds();

	return {
		hours: untilH,
		minutes: untilM,
		seconds: untilS,
	};
}

function countdownFormat() {
	const { hours, minutes, seconds } = countdownData();
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useCountdown() {
	const [countdown, setCountdown] = useState(() => countdownFormat());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(countdownFormat());
		}, 1_000);
		return () => clearInterval(interval);
	}, []);

	return [countdown, countdownData()] as const;
}
