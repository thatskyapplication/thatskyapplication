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
	type Snowflake,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import { getRandomElement } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import Profile, { SKY_PROFILE_EXPLORE_VIEW_PROFILE_CUSTOM_ID } from "../models/Profile.js";
import type { Guild } from "../models/discord/guild.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	DEFAULT_EMBED_COLOUR,
	NOT_IN_CACHED_GUILD_RESPONSE,
	WELCOME_WELCOME_CHANNEL_CUSTOM_ID,
	WELCOME_WELCOME_MESSAGES,
} from "../utility/constants.js";
import { can } from "../utility/permissions.js";

export interface WelcomePacket {
	guild_id: string;
	welcome_channel_id: string | null;
}

type WelcomePacketPatch = Pick<WelcomePacket, "guild_id"> &
	Pick<Partial<WelcomePacket>, "welcome_channel_id">;

interface WelcomeByeSetupOptions {
	welcomeChannelId?: Snowflake | undefined | null;
}

export async function setupResponse(guild: Guild): Promise<APIInteractionResponseCallbackData> {
	const welcomePacket = await pg<WelcomePacket>(Table.Welcome)
		.where({ guild_id: guild.id })
		.first();

	return {
		components: [
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
							? [{ type: SelectMenuDefaultValueType.Channel, id: welcomePacket.welcome_channel_id }]
							: [],
					},
				],
			},
		],
		embeds: [
			{
				title: "Welcome Setup",
				description: "You can set up messages for whenever someone joins your server.",
				color: DEFAULT_EMBED_COLOUR,
			},
		],
		flags: MessageFlags.Ephemeral,
	};
}

export async function handleChannelSelectMenu(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
	options: WelcomeByeSetupOptions,
) {
	const guild = GUILD_CACHE.get(interaction.guild_id);

	if (!guild) {
		pino.warn(interaction, "Received an interaction from an uncached guild.");

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			NOT_IN_CACHED_GUILD_RESPONSE,
		);

		return;
	}

	const me = await guild.fetchMe();
	const data: WelcomePacketPatch = { guild_id: interaction.guild_id };

	if (options.welcomeChannelId !== undefined) {
		const channel = options.welcomeChannelId ? guild.channels.get(options.welcomeChannelId) : null;

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
				content: "``View Channel` & `Send Messages` are required.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		data.welcome_channel_id = options.welcomeChannelId;
	}

	await pg<WelcomePacket>(Table.Welcome).insert(data).onConflict("guild_id").merge();

	await client.api.interactions.updateMessage(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

interface WelcomeMessageOptions {
	channelId: Snowflake;
	userId: Snowflake;
}

export async function sendWelcomeMessage({ channelId, userId }: WelcomeMessageOptions) {
	try {
		const profile = await Profile.fetch(userId).catch(() => null);

		await client.api.channels.createMessage(channelId, {
			content: getRandomElement(WELCOME_WELCOME_MESSAGES)!.replace("{{user}}", `<@${userId}>`),
			components: profile
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
