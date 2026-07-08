import type { Selectable } from "kysely";
import type { DB } from "./schema.js";

export type Packet<Table extends keyof DB> = Selectable<DB[Table]>;
