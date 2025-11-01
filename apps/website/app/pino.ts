import pino from "pino";

export default pino({
	errorKey: "error",
	serializers: {
		request: pino.stdSerializers.req,
		response: pino.stdSerializers.res,
	},
});
