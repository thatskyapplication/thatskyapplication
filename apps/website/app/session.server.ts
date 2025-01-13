import { createCookieSessionStorage } from "@remix-run/node";
import { SESSION_SECRET } from "./config.server";

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		secrets: [SESSION_SECRET],
	},
});

export const { getSession, commitSession, destroySession } = sessionStorage;
