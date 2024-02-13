import esES from "./es-ES.js";

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
