import {
	type APIChatInputApplicationCommandInteraction,
	type APIMessageComponentButtonInteraction,
	type APIModalSubmitInteraction,
	type APIUserApplicationCommandInteraction,
	ButtonStyle,
	ChannelType,
	ComponentType,
	MessageFlags,
	PermissionFlagsBits,
	SeparatorSpacingSize,
	type Snowflake,
	TextInputStyle,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { formatEmoji, type SkyProfilePacket, Table } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { FEEDBACK_ROUND_1_CHANNEL_ID, SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import {
	FEEDBACK_INVITE_URL,
	FEEDBACK_Q1_LABEL,
	FEEDBACK_Q2_LABEL,
	FEEDBACK_Q3_LABEL,
	FEEDBACK_Q4_LABEL,
} from "../utility/constants.js";
import { CustomIdFeedback } from "../utility/custom-id.js";
import { EMOTE_EMOJIS, MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import { can } from "../utility/permissions.js";
import type { HeartPacket } from "./heart.js";

interface FeedbackPacket {
	user_id: Snowflake;
	completed_at: Date;
	question1: string;
	question2: string;
	question3: string;
	question4: string;
}

interface FeedbackUpsellPacket {
	user_id: Snowflake;
	created_at: Date;
}

const FEEDBACK_Q3_YES_VALUE = "Yes" as const;
const FEEDBACK_Q3_NO_VALUE = "No" as const;
const FEEDBACK_Q3_UNSURE_VALUE = "Unsure" as const;

export async function feedbackUpsell(
	interaction: APIChatInputApplicationCommandInteraction | APIUserApplicationCommandInteraction,
) {
	const invoker = interactionInvoker(interaction);

	const feedbackUpsellPacket = await pg<FeedbackUpsellPacket>(Table.FeedbackUpsell)
		.where({ user_id: invoker.id })
		.first();

	if (feedbackUpsellPacket) {
		return;
	}

	const [skyProfilePacket] = await Promise.all([
		pg<SkyProfilePacket>(Table.Profiles).select("name").where({ user_id: invoker.id }).first(),
		pg<FeedbackUpsellPacket>(Table.FeedbackUpsell).insert({
			user_id: invoker.id,
			created_at: new Date(),
		}),
	]);

	const name = skyProfilePacket?.name ?? "there";

	await client.api.interactions.followUp(interaction.application_id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Primary,
						custom_id: CustomIdFeedback.FeedbackStart,
						label: "Feedback",
						emoji: EMOTE_EMOJIS.Thinking,
					},
				],
			},
		],
		content: `Hey, ${name}! We have a small feedback form regarding Caelus. We'd love for you to respond! 🩵\n-# You will not see this feedback form message again, don't worry!`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function feedbackModal(interaction: APIMessageComponentButtonInteraction) {
	const feedbackPacket = await pg<FeedbackPacket>(Table.Feedback)
		.where({ user_id: interactionInvoker(interaction).id })
		.first();

	if (feedbackPacket) {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: [],
			content: "Seems you have already submitted feedback. Thank you!",
		});

		return;
	}

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.TextDisplay,
				content: `Thank you for taking part! ${formatEmoji(EMOTE_EMOJIS.Grateful)}\n\nWe just have a few questions and that's all. Remember, you can always head on over to the [support server](${FEEDBACK_INVITE_URL}) to suggest anything!`,
			},
			{
				type: ComponentType.Label,
				label: FEEDBACK_Q1_LABEL,
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomIdFeedback.FeedbackModalQ1,
					style: TextInputStyle.Paragraph,
					max_length: 200,
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: FEEDBACK_Q2_LABEL,
				description: "Say anything–nothing is too small or too big!",
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomIdFeedback.FeedbackModalQ2,
					style: TextInputStyle.Paragraph,
					max_length: 200,
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: FEEDBACK_Q3_LABEL,
				description: "Through your definition or others'.",
				component: {
					type: ComponentType.StringSelect,
					custom_id: CustomIdFeedback.FeedbackModalQ3,
					options: [
						{
							label: "Yes",
							value: FEEDBACK_Q3_YES_VALUE,
							description: "I consider myself a veteran.",
							emoji: EMOTE_EMOJIS.Nod,
						},
						{
							label: "No",
							value: FEEDBACK_Q3_NO_VALUE,
							description: "I do not consider myself a veteran.",
							emoji: EMOTE_EMOJIS.NoThanks,
						},
						{
							label: "Unsure...",
							value: FEEDBACK_Q3_UNSURE_VALUE,
							description:
								"I am unsure. I haven't heard about this before or I feel like I'm in the middle.",
							emoji: EMOTE_EMOJIS.Thinking,
						},
					],
					max_values: 1,
					min_values: 1,
					required: true,
				},
			},
			{
				type: ComponentType.Label,
				label: FEEDBACK_Q4_LABEL,
				description: "This is your chance to say anything that was not covered previously!",
				component: {
					type: ComponentType.TextInput,
					custom_id: CustomIdFeedback.FeedbackModalQ4,
					style: TextInputStyle.Paragraph,
					max_length: 1000,
					required: false,
				},
			},
		],
		custom_id: CustomIdFeedback.FeedbackModal,
		title: "Feedback",
	});
}

