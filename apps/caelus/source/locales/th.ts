import { DailyQuest, RealmName, SeasonId, SpiritName } from "@thatskyapplication/utility";

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
			[DailyQuest.Collect30PiecesOfLight]: "เก็บแสง 30 ชิ้น",
			[DailyQuest.Light20Candles]: "จุดเทียน 20 เล่ม",
			[DailyQuest.BowAtAPlayer]: "คำนับผู้เล่น",
			[DailyQuest.WaveToAFriend]: "โบกมือให้เพื่อน",
			[DailyQuest.SendAGiftToAFriend]: "ส่งของขวัญให้เพื่อน",
			[DailyQuest.MakeANewAcquaintance]: "ผูกมิตรกับคนรู้จักใหม่",
			[DailyQuest.RechargeFromAJellyfish]: "เติมแสงของคุณจากแมงกะพรุน",
			[DailyQuest.RideWithAManta]: "ขี่กระเบน",
			[DailyQuest.ReliveASpiritsMemories]: "หวนระลึกความทรงจำของสปิริต",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"หวนระลึกความทรงจำของสปิริตในกรุสมบัติแห่งปัญญา",
			[DailyQuest.KnockOver5DarkCrabs]: "คว่าปูทมิฬ 5 ตัวขึ้นไป",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]: "ไปยังที่ซ่อนแสนสบายในถ้ำแห่งทุ่งหญ้า",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]: "ชื่นชมต้นอ่อนในป่าลับเป็นระยะเวลาสั้นๆ",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"ค้นหาเทียนที่สุดปลายสายรุ้งในทุ่งหญ้าแสงตะวัน",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"ค้นหาเทียนที่สุดปลายสายรุ้งในป่าลับ",
			[DailyQuest.CollectOrangeLight]: "เก็บแสงสีส้ม",
			[DailyQuest.CollectRedLight]: "เก็บแสงสีแดง",
			[DailyQuest.ReliveTheMantaWhisperer]: "หวนระลึกความทรงจำของผู้รู้ใจกระเบนจากหุบเขาแห่งชัยชนะ",
			[DailyQuest.ReliveTheStretchingGuru]: "หวนระลึกความทรงจำของกูรูนักยึดเหยียดจากทุ่งหญ้าแสงตะวัน",
			[DailyQuest.ReliveTheWiseGrandparent]: "หวนระลึกความทรงจำของผู้กำกับครุ่นคิดจากกรุสมบัติแห่งปัญญา",
			[DailyQuest.ReliveTheDaydreamForester]: "หวนระลึกความทรงจำของผู้ดูแลป่าเพ้อฝันจากป่าลับ",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]: "เล่นหยอกล้อกับพลเรือผู้ผ่อนปรน",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]: "พบกับ ผู้บุกเบิกเกมซ่อนหา ใน ทุ่งกระดูก",
		},
		seasons: {
			[SeasonId.Moomin]: "ฤดูกาลแห่งมูมิน",
			[SeasonId.Radiance]: "ฤดูกาลแสงเรื่องรอง",
		},
		spiritNames: {
			[SpiritName.TheMoominStorybook]: "หนังสือนิทานมูมิน",
			[SpiritName.ComfortOfKindness]: "ความใจดีที่ปลอบโยน",
			[SpiritName.SenseOfSelf]: "ความตระหนักรู้ในตัวเอ",
			[SpiritName.SpiritOfAdventure]: "สปิริตแห่งการผจญภัย",
			[SpiritName.InspirationOfInclusion]: "แรงบันดาลใจแห่งความปร",
			[SpiritName.RadianceGuide]: "ผูแนะนำแสงเรื่องรอง",
			[SpiritName.RadianceLeapingDancer]: "นักกระโดดโลดเต้นแสงเร",
			[SpiritName.RadianceProvokingPerformer]: "นักแสดงจอมยั่วยุแสงเร",
			[SpiritName.RadianceGreetingShaman]: "ชาแมนผู้อ่วยพรแสงเรือง",
		},
	},
} as const;
