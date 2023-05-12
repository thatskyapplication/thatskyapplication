"use client";

import { useCountdown } from "~/hooks/useCountdown";
import { CDN_URL } from "~/util/constants";

function Expired() {
	return <video controls src={new URL("Lucía.mp4", CDN_URL).toString()} />;
}

export default function Countdown() {
	const [time, { hours }] = useCountdown();
	return hours < 0 ? <Expired /> : <div>{time}</div>;
}
