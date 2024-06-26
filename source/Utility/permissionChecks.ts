import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type ModalSubmitInteraction,
	PermissionFlagsBits,
	type StringSelectMenuInteraction,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import pino from "../pino.js";

const PermissionFlagBitsToString = new Map<bigint, string>()
	.set(PermissionFlagsBits.ViewChannel, "View Channel")
	.set(PermissionFlagsBits.SendMessages, "Send Messages")
	.set(PermissionFlagsBits.EmbedLinks, "Embed Links")
	.set(PermissionFlagsBits.UseExternalEmojis, "Use External Emojis")
	.set(PermissionFlagsBits.SendMessagesInThreads, "Send Messages in Threads");

function getPermissionString(bit: bigint) {
	const string = PermissionFlagBitsToString.get(bit);

	if (string === undefined) {
		pino.warn(`No permission string exists for ${bit}.`);
		return "Unknown";
	}

	return string;
}

export async function cannotUsePermissions(
	interaction:
		| ButtonInteraction
		| ChatInputCommandInteraction
		| ModalSubmitInteraction
		| StringSelectMenuInteraction
		| UserContextMenuCommandInteraction,
	permissions: bigint,
) {
	// Direct messages are fine.
	if (!interaction.inGuild()) {
		return false;
	}

	const { appPermissions } = interaction;
	const missingPermissions = [];

	if (
		(permissions & PermissionFlagsBits.ViewChannel) === PermissionFlagsBits.ViewChannel &&
		!appPermissions.has(PermissionFlagsBits.ViewChannel)
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.ViewChannel));
	}

	if (
		(permissions & PermissionFlagsBits.SendMessages) === PermissionFlagsBits.SendMessages &&
		!appPermissions.has(PermissionFlagsBits.SendMessages)
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.SendMessages));
	}

	if (
		(permissions & PermissionFlagsBits.EmbedLinks) === PermissionFlagsBits.EmbedLinks &&
		!appPermissions.has(PermissionFlagsBits.EmbedLinks)
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.EmbedLinks));
	}

	if (
		(permissions & PermissionFlagsBits.UseExternalEmojis) ===
			PermissionFlagsBits.UseExternalEmojis &&
		!appPermissions.has(PermissionFlagsBits.UseExternalEmojis)
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.UseExternalEmojis));
	}

	if (
		(permissions & PermissionFlagsBits.SendMessagesInThreads) ===
			PermissionFlagsBits.SendMessagesInThreads &&
		!appPermissions.has(PermissionFlagsBits.SendMessagesInThreads)
	) {
		missingPermissions.push(getPermissionString(PermissionFlagsBits.SendMessagesInThreads));
	}

	if (missingPermissions.length === 0) {
		return false;
	}

	const response = {
		components: [],
		content: `${
			missingPermissions.length > 1
				? `Missing the following permissions:\n${missingPermissions
						.map((missingPermission) => `- \`${missingPermission}\``)
						.join("\n")}\n`
				: `Missing the \`${missingPermissions[0]}\` permission. `
		}Someone needs to adjust the permissions!`,
		embeds: [],
		ephemeral: true,
	};

	if (interaction.isMessageComponent()) {
		await interaction.update(response);
	} else {
		await interaction.reply(response);
	}

	return true;
}
