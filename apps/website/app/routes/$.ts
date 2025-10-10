import { data } from "react-router";

export function loader() {
	throw data(null, { status: 404 });
}

export default function CatchAll() {
	return null;
}
