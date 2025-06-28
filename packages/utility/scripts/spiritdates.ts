import { readdir, readFile, writeFile } from "node:fs/promises";
import { URL } from "node:url";
import { TRAVELLING_DATES } from "../source/index.js";
import enGb from "../source/locales/en-gb.js";

for (const [index, { spiritId, start, end }] of TRAVELLING_DATES) {
	const spiritName = enGb.general.spirits[spiritId];
	const filename = `${spiritName.toLowerCase().replace(/ /g, "-")}.ts`;

	const seasonsDirectory = await readdir(new URL("../source/spirits/seasons", import.meta.url), {
		recursive: true,
	});
	const spiritPathInSeasons = seasonsDirectory.find((spirit) => spirit.endsWith(`/${filename}`));

	if (!spiritPathInSeasons) {
		throw new Error(`Spirit ${spiritName} not found in seasons directory.`);
	}

	const spiritPath = new URL(`../source/spirits/seasons/${spiritPathInSeasons}`, import.meta.url);
	const spiritFile = await readFile(spiritPath, { encoding: "utf-8" });
	const lines = spiritFile.split("\n");
	const lineIndex = lines.findIndex((line) => line.includes("travelling:"));

	if (lineIndex === -1) {
		throw new Error(`Travelling dates not found for spirit ${spiritName}.`);
	}

	lines.splice(
		lineIndex,
		1,
		lines[lineIndex]!.replace(
			String(index),
			`{ start: skyDate(${start.year}, ${start.month}, ${start.day}${start.hour === 0 ? "" : `, ${start.hour}`}), end: skyDate(${end.year}, ${end.month}, ${end.day}${end.hour === 0 ? "" : `, ${end.hour}`}) }`,
		),
	);

	if (lines[0] !== `import { skyDate } from "../../../dates.js";`) {
		lines.splice(0, 0, `import { skyDate } from "../../../dates.js";`);
	}

	await writeFile(spiritPath, lines.join("\n"));
}
