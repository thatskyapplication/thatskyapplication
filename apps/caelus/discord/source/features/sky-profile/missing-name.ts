import {
	type APIChatInputApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	type APIUserApplicationCommandInteraction,
	ComponentType,
	TextInputStyle,
} from "@discordjs/core";
import { t } from "i18next";
import {
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	SkyProfileMissingNameSource,
	type SkyProfileMissingNameSources,
} from "@thatskyapplication/utility";
import { COMMAND_CACHE } from "../../caches/commands.js";
import database from "../../database.js";
import { client } from "../../discord.js";
import { ME_SKY_PROFILE_URL } from "../../utility/constants.js";
import { CustomId } from "../../utility/custom-id.js";
import { chatInputApplicationCommandMention, interactionInvoker } from "../../utility/functions.js";

const SkyProfileMissingNameSourceToDescriptionKey = {
	[SkyProfileMissingNameSource.Heart]:
		"sky-profile.missing-name-modal-text-display-heart-source-content",
	[SkyProfileMissingNameSource.Guess]:
		"sky-profile.missing-name-modal-text-display-guess-source-content",
} as const satisfies Readonly<
	Record<
		SkyProfileMissingNameSources,
		`sky-profile.missing-name-modal-text-display-${string}-content`
	>
>;

export async function noSkyProfileName(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIUserApplicationCommandInteraction,
	source: SkyProfileMissingNameSources,
) {
	const skyProfilePacket = await database
		.selectFrom("sky_profiles")
		.select("name")
		.where("user_id", "=", interactionInvoker(interaction).id)
		.executeTakeFirst();

	if (!skyProfilePacket?.name) {
		await skyProfileMissingNameModal(interaction, source);
		return true;
	}

	return false;
}

async function skyProfileMissingNameModal(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIUserApplicationCommandInteraction,
	source: SkyProfileMissingNameSources,
) {
	const { locale } = interaction;
	const skyProfileCommandId = COMMAND_CACHE.get(t("sky-profile.command-name", { ns: "commands" }));
	let suffix: "mention" | "text";

	const options: Parameters<typeof t>[1] = {
		lng: locale,
		ns: "features",
		url: ME_SKY_PROFILE_URL,
	};

	if (skyProfileCommandId) {
		suffix = "mention";

		options.mention = chatInputApplicationCommandMention(
			skyProfileCommandId,
			t("sky-profile.command-name", { ns: "commands" }),
			t("sky-profile.edit.command-name", { ns: "commands" }),
		);
	} else {
		suffix = "text";
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		title: t("sky-profile.name", { lng: locale, ns: "features" }),
		custom_id: `${CustomId.SkyProfileMissingNameModal}§${source}`,
		components: [
			{
				type: ComponentType.TextDisplay,
				content: t(`${SkyProfileMissingNameSourceToDescriptionKey[source]}-${suffix}`, options),
			},
			{
				type: ComponentType.Label,
				label: t("sky-profile.edit-modal-label-name-label", { lng: locale, ns: "features" }),
				description: t("sky-profile.edit-modal-label-name-description", {
					lng: locale,
					ns: "features",
				}),
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomId.SkyProfileNameModalName,
					max_length: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
					min_length: 1,
					required: true,
					style: TextInputStyle.Short,
				},
			},
		],
	});
}
