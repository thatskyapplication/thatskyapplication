import { writeFile } from "node:fs/promises";
import enGB from "../source/locales/en-gb.js";

await writeFile("./en-gb.json", JSON.stringify(enGB, null, 2));
