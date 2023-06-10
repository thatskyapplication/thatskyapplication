import {
	type ChatInputCommandInteraction,
	type EmbedAuthorOptions,
	type ModalSubmitInteraction,
	type Snowflake,
	type UserContextMenuCommandInteraction,
	EmbedBuilder,
	StringSelectMenuInteraction,
	chatInputApplicationCommandMention,
} from "discord.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";
import commands from "../Commands/index.js";
import { MAXIMUM_WINGED_LIGHT } from "../Utility/Constants.js";
import { cannotUseCustomEmojis, resolveEmbedColor } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import { resolveBitsToPlatform } from "./Platforms.js";
import { resolveBitsToSeasons } from "./Seasons.js";
import { SpiritTracker } from "./Spirits/SpiritTracker.js";

interface ProfilePacket {
	id: number;
	user_id: Snowflake;
	name: string | null;
	icon: string | null;
	thumbnail: string | null;
	description: string | null;
	country: string | null;
	winged_light: number | null;
	seasons: number;
	platform: number | null;
	spirit: string | null;
	spot: string | null;
}

interface ProfileData {
	id: ProfilePacket["id"];
	userId: ProfilePacket["user_id"];
	name: ProfilePacket["name"];
	icon: ProfilePacket["icon"];
	thumbnail: ProfilePacket["thumbnail"];
	description: ProfilePacket["description"];
	country: ProfilePacket["country"];
	wingedLight: ProfilePacket["winged_light"];
	seasons: ProfilePacket["seasons"];
	platform: ProfilePacket["platform"];
	spirit: ProfilePacket["spirit"];
	spot: ProfilePacket["spot"];
}

interface ProfileSetData {
	name?: string;
	icon?: string;
	thumbnail?: string;
	description?: string;
	country?: string;
	winged_light?: number;
	seasons?: number;
	platform?: number;
	spirit?: string;
	spot?: string;
}

type ProfilePatchData = Omit<ProfilePacket, "id" | "user_id">;

export default class Profile {
	public readonly id: ProfileData["id"];

	public readonly userId: ProfileData["userId"];

	public name!: ProfileData["name"];

	public icon!: ProfileData["icon"];

	public thumbnail!: ProfileData["thumbnail"];

	public description!: ProfileData["description"];

	public country!: ProfileData["country"];

	public wingedLight!: ProfileData["wingedLight"];

	public seasons!: ProfileData["seasons"];

	public platform!: ProfileData["platform"];

	public spirit!: ProfilePacket["spirit"];

	public spot!: ProfilePacket["spot"];

	public constructor(profile: ProfilePacket) {
		this.id = profile.id;
		this.userId = profile.user_id;
		this.patch(profile);
	}

	private patch(data: ProfilePatchData) {
		this.name = data.name;
		this.icon = data.icon;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
		this.country = data.country;
		this.wingedLight = data.winged_light;
		this.seasons = data.seasons;
		this.platform = data.platform;
		this.spirit = data.spirit;
		this.spot = data.spot;
	}

