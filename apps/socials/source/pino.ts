import pino from "pino";
import type { Post } from "./features/reddit.js";
import { BETTER_STACK_ENDPOINT_URL, BETTER_STACK_TOKEN } from "./utility/configuration.js";

const options: Parameters<typeof pino>[0] = {
	errorKey: "error",
	serializers: {
		payloadsErrors: (value: readonly { post: Post<true>; error: unknown }[]) =>
			value.map(({ post, error }) => ({
				post,
				error: error instanceof Error ? pino.stdSerializers.err(error) : error,
			})),
	},
};

if (BETTER_STACK_TOKEN && BETTER_STACK_ENDPOINT_URL) {
	options.transport = {
		target: "@logtail/pino",
		options: {
			sourceToken: BETTER_STACK_TOKEN,
			options: { endpoint: BETTER_STACK_ENDPOINT_URL },
		},
	};
}

export default pino(options);
