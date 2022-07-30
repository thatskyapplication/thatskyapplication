import { readdirSync } from "node:fs";
import { URL } from "node:url";
import Caelus from "./Client/Client.js";
import type { Event } from "./Events/index.js";

const eventsPath = new URL("./Events/", import.meta.url);

for (const file of readdirSync(eventsPath).filter(file => file !== "index.js")) {
  const { name, once, fire } = (await import(eventsPath + file)).event as Event;
  Caelus[once ? "once" : "on"](name, fire);
}

Caelus.login();
