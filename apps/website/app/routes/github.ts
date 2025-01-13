import { type ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = () =>
	redirect("https://github.com/thatskyapplication", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});

export const loader = async () =>
	redirect("https://github.com/thatskyapplication", {
		status: 301,
		headers: {
			"Cache-Control": "public, max-age=31536000",
		},
	});
