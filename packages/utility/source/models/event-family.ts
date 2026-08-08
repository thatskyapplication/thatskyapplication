import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { EventFamilyIds } from "../utility/event.js";
import type { ItemWithoutChildren } from "../utility/spirits.js";
import type { Event } from "./event.js";

/**
 * The occurrences of an event family, newest first.
 */
export type EventFamilyOccurrences = readonly [Event, ...Event[]];

export class EventFamily {
	public readonly id: EventFamilyIds;

	public readonly occurrences: EventFamilyOccurrences;

	/**
	 * The most recent occurrence, which names the family.
	 */
	public readonly latest: Event;

	/**
	 * Each name the family has gone by, newest first, against the occurrences that bore it.
	 */
	public readonly names: ReadonlyCollection<Event["name"], EventFamilyOccurrences>;

	public readonly offer: readonly ItemWithoutChildren[];

	public constructor(occurrences: EventFamilyOccurrences) {
		const [latest] = occurrences;
		const names = new Collection<Event["name"], [Event, ...Event[]]>();
		const offer: ItemWithoutChildren[] = [];

		for (const occurrence of occurrences) {
			const named = names.get(occurrence.name);

			if (named) {
				named.push(occurrence);
			} else {
				names.set(occurrence.name, [occurrence]);
			}

			offer.push(...occurrence.offer);
		}

		this.id = latest.family;
		this.occurrences = occurrences;
		this.latest = latest;
		this.names = names;
		this.offer = offer;
	}
}
