import process from "node:process";
import pino from "pino";
import { PRODUCTION } from "./utility/constants-2.js";

const options: Parameters<(typeof pino)["default"]>[0] = {};

if (PRODUCTION) {
	options.transport = {
		target: "@logtail/pino",
		options: { sourceToken: process.env.BETTER_STACK_TOKEN },
	};
}

export default pino.default(options);
