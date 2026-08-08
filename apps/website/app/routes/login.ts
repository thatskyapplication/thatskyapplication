import { redirect } from "react-router";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET, REDIRECT_URI_LOGIN } from "~/config.server";
import discord from "~/discord";
import { getRequestSession } from "~/middleware/session";
import pino from "~/pino.js";
import { clearAuthentication } from "~/session.server";
import { saveDiscordOAuth } from "~/utility/discord-oauth.server";
import { generateState, resolveReturnTo } from "~/utility/functions.server";
import type { Route } from "./+types/login.js";

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const error = url.searchParams.get("error");
	const returnTo = resolveReturnTo(url.searchParams.get("returnTo"), url.origin);
	const session = getRequestSession(context);

	if (code || error) {
		const storedState = session.get("oauth_state");
		const storedReturnTo = resolveReturnTo(session.get("return_to") || returnTo, url.origin);

		if (state !== storedState || error || !code) {
			return redirect(storedReturnTo);
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

			await saveDiscordOAuth(user.id, tokenExchange);
			clearAuthentication(session);

			session.set("discord_user", {
				id: user.id,
				username: user.username,
				discriminator: user.discriminator,
				avatar: user.avatar,
			});

			return redirect(storedReturnTo);
		} catch (error) {
			pino.error({ request, error }, "Failed to log in.");
			return redirect(storedReturnTo);
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
	);
};
