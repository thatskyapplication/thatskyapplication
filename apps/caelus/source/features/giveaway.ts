import {
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APITextDisplayComponent,
	ButtonStyle,
	ChannelType,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { skyToday } from "@thatskyapplication/utility";
import type { QueryResult } from "pg";
import { COMMAND_CACHE } from "../caches/commands.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	ANNOUNCEMENTS_CHANNEL_ID,
	DEVELOPER_ROLE_ID,
	GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT,
} from "../utility/configuration.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	DEVELOPER_GUILD_ID,
	GIVEAWAY_INFORMATION_TEXT,
	GIVEAWAY_NOT_IN_SERVER_TEXT,
} from "../utility/constants.js";
import { chatInputApplicationCommandMention, interactionInvoker } from "../utility/functions.js";
import { can } from "../utility/permissions.js";

export interface GiveawayPacket {
	user_id: Snowflake;
	eligible: boolean;
	entry_count: number;
	last_entry_at: Date;
}

export interface GiveawayUpsellPacket {
	user_id: Snowflake;
}

export const GIVEAWAY_BUTTON_CUSTOM_ID = "GIVEAWAY_BUTTON_CUSTOM_ID" as const;
export const GIVEAWAY_INFORMATION_TEXT_CUSTOM_ID = "GIVEAWAY_INFORMATION_TEXT_CUSTOM_ID" as const;

async function totalUsers() {
	return Number(
		(await pg<GiveawayPacket>(Table.Giveaway)
			.where({ eligible: true })
			.count({ totalRows: "*" })
			.first())!.totalRows!,
	);
}

interface GiveawayOptions {
	userId: Snowflake;
	createdTimestamp: number;
	viewInformation: boolean;
	guildId: Snowflake | undefined;
}

export async function giveaway({
	userId,
	createdTimestamp,
	viewInformation,
	guildId,
}: GiveawayOptions): Promise<[APIMessageTopLevelComponent]> {
	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: "## Giveaway",
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	if (guildId !== DEVELOPER_GUILD_ID) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: GIVEAWAY_NOT_IN_SERVER_TEXT,
		});
	} else if (createdTimestamp >= GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: "You are ineligible to enter the giveaway as your account is too new.",
		});
	} else {
		const giveawayPacket = await pg<GiveawayPacket>(Table.Giveaway)
			.select("entry_count", "last_entry_at")
			.where({ user_id: userId })
			.first();

		if (giveawayPacket) {
			let entryText = `Total users entered: **${await totalUsers()}**\nYour entries: **${giveawayPacket.entry_count}**\n\n`;
			const today = skyToday();
			const claimedToday = giveawayPacket.last_entry_at.getTime() >= today.toMillis();

			if (claimedToday) {
				entryText += `You have claimed your daily ticket today! You claim again tomorrow (<t:${today.plus({ days: 1 }).toUnixInteger()}:R>).`;
			} else {
				entryText += "You can claim your ticket now!";
			}

			let accessoryText: string;
			const sectionComponents: APITextDisplayComponent[] = [];

			if (viewInformation) {
				accessoryText = "Collapse";

				sectionComponents.push({
					type: ComponentType.TextDisplay,
					content: GIVEAWAY_INFORMATION_TEXT,
				});
			} else {
				accessoryText = "Expand";
			}

			sectionComponents.push({
				type: ComponentType.TextDisplay,
				content: `### Status\n\n${entryText}`,
			});

			containerComponents.push(
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						custom_id: `${GIVEAWAY_INFORMATION_TEXT_CUSTOM_ID}§${1 - Number(viewInformation)}`,
						label: accessoryText,
					},
					components: sectionComponents,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Primary,
							custom_id: `${GIVEAWAY_BUTTON_CUSTOM_ID}§${Number(viewInformation)}`,
							label: "Claim ticket",
							disabled: claimedToday,
						},
					],
				},
			);
		} else {
			containerComponents.push(
				{
					type: ComponentType.TextDisplay,
					content: GIVEAWAY_INFORMATION_TEXT,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							style: ButtonStyle.Success,
							custom_id: `${GIVEAWAY_BUTTON_CUSTOM_ID}§${Number(viewInformation)}`,
							label: "Enter!",
							disabled: createdTimestamp >= GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT,
						},
					],
				},
			);
		}
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];
}

