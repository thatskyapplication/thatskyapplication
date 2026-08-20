import { EventId, ScheduleType, type ScheduleTypes } from "@thatskyapplication/utility";

export const NESTING_WORKSHOP_CATALOGUE_URL = "/me/catalogue?view=nesting-workshop" as const;

export const SCHEDULE_TYPE_TO_WIKI_KEY: Readonly<Partial<Record<ScheduleTypes, string>>> = {
	[ScheduleType.InternationalSpaceStation]:
		"features:schedule.detailed-breakdown-international-space-station-wiki-button-url",
	[ScheduleType.PollutedGeyser]:
		"features:schedule.detailed-breakdown-polluted-geyser-wiki-button-url",
	[ScheduleType.Grandma]: "features:schedule.detailed-breakdown-grandma-wiki-button-url",
	[ScheduleType.Turtle]: "features:schedule.detailed-breakdown-turtle-wiki-button-url",
	[ScheduleType.DreamsSkater]: "features:schedule.detailed-breakdown-dreams-skater-wiki-button-url",
	[ScheduleType.AURORA]: "features:schedule.detailed-breakdown-aurora-wiki-button-url",
	[ScheduleType.Passage]: "features:schedule.detailed-breakdown-passage-wiki-button-url",
	[ScheduleType.AviarysFireworkFestival]: `general:event-wiki.${EventId.AviarysFireworkFestival2023}`,
	[ScheduleType.NestingWorkshop]:
		"features:schedule.detailed-breakdown-nesting-workshop-wiki-button-url",
	[ScheduleType.VaultEldersBlessing]:
		"features:schedule.detailed-breakdown-vault-elders-blessing-wiki-button-url",
	[ScheduleType.ProjectorOfMemories]:
		"features:schedule.detailed-breakdown-projector-of-memories-wiki-button-url",
	[ScheduleType.ReturningSpirits]:
		"features:schedule.detailed-breakdown-returning-spirits-wiki-button-url",
};
