import { createCookieSessionStorage, type Session as RouterSession } from "react-router";
import { PRODUCTION, SESSION_SECRET } from "./config.server";
import type { CrowdinUser, DiscordUser } from "./utility/types.js";

const SESSION_COOKIE_MAX_AGE = 2592000 as const;

interface SessionData {
	discord_user?: DiscordUser;
	crowdin_authorised?: boolean;
	crowdin_user?: CrowdinUser;
	discord_crowdin_auth_error?: string;
}

interface FlashData {
	oauth_state?: string;
	return_to?: string;
	crowdin_state?: string;
	settings_saved_at?: string;
}

export type Session = RouterSession<SessionData, FlashData>;

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<
	SessionData,
	FlashData
>({
	cookie: {
		name: "__session",
		httpOnly: true,
		maxAge: SESSION_COOKIE_MAX_AGE,
		secure: PRODUCTION,
		sameSite: "lax",
		path: "/",
		secrets: [SESSION_SECRET],
	},
});

export function clearAuthentication(session: Session) {
	session.unset("discord_user");
	session.unset("crowdin_authorised");
	session.unset("crowdin_user");
	session.unset("discord_crowdin_auth_error");
}
