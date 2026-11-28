import { OAuth2Scopes } from "@discordjs/core/http-only";
import { redirect } from "react-router";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET, REDIRECT_URI_LOGIN } from "~/config.server";
import discord from "~/discord";
import { getRequestSession } from "~/middleware/session";
import pino from "~/pino.js";
import { clearAuthentication } from "~/session.server";
import { saveDiscordOAuth } from "~/utility/discord-oauth.server";
import { saveEmailNotifications } from "~/utility/email-notifications.server.js";
import { redirectToDiscordAuthorisation, resolveReturnTo } from "~/utility/functions.server";
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
		const emailNotificationsPending = session.get("email_notifications_pending");

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

			const grantedScopes = tokenExchange.scope.split(" ");

			if (grantedScopes.includes(OAuth2Scopes.Guilds)) {
				await saveDiscordOAuth(user.id, tokenExchange);
			}

			clearAuthentication(session);

			session.set("discord_user", {
				id: user.id,
				username: user.username,
				discriminator: user.discriminator,
				avatar: user.avatar,
			});

			if (emailNotificationsPending && grantedScopes.includes(OAuth2Scopes.Email)) {
				if (user.email && user.verified) {
					await saveEmailNotifications({
						...emailNotificationsPending,
						userId: user.id,
						email: user.email,
					});

					session.flash("email_notifications_saved_at", new Date().toISOString());
				} else {
					session.flash("email_notifications_unverified", true);
				}
			}

			return redirect(storedReturnTo);
		} catch (error) {
			pino.error({ request, error }, "Failed to log in.");
			return redirect(storedReturnTo);
		}
	}

	return redirectToDiscordAuthorisation({ session, returnTo, scopes: [OAuth2Scopes.Identify] });
};
