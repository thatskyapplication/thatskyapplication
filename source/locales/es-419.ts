import esES from "./es-es.js";

export default {
	...esES,
	commands: {
		...esES.commands,
		hug: {
			...esES.commands.hug,
			message: "{{-user}}, ¡{{-invoker}} te abrazó!",
		},
	},
};
