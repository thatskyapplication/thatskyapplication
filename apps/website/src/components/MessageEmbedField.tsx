export interface IDiscordMessageEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export function DiscordMessageEmbedField({ name, value, inline }: IDiscordMessageEmbedField) {
	return (
		<div className={`${inline ? "sm:col-span-4" : "sm:col-span-12"} flex flex-col`}>
			<span className="dark:text-[rgb(242,243,245)] text-[rgb(6,6,7)] font-medium">{name}</span>
			<span className="dark:text-[rgb(219,222,225)] text-[rgb(49,51,56)]">{value}</span>
		</div>
	);
}
