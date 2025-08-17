export type Snowflake = `${bigint}`;

export type MessageLink =
	| `https://discord.com/channels/${"@me" | Snowflake}/${Snowflake}/${Snowflake}`
	| null;

export type Nullable<Type> = {
	[Property in keyof Type]: Type[Property] | null;
};
