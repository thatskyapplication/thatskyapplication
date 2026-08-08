import { CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
import { Form, redirect } from "react-router";
import { CentredSitePage } from "~/components/PageLayout";
import {
	CROWDIN_CLIENT_ID,
	CROWDIN_CLIENT_SECRET,
	REDIRECT_URI_DISCORD_CROWDIN,
	SUPPORT_SERVER_GUILD_ID,
	TRANSLATOR_ROLE_ID,
} from "~/config.server.js";
import database from "~/database.server";
import discord from "~/discord.js";
import { getRequestSession } from "~/middleware/session";
import pino from "~/pino.js";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants.js";
import { generateState, requireDiscordAuthentication } from "~/utility/functions.server";
import type { CrowdinUser } from "~/utility/types.js";
import type { Route } from "./+types/discord-crowdin.js";

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

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const session = getRequestSession(context);
	const crowdinCode = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

	if (error) {
		session.set("discord_crowdin_auth_error", error);
	}

	const authenticationState: AuthState = {
		crowdinUser: session.get("crowdin_user"),
		error: session.get("discord_crowdin_auth_error"),
	};

	if (!crowdinCode || state !== session.get("crowdin_state")) {
		return authenticationState;
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
			await database
				.insertInto("users")
				.values({
					discord_user_id: discordUser.id,
					crowdin_user_id: userData.id,
					translator: false,
				})
				.onConflict((oc) =>
					oc.column("discord_user_id").doUpdateSet((eb) => ({
						crowdin_user_id: eb.ref("excluded.crowdin_user_id"),
						translator: eb.ref("excluded.translator"),
					})),
				)
				.execute();

			authenticationState.error = "Crowdin account inactive.";
			session.set("discord_crowdin_auth_error", authenticationState.error);

			return authenticationState;
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
			await database
				.insertInto("users")
				.values({
					discord_user_id: discordUser.id,
					crowdin_user_id: userData.id,
					translator: false,
				})
				.onConflict((oc) =>
					oc.column("discord_user_id").doUpdateSet((eb) => ({
						crowdin_user_id: eb.ref("excluded.crowdin_user_id"),
						translator: eb.ref("excluded.translator"),
					})),
				)
				.execute();

			authenticationState.error = "You have not translated anything.";
			session.set("discord_crowdin_auth_error", authenticationState.error);
			return authenticationState;
		}

		const user = await database
			.selectFrom("users")
			.selectAll()
			.where("discord_user_id", "=", discordUser.id)
			.where("crowdin_user_id", "=", userData.id)
			.where("translator", "=", true)
			.executeTakeFirst();

		if (user) {
			authenticationState.error = "You're already a translator!";
			session.set("discord_crowdin_auth_error", authenticationState.error);
			return authenticationState;
		}

		await database
			.insertInto("users")
			.values({
				discord_user_id: discordUser.id,
				crowdin_user_id: userData.id,
				translator: true,
			})
			.onConflict((oc) =>
				oc.column("discord_user_id").doUpdateSet((eb) => ({
					crowdin_user_id: eb.ref("excluded.crowdin_user_id"),
					translator: eb.ref("excluded.translator"),
				})),
			)
			.execute();

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

	return authenticationState;
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const formData = await request.formData();
	const action = formData.get("action");
	const session = getRequestSession(context);
	requireDiscordAuthentication({ context, request, url });

	if (action === "authorise_crowdin") {
		const state = generateState();
		session.flash("crowdin_state", state);
		const authenticationURL = new URL("https://accounts.crowdin.com/oauth/authorize");
		authenticationURL.searchParams.set("response_type", "code");
		authenticationURL.searchParams.set("client_id", CROWDIN_CLIENT_ID);
		authenticationURL.searchParams.set("redirect_uri", REDIRECT_URI_DISCORD_CROWDIN);
		authenticationURL.searchParams.set("scope", "user");
		authenticationURL.searchParams.set("state", state);

		return redirect(authenticationURL.toString());
	}

	return null;
};

export default function CrowdinDiscord({ loaderData }: Route.ComponentProps) {
	const { crowdinUser, error, success } = loaderData;

	return (
		<CentredSitePage>
			<div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-100 p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
				<h1 className="text-center">Crowdin authorisation</h1>
				{error && (
					<div className="mb-4 rounded-sm border border-red-300 bg-red-100 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400">
						<p className="text-sm">{error}</p>
					</div>
				)}
				{success ? (
					<div className="text-center">
						<CheckCircleIcon className="mx-auto mb-4 h-16 w-16 text-green-500" />
						<h2 className="mb-4 text-xl font-semibold text-green-600 dark:text-green-400">
							Success!
						</h2>
						<p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
							You have successfully linked your Crowdin and Discord accounts. You have obtained the
							translator role and your translating skills have improved by at least 1%. Promise.
						</p>
						<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
							<h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
								Crowdin account
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">{crowdinUser!.username}</p>
						</div>
					</div>
				) : (
					<div className="space-y-4">
						<p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
							Hey translators! This will allow us to easily identify our kind in the{" "}
							<a
								className="regular-link inline-flex items-center transition duration-200"
								href={INVITE_SUPPORT_SERVER_URL}
								rel="noopener noreferrer"
								target="_blank"
							>
								support server
								<ExternalLinkIcon className="ml-1 h-4 w-4" />
							</a>
							!
						</p>
						{crowdinUser ? (
							<div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
								<div className="mb-2 flex items-center justify-between">
									<h3 className="text-sm font-medium">Crowdin</h3>
									<CheckCircleIcon className="h-5 w-5 text-green-500" />
								</div>
								<p className="text-sm text-green-600 dark:text-green-400">
									✓ Authorised as {crowdinUser.username}
								</p>
							</div>
						) : (
							<Form method="post">
								<button
									className="flex w-full items-center justify-center rounded-md bg-orange-500 px-4 py-2 font-medium text-white transition duration-200 hover:bg-orange-600"
									name="action"
									type="submit"
									value="authorise_crowdin"
								>
									Authorise Crowdin
									<ExternalLinkIcon className="ml-2 h-4 w-4" />
								</button>
							</Form>
						)}
					</div>
				)}
			</div>
		</CentredSitePage>
	);
}
