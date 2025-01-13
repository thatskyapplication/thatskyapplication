import { type ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = () =>
	redirect("https://thatgamecompany.helpshift.com/hc/en/17/faq/460", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});

export const loader = async () =>
	redirect("https://thatgamecompany.helpshift.com/hc/en/17/faq/460", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});
