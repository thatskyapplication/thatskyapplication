import { inspect } from "node:util";

export function consoleLog(consoleLog: any, stamp = new Date().toISOString()): void {
  console.log(`- - - - - ${stamp} - - - - -`);
  console.log(inspect(consoleLog, false, Infinity, true));
}
