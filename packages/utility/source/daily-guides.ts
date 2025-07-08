export interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	travelling_rock: string | null;
}

export interface DailyGuideQuest {
	id: number;
	url: string | null;
}