export async function feedbackSubmission(interaction: APIModalSubmitInteraction) {
	const components = new ModalResolver(interaction.data);
	const q1 = components.getTextInputValue(CustomIdFeedback.FeedbackModalQ1);
	const q2 = components.getTextInputValue(CustomIdFeedback.FeedbackModalQ2);

	const q3 = (
		components.getStringSelectValues(CustomIdFeedback.FeedbackModalQ3) as [
			typeof FEEDBACK_Q3_YES_VALUE | typeof FEEDBACK_Q3_NO_VALUE | typeof FEEDBACK_Q3_UNSURE_VALUE,
		]
	)[0];

	const q4 = components.getTextInputValue(CustomIdFeedback.FeedbackModalQ4);
	const invoker = interactionInvoker(interaction);
	const date = new Date(DiscordSnowflake.timestampFrom(interaction.id));

	await pg<FeedbackPacket>(Table.Feedback).insert({
		user_id: invoker.id,
		completed_at: date,
		question1: q1,
		question2: q2,
		question3: q3,
		question4: q4,
	});

	await pg<HeartPacket>(Table.Hearts).insert({
		user_id: interaction.application_id,
		giftee_id: invoker.id,
		timestamp: date,
		count: 1,
	});

	const guild = GUILD_CACHE.get(SUPPORT_SERVER_GUILD_ID);

	if (!guild) {
		pino.error(interaction, "Could not find the support server.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for submitting! You've been given 1 ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} for this. It's the least we can do!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const channel = guild.channels.get(FEEDBACK_ROUND_1_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		pino.error(interaction, "Could not find the feedback round 1 channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for submitting! You've been given 1 ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} for this. It's the least we can do!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const me = await guild.fetchMe();

	if (
		!can({
			permission: PermissionFlagsBits.ViewChannel | PermissionFlagsBits.SendMessages,
			guild,
			member: me,
			channel,
		})
	) {
		pino.error(interaction, "Missing permissions to post in the feedback round 1 channel.");

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Thank you for submitting! You've been given 1 ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} for this. It's the least we can do!`,
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const skyProfilePacket = await pg<SkyProfilePacket>(Table.Profiles)
		.select("name", "icon")
		.where({ user_id: invoker.id })
		.first();

	await client.api.channels.createMessage(channel.id, {
		allowed_mentions: { parse: [] },
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `### ${FEEDBACK_Q1_LABEL}\n\n${q1}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `### ${FEEDBACK_Q2_LABEL}\n\n${q2}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `### ${FEEDBACK_Q3_LABEL}\n\n${q3}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `### ${FEEDBACK_Q4_LABEL}\n\n${q4 || "_No response provided._"}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: `-# Submitted by **${skyProfilePacket?.name ?? invoker.username}** (<@${invoker.id}>)`,
					},
				],
			},
		],
		flags: MessageFlags.IsComponentsV2,
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `Thank you for submitting! You've been given 1 ${formatEmoji(MISCELLANEOUS_EMOJIS.Heart)} for this. It's the least we can do!`,
		flags: MessageFlags.Ephemeral,
	});
}
