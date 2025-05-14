import {
	type APIButtonComponentWithCustomId,
	type APIGuildInteractionWrapper,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";

export interface GiveawayPacket {
	user_id: Snowflake;
	eligible: boolean;
	entry_count: number;
	last_entry_at: Date;
}

export const GIVEAWAY_BUTTON_CUSTOM_ID = "GIVEAWAY_BUTTON_CUSTOM_ID" as const;

interface GiveawayOptions {
	userId: Snowflake;
}

export async function giveaway({
	userId,
}: GiveawayOptions): Promise<[APIMessageTopLevelComponent]> {
	const giveawayPacket = await pg<GiveawayPacket>(Table.Giveaway)
		.select("entry_count", "last_entry_at")
		.where({ user_id: userId })
		.first();

	let entryText: string;
	let button: APIButtonComponentWithCustomId;

	if (giveawayPacket) {
		entryText = `Your entries: ${giveawayPacket.entry_count}\n\n`;
		const today = new Date();
		today.setUTCHours(0, 0, 0, 0);
		const claimedToday = giveawayPacket.last_entry_at >= today;

		if (claimedToday) {
			const tomorrow = new Date(today);
			tomorrow.setUTCDate(today.getUTCDate() + 1);
			tomorrow.setUTCHours(0, 0, 0, 0);
			entryText += `You have claimed your daily ticket today! You claim again tomorrow (<t:${Math.floor(tomorrow.getTime() / 1000)}:R>).`;
		} else {
			entryText += "You can claim your ticket now!";
		}

		button = {
			type: ComponentType.Button,
			style: ButtonStyle.Primary,
			custom_id: GIVEAWAY_BUTTON_CUSTOM_ID,
			label: "Claim ticket",
			disabled: claimedToday,
		};
	} else {
		entryText = "You are yet to enter the giveaway!";

		button = {
			type: ComponentType.Button,
			style: ButtonStyle.Success,
			custom_id: GIVEAWAY_BUTTON_CUSTOM_ID,
			label: "Enter!",
		};
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "## Giveaway",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: entryText,
				},
				{
					type: ComponentType.ActionRow,
					components: [button],
				},
			],
		},
	];
}

export async function claimTicket(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
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
		components: await giveaway({ userId: interaction.member.user.id }),
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
