import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import {
	isCountry,
	type SkyProfileWingedLightTypes,
	type SpiritIds,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../../discord.js";
import { searchAutocomplete } from "../../features/spirits.js";
import Profile, { AssetType, type ProfileSetData } from "../../models/Profile.js";
import { APPLICATION_ID } from "../../utility/configuration.js";
import { validateAttachment } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async autocomplete(interaction: APIApplicationCommandAutocompleteInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "edit": {
				await this.editAutocomplete(interaction, options);
				return;
			}
			case "explore": {
				await Profile.exploreAutocomplete(interaction, options);
				return;
			}
		}
	},
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "edit": {
				await this.edit(interaction, options);
				return;
			}
			case "explore": {
				await this.explore(interaction, options);
				return;
			}
			case "show": {
				await this.show(interaction, options);
				return;
			}
		}
	},
	async editAutocomplete(
		interaction: APIApplicationCommandAutocompleteInteraction,
		options: OptionResolver,
	) {
		const option = options.getFocusedOption();

		if (
			option.name ===
				t("sky-profile.edit.command-option-country-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}) &&
			option.type === ApplicationCommandOptionType.String
		) {
			await Profile.editCountryAutocomplete(interaction, option);
			return;
		}

		if (
			option.name ===
				t("sky-profile.edit.command-option-spirit-name", {
					lng: Locale.EnglishGB,
					ns: "commands",
				}) &&
			option.type === ApplicationCommandOptionType.Integer
		) {
			await searchAutocomplete(interaction, option);
			return;
		}
	},
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
	async edit(interaction: APIChatInputApplicationCommandInteraction, options: OptionResolver) {
		const name = options.getString("name");
		const thumbnail = options.getAttachment("thumbnail");
		const icon = options.getAttachment("icon");
		const wingedLight = options.getInteger("winged-light") as SkyProfileWingedLightTypes | null;
		const spiritId = options.getInteger("spirit");
		const country = options.getString("country");
		const spot = options.getString("spot");
		const catalogueProgression = options.getBoolean("catalogue-progression");
		const guessRank = options.getBoolean("guess-rank");
		const data: ProfileSetData = {};
		const promises = [];

		if (options.hoistedOptions.length > 0) {
			await client.api.interactions.defer(interaction.id, interaction.token, {
				flags: MessageFlags.Ephemeral,
			});

			if (name) {
				data.name = name;
			}

			if (thumbnail) {
				if (!(await validateAttachment(interaction, thumbnail))) {
					return;
				}

				promises.push({
					type: AssetType.Thumbnail,
					promise: Profile.setAsset(interaction, thumbnail, AssetType.Thumbnail),
				});
			}

			if (icon) {
				if (!(await validateAttachment(interaction, icon))) {
					return;
				}

				promises.push({
					type: AssetType.Icon,
					promise: Profile.setAsset(interaction, icon, AssetType.Icon),
				});
			}

			if (wingedLight !== null) {
				data.winged_light = wingedLight;
			}

			if (spiritId !== null) {
				const spirit = spirits().get(spiritId as SpiritIds);

				if (!spirit) {
					await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
						content: t("spirits.not-encountered-spirit", {
							lng: interaction.locale,
							ns: "features",
						}),
					});

					return;
				}

				data.spirit = spirit.id;
			}

			if (country) {
				if (!isCountry(country)) {
					await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
						content: "Please select a country!",
					});

					return;
				}

				data.country = country;
			}

			if (spot) {
				data.spot = spot;
			}

			if (catalogueProgression !== null) {
				data.catalogue_progression = catalogueProgression;
			}

			if (guessRank !== null) {
				data.guess_rank = guessRank;
			}

			const resolvedPromises = await Promise.all(promises.map(({ promise }) => promise));

			for (let index = 0; index < promises.length; index++) {
				if (promises[index]!.type === AssetType.Icon) {
					data.icon = resolvedPromises[index]!;
				}

				if (promises[index]!.type === AssetType.Thumbnail) {
					data.thumbnail = resolvedPromises[index]!;
				}
			}

			await Profile.set(interaction, data, true);
			return;
		}

		await Profile.showEdit(interaction, false);
	},
	async explore(interaction: APIChatInputApplicationCommandInteraction, options: OptionResolver) {
		const name = options.getString("name");

		if (name) {
			await Profile.exploreProfile(interaction, name);
			return;
		}

		await Profile.explore(interaction);
	},
	async show(interaction: APIChatInputApplicationCommandInteraction, options: OptionResolver) {
		const user = options.getUser("user");
		const hide = options.getBoolean("hide") ?? false;
		await Profile.show(interaction, user, hide);
	},
} as const;
