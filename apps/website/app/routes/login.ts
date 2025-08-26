import type { APIUser } from "@discordjs/core/http-only";
import { type LoaderFunction, redirect } from "react-router";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET, REDIRECT_URI_LOGIN } from "~/config.server";
import discord from "~/discord";
import pino from "~/pino.js";
import { commitSession, getSession } from "~/session.server";
import { generateState } from "~/utility/functions.server";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const returnTo = url.searchParams.get("returnTo") || "/";
	const session = await getSession(request.headers.get("Cookie"));

	if (code) {
		const storedState = session.get("oauth_state");
		const storedReturnTo = session.get("return_to") || returnTo;
		session.unset("oauth_state");
		session.unset("return_to");

		if (error) {
			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}

		if (state !== storedState) {
			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}

		try {
			const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					client_id: APPLICATION_ID,
					client_secret: DISCORD_CLIENT_SECRET,
					grant_type: "authorization_code",
					code,
					redirect_uri: REDIRECT_URI_LOGIN,
				}),
			});

			if (!tokenResponse.ok) {
				throw await tokenResponse.json();
			}

			const tokenData = await tokenResponse.json();

			const userResponse = await fetch("https://discord.com/api/users/@me", {
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
				},
			});

			if (!userResponse.ok) {
				throw await userResponse.json();
			}

			const userData = (await userResponse.json()) as APIUser;

			session.set("user", {
				id: userData.id,
				username: userData.username,
				discriminator: userData.discriminator,
				avatar: userData.avatar,
			});

			session.set("access_token", tokenData.access_token);

			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		} catch (error) {
			pino.error({ request, error }, "Failed to log in.");

			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
	}

	const oAuthState = generateState();
	session.set("oauth_state", oAuthState);
	session.set("return_to", returnTo);

	return redirect(
		discord.oauth2.generateAuthorizationURL({
			client_id: APPLICATION_ID,
			response_type: "code",
			redirect_uri: REDIRECT_URI_LOGIN,
			scope: "identify guilds",
			state: oAuthState,
		}),
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
};
