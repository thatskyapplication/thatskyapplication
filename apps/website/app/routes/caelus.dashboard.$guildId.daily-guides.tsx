import { ChannelType, type Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { type DailyGuidesDistributionPacket, Table } from "@thatskyapplication/utility";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, Link, redirect, useActionData, useLoaderData } from "react-router";
import Select from "~/components/Select";
import pg from "~/pg.server.js";
import pino from "~/pino";
import {
	caelusInGuild,
	checkDailyGuidesChannelPermissions,
	getCaelusGuildChannels,
	setGuildsDailyGuidesChannel,
} from "~/utility/caelus.server.js";
import { APPLICATION_NAME } from "~/utility/constants.js";
import { guildIconURL } from "~/utility/functions.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getUserAdminGuilds } from "~/utility/guilds.server.js";

const ChannelTypeToIcon = {
	[ChannelType.GuildText]: "#",
	[ChannelType.GuildAnnouncement]: "📢",
	[ChannelType.PublicThread]: "🗨️",
} as const;

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { discordUser, tokenExchange } = await requireDiscordAuthentication(request);
	const { guildId } = params;

	if (!guildId) {
		throw new Response(null, { status: 400 });
	}

	try {
		const oAuthGuilds = await getUserAdminGuilds(discordUser, tokenExchange);
		const oAuthGuild = oAuthGuilds.find((oAuthGuild) => oAuthGuild.id === guildId);

		if (!oAuthGuild) {
			return redirect("/caelus/dashboard");
		}

		const meInGuild = await caelusInGuild(guildId);

		if (!meInGuild) {
			return redirect(`/caelus/dashboard/${guildId}`);
		}

		const [currentChannelId, channels] = await Promise.all([
			pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution)
				.where({ guild_id: guildId })
				.first()
				.then((result) => result?.channel_id),
			getCaelusGuildChannels(guildId),
		]);

		// If we have a channel id, check the permissions of it.
		let permissionError: string | null = null;

		if (currentChannelId) {
			const permissionResponse = await checkDailyGuidesChannelPermissions(
				guildId,
				currentChannelId,
			);

			if (permissionResponse !== null) {
				permissionError = permissionResponse.message;
			}
		}

		return {
			guild: oAuthGuild,
			currentChannelId,
			permissionError,
			channels,
		};
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 401) {
			const returnTo = encodeURIComponent(request.url);
			return redirect(`/login?returnTo=${returnTo}`);
		}

		pino.error({ request, error }, "Failed to load daily guides settings.");
		throw new Response(null, { status: 500 });
	}
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { discordUser, tokenExchange } = await requireDiscordAuthentication(request);
	const { guildId } = params;

	if (!guildId) {
		throw new Response(null, { status: 400 });
	}

	try {
		const guilds = await getUserAdminGuilds(discordUser, tokenExchange);
		const guild = guilds.find((guild) => guild.id === guildId);

		if (!guild) {
			return { error: "Guild not found." };
		}

		const meInGuild = await caelusInGuild(guildId);

		if (!meInGuild) {
			return { error: `${APPLICATION_NAME} is not in this server.` };
		}

		const formData = await request.formData();
		const channelId = formData.get("channelId") as Snowflake | null;
		const response = await setGuildsDailyGuidesChannel(guildId, channelId);

		return {
			success: response?.success,
			error: response?.message,
		};
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 401) {
			const returnTo = encodeURIComponent(request.url);
			return redirect(`/login?returnTo=${returnTo}`);
		}

		pino.error({ request, error }, "Failed to update daily guides settings.");
		return { error: "Something didn't quite work. Please report this!" };
	}
};

export default function DailyGuides() {
	const { guild, currentChannelId, permissionError, channels } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const [selectedChannelId, setSelectedChannelId] = useState(currentChannelId ?? "");

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xs p-8">
				<div className="relative">
					<div className="relative z-10">
						<div className="flex items-center justify-between mb-8">
							<Link
								className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
								to={`/caelus/dashboard/${guild.id}`}
							>
								<ArrowLeft className="w-4 h-4" />
								Back
							</Link>
						</div>

						<div className="flex items-center gap-4 mb-8">
							{guild.icon ? (
								<div
									aria-label={`${guild.name} icon.`}
									className="w-16 h-16 bg-cover bg-center rounded-full"
									role="img"
									style={{ backgroundImage: `url(${guildIconURL(guild.id, guild.icon)})` }}
								/>
							) : (
								<div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-gray-200 dark:border-gray-600">
									{guild.name[0]!.toUpperCase()}
								</div>
							)}
							<div>
								<h1 className="mb-2">{guild.name}</h1>
							</div>
						</div>

						<div className="mt-8">
							<h2 className="text-lg font-semibold mb-2">Daily guides</h2>
							<p className="mb-6">
								All you need is a channel {APPLICATION_NAME} can send daily guides in. You can visit{" "}
								<Link className="regular-link" to="/caelus/guides/daily-guides">
									the guide
								</Link>{" "}
								to see how to set it up in Discord too!
							</p>

							{actionData?.success && (
								<div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-center gap-2">
									<Check className="w-5 h-5 text-green-600 dark:text-green-400" />
									<span className="text-sm text-green-800 dark:text-green-200">
										Settings saved successfully!
									</span>
								</div>
							)}

							{actionData?.error && (
								<div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
									<span className="text-sm text-red-800 dark:text-red-200">{actionData.error}</span>
								</div>
							)}

							<Form method="post">
								<input name="channelId" type="hidden" value={selectedChannelId} />
								<div className="mb-6">
									<Select
										error={permissionError}
										isClearable
										label="Channel"
										onChange={setSelectedChannelId}
										options={channels.map((channel) => ({
											value: channel.id,
											label: `${ChannelTypeToIcon[channel.type]} ${channel.name}`,
										}))}
										placeholder="Select a channel for daily guides."
										value={selectedChannelId}
									/>
								</div>

								<button
									className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-xs hover:shadow-md cursor-pointer"
									type="submit"
								>
									Save
								</button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
