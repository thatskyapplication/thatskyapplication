import DaylightPrairie from "./DaylightPrairie/index.js";
import HiddenForest from "./HiddenForest/index.js";
import IslesOfDawn from "./IslesOfDawn/index.js";
import ValleyOfTriumph from "./ValleyOfTriumph/index.js";

export default [...IslesOfDawn, ...DaylightPrairie, ...HiddenForest, ...ValleyOfTriumph] as const;
