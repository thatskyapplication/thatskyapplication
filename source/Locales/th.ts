import { SeasonName } from "../Utility/catalogue.js";
import { SpiritName } from "../Utility/spirits.js";

export default {
	general: {
		seasons: {
			[SeasonName.Moomin]: "ฤดูกาลแห่งมูมิน",
		},
		spiritNames: {
			[SpiritName.TheMoominStorybook]: "หนังสือนิทานมูมิน",
			[SpiritName.ComfortOfKindness]: "ความใจดีที่ปลอบโยน",
			[SpiritName.SenseOfSelf]: "ความตระหนักรู้ในตัวเอ",
			[SpiritName.SpiritOfAdventure]: "สปิริตแห่งการผจญภัย",
			[SpiritName.InspirationOfInclusion]: "แรงบันดาลใจแห่งความปร",
		},
	},
} as const;
