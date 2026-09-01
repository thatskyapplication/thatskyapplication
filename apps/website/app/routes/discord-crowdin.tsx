import { clsx } from "clsx";
import { CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
import { Form, redirect } from "react-router";
import { ActionButton } from "~/components/ActionButton";
import { ExternalLink } from "~/components/ExternalLink";
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
import { PAGE_TITLE_CLASS } from "~/utility/styles.js";
import type { CrowdinUser } from "~/utility/types.js";
import type { Route } from "./+types/discord-crowdin.js";

interface AuthState {
	crowdinUser: CrowdinUser | undefined;
	linked: boolean;
	translator: boolean;
	justLinked?: boolean;
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
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

	const link = await database
		.selectFrom("users")
		.select(["crowdin_user_id", "translator"])
		.where("discord_user_id", "=", discordUser.id)
		.executeTakeFirst();

	const linked = link?.crowdin_user_id !== null && link?.crowdin_user_id !== undefined;

	const authenticationState: AuthState = {
		crowdinUser: linked ? session.get("crowdin_user") : undefined,
		linked,
		translator: link?.translator ?? false,
		error: session.get("discord_crowdin_auth_error"),
	};

	const stateMatches = state !== null && state === session.get("crowdin_state");

	if (!crowdinCode || !stateMatches) {
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

		const claimed = await database
			.selectFrom("users")
			.select("discord_user_id")
			.where("crowdin_user_id", "=", userData.id)
			.executeTakeFirst();

		if (claimed && claimed.discord_user_id !== discordUser.id) {
			authenticationState.crowdinUser = undefined;
			authenticationState.error =
				"This Crowdin account is already linked to another Discord account.";
			session.set("discord_crowdin_auth_error", authenticationState.error);
			return authenticationState;
		}

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

		authenticationState.linked = true;
		authenticationState.translator = true;
		authenticationState.justLinked = true;
		session.set("crowdin_authorised", true);
		session.set("crowdin_user", authenticationState.crowdinUser);
		session.unset("discord_crowdin_auth_error");
	} catch (error) {
		pino.error(error, "Failed to authorise with Crowdin.");
		authenticationState.error = "Failed to authorise with Crowdin.";
		session.set("discord_crowdin_auth_error", authenticationState.error);
	}

	return authenticationState;
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const formData = await request.formData();
	const action = formData.get("action");
	const session = getRequestSession(context);
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

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

	if (action === "unlink_crowdin") {
		await database
			.updateTable("users")
			.set({ crowdin_user_id: null, translator: false })
			.where("discord_user_id", "=", discordUser.id)
			.execute();

		try {
			await discord.guilds.removeRoleFromMember(
				SUPPORT_SERVER_GUILD_ID,
				discordUser.id,
				TRANSLATOR_ROLE_ID,
			);
		} catch (error) {
			pino.error(error, "Failed to remove the translator role whilst unlinking.");
		}

		session.unset("crowdin_authorised");
		session.unset("crowdin_user");
		session.unset("discord_crowdin_auth_error");
	}

	return null;
};

export default function CrowdinDiscord({ loaderData }: Route.ComponentProps) {
	const { crowdinUser, error, linked, translator, justLinked } = loaderData;

	return (
		<CentredSitePage>
			<div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-100 p-8 shadow-md dark:border-gray-700 dark:bg-gray-900">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6 text-center")}>Crowdin authorisation</h1>
				{error && (
					<div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
						{error}
					</div>
				)}
				{linked ? (
					<div className="mt-6 space-y-4">
						{justLinked && (
							<div className="text-center">
								<CheckCircleIcon className="mx-auto mb-3 h-12 w-12 text-green-500" />
								<p className="my-4 text-sm text-gray-600 dark:text-gray-400">
									Your Crowdin and Discord accounts are linked. Your translating skills have
									improved by at least 1%. Promise.
								</p>
							</div>
						)}
						<div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
							<div className="min-w-0">
								<p className="my-4 text-xs text-gray-500 dark:text-gray-400">Crowdin account</p>
								<p className="my-4 truncate text-sm font-medium">
									{crowdinUser?.username ?? "Linked"}
								</p>
							</div>
							{translator && (
								<CheckCircleIcon
									aria-label="Translator"
									className="h-5 w-5 shrink-0 text-green-500"
									role="img"
								/>
							)}
						</div>
						<Form method="post">
							<ActionButton
								className="w-full"
								name="action"
								type="submit"
								value="unlink_crowdin"
								variant="danger"
							>
								Unlink Crowdin
							</ActionButton>
						</Form>
					</div>
				) : (
					<div className="mt-6 space-y-4">
						<p className="text-center text-sm text-gray-600 dark:text-gray-400">
							Hey translators! This will allow us to easily identify our kind in the{" "}
							<ExternalLink
								className="regular-link inline-flex items-center transition duration-200"
								href={INVITE_SUPPORT_SERVER_URL}
								icon
								iconClassName="ml-1 h-4 w-4"
							>
								support server
							</ExternalLink>
							!
						</p>
						<Form method="post">
							<ActionButton
								className="w-full"
								name="action"
								type="submit"
								value="authorise_crowdin"
								variant="primary"
							>
								Authorise
								<ExternalLinkIcon className="ml-2 h-4 w-4" />
							</ActionButton>
						</Form>
					</div>
				)}
			</div>
		</CentredSitePage>
	);
}
