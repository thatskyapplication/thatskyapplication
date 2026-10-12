import process from "node:process";
import { styleText } from "node:util";
import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { z } from "zod/v4";
import { emojiTables } from "@thatskyapplication/utility";

const bold = (text: string) => styleText("bold", text);
const cyan = (text: string) => styleText("cyan", text);
const dim = (text: string) => styleText("dim", text);
const green = (text: string) => styleText("green", text);
const red = (text: string) => styleText("red", text);
const yellow = (text: string) => styleText("yellow", text);
const TABLE_SUFFIX = "_EMOJIS" as const;
const APPLY_FLAG = "--apply" as const;
const PLACEHOLDER_ID = "0" as const;

interface Target {
	label: string;
	name: string;
}

interface Step {
	from: string;
	id: string;
	label: string;
	to: string;
}

const { DISCORD_TOKEN } = z.object({ DISCORD_TOKEN: z.string().min(1) }).parse(process.env);

function tableFlag(table: string) {
	return `--${table.slice(0, -TABLE_SUFFIX.length).toLowerCase().replaceAll("_", "-")}`;
}

function change(from: string, to: string, label: string) {
	return `${red(from)} → ${green(to)} ${dim(`(${label})`)}`;
}

const flags = process.argv.slice(2);
const apply = flags.includes(APPLY_FLAG);
const validTableFlags = new Map(
	Object.keys(emojiTables(true)).map((table) => [tableFlag(table), table]),
);
const unknownFlags = flags.filter((flag) => flag !== APPLY_FLAG && !validTableFlags.has(flag));

if (unknownFlags.length > 0) {
	throw new Error(
		`Unknown flags: ${unknownFlags.join(", ")}. Valid flags: ${APPLY_FLAG}, ${[...validTableFlags.keys()].join(", ")}.`,
	);
}

const selectedTables = new Set(
	flags.filter((flag) => validTableFlags.has(flag)).map((flag) => validTableFlags.get(flag)!),
);

const api = new API(new REST({ version: "10" }).setToken(DISCORD_TOKEN));
const applicationId = (await api.users.getCurrent()).id;
const { items } = await api.applications.getEmojis(applicationId);
const before = new Map(items.map(({ id, name }) => [id, name]));
const current = new Map(before);

const environments = [true, false].map((production) => {
	const tables = Object.entries(emojiTables(production));
	const ids = tables.flatMap(([, table]) => Object.values(table).map(({ id }) => id));
	return { matches: ids.filter((id) => current.has(id)).length, production, tables };
});

const environment = environments.toSorted((a, b) => b.matches - a.matches)[0]!;
const desired = new Map<string, Target>();
const missing = [];

for (const [table, emojis] of environment.tables) {
	if (selectedTables.size > 0 && !selectedTables.has(table)) {
		continue;
	}

	for (const [key, { id, name }] of Object.entries(emojis)) {
		if (id === PLACEHOLDER_ID) {
			continue;
		}

		if (!current.has(id)) {
			missing.push(`${table}.${key} (${id})`);
			continue;
		}

		desired.set(id, { label: `${table}.${key}`, name });
	}
}

if (missing.length > 0) {
	throw new Error(
		`These emojis are not in application ${applicationId}, so the token may belong to the other environment: ${missing.join(", ")}.`,
	);
}

const holders = new Map([...current].map(([id, name]) => [name, id]));
const wanted = new Map<string, string>();
const conflictingNames = new Set<string>();
const conflicts = [];

for (const [id, { label, name }] of desired) {
	const other = wanted.get(name);

	if (other) {
		conflictingNames.add(name);
		conflicts.push(`${name} is wanted by both ${desired.get(other)!.label} and ${label}.`);
	} else {
		wanted.set(name, id);
	}
}

const pending = new Map(
	[...desired].filter(([id, { name }]) => current.get(id) !== name && !conflictingNames.has(name)),
);

const steps: Step[] = [];

function rename(id: string, to: string) {
	const from = current.get(id)!;
	holders.delete(from);
	holders.set(to, id);
	current.set(id, to);
	steps.push({ from, id, label: desired.get(id)!.label, to });
}

function cycleMember() {
	for (const start of pending.keys()) {
		const seen = new Set<string>();
		let id: string | undefined = start;

		while (id !== undefined && pending.has(id) && !seen.has(id)) {
			seen.add(id);
			id = holders.get(pending.get(id)!.name);
		}

		if (id !== undefined && seen.has(id)) {
			return id;
		}
	}

	return null;
}

while (pending.size > 0) {
	let progressed = false;

	for (const [id, { name }] of pending) {
		if (!holders.has(name)) {
			rename(id, name);
			pending.delete(id);
			progressed = true;
		}
	}

	if (progressed) {
		continue;
	}

	const member = cycleMember();

	if (member === null) {
		break;
	}

	rename(member, `temporary_${member}`);
}

console.log(
	`Application ${applicationId} uses the ${bold(environment.production ? "production" : "development")} emoji tables.`,
);

console.log(
	selectedTables.size > 0
		? `Synchronising ${cyan([...selectedTables].join(", "))}.`
		: `Synchronising ${cyan("every emoji table")}.`,
);

if (!apply) {
	for (const { from, label, to } of steps) {
		console.log(change(from, to, label));
	}
}

for (const conflict of conflicts) {
	console.log(`${yellow("Skipped:")} ${conflict}`);
}

for (const [id, { label, name }] of pending) {
	const holder = holders.get(name)!;
	const holderLabel = desired.get(holder)?.label ?? "an emoji outside the selected tables";
	console.log(
		`${yellow("Blocked:")} ${label} (${current.get(id)}) wants ${name}, held by ${holderLabel}.`,
	);
}

console.log(
	bold(`Renames: ${steps.length}. Conflicts: ${conflicts.length}. Blocked: ${pending.size}.`) +
		(apply ? "" : dim(` Run again with ${APPLY_FLAG} to rename.`)),
);

if (apply) {
	try {
		for (const [index, { id, to }] of steps.entries()) {
			await api.applications.editEmoji(applicationId, id, { name: to });
			console.log(dim(`Renamed ${index + 1} of ${steps.length}.`));
		}
	} finally {
		const { items: refreshed } = await api.applications.getEmojis(applicationId);
		const after = new Map(refreshed.map(({ id, name }) => [id, name]));
		const expected = new Map(steps.map(({ id, to }) => [id, to]));
		const changes = [...after].filter(([id, name]) => before.get(id) !== name);
		const unexpected = changes.filter(([id, name]) => expected.get(id) !== name);

		const mismatched = [...desired].filter(
			([id, { name }]) => after.get(id) !== name && !conflictingNames.has(name) && !pending.has(id),
		);

		for (const [id, name] of changes) {
			console.log(
				change(
					before.get(id) ?? "(new)",
					name,
					desired.get(id)?.label ?? "outside the selected tables",
				),
			);
		}

		for (const [id, name] of unexpected) {
			console.log(`${red("Unexpected:")} ${before.get(id) ?? "(new)"} became ${name}.`);
		}

		for (const [id, { label, name }] of mismatched) {
			console.log(
				`${red("Not matching the code:")} ${label} is ${after.get(id)}, expected ${name}.`,
			);
		}

		console.log(
			bold(
				`Changed on Discord: ${changes.length}. Unexpected: ${unexpected.length}. Not matching the code: ${mismatched.length}.`,
			),
		);

		if (unexpected.length > 0 || mismatched.length > 0) {
			process.exitCode = 1;
		}
	}
}

if (conflicts.length > 0 || pending.size > 0) {
	process.exitCode = 1;
}
