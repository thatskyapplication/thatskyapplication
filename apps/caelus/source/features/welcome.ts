import {
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentSelectMenuInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	RESTJSONErrorCodes,
	SelectMenuDefaultValueType,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { getRandomElement, type SkyProfilePacket, Table } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import {
	WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
	WELCOME_WELCOME_MESSAGES,
} from "../utility/constants.js";
import { notInCachedGuildResponse } from "../utility/functions.js";
import { can } from "../utility/permissions.js";
import { SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID } from "./sky-profile.js";

export interface WelcomePacket {
	guild_id: string;
	welcome_channel_id: string | null;
}

type WelcomePacketSetData = Pick<WelcomePacket, "guild_id"> &
	Pick<Partial<WelcomePacket>, "welcome_channel_id">;

export async function setupResponse(
	guildId: Snowflake,
): Promise<APIInteractionResponseCallbackData> {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome).where({ guild_id: guildId }).first();

	return {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Welcome setup",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: "You can set up messages for whenever someone joins your server.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.ChannelSelect,
								custom_id: WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
								channel_types: [ChannelType.GuildText],
								placeholder: "Select a welcome channel.",
								min_values: 0,
								max_values: 1,
								default_values: welcomePacket?.welcome_channel_id
									? [
											{
												type: SelectMenuDefaultValueType.Channel,
												id: welcomePacket.welcome_channel_id,
											},
										]
									: [],
							},
						],
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};
}

interface WelcomeByeSetupOptions {
	welcomeChannelId: Snowflake | null;
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	{ welcomeChannelId }: WelcomeByeSetupOptions,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			notInCachedGuildResponse(interaction.locale),
		);

		return;
	}

	const me = await guild.fetchMe();
	const data: WelcomePacketSetData = { guild_id: interaction.guild_id };

	if (welcomeChannelId !== undefined) {
		const channel = welcomeChannelId ? guild.channels.get(welcomeChannelId) : null;

		if (
			channel &&
			!can({
				permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
				guild,
				member: me,
				channel,
			})
		) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "`View Channel` & `Send Messages` are required.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		data.welcome_channel_id = welcomeChannelId;
	}

	await pg<WelcomePacket>(Table.Welcome).insert(data).onConflict("guild_id").merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild.id),
	);
}

interface WelcomeMessageOptions {
	channelId: Snowflake;
	userId: Snowflake;
}

export async function sendWelcomeMessage({ channelId, userId }: WelcomeMessageOptions) {
	try {
		const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
			.where({ user_id: userId })
			.first();

		await client.api.channels.createMessage(channelId, {
			content: getRandomElement(WELCOME_WELCOME_MESSAGES)!.replace("{{user}}", `<@${userId}>`),
			components: skyProfilePacket
				? [
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.Button,
									custom_id: `${SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID}§${userId}`,
									label: "View Sky Profile",
									style: ButtonStyle.Primary,
								},
							],
						},
					]
				: [],
		});
	} catch (error) {
		if (error instanceof DiscordAPIError && error.code === RESTJSONErrorCodes.MissingPermissions) {
			pino.warn(error, "Missing permissions to send welcome message. Removing configuration.");

			await pg<WelcomePacket>(Table.Welcome)
				.update({ welcome_channel_id: null })
				.where({ welcome_channel_id: channelId });

			return;
		}

		pino.error(error, "Failed to send welcome message.");
	}
}
