import {
	ALLOWED_EXTENSIONS,
	type Attachment,
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	Locale,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import Profile, { AssetType, type ProfileSetData } from "../Structures/Profile.js";
import { spirits } from "../data/spirits/index.js";
import { SKY_PROFILE_MAXIMUM_ASSET_SIZE } from "../utility/constants-2.js";
import { cannotUsePermissions } from "../utility/permission-checks.js";
import COMMANDS, { type AutocompleteCommand } from "./index.js";

export default new (class implements AutocompleteCommand {
	public readonly name = t("sky-profile.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async autocomplete(interaction: AutocompleteInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "edit": {
				// This is the same as querying a spirit, so use that instead.
				await COMMANDS.spirit.autocomplete(interaction);
				return;
			}
			case "explore": {
				await this.exploreAutocomplete(interaction);
				return;
			}
		}
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		switch (interaction.options.getSubcommand()) {
			case "edit": {
				await this.edit(interaction);
				return;
			}
			case "explore": {
				await this.explore(interaction);
				return;
			}
			case "show": {
				await this.show(interaction);
				return;
			}
		}
	}

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
	public async edit(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const name = options.getString("name");
		const thumbnail = options.getAttachment("thumbnail");
		const icon = options.getAttachment("icon");
		const wingedLight = options.getInteger("winged-light");
		const spirit = options.getString("spirit");
		const country = options.getString("country");
		const spot = options.getString("spot");
		const catalogueProgression = options.getBoolean("catalogue-progression");
		const guessRank = options.getBoolean("guess-rank");
		const data: ProfileSetData = {};
		const promises = [];

		if (options.data[0]!.options!.length !== 0) {
			await interaction.deferReply({ ephemeral: true });

			if (name) {
				data.name = name;
			}

			if (thumbnail) {
				if (!(await this.validateAttachment(interaction, thumbnail))) {
					return;
				}

				promises.push({
					type: AssetType.Thumbnail,
					promise: Profile.setAsset(interaction, thumbnail, AssetType.Thumbnail),
				});
			}

			if (icon) {
				if (!(await this.validateAttachment(interaction, icon))) {
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

			if (spirit) {
				const resolvedSpirit = spirits().find(({ name }) => name === spirit);

				if (!resolvedSpirit) {
					await interaction.editReply(
						"Woah, it seems we have not encountered that spirit yet. How strange!",
					);

					return;
				}

				data.spirit = resolvedSpirit.name;
			}

			if (country) {
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

			await Profile.set(interaction, data);
			return;
		}

		await Profile.showEdit(interaction);
	}

	private async validateAttachment(
		interaction: ChatInputCommandInteraction,
		{ size, name }: Attachment,
	) {
		if (
			size > SKY_PROFILE_MAXIMUM_ASSET_SIZE ||
			!ALLOWED_EXTENSIONS.some((extension) => name.endsWith(`.${extension}`))
		) {
			await interaction.editReply(
				`Please upload a valid attachment! It must be less than 5 megabytes and in any of the following formats:\n${ALLOWED_EXTENSIONS.map(
					(extension) => `- .${extension}`,
				).join("\n")}`,
			);

			return false;
		}

		return true;
	}

	private async explore(interaction: ChatInputCommandInteraction) {
		const name = interaction.options.getString("name");

		if (name) {
			await Profile.exploreProfile(interaction, name);
			return;
		}

		await Profile.explore(interaction);
	}

	private async exploreAutocomplete(interaction: AutocompleteInteraction) {
		await Profile.exploreAutocomplete(interaction);
	}

	public async show(interaction: ChatInputCommandInteraction) {
		await Profile.show(interaction);
	}
})();
