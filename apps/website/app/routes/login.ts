import { type LoaderFunction, redirect } from "react-router";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET, REDIRECT_URI_LOGIN } from "~/config.server";
import discord from "~/discord";
import { commitSession, getSession } from "~/session.server";
import { captureError, generateState } from "~/utility/functions.server";

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
			const tokenExchange = await discord.oauth2.tokenExchange({
				client_id: APPLICATION_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: "authorization_code",
				code,
				redirect_uri: REDIRECT_URI_LOGIN,
			});

			const user = await discord.users.getCurrent({
				auth: { prefix: "Bearer", token: tokenExchange.access_token },
			});

			session.set("discord_user", {
				id: user.id,
				username: user.username,
				discriminator: user.discriminator,
				avatar: user.avatar,
			});

			session.set("token_exchange", {
				...tokenExchange,
				expires_at: Date.now() + tokenExchange.expires_in * 1000,
			});

			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		} catch (error) {
			captureError({ request, error }, "Failed to log in.");

			return redirect(storedReturnTo, {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
	}

	const oAuthState = generateState();
	session.flash("oauth_state", oAuthState);
	session.flash("return_to", returnTo);

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
