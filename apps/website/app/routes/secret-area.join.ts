import type {
	RESTGetAPICurrentUserResult,
	RESTGetCurrentUserGuildMemberResult,
} from "@discordjs/core/http-only";
import { redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
	DEVELOPER_GUILD_ID,
	DEVELOPMENT_ADMINISTRATOR_ID,
	DEVELOPMENT_APPLICATION_ID,
	DEVELOPMENT_CLIENT_SECRET,
	DEVELOPMENT_DISCORD_TOKEN,
	DEVELOPMENT_GUILD_ID,
	DEVELOPMENT_MANAGE_ROLES_ID,
	REDIRECT_URI_SECRET_AREA,
	ROLE_ID,
} from "~/config.server";
import discord from "~/discord";
import { commitSession, getSession } from "~/session.server";
import { generateState } from "~/utility/functions.server";

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const accessToken = session.get("accessToken") as string | undefined;

	if (!accessToken) {
		return Response.json({ message: "Unauthorised." }, { status: 401 });
	}

	const memberResponse = await fetch(
		`https://discord.com/api/v10/users/@me/guilds/${DEVELOPER_GUILD_ID}/member`,
		{
			headers: { Authorization: `Bearer ${accessToken}` },
		},
	);

	const member = (await memberResponse.json()) as RESTGetCurrentUserGuildMemberResult;

	if (!member.roles.includes(ROLE_ID)) {
		return Response.json({ message: "Unauthorised." }, { status: 403 });
	}

	const state = generateState();
	session.set("developmentState", state);

	return redirect(
		discord.oauth2.generateAuthorizationURL({
			client_id: DEVELOPMENT_APPLICATION_ID,
			response_type: "code",
			scope: "identify guilds.join",
			prompt: "none",
			redirect_uri: `${REDIRECT_URI_SECRET_AREA}/join`,
			state,
		}),
		{
			headers: { "Set-Cookie": await commitSession(session) },
		},
	);
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const session = await getSession(request.headers.get("Cookie"));
	const code = url.searchParams.get("code");
	const returnedState = url.searchParams.get("state");
	const storedState = session.get("developmentState");

	if (!code || returnedState !== storedState) {
		throw Response.json({ message: "Invalid." }, { status: 400 });
	}

	session.unset("developmentState");

	try {
		const tokenResponse = await discord.oauth2.tokenExchange({
			client_id: DEVELOPMENT_APPLICATION_ID,
			client_secret: DEVELOPMENT_CLIENT_SECRET,
			code,
			grant_type: "authorization_code",
			redirect_uri: `${REDIRECT_URI_SECRET_AREA}/join`,
		});

		const accessToken = tokenResponse.access_token;

		const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		const developmentUser = (await userResponse.json()) as RESTGetAPICurrentUserResult;

		await fetch(
			`https://discord.com/api/v10/guilds/${DEVELOPMENT_GUILD_ID}/members/${developmentUser.id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bot ${DEVELOPMENT_DISCORD_TOKEN}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token: accessToken,
					roles: [DEVELOPMENT_MANAGE_ROLES_ID, DEVELOPMENT_ADMINISTRATOR_ID],
				}),
			},
		);

		return redirect("/secret-area");
	} catch {
		throw new Response("Development authorisation failed.", { status: 500 });
	}
};
