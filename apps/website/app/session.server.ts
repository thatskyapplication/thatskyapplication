import { createCookieSessionStorage } from "react-router";
import { PRODUCTION, SESSION_SECRET } from "./config.server";
import type { CrowdinUser, DiscordUser, TokenExchange } from "./utility/types.js";

interface SessionData {
	discord_user?: DiscordUser;
	token_exchange?: TokenExchange;
	crowdin_authorised?: boolean;
	crowdin_user?: CrowdinUser;
	discord_crowdin_auth_error?: string;
}

interface FlashData {
	oauth_state?: string;
	return_to?: string;
	crowdin_state?: string;
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<
	SessionData,
	FlashData
>({
	cookie: {
		name: "__session",
		httpOnly: true,
		secure: PRODUCTION,
		sameSite: "lax",
		path: "/",
		secrets: [SESSION_SECRET],
	},
});
