"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useEffect, useState } from "react";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function Time() {
	const [timeString, setTimeString] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const date = dayjs.tz(Date.now(), "America/Los_Angeles");
			const hour = date.hour();
			const minute = date.minute();
			const second = date.second();

			setTimeString(
				`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
			);
		}, 1_000);

		return () => clearInterval(interval);
	}, []);

	return <>{timeString}</>;
}
