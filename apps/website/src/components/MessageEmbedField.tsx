export interface IDiscordMessageEmbedField {
	name: string;
	value: string;
	linkValue: string;
	inline?: boolean;
}

export function DiscordMessageEmbedField({ name, value, linkValue, inline }: IDiscordMessageEmbedField) {
	return (
		<div className={`${inline ? "sm:col-span-4" : "sm:col-span-12"} flex flex-col`}>
			<span className="dark:text-[rgb(242,243,245)] text-[rgb(6,6,7)] font-medium">{name}</span>
			{linkValue ? (
				<a
					className="text-[rgb(0,108,231)] dark:text-[rgb(0,168,252)]"
					href={linkValue.slice(linkValue.lastIndexOf(" ") + 1)}
					rel="external noopener noreferrer"
					target="_blank"
				>
					{linkValue.slice(0, linkValue.lastIndexOf(" "))}
				</a>
			) : (
				<span className="dark:text-[rgb(219,222,225)] text-[rgb(49,51,56)]">{value}</span>
			)}
		</div>
	);
}
