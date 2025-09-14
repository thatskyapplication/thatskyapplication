export type Snowflake = `${bigint}`;
export type ChannelLink = `https://discord.com/channels/${Snowflake}/${Snowflake}`;

export type MessageLink =
	| `https://discord.com/channels/${"@me" | Snowflake}/${Snowflake}/${Snowflake}`
	| null;

export type Nullable<Type> = {
	[Property in keyof Type]: Type[Property] | null;
};
