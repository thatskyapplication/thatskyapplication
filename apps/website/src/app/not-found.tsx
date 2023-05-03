import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<h1>That's a 404...</h1>
			<p>
				No dark crab plushies here. Take me <Link href="/">back</Link>.
			</p>
		</>
	);
}
