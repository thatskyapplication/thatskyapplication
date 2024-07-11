import {
	ALLOWED_EXTENSIONS,
	type ApplicationCommandData,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type Attachment,
	type AutocompleteInteraction,
	type ChatInputCommandInteraction,
	MessageFlags,
	PermissionFlagsBits,
	UserContextMenuCommandInteraction,
} from "discord.js";
import Profile, {
	AssetType,
	SKY_PROFILE_EDIT_ACTION_ROW,
	type ProfileSetData,
} from "../../Structures/Profile.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import { spirits } from "../../catalogue/spirits/index.js";
import COMMANDS, { type AutocompleteCommand } from "../index.js";

const SKY_MAXIMUM_ASSET_SIZE = 5_000_000 as const;

export default new (class implements AutocompleteCommand {
	public readonly data = {
		name: "sky-profile",
		description: "Build a Sky profile for you and others to see!",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "edit",
				description: "Edit your Sky profile.",
				options: [
					{
						type: ApplicationCommandOptionType.Attachment,
						name: "icon",
						description: "Upload your icon.",
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "spirit",
						description: "What's your favourite spirit?",
						autocomplete: true,
					},
					{
						type: ApplicationCommandOptionType.Attachment,
						name: "thumbnail",
						description: "Upload your thumbnail.",
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "show",
				description: "Shows the Sky profile of someone.",
				options: [
					{
						type: ApplicationCommandOptionType.User,
						name: "user",
						description: "The user whose Sky profile you wish to see.",
					},
					{
						type: ApplicationCommandOptionType.Boolean,
						name: "hide",
						description: "Ensure only you can see the response. By default, the response is shown.",
					},
				],
			},
		],
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async autocomplete(interaction: AutocompleteInteraction) {
		// This is the same as querying a spirit, so use that instead.
		await COMMANDS.spirit.autocomplete(interaction);
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
			case "show": {
				await this.show(interaction);
				return;
			}
		}
	}

	public async edit(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const icon = options.getAttachment("icon");
		const spirit = options.getString("spirit");
		const thumbnail = options.getAttachment("thumbnail");
		const data: ProfileSetData = {};
		const promises = [];

		if (options.data[0]!.options!.length !== 0) {
			await interaction.deferReply({ ephemeral: true });

			if (icon) {
				if (!(await this.validateAttachment(interaction, icon))) {
					return;
				}

				promises.push({
					type: AssetType.Icon,
					promise: Profile.setAsset(interaction, icon, AssetType.Icon),
				});
			}

			if (spirit) {
				const resolvedSpirit = spirits().find(({ name }) => name === spirit);

				if (!resolvedSpirit) {
					await interaction.reply({
						content: "Woah, it seems we have not encountered that spirit yet. How strange!",
						flags: MessageFlags.Ephemeral,
					});

					return;
				}

				data.spirit = resolvedSpirit.name;
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

		const profile = await Profile.fetch(interaction.user.id).catch(() => null);
		const embed = await profile?.embed(interaction);
		const content = embed ? "" : "You do not have a Sky profile yet. Build one!";

		await interaction.reply({
			components: [SKY_PROFILE_EDIT_ACTION_ROW],
			content,
			embeds: embed ? [embed] : [],
			flags: MessageFlags.Ephemeral,
		});
	}

	private async validateAttachment(
		interaction: ChatInputCommandInteraction,
		{ size, name }: Attachment,
	) {
		if (
			size > SKY_MAXIMUM_ASSET_SIZE ||
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

	public async show(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		const user = interaction.options.getUser("user");

		const hide =
			interaction instanceof UserContextMenuCommandInteraction ||
			(interaction.options.getBoolean("hide") ?? false);

		if (user?.bot) {
			await interaction.reply({
				content: "Do bots have Sky profiles? Hm. Who knows?",
				ephemeral: hide,
			});

			return;
		}

		const userIsInvoker = user === null || user.id === interaction.user.id;
		const profile = await Profile.fetch(user?.id ?? interaction.user.id).catch(() => null);

		if (!profile) {
			await interaction.reply({
				content: `${userIsInvoker ? "You do" : `${user} does`} not have a Sky profile! Why not${
					userIsInvoker ? "" : " ask them to"
				} create one?`,
				ephemeral: true,
			});

			return;
		}

		if (
			(profile.seasons || profile.platform) &&
			(await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis))
		) {
			return;
		}

		const embed = await profile.embed(interaction);
		await interaction.reply({ embeds: [embed], ephemeral: hide });
	}
})();
