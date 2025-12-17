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
	formatEmoji,
	HAIR_TOUSLES,
	HIGH_FIVES,
	HUGS,
	KRILLS,
	PLAY_FIGHTS,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { FRIENDSHIP_ACTIONS_CACHE } from "../caches/friendship-actions.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import { DEVELOPER_ROLE_ID, SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { CustomId } from "../utility/custom-id.js";
import { EMOTE_EMOJIS, FRIEND_ACTION_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, userTag } from "../utility/functions.js";
import { can, cannotUseUserInstallable } from "../utility/permissions.js";

interface FriendshipActionOptions {
	interaction: APIChatInputApplicationCommandInteraction;
	user: APIUser;
	member: APIInteractionDataResolvedGuildMember | null;
	key: keyof typeof KeyToData;
}

const KeyToData = {
	"high-five": HIGH_FIVES,
	hug: HUGS,
	"hair-tousle": HAIR_TOUSLES,
	"play-fight": PLAY_FIGHTS,
	krill: KRILLS,
} as const satisfies Readonly<
	Record<
		string,
		typeof HUGS | typeof HIGH_FIVES | typeof HAIR_TOUSLES | typeof PLAY_FIGHTS | typeof KRILLS
	>
>;

export async function friendshipAction({
	interaction,
	user,
	member,
	key,
}: FriendshipActionOptions) {
	const invoker = interactionInvoker(interaction);
	const userLocale = interaction.locale;

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
		components: friendshipActionComponents({
			invoker,
			user,
			key,
			locale: interaction.guild_locale ?? Locale.EnglishGB,
			showHugBack: key === "hug" && interaction.channel.type === ChannelType.DM,
		}),
		flags: MessageFlags.IsComponentsV2,
	});
}

interface FriendshipActionComponentOptions {
	invoker: APIUser;
	user: APIUser;
	key: keyof typeof KeyToData;
	locale: Locale;
	showHugBack?: boolean;
	number?: number;
}

export function friendshipActionComponents({
	invoker,
	user,
	key,
	locale,
	showHugBack = false,
	number = Math.floor(Math.random() * KeyToData[key].length),
}: FriendshipActionComponentOptions): [APIMessageTopLevelComponent] {
	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t(`friendship-actions.${key}-message`, {
				lng: locale,
				ns: "features",
				user: `<@${user.id}>`,
				invoker: `<@${invoker.id}>`,
			}),
		},
		{
			type: ComponentType.MediaGallery,
			items: [{ media: { url: KeyToData[key][number]!.url } }],
		},
	];

	if (showHugBack) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CustomId.FriendshipActionsHugBack}§${number}`,
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
	number: number,
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
		components: friendshipActionComponents({
			invoker: originalInvoker,
			user: invoker,
			key: "hug",
			locale: Locale.EnglishGB,
			showHugBack: false,
			number,
		}),
	});

	await client.api.interactions.followUp(interaction.application_id, interaction.token, {
		allowed_mentions: { users: [originalInvoker.id] },
		components: friendshipActionComponents({
			invoker,
			user: originalInvoker,
			key: "hug",
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
