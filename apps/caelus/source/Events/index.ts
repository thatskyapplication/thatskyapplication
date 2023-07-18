import {
	EmbedBuilder,
	TimestampStyles,
	userMention,
	type ClientEvents,
	type Guild,
	type EmbedAuthorOptions,
	GuildNSFWLevel,
} from "discord.js";
import { guildLink, time } from "../Utility/Utility.js";
import { LogType } from "../index.js";
import { event as guildCreate } from "./guildCreate.js";
import { event as guildDelete } from "./guildDelete.js";
import { event as interactionCreate } from "./interactionCreate.js";
import { event as messageCreate } from "./messageCreate.js";
import { event as ready } from "./ready.js";

export interface Event<T extends keyof ClientEvents = keyof ClientEvents> {
	name: T;
	once?: boolean;
	fire(this: void, ...parameters: ClientEvents[T]): Promise<void> | void;
}

function embedTintFactor(duration: number) {
	const percent = Math.min(duration / (2_419_200_000 / 100), 100);
	let red;
	let green;
	let blue = 0;

	if (percent < 50) {
		red = 255;
		green = Math.round(5.1 * percent);
	} else {
		green = 255;
		red = Math.round(510 - 5.1 * percent);
	}

	const tintFactor = 0.3;
	red += (255 - red) * tintFactor;
	green += (255 - green) * tintFactor;
	blue += (255 - blue) * tintFactor;
	return Math.trunc((red << 16) + (green << 8) + blue);
}

function guildNSFWLevelString(guildNSFWLevel: GuildNSFWLevel) {
	switch (guildNSFWLevel) {
		case GuildNSFWLevel.Default:
			return "Default";
		case GuildNSFWLevel.Explicit:
			return "Explicit";
		case GuildNSFWLevel.Safe:
			return "Safe";
		case GuildNSFWLevel.AgeRestricted:
			return "Age restricted";
	}
}

export function logGuild(guild: Guild, join = true) {
	const embedAuthorOptions: EmbedAuthorOptions = { name: guild.name, url: guildLink(guild.id) };

	const iconURL = guild.iconURL({ size: 4_096 });
	if (iconURL) embedAuthorOptions.iconURL = iconURL;

	const description = [
		`Id: \`${guild.id}\``,
		`Created: ${time(guild.createdTimestamp, TimestampStyles.LongDateTime, true)}`,
		`Joined: ${time(guild.joinedTimestamp, TimestampStyles.LongDateTime, true)}`,
		`Owner: ${userMention(guild.ownerId)}`,
	];

	if (guild.description) description.push(`> ${guild.description}`);

	void guild.client.log({
		embeds: [
			new EmbedBuilder()
				.setAuthor(embedAuthorOptions)
				.setDescription(description.join("\n"))
				.setColor(join ? embedTintFactor(Date.now() - guild.createdTimestamp) : 0)
				.setFields(
					{ name: "Members", value: `${guild.memberCount}`, inline: true },
					{ name: "Locale", value: `${guild.preferredLocale}`, inline: true },
					{ name: "NSFW", value: `${guildNSFWLevelString(guild.nsfwLevel)}`, inline: true },
					{ name: "Partnered", value: `\`${guild.partnered}\``, inline: true },
					{ name: "Verified", value: `\`${guild.verified}\``, inline: true },
					{
						name: "Vanity",
						value: `${guild.vanityURLCode ? `https://discord.gg/${guild.vanityURLCode}` : "None"}`,
						inline: true,
					},
				)
				.setFooter({ text: `Guild ${join ? "Joined" : "Left"} (#${guild.client.guilds.cache.size})` })
				.setTimestamp(),
		],
		type: LogType.Guild,
	});
}

export default [guildCreate, guildDelete, interactionCreate, messageCreate, ready] as const;
