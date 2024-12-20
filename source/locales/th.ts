import { SeasonId } from "../utility/catalogue.js";
import { DailyQuest, RealmName } from "../utility/constants.js";
import { SpiritName } from "../utility/spirits.js";

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
		quests: {
			[DailyQuest.RechargeFromAJellyfish]: "เติมแสงของคุณจากแมงกะพรุน",
			[DailyQuest.RideWithAManta]: "ขี่กระเบน",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]: "ไปยังที่ช่อนแสนสบายในถ้ำแห่งทุ่งหญ้า",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]: "ชื่นชมต้นอ่อนในป่าลับเป็นระยะเวลาสั้นๆ",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"ค้นหาเทียนที่สุดปลายสายรุ้งในทุ่งหญ้าแสงตะวัน",
			[DailyQuest.CollectOrangeLight]: "เก็บแสงสีส้ม",
			[DailyQuest.ReliveTheStretchingGuru]: "หวนระลึกความทรงจำของกูรูนักยึดเหยียดจากทุ่งหญ้าแสงตะวัน",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]: "พบกับ ผู้บุกเบิกเกมซ่อนหา ใน ทุ่งกระดูก",
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
