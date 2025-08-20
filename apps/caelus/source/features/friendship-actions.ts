import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteractionDataResolvedGuildMember,
	type APIUser,
	ComponentType,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import {
	getRandomElement,
	HAIR_TOUSLES,
	HIGH_FIVES,
	HUGS,
	KRILLS,
	PLAY_FIGHTS,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import { interactionInvoker } from "../utility/functions.js";
import { cannotUseUserInstallable } from "../utility/permissions.js";

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
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t(`friendship-actions.${key}-message`, {
							lng: interaction.guild_locale ?? Locale.EnglishGB,
							ns: "features",
							user: `<@${user.id}>`,
							invoker: `<@${invoker.id}>`,
						}),
					},
					{
						type: ComponentType.MediaGallery,
						items: [{ media: { url: getRandomElement(KeyToData[key])!.url } }],
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});
}
