import Elder from "./Elder/index.js";
import Seasonal from "./Seasonal/index.js";
import Standard from "./Standard/index.js";

export default [...Standard, ...Elder, ...Seasonal] as const;
