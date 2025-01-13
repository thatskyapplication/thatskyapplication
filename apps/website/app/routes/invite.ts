import { type ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = () =>
	redirect("https://discord.com/oauth2/authorize?client_id=982740693070012506", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});

export const loader = async () =>
	redirect("https://discord.com/oauth2/authorize?client_id=982740693070012506", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});
