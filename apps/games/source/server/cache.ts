export interface InFlight {
	readonly cancelled: boolean;
}

interface Pending<Value> {
	state: { cancelled: boolean };
	value: Promise<Value>;
}

export class Coalescer<Value> {
	private readonly pending = new Map<string, Pending<Value>>();

	public run(key: string, task: (inFlight: InFlight) => Promise<Value>) {
		const existing = this.pending.get(key);

		if (existing !== undefined) {
			return existing.value;
		}

		const state = { cancelled: false };

		const value = task(state).finally(() => {
			if (this.pending.get(key)?.state === state) {
				this.pending.delete(key);
			}
		});

		this.pending.set(key, { state, value });
		return value;
	}

	public has(key: string) {
		return this.pending.has(key);
	}

	public cancel(key: string) {
		const existing = this.pending.get(key);

		if (existing === undefined) {
			return;
		}

		existing.state.cancelled = true;
		this.pending.delete(key);
	}
}

export function touch<Key, Value>(entries: Map<Key, Value>, key: Key) {
	const value = entries.get(key);

	if (value === undefined) {
		return undefined;
	}

	entries.delete(key);
	entries.set(key, value);
	return value;
}

export function store<Key, Value>(
	entries: Map<Key, Value>,
	key: Key,
	value: Value,
	maximum: number,
	retain?: (key: Key, value: Value) => boolean,
) {
	entries.delete(key);
	entries.set(key, value);

	if (retain !== undefined) {
		evict(entries, key, maximum, retain);
	}

	evict(entries, key, maximum);
}

function evict<Key, Value>(
	entries: Map<Key, Value>,
	stored: Key,
	maximum: number,
	retain?: (key: Key, value: Value) => boolean,
) {
	for (const [key, value] of entries) {
		if (entries.size <= maximum) {
			break;
		}

		if (key !== stored && retain?.(key, value) !== true) {
			entries.delete(key);
		}
	}
}
