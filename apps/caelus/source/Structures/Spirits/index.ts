import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";

export default [...Elder, ...Seasonal] as const;
