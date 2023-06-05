import Abyss from "./Abyss/index.js";
import Assembly from "./Assembly/index.js";
import Belonging from "./Belonging/index.js";
import Dreams from "./Dreams/index.js";
import Enchantment from "./Enchantment/index.js";
import Flight from "./Flight/index.js";
import Gratitude from "./Gratitude/index.js";
import Lightseekers from "./Lightseekers/index.js";
import LittlePrince from "./LittlePrince/index.js";
import Prophecy from "./Prophecy/index.js";
import Rhythm from "./Rhythm/index.js";
import Sanctuary from "./Sanctuary/index.js";

export default [
	...Gratitude,
	...Lightseekers,
	...Belonging,
	...Rhythm,
	...Enchantment,
	...Sanctuary,
	...Prophecy,
	...Dreams,
	...Assembly,
	...LittlePrince,
	...Flight,
	...Abyss,
] as const;
