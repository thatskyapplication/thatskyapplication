"use client";

import Link from "next/link.js";
import { useCountdown } from "~/hooks/useCountdown";

function Expired() {
	return (
		<Link
			className="bg-white dark:bg-caelus-100 hover:bg-lightblue-100 focus:ring focus:ring-width-2 flex h-11 transform-gpu cursor-pointer select-none appearance-none flex-row place-items-center gap-2 rounded px-4 text-base font-semibold leading-none text-black no-underline outline-none focus:ring-caelus dark:focus:ring-white active:translate-y-px"
			href="Lu/happy-birthday"
		>
			??
		</Link>
	);
}

export default function Countdown() {
	const [time, { hours }] = useCountdown();
	return hours < 0 ? <Expired /> : <div>{time}</div>;
}
