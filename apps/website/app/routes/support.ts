import { type ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = () =>
	redirect("https://discord.gg/dFJms52NgB", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});

export const loader = async () =>
	redirect("https://discord.gg/dFJms52NgB", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});
