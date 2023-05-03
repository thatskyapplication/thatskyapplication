export interface IDiscordMessageAuthorReply {
	avatar: string;
	bot?: boolean;
	username: string;
}

export function DiscordMessageAuthorReply({ avatar, bot, username }: IDiscordMessageAuthorReply) {
	return (
		<>
			<img alt={`${username}'s avatar`} className="mr-1 h-4 w-4 select-none rounded-full" src={avatar} />
			{bot ? (
				<div className="mr-1 rounded bg-blurple px-1 vertical-top text-xs text-white" id="bot">
					BOT
				</div>
			) : null}
			<span className="mr-1 cursor-pointer select-none text-sm font-medium leading-snug dark:text-[rgb(242,243,245)] text-[rgb(6,6,7)] hover:underline">
				{username}
			</span>
		</>
	);
}
