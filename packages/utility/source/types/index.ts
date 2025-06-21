export type Snowflake = `${bigint}`;

export type MessageLink =
	| `https://discord.com/channels/${"@me" | Snowflake}/${Snowflake}/${Snowflake}`
	| null;
