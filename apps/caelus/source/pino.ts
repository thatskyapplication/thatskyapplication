import pino from "pino";
import { BETTER_STACK_TOKEN } from "./utility/configuration.js";

const options: Parameters<(typeof pino)["default"]>[0] = {
	serializers: {
		error: pino.stdSerializers.err,
	},
};

if (BETTER_STACK_TOKEN) {
	options.transport = {
		target: "@logtail/pino",
		options: { sourceToken: BETTER_STACK_TOKEN },
	};
}

export default pino.default(options);
