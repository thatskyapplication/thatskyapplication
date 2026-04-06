import {
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIDMInteractionWrapper,
	type APIGuildInteractionWrapper,
	type APIInteractionDataResolvedGuildMember,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIUser,
	ButtonStyle,
	ChannelType,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import {
	type FriendshipActionsPacket,
	FriendshipActionType,
	type FriendshipActionTypes,
	formatEmoji,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { FRIENDSHIP_ACTIONS_CACHE } from "../caches/friendship-actions.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import { cdn } from "../thatskyapplication.js";
import { DEVELOPER_ROLE_ID, SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import { EMOTE_EMOJIS, FRIEND_ACTION_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, userTag } from "../utility/functions.js";
import { can, cannotUseUserInstallable } from "../utility/permissions.js";

const FriendshipActionTypeToTranslationKey = {
	[FriendshipActionType.HighFive]: "high-five",
	[FriendshipActionType.Hug]: "hug",
	[FriendshipActionType.HairTousle]: "hair-tousle",
	[FriendshipActionType.PlayFight]: "play-fight",
	[FriendshipActionType.Krill]: "krill",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

interface FriendshipActionOptions {
	interaction: APIChatInputApplicationCommandInteraction;
	user: APIUser;
	member: APIInteractionDataResolvedGuildMember | null;
	type: FriendshipActionTypes;
}

export async function friendshipAction({
	interaction,
	user,
	member,
	type,
}: FriendshipActionOptions) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;
	const key = FriendshipActionTypeToTranslationKey[type];

	if (user.id === invoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t(`friendship-actions.${key}-self`, { lng: userLocale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (
		await cannotUseUserInstallable(
			interaction,
			t(`friendship-actions.${key}-missing-external-apps-permission`, {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
			}),
		)
	) {
		return;
	}

	if (interaction.guild_id && !member) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t(`friendship-actions.${key}-not-in-server`, {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (member) {
		const permissions = BigInt(member.permissions);

		if ((permissions & PermissionFlagsBits.ViewChannel) === 0n) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t(`friendship-actions.${key}-not-around`, {
					lng: userLocale,
					ns: "features",
					user: `<@${user.id}>`,
				}),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}
	}

	if (user.bot) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t(`friendship-actions.${key}-app`, {
				lng: userLocale,
				ns: "features",
				user: `<@${user.id}>`,
			}),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.reply(interaction.id, interaction.token, {
		allowed_mentions: { users: [user.id] },
		components: await friendshipActionComponents({
			invoker,
			user,
			type,
			locale: interaction.guild_locale ?? Locale.EnglishGB,
			showHugBack: type === FriendshipActionType.Hug && interaction.channel.type === ChannelType.DM,
		}),
		flags: MessageFlags.IsComponentsV2,
	});
}

interface FriendshipActionComponentOptions {
	invoker: APIUser;
	user: APIUser;
	type: FriendshipActionTypes;
	locale: Locale;
	showHugBack?: boolean;
	id?: number | undefined;
}

export async function friendshipActionComponents({
	invoker,
	user,
	type,
	locale,
	showHugBack = false,
	id,
}: FriendshipActionComponentOptions): Promise<[APIMessageTopLevelComponent]> {
	let resolvedId = id;

	if (!resolvedId) {
		const friendshipActionsPacket = await pg<FriendshipActionsPacket>(Table.FriendshipActions)
			.select("id")
			.where({ type })
			.orderByRaw("random()")
			.limit(1)
			.first();

		if (!friendshipActionsPacket?.id) {
			throw new Error("Unknown friendship actions id.");
		}

		resolvedId = friendshipActionsPacket.id;
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t(`friendship-actions.${FriendshipActionTypeToTranslationKey[type]}-message`, {
				lng: locale,
				ns: "features",
				user: `<@${user.id}>`,
				invoker: `<@${invoker.id}>`,
			}),
		},
		{
			type: ComponentType.MediaGallery,
			items: [{ media: { url: cdn.FriendshipActionTypeToURL[type](resolvedId) } }],
		},
	];

	if (showHugBack) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CustomId.FriendshipActionsHugBack}§${resolvedId}`,
					emoji: FRIEND_ACTION_EMOJIS.Hug,
					label: t("friendship-actions.hug-back-button-label", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		});
	}

	return [
		{
			type: ComponentType.Container,
			components: containerComponents,
		},
	];
}

export async function friendshipActionsHugBack(
	interaction: APIDMInteractionWrapper<APIMessageComponentButtonInteraction>,
	id: number | undefined,
) {
	const originalInvoker = interaction.message.interaction_metadata!.user;
	const invoker = interaction.user;

	if (invoker.id === originalInvoker.id) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("friendship-actions.hug-self", { lng: interaction.locale, ns: "features" }),
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: await friendshipActionComponents({
			invoker: originalInvoker,
			user: invoker,
			type: FriendshipActionType.Hug,
			locale: Locale.EnglishGB,
			showHugBack: false,
			id,
		}),
	});

	await client.api.interactions.followUp(interaction.application_id, interaction.token, {
		allowed_mentions: { users: [originalInvoker.id] },
		components: await friendshipActionComponents({
			invoker,
			user: originalInvoker,
			type: FriendshipActionType.Hug,
			locale: Locale.EnglishGB,
		}),
		flags: MessageFlags.IsComponentsV2,
	});
}

export async function friendshipActionsCreateThread(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const userId = interaction.member.user.id;

	const existingThread = FRIENDSHIP_ACTIONS_CACHE.findKey(
		(friendshipAction) => friendshipAction === userId,
	);

	if (existingThread) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Hey, awesome person! You already have <#${existingThread}> open!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		throw new Error(
			"Support server not found whilst creating a private thread for friendship actions.",
		);
	}

	const channel = guild.channels.get(interaction.channel.id);

	if (!channel) {
		throw new Error("Channel not found whilst creating a private thread for friendship actions.");
	}

	if (
		!can({
			permission:
				PermissionFlagsBits.ViewChannel |
				PermissionFlagsBits.CreatePrivateThreads |
				PermissionFlagsBits.SendMessagesInThreads,
			guild,
			member: await guild.fetchMe(),
			channel,
		})
	) {
		throw new Error("Missing permissions to create a private thread for friendship actions.");
	}

	const { id } = await client.api.channels.createThread(channel.id, {
		type: ChannelType.PrivateThread,
		invitable: false,
		name: `${userTag(interaction.member.user)} (${userId})`,
	});

	FRIENDSHIP_ACTIONS_CACHE.set(id, userId);

	await Promise.all([
		client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Let's get started! <#${id}>`,
			flags: MessageFlags.Ephemeral,
		}),
		client.api.channels.createMessage(id, {
			content: `Hey, <@${userId}>! ${formatEmoji(EMOTE_EMOJIS.Bow)} Post your media here and a <@&${DEVELOPER_ROLE_ID}> will review it. Any questions? Ask away~`,
		}),
	]);
}
