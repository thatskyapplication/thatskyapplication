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

export default function TimeUntilBirthday() {
	const [timeString, setTimeString] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const date = dayjs.tz(Date.now(), "Europe/Madrid");
			const diff = herBirthday.diff(date);
			const duration = dayjs.duration(diff);
			const untilH = duration.days() * 24 + duration.hours();
			const untilM = duration.minutes();
			const untilS = duration.seconds();
			setTimeString(`${String(untilH).padStart(2)}:${String(untilM).padStart(2)}:${String(untilS).padStart(2)}`);
		}, 1_000);

		return () => clearInterval(interval);
	}, []);

	return <>{timeString}</>;
}
