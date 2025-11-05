import pino from "pino";
import type { Post } from "./features/reddit.js";

export default pino({
	serializers: {
		error: pino.stdSerializers.err,
		payloadsErrors: (value: readonly { post: Post<true>; error: unknown }[]) =>
			value.map(({ post, error }) => ({
				post,
				error: error instanceof Error ? pino.stdSerializers.err(error) : error,
			})),
	},
});