	public static async fetch(userId: Snowflake) {
		const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).where("user_id", userId);
		if (!profilePacket) throw new Error("No profile found.");
		return new this(profilePacket);
	}

	public static async set(
		interaction: ChatInputCommandInteraction | StringSelectMenuInteraction | ModalSubmitInteraction,
		data: ProfileSetData,
	) {
		let profile = await this.fetch(interaction.user.id).catch(() => null);

		if (
			((data.seasons !== 0 && (data.seasons || profile?.seasons)) ||
				(data.platform !== 0 && (data.platform || profile?.platform))) &&
			(await cannotUseCustomEmojis(interaction))
		) {
			return;
		}

		if (profile) {
			const [profilePacket] = await pg<ProfilePacket>(Table.Profiles)
				.update(data)
				.where("id", profile.id)
				.returning("*");

			profile.patch(profilePacket!);
		} else {
			const [profilePacket] = await pg<ProfilePacket>(Table.Profiles).insert(
				{
					...data,
					user_id: interaction.user.id,
				},
				"*",
			);

			profile = new this(profilePacket!);
		}

		const { embed, unfilled } = await profile.embed(interaction);
		const baseReplyOptions = { content: "Your profile has been updated!", embeds: [embed] };

		if (interaction instanceof StringSelectMenuInteraction) {
			await interaction.update({
				...baseReplyOptions,
				components: [],
			});
		} else {
			await interaction.reply({
				...baseReplyOptions,
				ephemeral: true,
			});
		}

		if (unfilled) await interaction.followUp({ content: unfilled, ephemeral: true });
	}

	public static async setDescription(interaction: ModalSubmitInteraction) {
		const description = interaction.fields.getTextInputValue(SKY_PROFILE_TEXT_INPUT_DESCRIPTION).trim();
		return this.set(interaction, { description });
	}

	public static async setSeasons(interaction: StringSelectMenuInteraction) {
		return this.set(interaction, { seasons: interaction.values.reduce((bit, value) => bit | Number(value), 0) });
	}

	public static async setPlatform(interaction: StringSelectMenuInteraction) {
		return this.set(interaction, { platform: interaction.values.reduce((bit, value) => bit | Number(value), 0) });
	}

	public async embed(
		interaction:
			| ChatInputCommandInteraction
			| StringSelectMenuInteraction
			| ModalSubmitInteraction
			| UserContextMenuCommandInteraction,
	) {
		const hearts = await commands.heart.heartCount(this.userId);
		const skyProfileCommand = commands["sky-profile"];
		const { id: commandId, name: commandName } = skyProfileCommand;

		if (!commandId) {
			void interaction.client.log({ content: `Could not find the \`${commandName}\` command.` });
		}

		const { userId, name, icon, thumbnail, description, country, wingedLight, seasons, platform, spirit, spot } = this;
		const spiritTracker = await SpiritTracker.fetch(userId).catch(() => null);
		const elderProgress = spiritTracker?.elderProgress() ?? 0;
		const seasonalProgress = spiritTracker?.seasonalProgress() ?? 0;

		const embed = new EmbedBuilder().setColor(await resolveEmbedColor(interaction.guild)).setFooter({
			text: `Hearts: ${hearts}\nElder progress: ${elderProgress}%\nSeasonal progress: ${seasonalProgress}%`,
		});

		const descriptions = [];
		const fields = [];
		const unfilled = [];

		if (seasons) {
			descriptions.push(resolveBitsToSeasons(seasons).join(" "));
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"seasons",
					commandId,
				)} to tell others what seasons you participated in!`,
			);
		}

		if (description) {
			descriptions.push(description);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"description",
					commandId,
				)} to set a description!`,
			);
		}

		if (descriptions.length > 0) embed.setDescription(descriptions.join("\n"));

		if (thumbnail) {
			embed.setThumbnail(thumbnail);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"thumbnail",
					commandId,
				)} to set a thumbnail on the embed!`,
			);
		}

		if (name) {
			const embedAuthorOptions: EmbedAuthorOptions = { name };

			if (icon) {
				embedAuthorOptions.iconURL = icon;
			} else if (commandId) {
				unfilled.push(
					`- Use ${chatInputApplicationCommandMention(
						commandName,
						"set",
						"icon",
						commandId,
					)} to set an icon by your name!`,
				);
			}

			embed.setAuthor(embedAuthorOptions);
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(commandName, "set", "name", commandId)} to set your name!`,
			);
		}

		if (typeof wingedLight === "number") {
			fields.push({
				name: "Winged Light",
				value:
					wingedLight === 0
						? "Capeless"
						: wingedLight === MAXIMUM_WINGED_LIGHT
						? `${wingedLight} (Max 🪽)`
						: String(wingedLight),
				inline: true,
			});
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"winged-light",
					commandId,
				)} to flex how much winged light you have!`,
			);
		}

		if (spirit) {
			fields.push({
				name: "Favourite Spirit",
				value: spirit,
				inline: true,
			});
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"spirit",
					commandId,
				)} to set your favourite spirit!`,
			);
		}

		if (country) {
			fields.push({ name: "Country", value: country, inline: true });
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"country",
					commandId,
				)} to tell others where you're from!`,
			);
		}

		if (spot) {
			fields.push({ name: "Favourite Spot", value: spot, inline: true });
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"spot",
					commandId,
				)} to tell others where your favourite spot to hang out is!`,
			);
		}

		if (platform) {
			fields.push({
				name: "Platform",
				value: resolveBitsToPlatform(platform).join("\n"),
				inline: true,
			});
		} else if (commandId) {
			unfilled.push(
				`- Use ${chatInputApplicationCommandMention(
					commandName,
					"set",
					"platform",
					commandId,
				)} to show what platforms you play on!`,
			);
		}

		if (fields.length > 4 && fields.length % 3 === 2) fields.push({ name: "\u200B", value: "\u200B", inline: true });
		embed.setFields(fields);
		return { embed, unfilled: unfilled.join("\n") || null };
	}
}
