"use client";

import { useEffect, useState } from "react";

export interface IDiscordMessageAuthor {
	avatar: string;
	bot?: boolean;
	time?: string;
	username: string;
}

export function DiscordMessageAuthor({ avatar, username, bot, time }: IDiscordMessageAuthor) {
	const [timeString, setTimeString] = useState("");

	useEffect(() => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		setTimeString(`Today at ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
	}, []);

	return (
		<>
			<img
				alt={`${username}'s avatar`}
				className="absolute left-[16px] mt-0.5 h-10 w-10 cursor-pointer select-none rounded-full"
				src={avatar}
			/>
			<h2 className="m-0 flex place-items-center text-size-inherit font-medium leading-snug" id="user-info">
				<span className="inline-flex place-items-center" id="username">
					<span className="mr-1.5 cursor-pointer text-base font-medium text-[rgb(6,6,7)] dark:text-[rgb(242,243,245)] hover:underline">
						{username}
					</span>
					{bot ? (
						<span
							className="mr-1 inline-flex place-items-center rounded bg-blurple px-1 vertical-top text-[0.7rem]/4 font-normal text-white"
							id="bot"
						>
							BOT
						</span>
					) : null}
				</span>
				<span
					className="ml-1 cursor-default text-xs leading-snug dark:text-[rgb(148,155,164)] text-[rgb(49,51,56)]"
					id="time"
				>
					{time ?? timeString}
				</span>
			</h2>
		</>
	);
}
