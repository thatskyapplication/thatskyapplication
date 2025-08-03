import { Table, type UsersPacket } from "@thatskyapplication/utility";
import { CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { data, Form, redirect, useLoaderData } from "react-router";
import {
	CROWDIN_CLIENT_ID,
	CROWDIN_CLIENT_SECRET,
	REDIRECT_URI_DISCORD_CROWDIN,
	SUPPORT_SERVER_GUILD_ID,
	TRANSLATOR_ROLE_ID,
} from "~/config.server.js";
import discord from "~/discord.js";
import pg from "~/pg.server";
import pino from "~/pino.js";
import { commitSession, getSession } from "~/session.server";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants.js";
import { generateState } from "~/utility/functions.server";
import type { DiscordUser } from "~/utility/types.js";

interface AuthState {
	crowdinAuthorised: boolean;
	discordUser: DiscordUser;
	success?: boolean;
	crowdinUser?: {
		id: number;
		username: string;
	};
	error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const session = await getSession(request.headers.get("Cookie"));
	const crowdinCode = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const discordUser = session.get("user");

	if (!discordUser) {
		const returnTo = encodeURIComponent(request.url);
		return redirect(`/login?returnTo=${returnTo}`);
	}

	if (error) {
		session.set("auth_error", error);
	}

	const authenticationState: AuthState = {
		crowdinAuthorised: session.get("crowdin_authorised") ?? false,
		discordUser,
		crowdinUser: session.get("crowdin_user"),
		error: session.get("auth_error"),
	};

	if (crowdinCode && state === session.get("crowdin_state")) {
		try {
			const tokenResponse = await fetch("https://accounts.crowdin.com/oauth/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					client_id: CROWDIN_CLIENT_ID,
					client_secret: CROWDIN_CLIENT_SECRET,
					code: crowdinCode,
					redirect_uri: REDIRECT_URI_DISCORD_CROWDIN,
				}),
			});

			if (!tokenResponse.ok) {
				throw await tokenResponse.text();
			}

			const tokenData = (await tokenResponse.json()) as {
				token_type: string;
				access_token: string;
				refresh_token: string;
				expires_in: number;
			};

			const userResponse = await fetch("https://thatskyapplication.api.crowdin.com/api/v2/user", {
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
				},
			});

			if (!userResponse.ok) {
				throw await userResponse.text();
			}

			const userData = await userResponse.json();
			authenticationState.crowdinAuthorised = true;

			authenticationState.crowdinUser = {
				id: userData.data.id,
				username: userData.data.username,
			};

			session.set("crowdin_authorised", true);
			session.set("crowdin_user", authenticationState.crowdinUser);
			session.set("crowdin_token", tokenData.access_token);
		} catch (error) {
			pino.error({ request, error }, "Failed to authorise with Crowdin.");
			authenticationState.error = "Failed to authorise with Crowdin.";
			session.set("auth_error", authenticationState.error);
		}

		session.unset("crowdin_state");
	}

	if (authenticationState.crowdinAuthorised && authenticationState.discordUser) {
		try {
			const user = await pg<UsersPacket>(Table.Users)
				.where({
					discord_user_id: authenticationState.discordUser.id,
					crowdin_user_id: authenticationState.crowdinUser!.id,
				})
				.first();

			if (user) {
				authenticationState.error = "You're already a translator!";
			} else {
				await pg<UsersPacket>(Table.Users).insert({
					discord_user_id: authenticationState.discordUser.id,
					crowdin_user_id: authenticationState.crowdinUser!.id,
				});

				await discord.guilds.addRoleToMember(
					SUPPORT_SERVER_GUILD_ID,
					authenticationState.discordUser.id,
					TRANSLATOR_ROLE_ID,
				);

				authenticationState.success = true;
			}
		} catch (error) {
			pino.error({ request, error }, "Failed to link accounts.");
			authenticationState.error = "Failed to link accounts.";
			session.set("auth_error", authenticationState.error);
		}
	}

	if (authenticationState.error) {
		session.unset("auth_error");
	}

	return data(authenticationState, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const action = formData.get("action");
	const session = await getSession(request.headers.get("Cookie"));
	const discordUser = session.get("user");

	if (!discordUser) {
		const returnTo = encodeURIComponent(request.url);
		return redirect(`/login?returnTo=${returnTo}`);
	}

	if (action === "authorise_crowdin") {
		const state = generateState();
		session.set("crowdin_state", state);
		const authenticationURL = new URL("https://accounts.crowdin.com/oauth/authorize");
		authenticationURL.searchParams.set("response_type", "code");
		authenticationURL.searchParams.set("client_id", CROWDIN_CLIENT_ID);
		authenticationURL.searchParams.set("redirect_uri", REDIRECT_URI_DISCORD_CROWDIN);
		authenticationURL.searchParams.set("scope", "user");
		authenticationURL.searchParams.set("state", state);

		return redirect(authenticationURL.toString(), {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	return null;
};

export default function CrowdinDiscord() {
	const { crowdinAuthorised, crowdinUser, error, success } = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen flex items-center justify-center pt-20 lg:pt-0 pb-4 lg:pb-0 px-4">
			<div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-center">Crowdin Authorisation</h1>
				{error && (
					<div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
						<p className="text-sm">{error}</p>
					</div>
				)}
				{success ? (
					<div className="text-center">
						<CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
						<h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
							Success!
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
							You have successfully linked your Crowdin and Discord accounts. You have obtained the
							translator role and your translating skills have improved by at least 1%. Promise.
						</p>
						<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
							<h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
								Crowdin Account
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">{crowdinUser!.username}</p>
						</div>
					</div>
				) : (
					<div className="space-y-4">
						<p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
							Hey translators! This will allow us to easily identify our kind in the{" "}
							<a
								href={INVITE_SUPPORT_SERVER_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="regular-link inline-flex items-center transition duration-200"
							>
								support server
								<ExternalLinkIcon className="ml-1 w-4 h-4" />
							</a>
							!
						</p>
						{crowdinAuthorised ? (
							<div className="border border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 rounded-lg p-4">
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-medium text-sm">Crowdin</h3>
									<CheckCircleIcon className="w-5 h-5 text-green-500" />
								</div>
								<p className="text-sm text-green-600 dark:text-green-400">
									✓ Authorised as {crowdinUser!.username}
								</p>
							</div>
						) : (
							<Form method="post">
								<button
									type="submit"
									name="action"
									value="authorise_crowdin"
									className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
								>
									Authorise Crowdin
									<ExternalLinkIcon className="w-4 h-4 ml-2" />
								</button>
							</Form>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