export async function claimTicket(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
	viewInformation: boolean,
) {
	pino.info(interaction, "User has claimed their daily ticket.");
	const lastEntryAt = new Date();

	await pg<GiveawayPacket>(Table.Giveaway)
		.insert({
			user_id: interaction.member.user.id,
			eligible: true,
			entry_count: 1,
			last_entry_at: lastEntryAt,
		})
		.onConflict("user_id")
		.merge({
			entry_count: pg.raw(`${Table.Giveaway}.entry_count + 1`),
			last_entry_at: lastEntryAt,
		});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await giveaway({
			userId: interaction.member.user.id,
			createdTimestamp: DiscordSnowflake.timestampFrom(interaction.member.user.id),
			viewInformation,
			guildId: interaction.guild_id,
		}),
		flags: MessageFlags.IsComponentsV2,
	});
}

interface GiveawayEligibilityOptions {
	userId: Snowflake;
}

export async function ineligible({ userId }: GiveawayEligibilityOptions) {
	pino.info({ userId }, "User has become ineligible for the giveaway.");
	await pg<GiveawayPacket>(Table.Giveaway).update({ eligible: false }).where({ user_id: userId });
}

export async function eligible({ userId }: GiveawayEligibilityOptions) {
	pino.info({ userId }, "User has become eligible for the giveaway.");
	await pg<GiveawayPacket>(Table.Giveaway).update({ eligible: true }).where({ user_id: userId });
}

export async function end() {
	pino.info("Ending the giveaway.");

	const { rows, rowCount } = await pg.raw<
		QueryResult<Pick<GiveawayPacket, "user_id" | "entry_count">>
	>(`
		select user_id, entry_count
		from giveaway,
					generate_series(1, entry_count)
		where eligible = true
		order by random();
	`);

	const winner = rows[0];
	pino.info({ winner }, "Giveaway winner.");

	if (!winner) {
		pino.error("No winner was found for the giveaway.");
		return;
	}

	const guild = GUILD_CACHE.get(DEVELOPER_GUILD_ID);

	if (!guild) {
		pino.error("Could not find the developer guild whilst ending the giveaway.");
		return;
	}

	const channel = guild.channels.get(ANNOUNCEMENTS_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildAnnouncement) {
		pino.error("Could not find the announcement channel whilst ending the giveaway.");
		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error("Missing permissions to post in the announcement channel.");
		return;
	}

	let entriesText: string;
	const userCount = await totalUsers();

	if (userCount === 1) {
		entriesText = "You were the only participant!";
	} else {
		const winnerEntries = winner.entry_count;

		// This must exist as a winner must exist.
		const totalEntries = rowCount!;

		// Calculate the winner's chance of winning.
		const chanceOfWinning = ((winnerEntries / totalEntries) * 100).toFixed(2);
		entriesText = `Out of a total of ${totalEntries} entries across ${userCount} users, you had a ~${chanceOfWinning}% chance of winning with your ${winnerEntries === 1 ? "1 entry" : `${winnerEntries} entries`}.`;
	}

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { users: [winner.user_id] },
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Giveaway winner 🎉",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: `Congratulations, <@${winner.user_id}>! You have **won** the giveaway!\n\n${entriesText}\n\nA <@&${DEVELOPER_ROLE_ID}> will be in touch for your reward!`,
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}

export async function upsell(interaction: APIChatInputApplicationCommandInteraction) {
	const user = interactionInvoker(interaction);

	const giveawayUpsellPacket = await pg<GiveawayUpsellPacket>(Table.GiveawayUpsell)
		.where({ user_id: user.id })
		.first();

	if (giveawayUpsellPacket) {
		return;
	}

	await pg<GiveawayUpsellPacket>(Table.GiveawayUpsell).insert({ user_id: user.id });

	if (interaction.data.name === "giveaway" || interaction.guild_id === DEVELOPER_GUILD_ID) {
		return;
	}

	const giveawayCommandId = COMMAND_CACHE.get("giveaway");

	const giveawayCommandText = giveawayCommandId
		? chatInputApplicationCommandMention(giveawayCommandId, "giveaway")
		: "`/giveaway`";

	await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
		content: `There is a giveaway in the support server! Find out more via ${giveawayCommandText}.\n-# You will not see this again.`,
		flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
	});
}
