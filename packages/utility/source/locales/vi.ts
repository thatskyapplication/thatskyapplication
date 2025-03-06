import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		realms: {
			[RealmName.IslesOfDawn]: "Đảo Bình Minh",
			[RealmName.DaylightPrairie]: "Thảo Nguyên Ánh Sáng",
			[RealmName.HiddenForest]: "Rừng Mưa",
			[RealmName.ValleyOfTriumph]: "Thung Lũng Vinh Quang",
			[RealmName.GoldenWasteland]: "Hoang Mạc Hoàng Kim",
			[RealmName.VaultOfKnowledge]: "Kho Tri Thức",
			[RealmName.EyeOfEden]: "Mắt Địa Đàng",
		},
		maps: { [SkyMap.JellyfishCove]: "Vịnh Sứa" },
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Thu thập 30 Mảnh Ánh Sáng",
			[DailyQuest.Light20Candles]: "Thắp 20 ngọn nến",
			[DailyQuest.ForgeACandle]: "Ngưng tụ 1 cây nến",
			[DailyQuest.Melt10Darkness]: "Tịnh hóa 10 Bóng Tối",
			[DailyQuest.BowAtAPlayer]: "Cúi chào mt người chơi",
			[DailyQuest.FollowAFriend]: "Đi theo một người bạn",
			[DailyQuest.HugAFriend]: "Ôm một người bạn",
			[DailyQuest.WaveToAFriend]: "Vẫy tay với một người bạn",
			[DailyQuest.HoldAFriendsHand]: "Nắm tay một người bạn",
			[DailyQuest.SendAGiftToAFriend]: "Tặng quà cho một người bạn",
			[DailyQuest.MakeANewAcquaintance]: "Thêm bạn mới",
			[DailyQuest.HighFiveAFriend]: "Đập tay một người bạn",
			[DailyQuest.UseAnExpressionNearAFriend]: "Dùng biểu tượng cảm xúc với một người bạn",
			[DailyQuest.SitOnABenchWithAStranger]: "Ngồi ở ghế dài với một người lạ",
			[DailyQuest.RechargeFromAJellyfish]: "Nạp Ánh Sáng từ sứa",
			[DailyQuest.RechargeFromALightBloom]: "Nạp Ánh Sáng từ đóa hoa",
			[DailyQuest.RideWithAManta]: "Cưỡi cùng Cá Đuối",
			[DailyQuest.ReliveASpiritsMemories]: "Hồi tưởng lại ký ức của một Tinh Linh",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Hồi tưởng lại ký ức của một Tinh Linh ở Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Hồi tưởng lại ký ức của một Tinh Linh ở Rừng Mưa",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Hồi tưởng lại ký ức của một Tinh Linh ở Thung Lũng Vinh Quang",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Hồi tưởng lại ký ức của một Tinh Linh ở Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Hồi tưởng lại ký ức của một Tinh Linh ở Kho Tri Thức",
			[DailyQuest.FaceTheDarkDragon]: "Đối mặt với Rồng Hắc Ám",
			[DailyQuest.KnockOver5DarkCrabs]: "Lật ngửa 5 con Cua Bóng Đêm",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Bắt lấy Ánh Sáng ở Thảo Nguyên Ánh Sáng",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Bắt lấy Ánh Sáng ở Rừng Mưa",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Bắt lấy Ánh Sáng ở Thung Lũng Vinh Quang",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Bắt lấy Ánh Sáng ở Hoang Mạc Hoàng Kim",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Bắt lấy Ánh Sáng ở Kho Tri Thức",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Ghé thăm nơi ẩn náu ấm cúng ở Thảo Nguyên Ánh Sáng",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Ghé thăm Bàn Sở Hữu của Tổ tiên ở nơi cao của Rừng Mưa",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]: "Ghé thăm Suối nước nóng ở Làng Giấc Mơ",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]:
				"Tham quan lửa trại tại nghĩa địa ở Hoang Mạc Hoàng Kim",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]:
				"Ngắm cây non ở Thảo Nguyên Ánh Sáng trong thời gian ngắn",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]:
				"Ngắm cây non ở Rừng Mưa trong thời gian ngắn",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"Ngắm cây non ở Thung Lũng Vinh Quang trong thời gian ngắn",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"Ngắm cây non ở Hoang Mạc Hoàng Kim trong thời gian ngắn",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"Ngắm cây non ở Kho Tri Thức trong thời gian ngắn",
			[DailyQuest.VisitThePollutedGeyser]: "Ghé thăm mạch nước phun ô nhiễm ở Quần Đảo Thánh Địa",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Thoát khỏi Dòng Xoáy Bóng Tối của Thánh Địa",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Tìm những ngọn nến ở cuối cầu vồng ở Thảo Nguyên Ánh Sáng",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Tìm những ngọn nến ở cuối câu vồng ở Rừng Mưa",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Tìm những ngọn nến ở cuối cầu vồng ở Thung Lũng Vinh Quang",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Tìm những ngọn nến ở cuối cầu vồng ở Hoang Mạc Hoàng Kim",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Tìm những ngọn nến ở cuối cầu vồng ở Kho Tri Thức",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]:
				"Chiêm ngưỡng cầu vồng ở Quần Đảo Thánh Địa trong giây lát",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]:
				"Chiêm ngưỡng cầu vồng ở Con Đường Gió trong giây lát",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]:
				"Chiêm ngưỡng cầu vồng ở Thung Lũng Ẩn Sĩ trong giây lát",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]:
				"Chiêm ngưỡng cầu vồng ở Rạn San Hô Kho Báu trong giây lát",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]:
				"Chiêm ngưỡng cầu vồng ở Hoang Mạc Ánh Sao trong giây lát",
			[DailyQuest.MeditateAtTheBirdNest]: "Ngồi thiền ở ngôi đền tổ chim trong Thảo Nguyên",
			[DailyQuest.MeditateInTheButterflyFields]: "Ngồi thiền ở cánh đồng bướm trong Thảo Nguyên",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Ngồi thiền ở Quần Đảo Thánh Địa",
			[DailyQuest.MeditateInTheCave]: "Ngồi thiền ở ngôi đền hang động trong Thảo Nguyên",
			[DailyQuest.MeditateByTheKoiPond]: "Ngồi thiền ở hồ cá koi trong Thảo Nguyên",
			[DailyQuest.MeditateAtTheForestClearing]: "Ngồi thiền ở khu đất trống trong Rừng Mưa",
			[DailyQuest.MeditateAtTheForestBrook]: "Ngồi thiền ở cạnh suối trong Rừng Mưa",
			[DailyQuest.MeditateAtTheElevatedClearing]: "Ngồi thiền ở chỗ cao trong Rừng Mưa Bí Ấn",
			[DailyQuest.MeditateAtTheForestEnd]: "Ngồi thiền ở cuối Rừng Mưa",
			[DailyQuest.MeditateAtTheBoneyard]: "Ngồi thiền ở khu chôn cất trong Rừng Mưa",
			[DailyQuest.MeditateByTheIceRink]: "Ngồi thiền ở sân băng trong Thung Lũng",
			[DailyQuest.MeditateAboveTheCitadelsArch]: "Ngồi thiền ở trên vòm lâu đài trong Thung Lũng",
			[DailyQuest.MeditateHighAboveTheCitadel]:
				"Ngồi thiền ở tầng cao của lâu đài trong Thung Lũng",
			[DailyQuest.MeditateAtTheColiseum]: "Ngồi thiền ở điểm cuối cuộc đua",
			[DailyQuest.MeditateInTheBrokenTemple]: "Ngồi thiền trong ngồi đền cũ",
			[DailyQuest.MeditateInTheForgottenArk]: "Ngồi thiền trong Hòm Lãng Quên",
			[DailyQuest.MeditateInTheGraveyard]: "Ngồi thiền trong nghĩa địa",
			[DailyQuest.MeditateOnTheBoat]: "Ngồi thiền trên thuyền",
			[DailyQuest.MeditateOnTheBattlefield]: "Ngồi thiền trên chiến trường",
			[DailyQuest.MeditateAtTheVaultEntrance]: "Ngồi thiền ở lối vào Kho Tri Thức",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Ngồi thiền ở tầng 2 Kho Tri Thức",
			[DailyQuest.MeditateAtTheVaultSummit]: "Ngồi thiền ở tầng trên cùng Kho Tri Thức",
			[DailyQuest.CollectGreenLight]: "Thu thập Ánh Sáng Lục",
			[DailyQuest.CollectOrangeLight]: "Thu thập Ánh Sáng Cam",
			[DailyQuest.CollectBlueLight]: "Thu thập Ánh Sáng Lam",
			[DailyQuest.CollectRedLight]: "Thu thập Ánh Sáng Đỏ",
			[DailyQuest.CollectPurpleLight]: "Thu thập Ánh Sáng Tím",
			[DailyQuest.PracticeWithTheSkater]: "Luyện tập với vận động viên trượt băng ở Làng Giấc Mơ",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Đua xuống dốc với vận động viên trượt băng ở Làng Giấc Mơ",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Đua xuống núi với vận động viên trượt băng ở Thung Lũng Hermit",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Tập dượt cho buổi biểu diễn với vận động viên trượt băng ở Đấu Trường",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Hoàn thành cuộc tìm kiếm vòng gỗ",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Hồi tưởng lại ký ức của Người Dụ Bướm đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Hồi tưởng lại ký ức của Thợ Đồng Hồ Vỗ Tay đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Hồi tưởng lại ký ức của Thợ Chuông Vẫy Tay từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Hồi tưởng lại ký ức của Thợ Đóng Tàu Ngủ Gật ở Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Hồi tưởng lại ký ức của Nông Dân Vui Vẻ đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Chim đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Hồi tưởng lại ký ức của Người Đóng Tàu Mệt Mỏi đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Hồi tưởng lại ký ức của Người Khai Hoang Run Rẩy đến từ Rừng Mưa",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Hồi tưởng lại ký ức của Người Khai Thác Nhút Nhát đến từ Rừng Mưa",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Hồi tưởng lại ký ức của Người Khai Hoang Trốn Tìm đến từ Rừng Mưa",
			[DailyQuest.ReliveThePoutyPorter]:
				"Hồi tưởng lại ký ức của Người Khuân Vác Ghen Tỵ đến từ Rừng Mưa",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Hồi tưởng lại ký ức của Thợ Săn Thất Vọng đến từ Rừng Mưa",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Hồi tưởng lại ký ức của Thợ Rừng Có Lỗi đến từ Rừng Mưa",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Hồi tưởng lại ký ức của Thợ Mỏ Bi Thương đến từ Rừng Mưa",
			[DailyQuest.ReliveTheWhaleWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Cá Voi đến từ Rừng Mưa",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Hồi tưởng lại ký ức của Người Ngắm Cảnh Tự Tin đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Hồi tưởng lại ký ức của Vận Động Viên Lộn Ngược đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Cá Đuối đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Hồi tưởng lại ký ức của Quán Quân Nhào Lộn đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Hồi tưởng lại ký ức của Khán Giả Cổ Vũ đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Hồi tưởng lại ký ức của Quý Quân Cúi Đầu đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheProudVictor]:
				"Hồi tưởng lại ký ức của Quán Quân Tự Hào đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Hồi tưởng lại ký ức của Dân Tị Nạn Sợ Hãi đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Hồi tưởng lại ký ức của Chiến Sĩ Ngất Xỉu đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Hồi tưởng lại ký ức của Người Lính Dũng Cảm đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Hồi tưởng lại ký ức của Người Sống Sót Ẩn Dật đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Hồi tưởng lại ký ức của Thuyền Trưởng Cúi Chào đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheLookoutScout]:
				"Hồi tưởng lại ký ức của Hướng Đạo Sinh Nhìn Xa đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Hồi tưởng lại ký ức của Thánh Đồ Cầu Nguyện đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Hồi tưởng lại ký ức của Cao Nhân Khí Công đến từ Kho Tri Thức",
			[DailyQuest.ReliveThePoliteScholar]:
				"Hồi tưởng lại ký ức của Học Giả Lịch Sự đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Ký Ức đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Hồi tưởng lại ký ức của Viện Sĩ Thiền Tu đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Hồi tưởng lại ký ức của Sư Phụ Giãn Cơ đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Hồi tưởng lại ký ức của Người Biểu Diễn Khiêu Khích đến từ Rừng Mưa",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Hồi tưởng lại ký ức của Vũ Công Nhảy Nhót đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Hồi tưởng lại ký ức của Hộ Vệ Cúi Chào đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Hồi tưởng lại ký ức của Pháp Sư Chào Hỏi đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Hồi tưởng lại ký ức của Nông Dân Đập Tay đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Hồi tưởng lại ký ức của Người Tiên Phong Ung Dung đến từ Rừng Mưa",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Hồi tưởng lại ký ức của Nhà Vô Địch Xoay Tròn đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Cua đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Hồi tưởng lại ký ức của Học Giả Ánh Sáng đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Hồi tưởng lại ký ức của Em Họ Pháo Hoa Giấy đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Hồi tưởng lại ký ức của Thanh Niên Tóc Bồng đến từ Rừng Mưa",
			[DailyQuest.ReliveTheSparklerParent]:
				"Hồi tưởng lại ký ức của Phụ Huynh Pháo Hoa đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveThePleafulParent]:
				"Hồi tưởng lại ký ức của Phụ Huynh Nài Nỉ đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Hồi tưởng lại ký ức của Biên Đạo Trầm Tư đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Hồi tưởng lại ký ức của Vũ Công Xoay Tròn đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Hồi tưởng lại ký ức của Diễn Viên Đáng Ngưỡng Mộ đến từ Rừng Mưa",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Hồi tưởng lại ký ức của Người Tung Hứng Bóng đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Hồi tưởng lại ký ức của Nghệ Sĩ Piano Đáng Kính đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Hồi tưởng lại ký ức của Biên Đạo Trầm Tư đến từ Kho Tri Thức",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Hồi tưởng lại ký ức của Nhà Bích Họa Gật Đầu đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Hồi tưởng lại ký ức của Thuật Sĩ Lạnh Lùng đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheCrabWalker]:
				"Hồi tưởng lại ký ức của Vũ Công Cua đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Hồi tưởng lại ký ức của Nông Dân Bù Nhìn đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Hồi tưởng lại ký ức của Thợ Mộc Ngủ Gật đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Hồi tưởng lại ký ức của Nhà Thảo Dược Tâm Trạng đến từ Hoang Mạc Hoàng Kim",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Hồi tưởng lại ký ức của Người Luyện Sứa đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Hồi tưởng lại ký ức của Mọt Sách Nhút Nhát đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Hồi tưởng lại ký ức của Vận Động Viên Nhiệt Huyết đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Hồi tưởng lại ký ức của Nhà Leo Núi Cố Chấp đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Hồi tưởng lại ký ức của Nhà Sưu Tầm Biết Ơn đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheChillSunbather]:
				"Hồi tưởng lại ký ức của Người Tắm Nắng đến từ Thảo Nguyên Ánh Sáng",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Hồi tưởng lại ký ức của Đại Sư Xoay Tròn đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Hồi tưởng lại ký ức của Nghệ Nhân Khiêu Vũ đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveThePeekingPostman]:
				"Hồi tưởng lại ký ức của Người Đưa Thư Nhìn Trộm đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Hồi tưởng lại ký ức của Tu Sĩ Gấu Ôm đến từ Thung Lũng Vinh Quang",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Hồi tưởng lại ký ức của Nhà Thực Vật Bàng Hoàng đến từ Rừng Mưa",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Hồi tưởng lại ký ức của Đội Trưởng Quản Lý đến từ Rừng Mưa",
			[DailyQuest.ReliveTheScaredyCadet]:
				"Hồi tưởng lại ký ức của Học Viên Nhát Gan đến từ Rừng Mưa",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Hồi tưởng lại ký ức của Nhà Mạo Hiểm Diễu Hành đến từ Rừng Mưa",
			[DailyQuest.ReliveTheChucklingScout]:
				"Hồi tưởng lại ký ức của Hướng Đạo Sinh Khúc Khích đến từ Rừng Mưa",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Hồi tưởng lại ký ức của Người Đi Rừng Mộng Du đến từ Rừng Mưa",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Gặp một mảnh vỡ bóng tối rơi xuống Vương quốc Sky",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Tự chụp hình với Nhà Leo Núi Cố Chấp ở Đỉnh Thảo Nguyên",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Tự chụp hình với Người Luyện Cua ở Đỉnh Thảo Nguyên",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Tự chụp hình với Xạ Thủ Vui Nhộn ở Đỉnh Thảo Nguyên",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Tự chụp hình với Nhân Viên Đón Khách ở Đỉnh Thảo Nguyên",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Gặp gỡ Cinnamoroll trên một ngọn đồi ở Làng Chuồng Chim",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Thưởng thức hương hoa cùng Cinnamoroll ở Làng Chuồng Chim",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Tìm Cinnamoroll đang ẩn quanh Làng Chuồng Chim",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Đánh thức Cinnamoroll ở Làng Chuồng Chim",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Bay lên tòa tháp cùng Cinnamoroll ở Làng Chuồng Chim",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Hãy té nước cùng Cinnamoroll tại Làng Chuồng Chim",
			[DailyQuest.PlayAnyTournamentSport]: "Tham gia bất kỳ trò chơi nào trong Giải đấu",
			[DailyQuest.ChangeYourHairstyle]: "Thay kiểu tóc",
			[DailyQuest.ChangeYourNecklace]: "Thay đổi vòng cổ của bạn",
			[DailyQuest.ChangeYourProp]: "Thay đổi đạo cụ của bạn",
			[DailyQuest.ChangeYourMask]: "Thay mặt nạ",
			[DailyQuest.ChangeYourCape]: "Thay áo choàng",
			[DailyQuest.ChangeYourOutfit]: "Thay quần",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Xem Ký Ức Chung tại một ngôi đền thời trang",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Ghi lại Ký Ức Chung tại một ngôi đền thời trang",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
				"Chơi một trò đùa với Thuyền Trưởng Uy Nghiêm",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Gặp gỡ Người Khai Hoang Trốn Tìm trong Nghĩa Địa",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Giúp Xạ Thủ Vui Nhộn hoặc Hướng Đạo Sinh Khúc Khích tìm kho báu tại Quần Đảo Thánh Địa",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Giúp Thủy Thủ Hậu Đậu hoặc Người Dẫn Đoàn tìm kho báu tại Rừng Mưa",
			[DailyQuest.HelpCeasingCommodoreOrDaydreamForesterFindTreasureInVillageOfDreams]:
				"Giúp Thuyền Trưởng Uy Nghiêm hoặc Người Đi Rừng Mộng Du tìm kho báu tại Làng Giấc Mơ",
		},
		seasons: {
			[SeasonId.Gratitude]: "Mùa Tri Ân",
			[SeasonId.Lightseekers]: "Mùa Ánh Sáng",
			[SeasonId.Belonging]: "Mùa Sở Hữu",
			[SeasonId.Rhythm]: "Mùa Nhịp Điệu",
			[SeasonId.Enchantment]: "Mùa Phép Thuật",
			[SeasonId.Sanctuary]: "Mùa Thánh Đảo",
			[SeasonId.Prophecy]: "Mùa Tiên Tri",
			[SeasonId.Dreams]: "Mùa Giấc Mơ",
			[SeasonId.Assembly]: "Mùa Tụ Hội",
			[SeasonId.LittlePrince]: "Mùa Hoàng Tử Bé",
			[SeasonId.Flight]: "Mùa Bay Lượn",
			[SeasonId.Abyss]: "Mùa Vực Sâu",
			[SeasonId.Performance]: "Mùa Biểu Diễn",
			[SeasonId.Shattering]: "Mùa Tan Vỡ",
			[SeasonId.AURORA]: "Mùa AURORA",
			[SeasonId.Remembrance]: "Mùa Tưởng Nhớ",
			[SeasonId.Passage]: "Mùa Thử Thách",
			[SeasonId.Moments]: "Mùa Khoảnh Khắc",
			[SeasonId.Revival]: "Mùa Phục Hưng",
			[SeasonId.NineColouredDeer]: "Mùa Cửu Sắc Lộc",
			[SeasonId.Nesting]: "Mùa Xây Tổ",
			[SeasonId.Duets]: "Mùa Song Tấu",
			[SeasonId.Moomin]: "Mùa Moomin",
			[SeasonId.Radiance]: "Mùa Rạng Rỡ",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "Thợ Nến Dẫn Đường",
			[SpiritId.UsheringStargazer]: "Nhà Thiên Văn Dẫn Đường",
			[SpiritId.RejectingVoyager]: "Hành Giả Từ Chối",
			[SpiritId.ElderOfTheIsle]: "Trưởng Lão Đảo",
			[SpiritId.ButterflyCharmer]: "Người Dụ Bướm",
			[SpiritId.ApplaudingBellmaker]: "Thợ Đồng Hồ Vỗ Tay",
			[SpiritId.WavingBellmaker]: "Thợ Chuông Vẫy Tay",
			[SpiritId.SlumberingShipwright]: "Thợ Đóng Tàu Ngủ Gật",
			[SpiritId.LaughingLightCatcher]: "Nông Dân Vui Vẻ",
			[SpiritId.BirdWhisperer]: "Người Luyện Chim",
			[SpiritId.ExhaustedDockWorker]: "Người Đóng Tàu Mệt Mỏi",
			[SpiritId.CeremonialWorshiper]: "Cố Vấn Nghi Lễ",
			[SpiritId.ElderOfThePrairie]: "Trưởng Lão Thảo Nguyên",
			[SpiritId.ShiveringTrailblazer]: "Người Khai Hoang Run Rẩy",
			[SpiritId.BlushingProspector]: "Người Khai Thác Nhút Nhát",
			[SpiritId.HideNSeekPioneer]: "Người Khai Hoang Trốn Tìm",
			[SpiritId.PoutyPorter]: "Người Khuân Vác Ghen Tỵ",
			[SpiritId.DismayedHunter]: "Thợ Săn Thất Vọng",
			[SpiritId.ApologeticLumberjack]: "Thợ Rừng Có Lỗi",
			[SpiritId.TearfulLightMiner]: "Thợ Mỏ Bi Thương",
			[SpiritId.WhaleWhisperer]: "Người Luyện Cá Voi",
			[SpiritId.ElderOfTheForest]: "Trưởng Lão Rừng Mưa",
			[SpiritId.ConfidentSightseer]: "Người Ngắm Cảnh Tự Tin",
			[SpiritId.HandstandingThrillseeker]: "Vận Động Viên Lộn Ngược",
			[SpiritId.MantaWhisperer]: "Người Luyện Cá Đuối",
			[SpiritId.BackflippingChampion]: "Quán Quân Nhào Lộn",
			[SpiritId.CheerfulSpectator]: "Khán Giả Cổ Vũ",
			[SpiritId.BowingMedalist]: "Quý Quân Cúi Đầu",
			[SpiritId.ProudVictor]: "Quán Quân Tự Hào",
			[SpiritId.ElderOfTheValley]: "Trưởng Lão Thung Lũng",
			[SpiritId.FrightenedRefugee]: "Dân Tị Nạn Sợ Hãi",
			[SpiritId.FaintingWarrior]: "Chiến Sĩ Ngất Xỉu",
			[SpiritId.CourageousSoldier]: "Người Lính Dũng Cảm",
			[SpiritId.StealthySurvivor]: "Người Sống Sót Ẩn Dật",
			[SpiritId.SalutingCaptain]: "Thuyền Trưởng Cúi Chào",
			[SpiritId.LookoutScout]: "Hướng Đạo Sinh Nhìn Xa",
			[SpiritId.ElderOfTheWasteland]: "Trưởng Lão Hoang Mạc",
			[SpiritId.PrayingAcolyte]: "Thánh Đồ Cầu Nguyện",
			[SpiritId.LevitatingAdept]: "Cao Nhân Khí Công",
			[SpiritId.PoliteScholar]: "Học Giả Lịch Sự",
			[SpiritId.MemoryWhisperer]: "Người Luyện Ký Ức",
			[SpiritId.MeditatingMonastic]: "Viện Sĩ Thiền Tu",
			[SpiritId.ElderOfTheVault]: "Trưởng Lão Kho",
			[SpiritId.GratitudeGuide]: "Chỉ Dẫn Tri Ân",
			[SpiritId.SassyDrifter]: "Kẻ Lang Thang Phóng Túng",
			[SpiritId.StretchingGuru]: "Sư phụ Guru",
			[SpiritId.ProvokingPerformer]: "Người Biểu Diễn Khiêu Khích",
			[SpiritId.LeapingDancer]: "Vũ Công Nhảy Nhót",
			[SpiritId.SalutingProtector]: "Hộ Vệ Cúi Chào",
			[SpiritId.GreetingShaman]: "Pháp Sư Chào Hỏi",
			[SpiritId.LightseekerGuide]: "Chỉ Dẫn Ánh Sáng",
			[SpiritId.PiggybackLightseeker]: "Người Tìm Ánh Sáng",
			[SpiritId.DoublefiveLightCatcher]: "Nông Dân Đập Tay",
			[SpiritId.LaidbackPioneer]: "Người Khai Hoang Tùy Tiện",
			[SpiritId.TwirlingChampion]: "Nhà Vô Địch Xoay Tròn",
			[SpiritId.CrabWhisperer]: "Người Luyện Cua",
			[SpiritId.ShushingLightScholar]: "Học Giả Ánh Sáng",
			[SpiritId.BelongingGuide]: "Chỉ Dẫn Sở Hữu",
			[SpiritId.BoogieKid]: "Đứa Trẻ Nhảy Nhót",
			[SpiritId.ConfettiCousin]: "Anh Em Giấy Màu",
			[SpiritId.HairtousleTeen]: "Thanh Niên Tóc Bồng",
			[SpiritId.SparklerParent]: "Phụ Huynh Pháo Hoa",
			[SpiritId.PleafulParent]: "Phụ Huynh Vui Vẻ",
			[SpiritId.WiseGrandparent]: "Trưởng Lão Thông Thái",
			[SpiritId.RhythmGuide]: "Chỉ Dẫn Nhịp Điệu",
			[SpiritId.TroupeGreeter]: "Nhân Viên Đón Khách",
			[SpiritId.FestivalSpinDancer]: "Vũ Công Xoay Tròn",
			[SpiritId.AdmiringActor]: "Diễn Viên Đáng Ngưỡng Mộ",
			[SpiritId.TroupeJuggler]: "Người Tongue Hứng Bóng",
			[SpiritId.RespectfulPianist]: "Nghệ Sĩ Piano Đáng Kính",
			[SpiritId.ThoughtfulDirector]: "Biên Đạo Trầm Tư",
			[SpiritId.EnchantmentGuide]: "Chỉ Dẫn Phép Thuật",
			[SpiritId.NoddingMuralist]: "Nhà Bích Họa Gật Đầu",
			[SpiritId.IndifferentAlchemist]: "Thuật Sĩ Lạnh Lùng",
			[SpiritId.CrabWalker]: "Vũ Công Cua",
			[SpiritId.ScarecrowFarmer]: "Nông Dân Bù Nhìn",
			[SpiritId.SnoozingCarpenter]: "Thợ Mộc Ngủ Gật",
			[SpiritId.PlayfightingHerbalist]: "Nhà Thảo Dược Tâm Trạng",
			[SpiritId.SanctuaryGuide]: "Chỉ Dẫn Thánh Đảo",
			[SpiritId.JellyWhisperer]: "Người Luyện Sứa",
			[SpiritId.TimidBookworm]: "Mọt Sách Nhút Nhát",
			[SpiritId.RallyingThrillseeker]: "Vận Động Viên Nhiệt Huyết",
			[SpiritId.HikingGrouch]: "Nhà Leo Núi Cố Chấp",
			[SpiritId.GratefulShellCollector]: "Nhà Sưu Tầm Biết Ơn",
			[SpiritId.ChillSunbather]: "Người Tắm Nắng",
			[SpiritId.ProphecyGuide]: "Chỉ Dẫn Tiên Tri",
			[SpiritId.ProphetOfWater]: "Tiên Tri Nước",
			[SpiritId.ProphetOfEarth]: "Tiên Tri Đất",
			[SpiritId.ProphetOfAir]: "Tiên Tri Không Khí",
			[SpiritId.ProphetOfFire]: "Tiên Tri Lửa",
			[SpiritId.DreamsGuide]: "Chỉ Dẫn Giấc Mơ",
			[SpiritId.SpinningMentor]: "Đại Sư Xoay Tròn",
			[SpiritId.DancingPerformer]: "Nghệ Nhân Khiêu Vũ",
			[SpiritId.PeekingPostman]: "Người Đưa Thư Nhìn Trộm",
			[SpiritId.BearhugHermit]: "Tu Sĩ Gấu Ôm",
			[SpiritId.AssemblyGuide]: "Chỉ Dẫn Tụ Hội",
			[SpiritId.BaffledBotanist]: "Nhà Thực Vật Bàng Hoàng",
			[SpiritId.ScoldingStudent]: "Đội Trưởng Quản Lý",
			[SpiritId.ScaredyCadet]: "Học Viên Nhát Gan",
			[SpiritId.MarchingAdventurer]: "Nhà Mạo Hiểm Diễu Hành",
			[SpiritId.ChucklingScout]: "Hướng Đạo Sinh Khúc Khích",
			[SpiritId.DaydreamForester]: "Người Đi Rừng Mộng Du",
			[SpiritId.TheRose]: "Hoa Hồng",
			[SpiritId.BeckoningRuler]: "Kẻ Thống Trị Hiệu Lệnh",
			[SpiritId.GloatingNarcissist]: "Thánh Tự Mãn Đắc Chí",
			[SpiritId.StretchingLamplighter]: "Người Thắp Đèn Bận Rộn",
			[SpiritId.SlouchingSoldier]: "Người Lính Lả Lơi",
			[SpiritId.SneezingGeographer]: "Nhà Địa Lý Học Hắt Hơi",
			[SpiritId.StarCollector]: "Nhà Sưu Tầm Sao",
			[SpiritId.FlightGuide]: "Chỉ Dẫn Bay",
			[SpiritId.LivelyNavigator]: "Người Chỉ Dẫn Tích Cực",
			[SpiritId.LightWhisperer]: "Người Luyện Ánh Sáng",
			[SpiritId.TinkeringChimesmith]: "Thợ Sửa Chuông",
			[SpiritId.TalentedBuilder]: "Kiến Trúc Sư Thiên Tài",
			[SpiritId.AbyssGuide]: "Chỉ Dẫn Vực Sâu",
			[SpiritId.AnxiousAngler]: "Ngư Dân Lo Lắng",
			[SpiritId.CeasingCommodore]: "Thuyền Trưởng Uy Nghiêm",
			[SpiritId.BumblingBoatswain]: "Thủy Thủ Hậu Đậu",
			[SpiritId.CacklingCannoneer]: "Xạ Thủ Vui Nhộn",
			[SpiritId.PerformanceGuide]: "Chỉ Dẫn Biểu Diễn",
			[SpiritId.FranticStagehand]: "Kỹ Thuật Viên Điên Rồ",
			[SpiritId.ForgetfulStoryteller]: "Người Kể Chuyện Hay Quên",
			[SpiritId.MellowMusician]: "Nhạc Sĩ Nhẹ Nhàng",
			[SpiritId.ModestDancer]: "Vũ Công Giản Dị",
			[SpiritId.TheVoidOfShattering]: "Tinh thể Tan vỡ",
			[SpiritId.AncientLight1]: "Ánh sáng Cổ xưa (Sứa)",
			[SpiritId.AncientLight2]: "Ánh sáng Cổ xưa (Cá Đuối)",
			[SpiritId.AncientDarkness1]: "Bóng tối Cổ xưa (Hoa)",
			[SpiritId.AncientDarkness2]: "Bóng tối Cổ xưa (Rồng Bóng Tối)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Lữ Khách Chạy Trốn",
			[SpiritId.MindfulMiner]: "Thợ Mỏ Tập Trung",
			[SpiritId.WarriorOfLove]: "Chiến Binh Tình Yêu",
			[SpiritId.SeedOfHope]: "Hạt Giống Hy Vọng",
			[SpiritId.RemembranceGuide]: "Chỉ Dẫn Tưởng Nhớ",
			[SpiritId.BereftVeteran]: "Cựu Binh U Buồn",
			[SpiritId.PleadingChild]: "Đứa Bé Van Nài",
			[SpiritId.TiptoeingTeaBrewer]: "Cô Pha Trà Rón Rén",
			[SpiritId.WoundedWarrior]: "Người Lính Tập Tễnh",
			[SpiritId.PassageGuide]: "Chỉ Dẫn Thử Thách",
			[SpiritId.OddballOutcast]: "Kẻ Bị Ruồng Bỏ",
			[SpiritId.TumblingTroublemaker]: "Kẻ Gây Rắc Rối",
			[SpiritId.MelancholyMope]: "Hiện Thân U Sầu",
			[SpiritId.OveractiveOverachiever]: "Kẻ Nghiện Việc",
			[SpiritId.MomentsGuide]: "Chỉ Dẫn Khoảnh Khắc",
			[SpiritId.ReassuringRanger]: "Kiểm Lâm Trấn An",
			[SpiritId.NightbirdWhisperer]: "Chim Đêm Thì Thầm",
			[SpiritId.JollyGeologist]: "Nhà Địa Chất Vui Vẻ",
			[SpiritId.AsceticMonk]: "Nhà Sư Khổ Hạnh",
			[SpiritId.HopefulSteward]: "Quản Gia Hy Vọng",
			[SpiritId.VestigeOfADesertedOasis]: "Dấu vết của một ốc đảo hoang vắng",
			[SpiritId.MemoryOfALostVillage]: "Ký ức Ngôi làng Đã mất",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Tiếng vọng Nơi ẩn náu Bỏ hoang",
			[SpiritId.RemnantOfAForgottenHaven]: "Tàn tích Nơi trú ẩn Quên lãng",
			[SpiritId.SpiritOfMural]: "Tinh Linh Cổ Họa",
			[SpiritId.HerbGatherer]: "Người hái thảo mộc",
			[SpiritId.Hunter]: "Thợ săn",
			[SpiritId.FeudalLord]: "Lãnh chúa phong kiến",
			[SpiritId.Princess]: "Công chúa",
			[SpiritId.NestingGuide]: "Chỉ Dẫn Xây Tổ",
			[SpiritId.NestingSolarium]: "Xây Tổ Tắm Nắng",
			[SpiritId.NestingLoft]: "Xây Tổ Gác Xép",
			[SpiritId.NestingAtrium]: "Xây Tổ Sân Nhỏ",
			[SpiritId.NestingNook]: "Xây Tổ Góc Nhỏ",
			[SpiritId.DuetsGuide]: "Chỉ Dẫn Song Tấu",
			[SpiritId.TheCellistsBeginnings]: "Sự Khởi Đầu của Nghệ Sĩ Cello",
			[SpiritId.ThePianistsBeginnings]: "Sự Khởi Đầu Của Nghệ Sĩ Piano",
			[SpiritId.TheMusiciansLegacy]: "Di Sản Của Các Nhạc",
			[SpiritId.TheCellistsFlourishing]: "Sự Thành Công Của Nghệ Sĩ Cello",
			[SpiritId.ThePianistsFlourishing]: "Sự Thành Công Của Nghệ Sĩ Piano",
			[SpiritId.TheMoominStorybook]: "Truyện Moomin",
			[SpiritId.ComfortOfKindness]: "Sự An Ủi Của Lòng Tốt",
			[SpiritId.SenseOfSelf]: "Tự Nhận Thức",
			[SpiritId.SpiritOfAdventure]: "Tinh Thần Phiêu Lưu",
			[SpiritId.InspirationOfInclusion]: "Cảm Hứng Về Lòng Bao Dung",
			[SpiritId.RadianceGuide]: "Chỉ Dẫn Rạng Rỡ",
			[SpiritId.RadianceLeapingDancer]: "Vũ Công Nhảy Nhót Rạng Rỡ",
			[SpiritId.RadianceProvokingPerformer]: "Người Biểu Diễn Khiêu Khích Rạng Rỡ",
			[SpiritId.RadianceGreetingShaman]: "Pháp Sư Chào Hỏi Rạng Rỡ",
		},
	},
} as const;
