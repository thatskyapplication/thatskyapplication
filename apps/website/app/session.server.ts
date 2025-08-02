import { createCookieSessionStorage } from "react-router";
import { PRODUCTION, SESSION_SECRET } from "./config.server";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		secure: PRODUCTION,
		sameSite: "lax",
		path: "/",
		secrets: [SESSION_SECRET],
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
