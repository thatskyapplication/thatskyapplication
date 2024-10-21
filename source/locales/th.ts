import { RealmName } from "../Utility/Constants.js";
import { SeasonId } from "../Utility/catalogue.js";
import { SpiritName } from "../Utility/spirits.js";

export default {
	general: {
		realms: {
			[RealmName.IslesOfDawn]: "เกาะรุ่งอรุณ",
			[RealmName.DaylightPrairie]: "ทุ่งหญ้าแสงตะวัน",
			[RealmName.HiddenForest]: "ป่าลับ",
			[RealmName.ValleyOfTriumph]: "หุบเขาแห่งชัยชนะ",
			[RealmName.GoldenWasteland]: "แดนร้างทองอร่าม",
			[RealmName.VaultOfKnowledge]: "กรุสมบัติแห่งปัญญา",
			[RealmName.EyeOfEden]: "ดวงตาแห่งเอเดน",
		},
		seasons: {
			[SeasonId.Moomin]: "ฤดูกาลแห่งมูมิน",
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
