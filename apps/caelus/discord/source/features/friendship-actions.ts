import { Buffer } from "node:buffer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIDMInteractionWrapper,
	type APIGuildInteractionWrapper,
	type APIInteractionDataResolvedGuildMember,
	type APIMessageComponentButtonInteraction,
	type APIMessageTopLevelComponent,
	type APIModalSubmitGuildInteraction,
	type APIUser,
	ButtonStyle,
	ChannelType,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	TextInputStyle,
} from "@discordjs/core";
import {
	type FriendshipActionsPacket,
	FriendshipActionType,
	type FriendshipActionTypes,
	formatEmoji,
	hairTouslesRoute,
	highFivesRoute,
	hugsRoute,
	isFriendshipActionType,
	krillsRoute,
	playFightsRoute,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { FRIENDSHIP_ACTIONS_CACHE } from "../caches/friendship-actions.js";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import S3Client from "../s3-client.js";
import {
	CDN_BUCKET,
	DEVELOPER_ROLE_ID,
	SUPPORT_SERVER_GUILD_ID,
} from "../utility/configuration.js";
import {
	MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE,
	MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import { EMOTE_EMOJIS, FRIEND_ACTION_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker, userTag } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can, cannotUseUserInstallable } from "../utility/permissions.js";

const FriendshipActionTypeToTranslationKey = {
	[FriendshipActionType.HighFive]: "high-five",
	[FriendshipActionType.Hug]: "hug",
	[FriendshipActionType.HairTousle]: "hair-tousle",
	[FriendshipActionType.PlayFight]: "play-fight",
	[FriendshipActionType.Krill]: "krill",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

const FriendshipActionTypeToRoute = {
	[FriendshipActionType.HighFive]: highFivesRoute,
	[FriendshipActionType.Hug]: hugsRoute,
	[FriendshipActionType.HairTousle]: hairTouslesRoute,
	[FriendshipActionType.PlayFight]: playFightsRoute,
	[FriendshipActionType.Krill]: krillsRoute,
} as const satisfies Readonly<Record<FriendshipActionTypes, (id: number) => string>>;

const FriendshipActionTypeToCDNName = {
	[FriendshipActionType.HighFive]: "high_fives",
	[FriendshipActionType.Hug]: "hugs",
	[FriendshipActionType.HairTousle]: "hair_tousles",
	[FriendshipActionType.PlayFight]: "play_fights",
	[FriendshipActionType.Krill]: "krills",
} as const satisfies Readonly<Record<FriendshipActionTypes, string>>;

const REFERENCE_REGEX = new RegExp(
	`^https:\\/\\/discord\\.com\\/channels\\/${SUPPORT_SERVER_GUILD_ID}\\/\\d{19}$`,
);

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
			items: [{ media: { url: FriendshipActionTypeToRoute[type](resolvedId) } }],
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

export async function friendshipActionsUpload(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	await client.api.interactions.createModal(interaction.id, interaction.token, {
		title: "Friendship actions upload",
		components: [
			{
				type: ComponentType.Label,
				label: "Type",
				component: {
					type: ComponentType.RadioGroup,
					custom_id: CustomId.FriendshipActionsUploadModalType,
					options: [
						{
							label: "High-five",
							value: FriendshipActionType.HighFive.toString(),
						},
						{
							label: "Hug",
							value: FriendshipActionType.Hug.toString(),
						},
						{
							label: "Hair tousle",
							value: FriendshipActionType.HairTousle.toString(),
						},
						{
							label: "Play fight",
							value: FriendshipActionType.PlayFight.toString(),
						},
						{
							label: "Krill",
							value: FriendshipActionType.Krill.toString(),
						},
					],
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: "Asset",
				component: {
					type: ComponentType.FileUpload,
					custom_id: CustomId.FriendshipActionsUploadModalAsset,
					min_values: 1,
					max_values: 1,
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: "Users",
				component: {
					type: ComponentType.UserSelect,
					custom_id: CustomId.FriendshipActionsUploadModalUsers,
					min_values: 1,
					max_values: 5,
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: "Reference",
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.FriendshipActionsUploadModalReference,
					style: TextInputStyle.Short,
					required: true,
				},
			},
		],
		custom_id: CustomId.FriendshipActionsUploadModal,
	});
}

export async function friendshipActionsUploadHandleModal(
	interaction: APIModalSubmitGuildInteraction,
) {
	const components = new ModalResolver(interaction.data);

	const type = Number(
		components.getRadioGroupValue(CustomId.FriendshipActionsUploadModalType, true),
	);

	const asset = components.getFileUploadValues(CustomId.FriendshipActionsUploadModalAsset)[0]!;
	const users = components.getUserValues(CustomId.FriendshipActionsUploadModalUsers);
	const reference = components.getTextInputValue(CustomId.FriendshipActionsUploadModalReference);
	const errors = [];

	if (!isFriendshipActionType(type)) {
		errors.push("Invalid friendship action type.");
	}

	if (asset.content_type !== "image/gif") {
		errors.push("Invalid asset type. Only GIFs are allowed.");
	}

	if (asset.size > MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE) {
		errors.push(
			`Asset is too large. Maximum size is ${MAXIMUM_FRIENDSHIP_ACTIONS_ASSET_BYTES_SIZE.toLocaleString()} bytes.`,
		);
	}

	if (asset.height && asset.width) {
		if (
			asset.height > MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE ||
			asset.width > MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE
		) {
			errors.push(
				`Asset dimensions are too large. Maximum is ${MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}x${MAXIMUM_FRIENDSHIP_ACTIONS_DIMENSION_SIZE}.`,
			);
		}
	} else {
		errors.push("Asset is missing dimensions.");
	}

	const square = asset.height === asset.width;

	if (!square) {
		errors.push("Asset is not 1:1.");
	}

	if (!REFERENCE_REGEX.test(reference)) {
		errors.push("Invalid reference. Must be a link to the friendship actions thread.");
	}

	if (errors.length > 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: errors.length > 1 ? errors.map((error) => `- ${error}`).join("\n") : errors[0],
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	await client.api.interactions.defer(interaction.id, interaction.token, {
		flags: MessageFlags.Ephemeral,
	});

	const { maxId } = await pg<FriendshipActionsPacket>(Table.FriendshipActions)
		.where({ type })
		.max({ maxId: "id" })
		.first<{ maxId: number | null }>();

	const nextId = (maxId ?? 0) + 1;
	const assetBuffer = Buffer.from(await (await fetch(asset.url)).arrayBuffer());
	const key = `${FriendshipActionTypeToCDNName[type as FriendshipActionTypes]}/${nextId}.gif`;

	const rows = await pg<FriendshipActionsPacket>(Table.FriendshipActions).insert(
		{ id: nextId, type, users: users.map((user) => user.id), square, reference },
		"*",
	);

	try {
		await S3Client.send(
			new PutObjectCommand({
				Bucket: CDN_BUCKET,
				Key: key,
				Body: assetBuffer,
			}),
		);
	} catch (error) {
		try {
			await pg<FriendshipActionsPacket>(Table.FriendshipActions)
				.delete()
				.where({ id: nextId, type });
		} catch (error) {
			pino.error(error, "Failed to clean up database after failed friendship action asset upload.");
		}

		throw error;
	}

	await client.api.interactions.editReply(interaction.application_id, interaction.token, {
		content: `Friendship action uploaded!\n\`\`\`JSON\n${JSON.stringify(rows, null, 2)}\n\`\`\``,
		flags: MessageFlags.Ephemeral,
	});
}
