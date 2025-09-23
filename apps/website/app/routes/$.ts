export default function CatchAll() {
	throw new Response(null, { status: 404 });
}
