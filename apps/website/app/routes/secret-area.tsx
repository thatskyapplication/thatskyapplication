import type { RESTGetCurrentUserGuildMemberResult } from "@discordjs/core/http-only";
import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
	APPLICATION_ID,
	CLIENT_SECRET,
	DEVELOPER_GUILD_ID,
	REDIRECT_URI_SECRET_AREA,
	ROLE_ID,
} from "~/config.server";
import discord from "~/discord";
import { commitSession, getSession } from "~/session.server";
import { generateState } from "~/utility/functions.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const session = await getSession(request.headers.get("Cookie"));
	const sessionMember = session.get("member");

	if (sessionMember) {
		return sessionMember as RESTGetCurrentUserGuildMemberResult;
	}

	const code = url.searchParams.get("code");

	if (!code) {
		const state = generateState();
		session.set("state", state);

		return redirect(
			discord.oauth2.generateAuthorizationURL({
				client_id: APPLICATION_ID,
				response_type: "code",
				scope: "identify guilds.members.read",
				prompt: "none",
				redirect_uri: REDIRECT_URI_SECRET_AREA,
				state,
			}),
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			},
		);
	}

	const returnedState = url.searchParams.get("state");
	const storedState = session.get("state");

	if (!returnedState || returnedState !== storedState) {
		throw new Response("Invalid state.", { status: 400 });
	}

	session.unset("state");
	let member;

	try {
		const tokenResponse = await discord.oauth2.tokenExchange({
			client_id: APPLICATION_ID,
			client_secret: CLIENT_SECRET,
			code,
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI_SECRET_AREA,
		});

		const guildResponse = await fetch(
			`https://discord.com/api/v10/users/@me/guilds/${DEVELOPER_GUILD_ID}/member`,
			{
				headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
			},
		);

		const memberResponse = (await guildResponse.json()) as RESTGetCurrentUserGuildMemberResult;

		if (memberResponse.roles.includes(ROLE_ID)) {
			member = memberResponse;
		}
	} catch {
		throw new Response("Dark dragons are about.", { status: 500 });
	}

	if (member) {
		session.set("member", member);

		return redirect("/secret-area", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	throw new Response("Unauthorised.", { status: 403 });
};

export default function SecretArea() {
	const member = useLoaderData<typeof loader>();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<header className="text-center mb-8">
				<h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100">Secret Area</h1>
				<p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
					Welcome, young one. My name is {member.user.username}. Oh, yours is too? What a
					coincidence!
				</p>
			</header>
			<Form method="post" action="join">
				<button
					type="submit"
					className="px-6 py-3 bg-discord-button text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-200"
				>
					Join development server
				</button>
			</Form>
		</div>
	);
}
