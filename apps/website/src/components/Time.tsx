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
			setTimeString(date.format("HH:mm:ss"));
		}, 1_000);

		return () => clearInterval(interval);
	}, []);

	return <>{timeString}</>;
}
