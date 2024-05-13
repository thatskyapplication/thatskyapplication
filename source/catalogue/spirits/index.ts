import { REALM_SPIRITS } from "./realms/index.js";
import { SEASON_SPIRITS } from "./seasons/index.js";

export const SPIRITS = [...REALM_SPIRITS, ...SEASON_SPIRITS] as const;
