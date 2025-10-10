import pino from "~/pino.js";

export function loader() {
	pino.error("This is a test error from the /hnrtjkmlfd route.");
	return null;
}

export default function What() {
	throw new Response("A suspicious sandwich was eaten.", { status: 500 });
}
