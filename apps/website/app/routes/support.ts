import { type ActionFunction, redirect } from "@remix-run/node";
import { INVITE_SUPPORT_SERVER_URL } from "~/utility/constants.js";

export const action: ActionFunction = () =>
	redirect(INVITE_SUPPORT_SERVER_URL, {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});

export const loader = async () =>
	redirect(INVITE_SUPPORT_SERVER_URL, {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});
