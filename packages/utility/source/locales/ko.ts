import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { EventId } from "../utility/event.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		realms: {
			[RealmName.IslesOfDawn]: "여명의 섬",
			[RealmName.DaylightPrairie]: "햇빛 초원",
			[RealmName.HiddenForest]: "비밀의 숲",
			[RealmName.ValleyOfTriumph]: "승리의 계곡",
			[RealmName.GoldenWasteland]: "황금 황무지",
			[RealmName.VaultOfKnowledge]: "지식의 도서관",
			[RealmName.EyeOfEden]: "에덴의 눈",
		},
		maps: { [SkyMap.JellyfishCove]: "해파리 만" },
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "빛 조각 30개 모으기",
			[DailyQuest.Light20Candles]: "양초 20개에 불을 붙이기",
			[DailyQuest.ForgeACandle]: "양초 한 개 만들기",
			[DailyQuest.Melt10Darkness]: "어둠 10개를 녹이기",
			[DailyQuest.BowAtAPlayer]: "플레이어에게 고개 숙여 인사하기",
			[DailyQuest.FollowAFriend]: "친구를 따라가기",
			[DailyQuest.HugAFriend]: "친구와 포옹하기",
			[DailyQuest.WaveToAFriend]: "친구에게 손 흔들기",
			[DailyQuest.HoldAFriendsHand]: "친구와 손잡기",
			[DailyQuest.SendAGiftToAFriend]: "친구에게 선물 보내기",
			[DailyQuest.MakeANewAcquaintance]: "낯선 플레이어와 촛불을 맞대기",
			[DailyQuest.HighFiveAFriend]: "친구와 하이파이브하기",
			[DailyQuest.UseAnExpressionNearAFriend]: "친구 근처에서 제스처 사용하기",
			[DailyQuest.SitOnABenchWithAStranger]: "낯선 사람과 함께 벤치에 앉기",
			[DailyQuest.RechargeFromAJellyfish]: "해파리 위에서 빛 충전하기",
			[DailyQuest.RechargeFromALightBloom]: "빛의 꽃에서 빛 충전하기",
			[DailyQuest.RideWithAManta]: "만타가오리 위에 올라타기",
			[DailyQuest.ReliveASpiritsMemories]: "영혼의 기억을 체험하기",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"햇빛 초원에서 영혼의 기억을 다시 체험하기",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"비밀의 숲에서 영혼의 기억을 다시 체험하기",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"승리의 계곡에서 영혼의 기억을 다시 체험하기",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"황금 황무지에서 영혼의 기억을 다시 체험하기",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"지식의 도서관에서 영혼의 기억을 다시 체험하기",
			[DailyQuest.FaceTheDarkDragon]: "다크 드래곤을 마주하기",
			[DailyQuest.KnockOver5DarkCrabs]: "어둠의 게 5마리를 쓰러뜨리기",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "햇빛 초원에서 빛 잡기",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "비밀의 숲에서 빛 잡기",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "승리의 계곡에서 빛 잡기",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "황금 황무지에서 빛 잡기",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "지식의 도서관에서 빛 잡기",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"초원의 동굴 속 안락한 아지트를 찾아가기",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"숲 속 높은 공터에 선조가 남긴 친밀의 테이블을 찾아가기",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]: "꿈의 마을 온천을 찾아가기",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: "황무지에서 묘지 구역의 모닥불 찾아가기",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]: "햇빛 초원에서 어린 나무를 잠시 감상하기",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]: "비밀의 숲에서 어린 나무를 잠시 감상하기",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"승리의 계곡에서 어린 나무를 잠시 감상하기",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"황금 황무지에서 어린 나무를 잠시 감상하기",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"지식의 도서관에서 어린 나무를 잠시 감상하기",
			[DailyQuest.VisitThePollutedGeyser]: "낙원의 섬에서 오염된 간헐천을 찾아가기",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "낙원의 소용돌이에서 어둠을 몰아내세요",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"햇빛 초원의 무지개 끝에서 양초를 찾기",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"비밀의 숲의 무지개 끝에서 양초를 찾기",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"승리의 계곡의 무지개 끝에서 양초를 찾기",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"황금 황무지의 무지개 끝에서 양초를 찾기",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"지식의 도서관의 무지개 끝에서 양초를 찾기",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]: "낙원의 섬에서 잠시 무지개를 감상하기",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]: "바람길에서 잠시 무지개를 감상하기",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]: "운둔자의 언덕에서 잠시 무지개를 감상하기",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]: "보물섬에서 잠시 무지개를 감상하기",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]: "별빛 사막에서 잠시 무지개를 감상하기",
			[DailyQuest.MeditateAtTheBirdNest]: "초원의 새 둥지 제단에서 명상하기",
			[DailyQuest.MeditateInTheButterflyFields]: "초원의 나비 들판에서 명상하기",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "낙원의 섬에서 명상하기",
			[DailyQuest.MeditateInTheCave]: "초원의 동굴 제단에서 명상하기",
			[DailyQuest.MeditateByTheKoiPond]: "초원의 잉어 연못에서 명상하기",
			[DailyQuest.MeditateAtTheForestClearing]: "숲 속 공터에서 명상하기",
			[DailyQuest.MeditateAtTheForestBrook]: "숲의 개울 위에서 명상하기",
			[DailyQuest.MeditateAtTheElevatedClearing]: "숲 속 높은 공터에서 명상하기",
			[DailyQuest.MeditateAtTheForestEnd]: "숲 끝에서 명상하기",
			[DailyQuest.MeditateAtTheBoneyard]: "숲 속 묘지에서 명상하기",
			[DailyQuest.MeditateByTheIceRink]: "계곡 아이스링크 옆에서 명상하기",
			[DailyQuest.MeditateAboveTheCitadelsArch]: "계곡 요새 아치 위에서 명상하기",
			[DailyQuest.MeditateHighAboveTheCitadel]: "계곡 요새 위에서 명상하기",
			[DailyQuest.MeditateAtTheColiseum]: "레이스 끝에서 명상하기",
			[DailyQuest.MeditateInTheBrokenTemple]: "부서진 사원에서 명상하기",
			[DailyQuest.MeditateInTheForgottenArk]: "잊혀진 방주에서 명상하세요",
			[DailyQuest.MeditateInTheGraveyard]: "묘지에서 명상하기",
			[DailyQuest.MeditateOnTheBoat]: "배 위에서 명상하기",
			[DailyQuest.MeditateOnTheBattlefield]: "전장에서 명상하기",
			[DailyQuest.MeditateAtTheVaultEntrance]: "지식의 도서관 입구에서 명상하기",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "도서관 2층에서 명상하기",
			[DailyQuest.MeditateAtTheVaultSummit]: "도서관 가장 위층에서 명상하기",
			[DailyQuest.CollectGreenLight]: "녹색 빛 모으기",
			[DailyQuest.CollectOrangeLight]: "주황색 빛 모으기",
			[DailyQuest.CollectBlueLight]: "파란색 빛 모으기",
			[DailyQuest.CollectRedLight]: "빨간색 빛 모으기",
			[DailyQuest.CollectPurpleLight]: "보라색 빛 모으기",
			[DailyQuest.PracticeWithTheSkater]: "꿈의 마을에서 스케이트 선수와 함께 연습하기",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"꿈의 마을에서 스케이트 선수와 함께 경사로를 따라 질주하기",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"은둔자의 언덕에서 스케이트 선수와 함께 산을 따라 질주하기",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"대경기장에서 스케이트 선수와 함께 공연 리허설 하기",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "곡예용 고리 아이템 보물찾기 게임을 완료하기",
			[DailyQuest.ReliveTheButterflyCharmer]: "햇빛 초원에서 나비 조련사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"햇빛 초원에서 박수 치는 종지기의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"햇빛 초원에서 손 흔드는 종지기의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"햇빛 초원에서 졸린 배 장인의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"햇빛 초원에서 웃는 빛잡이의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBirdWhisperer]: "햇빛 초원에서 새 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"햇빛 초원에서 기진맥진한 부두 일꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"비밀의 숲에서 덜덜 떠는 개척자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBlushingProspector]:
				"비밀의 숲에서 수줍은 탐험가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"비밀의 숲에서 숨바꼭질 개척자의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePoutyPorter]: "비밀의 숲에서 토라진 짐꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheDismayedHunter]: "비밀의 숲에서 경악하는 사냥꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"비밀의 숲에서 사과하는 나무꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"비밀의 숲에서 눈물 흘리는 광부의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheWhaleWhisperer]: "비밀의 숲에서 고래 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"승리의 계곡에서 자신만만한 관람객의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"승리의 계곡에서 물구나무 챔피언의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"승리의 계곡에서 만타가오리 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"승리의 계곡에서 공중제비 챔피언의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheCheerfulSpectator]: "승리의 계곡에서 유쾌한 관중의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBowingMedalist]:
				"승리의 계곡에서 목례하는 메달리스트의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheProudVictor]: "승리의 계곡에서 뽐내는 승리자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheFrightenedRefugee]: "황금 황무지에서 겁먹은 난민의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheFaintingWarrior]: "황금 황무지에서 기절하는 전사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheCourageousSoldier]: "황금 황무지에서 용감한 병사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"황금 황무지에서 은밀한 생존자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSalutingCaptain]: "황금 황무지에서 경례하는 선장의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheLookoutScout]: "황금 황무지에서 망보는 정찰자의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"지식의 도서관에서 기도하는 조수의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"지식의 도서관에서 염동력 전문가의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePoliteScholar]:
				"지식의 도서관에서 예의 바른 학자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheMemoryWhisperer]: "지식의 도서관에서 영혼 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"지식의 도서관에서 명상하는 수도승의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheStretchingGuru]: "햇빛 초원에서 체조하는 선생의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"비밀의 숲에서 도발하는 곡예사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheLeapingDancer]:
				"승리의 계곡에서 팔짝 뛰는 무용수의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSalutingProtector]:
				"황금 황무지에서 경례하는 수호자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheGreetingShaman]:
				"지식의 도서관에서 인사하는 주술사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"햇빛 초원에서 하이파이브하는 빛잡이의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheLaidbackPioneer]: "비밀의 숲에서 태평한 개척자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"승리의 계곡에서 뱅뱅 도는 챔피언의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheCrabWhisperer]: "황금 황무지에서 게 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"지식의 도서관에서 쉿 하는 학자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheConfettiCousin]: "햇빛 초원에서 꽃가루 사촌의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheHairtousleTeen]: "비밀의 숲에서 쓰다듬는 청년의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSparklerParent]: "승리의 계곡에서 폭죽장이 부모의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePleafulParent]: "황금 황무지에서 애원하는 부모의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"지식의 도서관에서 고민하는 감독의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"햇빛 초원에서 축제 스핀 댄서의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheAdmiringActor]: "비밀의 숲에서 감탄하는 배우의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheTroupeJuggler]: "승리의 계곡에서 극단 저글러의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"황금 황무지에서 공손한 피아니스트의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"지식의 도서관에서 고민하는 감독의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"황금 황무지에서 끄덕이는 벽화가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"황금 황무지에서 무심한 연금술사의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheCrabWalker]: "황금 황무지에서 게 애호가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheScarecrowFarmer]: "황금 황무지에서 허수아비 농부의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"황금 황무지에서 졸고 있는 목수의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"황금 황무지에서 장난치는 약초꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheJellyWhisperer]: "햇빛 초원에서 해파리 소리꾼의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheTimidBookworm]: "햇빛 초원에서 소심한 책벌레의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"햇빛 초원에서 스릴 마니아의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheHikingGrouch]: "햇빛 초원에서 불평쟁이 등반가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"햇빛 초원에서 고마워하는 조개수집가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheChillSunbather]: "햇빛 초원에서 일광욕 마니아의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheSpinningMentor]: "승리의 계곡에서 빙빙 도는 스승의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheDancingPerformer]:
				"승리의 계곡에서 춤추는 안무가의 기억을 다시 체험하기",
			[DailyQuest.ReliveThePeekingPostman]:
				"승리의 계곡에서 기웃거리는 우체부의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBearhugHermit]:
				"승리의 계곡에서 안아 드는 은둔자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"비밀의 숲에서 곤혹스러운 식물학자의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheScoldingStudent]: "비밀의 숲에서 야단치는 학생의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheScaredyCadet]: "비밀의 숲에서 겁쟁이 생도의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"비밀의 숲에서 행진하는 모험가의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheChucklingScout]:
				"비밀의 숲에서 키득거리는 스카우트의 기억을 다시 체험하기",
			[DailyQuest.ReliveTheDaydreamForester]:
				"비밀의 숲에서 몽상하는 숲지기의 기억을 다시 체험하기",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Sky 월드에 떨어진 어둠의 파편을 찾아가세요",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"초원 봉우리에서 하이킹하는 불평쟁이와 셀카 찍기",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"초원 봉우리에서 게 소리꾼과 셀카 찍기",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"초원 봉우리에서 낄낄 웃는 포수와 셀카 찍기",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"초원 봉우리에서 격한 인사 크리처와 셀카를 찍어보세요",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"새들의 정원 마을 언덕에서 시나모롤을 만나기",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"새들의 정원 마을에서 시나모롤과 함께 꽃향기를 맡기",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"새들의 정원 마을을 구경하는 시나모롤을 찾기",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "새들의 정원 마을에서 시나모롤을 깨우기",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"새들의 정원 마을에서 시나모롤과 함께 탑 위로 날아오르기",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"새들의 정원 마을에서 시나모롤과 함께 물놀이를 즐기기",
			[DailyQuest.PlayAnyTournamentSport]: "토너먼트 스포츠 한 가지에 참여하기",
			[DailyQuest.ChangeYourHairstyle]: "헤어스타일 바꾸기",
			[DailyQuest.ChangeYourNecklace]: "목걸이 바꾸기",
			[DailyQuest.ChangeYourProp]: "소품 바꾸기",
			[DailyQuest.ChangeYourMask]: "가면 바꾸기",
			[DailyQuest.ChangeYourCape]: "망토 바꾸기",
			[DailyQuest.ChangeYourOutfit]: "바지 바꾸기",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]: "멋쟁이 패션쇼 제단에서 공유기억 보기",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"멋쟁이 패션쇼 제단에서 공유기억 녹화하기",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]: "위풍당당 선장에게 장난을 치기",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]: "뼈 무덤에서 숨바꼭질 개척자와(과) 만나기",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"낙원의 섬에서 낄낄 웃는 포수 또는 키득거리는 스카우트가 보물을 찾는 걸 도와주세요",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"비밀의 숲에서 우왕좌왕 갑판장 또는 협력의 안내자가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpCeasingCommodoreOrDaydreamForesterFindTreasureInVillageOfDreams]:
				"꿈의 마을에서 위풍당당 선장 또는 몽상하는 숲지기가 보물을 찾는 걸 도와주세요",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInTreasureReef]:
				"보물섬에서 안절부절 낚시꾼 또는 야단치는 학생이 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInStarlightDesert]:
				"별빛사막에서 낄낄 웃는 포수 또는 키득거리는 스카우트가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInSanctuaryIslands]:
				"낙원의 섬에서 우왕좌왕 갑판장 또는 협력의 안내자가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheCeasingCommodoreOrTheDaydreamForesterFindTreasureInHiddenForest]:
				"비밀의 숲에서 위풍당당 선장 또는 몽상하는 숲지기가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInVillageOfDreams]:
				"꿈의 마을에서 안절부절 낚시꾼 또는 야단치는 학생이 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInTreasureReef]:
				"보물섬에서 낄낄 웃는 포수 또는 키득거리는 스카우트가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInStarlightDesert]:
				"별빛사막에서 우왕좌왕 갑판장 또는 협력의 안내자가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheCeasingCommodoreOrTheDaydreamForesterFindTreasureInSanctuaryIslands]:
				"낙원의 섬에서 위풍당당 선장 또는 몽상하는 숲지기가 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInHiddenForest]:
				"비밀의 숲에서 안절부절 낚시꾼 또는 야단치는 학생이 보물을 찾는 걸 돕기",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInVillageOfDreams]:
				"꿈의 마을에서 낄낄 웃는 포수 또는 키득거리는 스카우트가 보물을 찾는 걸 돕기",
			[DailyQuest.InvestigateABlueBirdSightingInTheIceRink]:
				"아이스링크에서 파랑새 목격담을 조사하기",
			[DailyQuest.InvestigateABlueBirdSightingInTheVaultRepository]:
				"도서관 보관소에서 파랑새 목격담을 조사하기",
			[DailyQuest.InvestigateABlueBirdSightingInVillageTheatre]:
				"마을 극장에서 파랑새 목격담을 조사하기",
			[DailyQuest.InvestigateABlueBirdSightingInTheForestClearing]:
				"비밀의 숲에서 파랑새 목격담을 조사하기",
			[DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheIceRink]:
				"아이스링크에서 파랑새의 행방에 대한 단서 찾기",
			[DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheVaultRepository]:
				"도서관 보관소에서 파랑새의 행방에 대한 단서 찾기",
			[DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInVillageTheatre]:
				"마을 극장에서 파랑새의 행방에 대한 단서 찾기",
			[DailyQuest.FindAClueOfTheBlueBirdsWhereaboutsInTheForestClearing]:
				"비밀의 숲에서 파랑새의 행방에 대한 단서 찾기",
		},
		seasons: {
			[SeasonId.Gratitude]: "감사의 시즌",
			[SeasonId.Lightseekers]: "빛 추적자의 시즌",
			[SeasonId.Belonging]: "친밀의 시즌",
			[SeasonId.Rhythm]: "리듬의 시즌",
			[SeasonId.Enchantment]: "마법의 시즌",
			[SeasonId.Sanctuary]: "낙원의 시즌",
			[SeasonId.Prophecy]: "예언의 시즌",
			[SeasonId.Dreams]: "꿈의 시즌",
			[SeasonId.Assembly]: "협력의 시즌",
			[SeasonId.LittlePrince]: "어린 왕자의 시즌",
			[SeasonId.Flight]: "비행의 시즌",
			[SeasonId.Abyss]: "심해의 시즌",
			[SeasonId.Performance]: "공연의 시즌",
			[SeasonId.Shattering]: "파편의 시즌",
			[SeasonId.AURORA]: "AURORA의 시즌",
			[SeasonId.Remembrance]: "기억의 시즌",
			[SeasonId.Passage]: "성장의 시즌",
			[SeasonId.Moments]: "순간의 시즌",
			[SeasonId.Revival]: "재생의 시즌",
			[SeasonId.NineColouredDeer]: "아홉 빛깔 사슴의 시즌",
			[SeasonId.Nesting]: "보금자리의 시즌",
			[SeasonId.Duets]: "듀엣의 시즌",
			[SeasonId.Moomin]: "무민의 시즌",
			[SeasonId.Radiance]: "비밀의 숲",
		},
		events: {
			[EventId.DaysOfMusic2024]: "음악의 날",
			[EventId.DaysOfTreasure2025]: "보물의 날",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "가리키는 양초장이",
			[SpiritId.UsheringStargazer]: "안내하는 별지기",
			[SpiritId.RejectingVoyager]: "거부하는 여행자",
			[SpiritId.ElderOfTheIsle]: "섬의 장로",
			[SpiritId.ButterflyCharmer]: "나비 조련사",
			[SpiritId.ApplaudingBellmaker]: "박수 치는 종지기",
			[SpiritId.WavingBellmaker]: "손 흔드는 종지기",
			[SpiritId.SlumberingShipwright]: "졸린 배 장인",
			[SpiritId.LaughingLightCatcher]: "웃는 빛잡이",
			[SpiritId.BirdWhisperer]: "새 소리꾼",
			[SpiritId.ExhaustedDockWorker]: "기진맥진한 부두 일꾼",
			[SpiritId.CeremonialWorshiper]: "예식 참배자",
			[SpiritId.ElderOfThePrairie]: "초원의 장로",
			[SpiritId.ShiveringTrailblazer]: "덜덜 떠는 개척자",
			[SpiritId.BlushingProspector]: "수줍은 탐험가",
			[SpiritId.HideNSeekPioneer]: "숨바꼭질 개척자",
			[SpiritId.PoutyPorter]: "토라진 짐꾼",
			[SpiritId.DismayedHunter]: "경악하는 사냥꾼",
			[SpiritId.ApologeticLumberjack]: "사과하는 나무꾼",
			[SpiritId.TearfulLightMiner]: "눈물 흘리는 광부",
			[SpiritId.WhaleWhisperer]: "고래 소리꾼",
			[SpiritId.ElderOfTheForest]: "숲의 장로",
			[SpiritId.ConfidentSightseer]: "자신만만한 관람객",
			[SpiritId.HandstandingThrillseeker]: "물구나무 챔피언",
			[SpiritId.MantaWhisperer]: "만타가오리 소리꾼",
			[SpiritId.BackflippingChampion]: "공중제비 챔피언",
			[SpiritId.CheerfulSpectator]: "유쾌한 관중",
			[SpiritId.BowingMedalist]: "목례하는 메달리스트",
			[SpiritId.ProudVictor]: "뽐내는 승리자",
			[SpiritId.ElderOfTheValley]: "계곡의 장로",
			[SpiritId.FrightenedRefugee]: "겁먹은 난민",
			[SpiritId.FaintingWarrior]: "기절하는 전사",
			[SpiritId.CourageousSoldier]: "용감한 병사",
			[SpiritId.StealthySurvivor]: "은밀한 생존자",
			[SpiritId.SalutingCaptain]: "경례하는 선장",
			[SpiritId.LookoutScout]: "망보는 정찰자",
			[SpiritId.ElderOfTheWasteland]: "황무지의 장로",
			[SpiritId.PrayingAcolyte]: "기도하는 조수",
			[SpiritId.LevitatingAdept]: "염동력 전문가",
			[SpiritId.PoliteScholar]: "예의 바른 학자",
			[SpiritId.MemoryWhisperer]: "영혼 소리꾼",
			[SpiritId.MeditatingMonastic]: "명상하는 수도승",
			[SpiritId.ElderOfTheVault]: "도서관의 장로",
			[SpiritId.GratitudeGuide]: "감사의 안내자",
			[SpiritId.SassyDrifter]: "건방진 나그네",
			[SpiritId.StretchingGuru]: "체조하는 선생",
			[SpiritId.ProvokingPerformer]: "도발하는 곡예사",
			[SpiritId.LeapingDancer]: "팔짝 뛰는 무용수",
			[SpiritId.SalutingProtector]: "경례하는 수호자",
			[SpiritId.GreetingShaman]: "인사하는 주술사",
			[SpiritId.LightseekerGuide]: "빛 추적자 안내자",
			[SpiritId.PiggybackLightseeker]: "목말 타는 빛 추적자",
			[SpiritId.DoublefiveLightCatcher]: "하이파이브하는 빛잡이",
			[SpiritId.LaidbackPioneer]: "태평한 개척자",
			[SpiritId.TwirlingChampion]: "뱅뱅 도는 챔피언",
			[SpiritId.CrabWhisperer]: "게 소리꾼",
			[SpiritId.ShushingLightScholar]: "쉿 하는 학자",
			[SpiritId.BelongingGuide]: "친밀의 안내자",
			[SpiritId.BoogieKid]: "춤추는 아이",
			[SpiritId.ConfettiCousin]: "꽃가루 사촌",
			[SpiritId.HairtousleTeen]: "쓰다듬는 청년",
			[SpiritId.SparklerParent]: "폭죽장이 부모",
			[SpiritId.PleafulParent]: "애원하는 부모",
			[SpiritId.WiseGrandparent]: "현명한 노인",
			[SpiritId.RhythmGuide]: "리듬의 안내자",
			[SpiritId.TroupeGreeter]: "극단 문지기",
			[SpiritId.FestivalSpinDancer]: "축제 스핀 댄서",
			[SpiritId.AdmiringActor]: "감탄하는 배우",
			[SpiritId.TroupeJuggler]: "극단 저글러",
			[SpiritId.RespectfulPianist]: "공손한 피아니스트",
			[SpiritId.ThoughtfulDirector]: "고민하는 감독",
			[SpiritId.EnchantmentGuide]: "마법의 안내자",
			[SpiritId.NoddingMuralist]: "끄덕이는 벽화가",
			[SpiritId.IndifferentAlchemist]: "무심한 연금술사",
			[SpiritId.CrabWalker]: "게 애호가",
			[SpiritId.ScarecrowFarmer]: "허수아비 농부",
			[SpiritId.SnoozingCarpenter]: "졸고 있는 목수",
			[SpiritId.PlayfightingHerbalist]: "장난치는 약초꾼",
			[SpiritId.SanctuaryGuide]: "낙원의 안내자",
			[SpiritId.JellyWhisperer]: "해파리 소리꾼",
			[SpiritId.TimidBookworm]: "소심한 책벌레",
			[SpiritId.RallyingThrillseeker]: "스릴 마니아",
			[SpiritId.HikingGrouch]: "불평쟁이 등반가",
			[SpiritId.GratefulShellCollector]: "고마워하는 조개수집가",
			[SpiritId.ChillSunbather]: "일광욕 마니아",
			[SpiritId.ProphecyGuide]: "예언 안내자",
			[SpiritId.ProphetOfWater]: "물의 예언자",
			[SpiritId.ProphetOfEarth]: "땅의 예언자",
			[SpiritId.ProphetOfAir]: "공기의 예언자",
			[SpiritId.ProphetOfFire]: "불의 예언자",
			[SpiritId.DreamsGuide]: "꿈의 안내자",
			[SpiritId.SpinningMentor]: "빙빙 도는 스승",
			[SpiritId.DancingPerformer]: "춤추는 안무가",
			[SpiritId.PeekingPostman]: "기웃거리는 우체부",
			[SpiritId.BearhugHermit]: "안아 드는 은둔자",
			[SpiritId.AssemblyGuide]: "협력의 안내자",
			[SpiritId.BaffledBotanist]: "곤혹스러운 식물학자",
			[SpiritId.ScoldingStudent]: "야단치는 학생",
			[SpiritId.ScaredyCadet]: "겁쟁이 생도",
			[SpiritId.MarchingAdventurer]: "행진하는 모험가",
			[SpiritId.ChucklingScout]: "키득거리는 스카우트",
			[SpiritId.DaydreamForester]: "몽상하는 숲지기",
			[SpiritId.TheRose]: "장미",
			[SpiritId.BeckoningRuler]: "손짓하는 군주",
			[SpiritId.GloatingNarcissist]: "흐뭇한 자아도취자",
			[SpiritId.StretchingLamplighter]: "체조하는 가로등지기",
			[SpiritId.SlouchingSoldier]: "구부정한 군인",
			[SpiritId.SneezingGeographer]: "재채기하는 지리학자",
			[SpiritId.StarCollector]: "별 수집가",
			[SpiritId.FlightGuide]: "비행의 안내자",
			[SpiritId.LivelyNavigator]: "쾌활한 항해사",
			[SpiritId.LightWhisperer]: "빛의 소리꾼",
			[SpiritId.TinkeringChimesmith]: "뚝딱뚝딱 대장장이",
			[SpiritId.TalentedBuilder]: "유능한 건축가",
			[SpiritId.AbyssGuide]: "심해의 안내자",
			[SpiritId.AnxiousAngler]: "안절부절 낚시꾼",
			[SpiritId.CeasingCommodore]: "위풍당당 선장",
			[SpiritId.BumblingBoatswain]: "우왕좌왕 갑판장",
			[SpiritId.CacklingCannoneer]: "낄낄 웃는 포수",
			[SpiritId.PerformanceGuide]: "공연의 안내자",
			[SpiritId.FranticStagehand]: "극성스러운 무대담당자",
			[SpiritId.ForgetfulStoryteller]: "깜박하는 이야기꾼",
			[SpiritId.MellowMusician]: "그윽한 음악가",
			[SpiritId.ModestDancer]: "겸손한 댄서",
			[SpiritId.TheVoidOfShattering]: "공허의 파편",
			[SpiritId.AncientLight1]: "고대의 빛 (해파리)",
			[SpiritId.AncientLight2]: "고대의 빛 (가오리)",
			[SpiritId.AncientDarkness1]: "고대의 어둠 (식물)",
			[SpiritId.AncientDarkness2]: "고대의 어둠 (용)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "달리는 여행자",
			[SpiritId.MindfulMiner]: "주의 깊은 광부",
			[SpiritId.WarriorOfLove]: "사랑의 전사",
			[SpiritId.SeedOfHope]: "희망의 씨앗",
			[SpiritId.RemembranceGuide]: "기억의 안내자",
			[SpiritId.BereftVeteran]: "무력한 참전용사",
			[SpiritId.PleadingChild]: "애원하는 아이",
			[SpiritId.TiptoeingTeaBrewer]: "까치걸음 차 애호가",
			[SpiritId.WoundedWarrior]: "부상당한 전사",
			[SpiritId.PassageGuide]: "성장의 안내자",
			[SpiritId.OddballOutcast]: "괴짜 외톨이",
			[SpiritId.TumblingTroublemaker]: "구르는 말썽쟁이",
			[SpiritId.MelancholyMope]: "우울한 낙오자",
			[SpiritId.OveractiveOverachiever]: "극성스러운 노력가",
			[SpiritId.MomentsGuide]: "순간의 안내자",
			[SpiritId.ReassuringRanger]: "든든한 순찰대원",
			[SpiritId.NightbirdWhisperer]: "밤의 새 소리꾼",
			[SpiritId.JollyGeologist]: "유쾌한 지질학자",
			[SpiritId.AsceticMonk]: "금욕적인 수도승",
			[SpiritId.HopefulSteward]: "희망적인 집사",
			[SpiritId.VestigeOfADesertedOasis]: "버려진 오아시스의 흔적",
			[SpiritId.MemoryOfALostVillage]: "사라진 마을의 기억",
			[SpiritId.EchoOfAnAbandonedRefuge]: "버려진 피난처의 메아리",
			[SpiritId.RemnantOfAForgottenHaven]: "잊혀진 안식처의 잔해",
			[SpiritId.SpiritOfMural]: "벽화의 영혼",
			[SpiritId.HerbGatherer]: "허브 채집자",
			[SpiritId.Hunter]: "사냥꾼",
			[SpiritId.FeudalLord]: "봉건 영주",
			[SpiritId.Princess]: "공주",
			[SpiritId.NestingGuide]: "보금자리 안내자",
			[SpiritId.NestingSolarium]: "보금자리 온실",
			[SpiritId.NestingLoft]: "보금자리 가구점",
			[SpiritId.NestingAtrium]: "보금자리 안마당",
			[SpiritId.NestingNook]: "보금자리 구석",
			[SpiritId.DuetsGuide]: "듀엣의 안내자",
			[SpiritId.TheCellistsBeginnings]: "첼로 연주자의 시작",
			[SpiritId.ThePianistsBeginnings]: "피아노 연주자의 시작",
			[SpiritId.TheMusiciansLegacy]: "음악가의 유산",
			[SpiritId.TheCellistsFlourishing]: "첼로 연주자의 전성기",
			[SpiritId.ThePianistsFlourishing]: "피아노 연주자의 전성기",
			[SpiritId.TheMoominStorybook]: "무민 이야기책",
			[SpiritId.ComfortOfKindness]: "친절의 위로",
			[SpiritId.SenseOfSelf]: "자아의 인식",
			[SpiritId.SpiritOfAdventure]: "모험의 정신",
			[SpiritId.InspirationOfInclusion]: "포용의 원천",
			[SpiritId.RadianceGuide]: "광채의 안내자",
			[SpiritId.RadianceLeapingDancer]: "광채의 팔짝 뛰는 무용수",
			[SpiritId.RadianceProvokingPerformer]: "광채의 도발하는 곡예사",
			[SpiritId.RadianceGreetingShaman]: "광채의 인사하는 주술사",
			[SpiritId.BlueBirdGuide]: "파랑새의 안내자",
			[SpiritId.CostumedConfettiCousin]: "분장한 꽃가루 사촌",
			[SpiritId.DiviningWiseGrandparent]: "점치는 현명한 노인",
			[SpiritId.WoodcuttingPleafulParent]: "나무 베는 애원하는 부모",
			[SpiritId.NostalgicSparklerParent]: "그리워하는 폭죽장이 부모",
			[SpiritId.RoyalHairtousleTeen]: "고귀한 쓰다듬는 청년",
		},
	},
} as const;
