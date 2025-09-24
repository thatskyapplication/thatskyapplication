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
import { generateState, requireDiscordAuthentication } from "~/utility/functions.server";
import type { CrowdinUser } from "~/utility/types.js";

interface AuthState {
	crowdinUser: CrowdinUser | undefined;
	success?: boolean;
	error: string | undefined;
}

interface CrowdinAPIUser {
	id: number;
	username: string;
	status: "active" | "pending" | "blocked";
}

/**
 * @see {@link https://support.crowdin.com/developer/enterprise/api/v2/#tag/Users/operation/api.users.getById}
 */
interface CrowdinRESTGetAPIUserResult {
	data: CrowdinAPIUser;
}

interface CrowdinRESTGetAPIUserProjectContributionsResult {
	data: UserProjectsContribution[];
	pagination: unknown;
}

interface UserProjectsContribution {
	data: UserProjectsContributionData;
}

interface UserProjectsContributionData {
	id: number;
	translated: StringsAndWords;
	approved: StringsAndWords;
	voted: CrowdinStrings;
	commented: CrowdinStrings;
	project: unknown;
}

interface CrowdinStrings {
	strings: number;
}

interface CrowdinWords {
	words: number;
}

type StringsAndWords = CrowdinStrings & CrowdinWords;

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const session = await getSession(request.headers.get("Cookie"));
	const crowdinCode = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const { discordUser } = await requireDiscordAuthentication(request);

	if (error) {
		session.set("discord_crowdin_auth_error", error);
	}

	const authenticationState: AuthState = {
		crowdinUser: session.get("crowdin_user"),
		error: session.get("discord_crowdin_auth_error"),
	};

	if (!crowdinCode || state !== session.get("crowdin_state")) {
		return data(authenticationState, { headers: { "Set-Cookie": await commitSession(session) } });
	}

	try {
		const tokenResponse = await fetch("https://accounts.crowdin.com/oauth/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
			headers: { Authorization: `Bearer ${tokenData.access_token}` },
		});

		if (!userResponse.ok) {
			throw await userResponse.text();
		}

		const { data: userData } = (await userResponse.json()) as CrowdinRESTGetAPIUserResult;
		authenticationState.crowdinUser = { id: userData.id, username: userData.username };

		if (userData.status !== "active") {
			await pg<UsersPacket>(Table.Users)
				.insert({
					discord_user_id: discordUser.id,
					crowdin_user_id: userData.id,
					translator: false,
				})
				.onConflict("discord_user_id")
				.merge();

			authenticationState.error = "Crowdin account inactive.";
			session.set("discord_crowdin_auth_error", authenticationState.error);

			return data(authenticationState, { headers: { "Set-Cookie": await commitSession(session) } });
		}

		const projectContributionsResponse = await fetch(
			`https://thatskyapplication.api.crowdin.com/api/v2/users/${userData.id}/projects/contributions`,
			{ headers: { Authorization: `Bearer ${tokenData.access_token}` } },
		);

		if (!projectContributionsResponse.ok) {
			throw await projectContributionsResponse.text();
		}

		const { data: projectContributionsData } =
			(await projectContributionsResponse.json()) as CrowdinRESTGetAPIUserProjectContributionsResult;

		if (
			projectContributionsData.length === 0 ||
			projectContributionsData[0]!.data.translated.strings === 0 ||
			projectContributionsData[0]!.data.translated.words === 0
		) {
			await pg<UsersPacket>(Table.Users)
				.insert({
					discord_user_id: discordUser.id,
					crowdin_user_id: userData.id,
					translator: false,
				})
				.onConflict("discord_user_id")
				.merge();

			authenticationState.error = "You have not translated anything.";
			session.set("discord_crowdin_auth_error", authenticationState.error);
			return data(authenticationState, { headers: { "Set-Cookie": await commitSession(session) } });
		}

		const user = await pg<UsersPacket>(Table.Users)
			.where({
				discord_user_id: discordUser.id,
				crowdin_user_id: userData.id,
				translator: true,
			})
			.first();

		if (user) {
			authenticationState.error = "You're already a translator!";
			session.set("discord_crowdin_auth_error", authenticationState.error);
			return data(authenticationState, { headers: { "Set-Cookie": await commitSession(session) } });
		}

		await pg<UsersPacket>(Table.Users)
			.insert({
				discord_user_id: discordUser.id,
				crowdin_user_id: userData.id,
				translator: true,
			})
			.onConflict("discord_user_id")
			.merge();

		await discord.guilds.addRoleToMember(
			SUPPORT_SERVER_GUILD_ID,
			discordUser.id,
			TRANSLATOR_ROLE_ID,
		);

		authenticationState.success = true;
		session.set("crowdin_authorised", true);
		session.set("crowdin_user", authenticationState.crowdinUser);
		session.unset("discord_crowdin_auth_error");
	} catch (error) {
		pino.error({ request, error }, "Failed to authorise with Crowdin.");
		authenticationState.error = "Failed to authorise with Crowdin.";
		session.set("discord_crowdin_auth_error", authenticationState.error);
	}

	return data(authenticationState, { headers: { "Set-Cookie": await commitSession(session) } });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const action = formData.get("action");
	const session = await getSession(request.headers.get("Cookie"));
	await requireDiscordAuthentication(request);

	if (action === "authorise_crowdin") {
		const state = generateState();
		session.flash("crowdin_state", state);
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
	const { crowdinUser, error, success } = useLoaderData<typeof loader>();

	return (
		<div className="min-h-[calc(100vh-9rem)] flex items-center justify-center px-4">
			<div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-center">Crowdin Authorisation</h1>
				{error && (
					<div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-sm mb-4">
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
								className="regular-link inline-flex items-center transition duration-200"
								href={INVITE_SUPPORT_SERVER_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								support server
								<ExternalLinkIcon className="ml-1 w-4 h-4" />
							</a>
							!
						</p>
						{crowdinUser ? (
							<div className="border border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 rounded-lg p-4">
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-medium text-sm">Crowdin</h3>
									<CheckCircleIcon className="w-5 h-5 text-green-500" />
								</div>
								<p className="text-sm text-green-600 dark:text-green-400">
									✓ Authorised as {crowdinUser.username}
								</p>
							</div>
						) : (
							<Form method="post">
								<button
									className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
									name="action"
									type="submit"
									value="authorise_crowdin"
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
