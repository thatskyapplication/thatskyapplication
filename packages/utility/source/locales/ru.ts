import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		realms: {
			[RealmName.IslesOfDawn]: "Остров рассвета",
			[RealmName.DaylightPrairie]: "Полуденная прерия",
			[RealmName.HiddenForest]: "Тайный лес",
			[RealmName.ValleyOfTriumph]: "Долина триумфа",
			[RealmName.GoldenWasteland]: "Золотая пустошь",
			[RealmName.VaultOfKnowledge]: "Хранилище знаний",
			[RealmName.EyeOfEden]: "Сердце Эдема",
		},
		maps: { [SkyMap.JellyfishCove]: "Бухту медуз" },
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Соберите 30 ед. света",
			[DailyQuest.Light20Candles]: "Зажгите 20 свечей",
			[DailyQuest.ForgeACandle]: "Изготовьте свечу",
			[DailyQuest.Melt10Darkness]: "Растопите 10 ед. тьмы",
			[DailyQuest.BowAtAPlayer]: "Поклонитесь игроку",
			[DailyQuest.FollowAFriend]: "Следуйте за другом",
			[DailyQuest.HugAFriend]: "Обнимите друга",
			[DailyQuest.WaveToAFriend]: "Помашите другу",
			[DailyQuest.HoldAFriendsHand]: "Возьмите друга за руку",
			[DailyQuest.SendAGiftToAFriend]: "Отправьте подарок другу",
			[DailyQuest.MakeANewAcquaintance]: "Заведите новое знакомство",
			[DailyQuest.HighFiveAFriend]: "Дайте «пять» другу",
			[DailyQuest.UseAnExpressionNearAFriend]: "Используйте выражение рядом с другом",
			[DailyQuest.SitOnABenchWithAStranger]: "Посидите на скамейке с незнакомцем",
			[DailyQuest.RechargeFromAJellyfish]: "Зарядите свой свет от медузы",
			[DailyQuest.RechargeFromALightBloom]: "Зарядите свой свет от ростка света",
			[DailyQuest.RideWithAManta]: "Поездки с мантой",
			[DailyQuest.ReliveASpiritsMemories]: "Проживите воспоминания этого Духа",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Проживите воспоминания духа в Полуденной прерии",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Проживите воспоминания духа в Тайном лесу",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Проживите воспоминания духа в Долине триумфа",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Проживите воспоминания духа в Золотой пустоши",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Проживите воспоминания духа в Хранилище знаний",
			[DailyQuest.FaceTheDarkDragon]: "Узрите темного дракона",
			[DailyQuest.KnockOver5DarkCrabs]: "Сбейте 5 темных крабов",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Поймайте свет в Полуденной прерии",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Поймайте свет в Тайном лесу",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Поймайте свет в Долине триумфа",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Поймайте свет в Золотой пустоши",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Поймайте свет в Хранилище знаний",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Найдите уютное укрытие в пещерах в прерии",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Приходите к столу сопричастности на высокой поляне в Лесу",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
				"Зайдите на горячий источник в Деревушке мечтаний",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: "Подойдите к костру на кладбище пустоши",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]: "Полюбуйтесь деревцем в Полуденной прерии",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]: "Полюбуйтесь деревцем в Тайном лесу",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]: "Полюбуйтесь деревцем в Долине триумфа",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]: "Полюбуйтесь деревцем в Золотой пустоши",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]: "Полюбуйтесь деревцем в Хранилище знаний",
			[DailyQuest.VisitThePollutedGeyser]: "Посетите загрязненный гейзер на Островах укрытия",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Избавьте Воронку Укрытия от тьмы",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Найдите свечи в конце радуги в Полуденной прерии",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Найдите свечи в конце радуги в Тайном лесу",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Найдите свечи в конце радуги в Долине триумфа",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Найдите свечи в конце радуги в Золотой пустоши",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Найдите свечи в конце радуги в Хранилище знаний",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]: "Полюбуйтесь радугой на Островах убежища",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]: "Полюбуйтесь радугой на Путях ветра",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]: "Полюбуйтесь радугой в Долине отшельника",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]: "Полюбуйтесь радугой на Острове сокровищ",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]: "Полюбуйтесь радугой в Звездной пустыне",
			[DailyQuest.MeditateAtTheBirdNest]: "Помедитируйте у птичьего гнезда в Прерии",
			[DailyQuest.MeditateInTheButterflyFields]: "Помедитируйте на поле бабочек в Прерии",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Медитируйте на Островах укрытия",
			[DailyQuest.MeditateInTheCave]: "Помедитируйте у пещерного алтаря в Прерии",
			[DailyQuest.MeditateByTheKoiPond]: "Помедитируйте у пруда карпов в Прерии",
			[DailyQuest.MeditateAtTheForestClearing]: "Помедитируйте на поляне в Лесу",
			[DailyQuest.MeditateAtTheForestBrook]: "Медитируйте у Лесного ручья",
			[DailyQuest.MeditateAtTheElevatedClearing]: "Помедитируйте на высокой поляне в Лесу",
			[DailyQuest.MeditateAtTheForestEnd]: "Помедитируйте в дальнем конце Леса",
			[DailyQuest.MeditateAtTheBoneyard]: "Помедитируйте на могильнике в Лесу",
			[DailyQuest.MeditateByTheIceRink]: "Помедитируйте у катка Долины",
			[DailyQuest.MeditateAboveTheCitadelsArch]: "Помедитируйте над аркой цитадели Долины",
			[DailyQuest.MeditateHighAboveTheCitadel]: "Помедитируйте высоко над цитаделью Долины",
			[DailyQuest.MeditateAtTheColiseum]: "Помедитируйте в конце гонки",
			[DailyQuest.MeditateInTheBrokenTemple]: "Помедитируйте в развалинах храма",
			[DailyQuest.MeditateInTheForgottenArk]: "Медитируйте в Забытом ковчеге",
			[DailyQuest.MeditateInTheGraveyard]: "Помедитируйте на кладбище",
			[DailyQuest.MeditateOnTheBoat]: "Помедитируйте на лодке",
			[DailyQuest.MeditateOnTheBattlefield]: "Помедитируйте на поле боя",
			[DailyQuest.MeditateAtTheVaultEntrance]: "Помедитируйте у входа в Хранилище знаний",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Помедитируйте на втором этаже Хранилища",
			[DailyQuest.MeditateAtTheVaultSummit]: "Помедитируйте на вершине Хранилища",
			[DailyQuest.CollectGreenLight]: "Соберите зеленый свет",
			[DailyQuest.CollectOrangeLight]: "Соберите оранжевый свет",
			[DailyQuest.CollectBlueLight]: "Соберите синий свет",
			[DailyQuest.CollectRedLight]: "Соберите красный свет",
			[DailyQuest.CollectPurpleLight]: "Соберите пурпурный свет",
			[DailyQuest.PracticeWithTheSkater]: "Попрактикуйтесь с конькобежцем в Деревушке мечтаний",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Прокатитесь с конькобежцем по холмам в Деревушке мечтаний",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Прокатитесь с конькобежцем по горам в Долине Отшельника",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Отрепетируйте выступление в Колизее с конькобежцем",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Отыщите все фрагменты обруча",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Переживите воспоминания Заклинателя бабочек из Полуденной прерии",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Переживите воспоминания Аплодирующего звонаря из Полуденной прерии",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Переживите воспоминания приветливого звонаря из Полуденной прерии",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Переживите воспоминания Сонного корабела из Полуденной прерии",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Переживите воспоминания Смеющегося ловца света из Полуденной прерии",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Переживите воспоминания Голоса птицы из Полуденной прерии",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Переживите воспоминания Измученного грузчика из Полуденной прерии",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Переживите воспоминания Продрогшего первопроходца из Тайного леса",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Переживите воспоминания Краснеющего старателя из Тайного леса",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Переживите воспоминания Первопроходца (прятки) из Тайного леса",
			[DailyQuest.ReliveThePoutyPorter]:
				"Переживите воспоминания Недовольного носильщика из Тайного леса",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Переживите воспоминания Встревоженного охотника из Тайного леса",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Переживите воспоминания Извиняющегося лесоруба из Тайного леса",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Переживите воспоминания Слезливого сборщика света из Тайного леса",
			[DailyQuest.ReliveTheWhaleWhisperer]: "Переживите воспоминания Голоса кита из Тайного леса",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Переживите воспоминания Уверенного туриста из Долины триумфа",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Переживите воспоминания Акробата-трюкача из Долины триумфа",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Переживите воспоминания Голоса манты из Долины триумфа",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Переживите воспоминания Чемпиона по сальто из Долины триумфа",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Переживите воспоминания Веселого зрителя из Долины триумфа",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Переживите воспоминания Кланяющегося медалиста из Долины триумфа",
			[DailyQuest.ReliveTheProudVictor]:
				"Переживите воспоминания Гордого победителя из Долины триумфа",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Переживите воспоминания Напуганного беженца из Золотой пустоши",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Переживите воспоминания Угасающего воина из Золотой пустоши",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Переживите воспоминания Храброго солдата из Золотой пустоши",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Переживите воспоминания Незаметного выжившего из Золотой пустоши",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Переживите воспоминания Морского волка из Золотой пустоши",
			[DailyQuest.ReliveTheLookoutScout]: "Переживите воспоминания Наблюдателя из Золотой пустоши",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Переживите воспоминания Молящегося прислужника из Хранилища знаний",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Переживите воспоминания Левитирующего знатока из Хранилища знаний",
			[DailyQuest.ReliveThePoliteScholar]:
				"Переживите воспоминания Вежливого ученика из Хранилища знаний",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Переживите воспоминания Говорящего с духами из Хранилища знаний",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Переживите воспоминания Медитирующего ученика из Хранилища знаний",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Переживите воспоминания Растягивающегося гуру из Полуденной прерии",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Переживите воспоминания Исполнителя-провокатора из Тайного леса",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Переживите воспоминания Скачущего танцора из Долины триумфа",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Переживите воспоминания Салютующего защитника из Золотой пустоши",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Переживите воспоминания Приветствующего шамана из Хранилища знаний",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Переживите воспоминания Ловца света «дай пять» из Полуденной прерии",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Переживите воспоминания Расслабленного первопроходца из Тайного леса",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Переживите воспоминания Кружащегося чемпиона из Долины триумфа",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Переживите воспоминания Голоса краба из Золотой пустоши",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Переживите воспоминания Шикающего ученика света из Хранилища знаний",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Переживите воспоминания Конфетти-кузена из Полуденной прерии",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Переживите воспоминания Косматого подростка из Тайного леса",
			[DailyQuest.ReliveTheSparklerParent]:
				"Переживите воспоминания Блестящего родителя из Долины триумфа",
			[DailyQuest.ReliveThePleafulParent]:
				"Переживите воспоминания Умоляющего родителя из Золотой пустоши",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Переживите воспоминания Задумчивого творца из Хранилища знаний",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Переживите воспоминания Праздничного танцовщика из Полуденной прерии",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Переживите воспоминания Восхищенного актера из Тайного леса",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Переживите воспоминания Жонглера из труппы из Долины триумфа",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Переживите воспоминания Почтительного пианиста из Золотой пустоши",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Переживите воспоминания Задумчивого творца из Хранилища знаний",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Переживите воспоминания Кивающего стенописца из Золотой пустоши",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Переживите воспоминания Безразличного алхимика из Золотой пустоши",
			[DailyQuest.ReliveTheCrabWalker]: "Переживите воспоминания Крабохода из Золотой пустоши",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Переживите воспоминания Фермера-пугала из Золотой пустоши",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Переживите воспоминания Засыпающего плотника из Золотой пустоши",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Переживите воспоминания Дурачащегося травника из Золотой пустоши",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Переживите воспоминания Шепчущего медузам из Полуденной прерии",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Переживите воспоминания Робкого любителя книг из Полуденной прерии",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Переживите воспоминания Подбодряющего авантюриста из Полуденной прерии",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Переживите воспоминания Странствующего ворчуна из Полуденной прерии",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Переживите воспоминания Благодарного собирателя раковин из Полуденной прерии",
			[DailyQuest.ReliveTheChillSunbather]:
				"Переживите воспоминания Расслабленного пляжника из Полуденной прерии",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Переживите воспоминания Учительницы трюков из Долины триумфа",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Переживите воспоминания Учителя танцев из Долины триумфа",
			[DailyQuest.ReliveThePeekingPostman]:
				"Переживите воспоминания Робкой почтальонки из Долины триумфа",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Переживите воспоминания Отшельника-обнимателя из Долины триумфа",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Переживите воспоминания Растерянной травницы из Тайного леса",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Переживите воспоминания Ворчливой студентки из Тайного леса",
			[DailyQuest.ReliveTheScaredyCadet]: "Переживите воспоминания Кадета-трусишки из Тайного леса",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Переживите воспоминания Марширующей авантюристки из Тайного леса",
			[DailyQuest.ReliveTheChucklingScout]:
				"Переживите воспоминания Хихикающего скаута из Тайного леса",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Переживите воспоминания Мечтательного лесовичка из Тайного леса",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Найдите осколок тьмы, упавший в мир Sky",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Сделать селфи со Странствующим ворчуном в Степных вершинах",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Сделать селфи с духом Голос краба в Степных вершинах",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Сделать селфи с Хохотушкой с пушкой в Степных вершинах",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Сделать селфи с Зазывалой из труппы в Степных вершинах",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Встретьтесь с Синаморолом на холме Птичьей деревни",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Вместе с Синаморолом насладитесь ароматом цветов в Птичьей деревне",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Найдите Синаморола, который гуляет по Птичьей деревне",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Разбудите Синаморола в Птичьей деревне",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Вместе с Синаморолом взлетите на колокольню Птичьей деревни",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Отправляйтесь плескаться вместе с Синаморолом в Птичьей деревне",
			[DailyQuest.PlayAnyTournamentSport]: "Поучаствуйте в любом турнире",
			[DailyQuest.ChangeYourHairstyle]: "Смените прическу",
			[DailyQuest.ChangeYourNecklace]: "Смените ожерелье",
			[DailyQuest.ChangeYourProp]: "Смените аксессуар",
			[DailyQuest.ChangeYourMask]: "Смените маску",
			[DailyQuest.ChangeYourCape]: "Смените накидку",
			[DailyQuest.ChangeYourOutfit]: "Смените штаны",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Посмотрите общее воспоминание в святилище подиума",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Запишите общее воспоминание в святилище подиума",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]: "Разыграйте Командора-начальника",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Соберите команду из игроков (Первопроходец (прятки)) в месте Могильник",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище на Островах укрытия",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище в Тайном лесу",
			[DailyQuest.HelpCeasingCommodoreOrDaydreamForesterFindTreasureInVillageOfDreams]:
				"Помогите Командору-начальнику или Мечтательному лесовичку найти сокровище в Деревушке мечтаний",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInTreasureReef]:
				"Помогите Беспокойной рыбачке или Ворчливой студентке найти сокровище на Острове сокровищ",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInStarlightDesert]:
				"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище в Звёздной пустыне",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInSanctuaryIslands]:
				"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище на Островах укрытия",
			[DailyQuest.HelpTheCeasingCommodoreOrTheDaydreamForesterFindTreasureInHiddenForest]:
				"Помогите Командору-начальнику или Мечтательному лесовичку найти сокровище в Тайном лесу",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInVillageOfDreams]:
				"Помогите Беспокойной рыбачке или Ворчливой студентке найти сокровище в Деревушке мечтаний",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInTreasureReef]:
				"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище на Острове сокровищ",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInStarlightDesert]:
				"Помогите Нерадивому боцману или Проводнику Сезона собрания найти сокровище в Звёздной пустыне",
			[DailyQuest.HelpTheCeasingCommodoreOrTheDaydreamForesterFindTreasureInSanctuaryIslands]:
				"Помогите Командору-начальнику или Мечтательному лесовичку найти сокровище на Островах укрытия",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInHiddenForest]:
				"Помогите Беспокойной рыбачке или Ворчливой студентке найти сокровище в Тайном лесу",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInVillageOfDreams]:
				"Помогите Хохотушке с пушкой или Хихикающему скауту найти сокровище в Деревушке мечтаний",
		},
		seasons: {
			[SeasonId.Gratitude]: "Сезон благодарности",
			[SeasonId.Lightseekers]: "Сезон искателей света",
			[SeasonId.Belonging]: "Сезон сопричастности",
			[SeasonId.Rhythm]: "Сезон ритма",
			[SeasonId.Enchantment]: "Сезон волшебства",
			[SeasonId.Sanctuary]: "Сезон укрытия",
			[SeasonId.Prophecy]: "Сезон пророчества",
			[SeasonId.Dreams]: "Сезон Мечтаний",
			[SeasonId.Assembly]: "Сезон Собрания",
			[SeasonId.LittlePrince]: "Сезон «Маленького принца»",
			[SeasonId.Flight]: "Сезон Полёта",
			[SeasonId.Abyss]: "Сезон бездны",
			[SeasonId.Performance]: "Сезон представлений",
			[SeasonId.Shattering]: "Сезон крушения",
			[SeasonId.AURORA]: "Сезон AURORA",
			[SeasonId.Remembrance]: "Сезон Памяти",
			[SeasonId.Passage]: "Сезон посвящения",
			[SeasonId.Moments]: "Сезон мгновений",
			[SeasonId.Revival]: "Сезон возрождения",
			[SeasonId.NineColouredDeer]: "Сезон Девятицветного оленя",
			[SeasonId.Nesting]: "Сезон гнездования",
			[SeasonId.Duets]: "Сезон дуэтов",
			[SeasonId.Moomin]: "Сезон Муми-троллей",
			[SeasonId.Radiance]: "Сезон сияния",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "Указующий свечной мастер",
			[SpiritId.UsheringStargazer]: "Манящая мечтательница",
			[SpiritId.RejectingVoyager]: "Отказывающийся скиталец",
			[SpiritId.ElderOfTheIsle]: "Древний Острова",
			[SpiritId.ButterflyCharmer]: "Заклинатель бабочек",
			[SpiritId.ApplaudingBellmaker]: "Аплодирующий звонарь",
			[SpiritId.WavingBellmaker]: "Машущий звонарь",
			[SpiritId.SlumberingShipwright]: "Сонный корабел",
			[SpiritId.LaughingLightCatcher]: "Смеющийся ловец света",
			[SpiritId.BirdWhisperer]: "Голос птицы",
			[SpiritId.ExhaustedDockWorker]: "Измученный грузчик",
			[SpiritId.CeremonialWorshiper]: "Торжественный почитатель",
			[SpiritId.ElderOfThePrairie]: "Древний Прерии",
			[SpiritId.ShiveringTrailblazer]: "Продрогший первопроходец",
			[SpiritId.BlushingProspector]: "Краснеющий старатель",
			[SpiritId.HideNSeekPioneer]: "Первопроходец (прятки)",
			[SpiritId.PoutyPorter]: "Недовольный носильщик",
			[SpiritId.DismayedHunter]: "Встревоженный охотник",
			[SpiritId.ApologeticLumberjack]: "Лесоруб извиняется",
			[SpiritId.TearfulLightMiner]: "Слезливый сборщик света",
			[SpiritId.WhaleWhisperer]: "Голос кита",
			[SpiritId.ElderOfTheForest]: "Древний Леса",
			[SpiritId.ConfidentSightseer]: "Уверенный турист",
			[SpiritId.HandstandingThrillseeker]: "Акробат-трюкач",
			[SpiritId.MantaWhisperer]: "Голос манты",
			[SpiritId.BackflippingChampion]: "Чемпион по сальто",
			[SpiritId.CheerfulSpectator]: "Веселый зритель",
			[SpiritId.BowingMedalist]: "Кланяющийся медалист",
			[SpiritId.ProudVictor]: "Гордый победитель",
			[SpiritId.ElderOfTheValley]: "Древний Долины",
			[SpiritId.FrightenedRefugee]: "Напуганный беженец",
			[SpiritId.FaintingWarrior]: "Угасающий воин",
			[SpiritId.CourageousSoldier]: "Храбрый солдат",
			[SpiritId.StealthySurvivor]: "Незаметный выживший",
			[SpiritId.SalutingCaptain]: "Морской волк",
			[SpiritId.LookoutScout]: "Наблюдатель",
			[SpiritId.ElderOfTheWasteland]: "Древний Пустоши",
			[SpiritId.PrayingAcolyte]: "Молящийся прислужник",
			[SpiritId.LevitatingAdept]: "Левитирующий знаток",
			[SpiritId.PoliteScholar]: "Вежливый ученик",
			[SpiritId.MemoryWhisperer]: "Говорящий с духами",
			[SpiritId.MeditatingMonastic]: "Медитирующий ученик",
			[SpiritId.ElderOfTheVault]: "Древний Хранилища",
			[SpiritId.GratitudeGuide]: "Проводник (благодарность)",
			[SpiritId.SassyDrifter]: "Нахальный бродяга",
			[SpiritId.StretchingGuru]: "Растягивающийся гуру",
			[SpiritId.ProvokingPerformer]: "Исполнитель-провокатор",
			[SpiritId.LeapingDancer]: "Скачущий танцор",
			[SpiritId.SalutingProtector]: "Салютующий защитник",
			[SpiritId.GreetingShaman]: "Приветствующий шаман",
			[SpiritId.LightseekerGuide]: "Проводник (искатель света)",
			[SpiritId.PiggybackLightseeker]: "Искатель света на закорках",
			[SpiritId.DoublefiveLightCatcher]: "Ловец света «дай пять»",
			[SpiritId.LaidbackPioneer]: "Расслабленный первопроходец",
			[SpiritId.TwirlingChampion]: "Кружащийся чемпион",
			[SpiritId.CrabWhisperer]: "Голос краба",
			[SpiritId.ShushingLightScholar]: "Шикающий ученик света",
			[SpiritId.BelongingGuide]: "Проводник (сопричастность)",
			[SpiritId.BoogieKid]: "Танцор буги",
			[SpiritId.ConfettiCousin]: "Конфетти-кузен",
			[SpiritId.HairtousleTeen]: "Косматый подросток",
			[SpiritId.SparklerParent]: "Блестящий родитель",
			[SpiritId.PleafulParent]: "Умоляющий родитель",
			[SpiritId.WiseGrandparent]: "Мудрый дедушка",
			[SpiritId.RhythmGuide]: "Проводник (ритм)",
			[SpiritId.TroupeGreeter]: "Зазывала из труппы",
			[SpiritId.FestivalSpinDancer]: "Праздничный танцовщик",
			[SpiritId.AdmiringActor]: "Восхищенный актер",
			[SpiritId.TroupeJuggler]: "Жонглер из труппы",
			[SpiritId.RespectfulPianist]: "Почтительный пианист",
			[SpiritId.ThoughtfulDirector]: "Задумчивый творец",
			[SpiritId.EnchantmentGuide]: "Проводник (волшебство)",
			[SpiritId.NoddingMuralist]: "Кивающий стенописец",
			[SpiritId.IndifferentAlchemist]: "Безразличный алхимик",
			[SpiritId.CrabWalker]: "Крабоход",
			[SpiritId.ScarecrowFarmer]: "Фермер-пугало",
			[SpiritId.SnoozingCarpenter]: "Засыпающий плотник",
			[SpiritId.PlayfightingHerbalist]: "Дурачащийся травник",
			[SpiritId.SanctuaryGuide]: "Проводник по укрытию",
			[SpiritId.JellyWhisperer]: "Шепчущий медузам",
			[SpiritId.TimidBookworm]: "Робкий любитель книг",
			[SpiritId.RallyingThrillseeker]: "Подбодряющий авантюрист",
			[SpiritId.HikingGrouch]: "Странствующий ворчун",
			[SpiritId.GratefulShellCollector]: "Благодарный собиратель раковин",
			[SpiritId.ChillSunbather]: "Расслабленный пляжник",
			[SpiritId.ProphecyGuide]: "Руководство по пророчествам",
			[SpiritId.ProphetOfWater]: "Пророк воды",
			[SpiritId.ProphetOfEarth]: "Пророк земли",
			[SpiritId.ProphetOfAir]: "Пророк воздуха",
			[SpiritId.ProphetOfFire]: "Пророк огня",
			[SpiritId.DreamsGuide]: "Проводник в мечтания",
			[SpiritId.SpinningMentor]: "Учительница трюков",
			[SpiritId.DancingPerformer]: "Учитель танцев",
			[SpiritId.PeekingPostman]: "Робкая почтальонка",
			[SpiritId.BearhugHermit]: "Отшельник-обниматель",
			[SpiritId.AssemblyGuide]: "Проводник Сезона Собрания",
			[SpiritId.BaffledBotanist]: "Растерянная травница",
			[SpiritId.ScoldingStudent]: "Ворчливая студентка",
			[SpiritId.ScaredyCadet]: "Кадет-трусишка",
			[SpiritId.MarchingAdventurer]: "Марширующая авантюристка",
			[SpiritId.ChucklingScout]: "Хихикающий скаут",
			[SpiritId.DaydreamForester]: "Мечтательный лесовичок",
			[SpiritId.TheRose]: "Роза",
			[SpiritId.BeckoningRuler]: "Подзывающий правитель",
			[SpiritId.GloatingNarcissist]: "Торжествующий нарцисс",
			[SpiritId.StretchingLamplighter]: "Потягивающийся фонарщик",
			[SpiritId.SlouchingSoldier]: "Скучающий солдат",
			[SpiritId.SneezingGeographer]: "Чихающий географ",
			[SpiritId.StarCollector]: "Собиратель звезд",
			[SpiritId.FlightGuide]: "Проводник полетов",
			[SpiritId.LivelyNavigator]: "Резвый штурман",
			[SpiritId.LightWhisperer]: "Заклинательница света",
			[SpiritId.TinkeringChimesmith]: "Мастерица колокольных дел",
			[SpiritId.TalentedBuilder]: "Талантливый строитель",
			[SpiritId.AbyssGuide]: "Проводник бездны",
			[SpiritId.AnxiousAngler]: "Беспокойная рыбачка",
			[SpiritId.CeasingCommodore]: "Командор-начальник",
			[SpiritId.BumblingBoatswain]: "Нерадивый боцман",
			[SpiritId.CacklingCannoneer]: "Хохотушка с пушкой",
			[SpiritId.PerformanceGuide]: "Проводник представлений",
			[SpiritId.FranticStagehand]: "Суматошный постановщик",
			[SpiritId.ForgetfulStoryteller]: "Рассеянная рассказчица",
			[SpiritId.MellowMusician]: "Благодушный музыкант",
			[SpiritId.ModestDancer]: "Скромная танцовщица",
			[SpiritId.TheVoidOfShattering]: "Кристалл крушения",
			[SpiritId.AncientLight1]: "Древний Свет (медуза)",
			[SpiritId.AncientLight2]: "Древний Свет (манта)",
			[SpiritId.AncientDarkness1]: "Древняя Тьма (растение)",
			[SpiritId.AncientDarkness2]: "Древняя Тьма (дракон)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Бегущая путница",
			[SpiritId.MindfulMiner]: "Внимательная шахтерка",
			[SpiritId.WarriorOfLove]: "Защитница любви",
			[SpiritId.SeedOfHope]: "Зернышко надежды",
			[SpiritId.RemembranceGuide]: "Проводник Памяти",
			[SpiritId.BereftVeteran]: "Обездоленный ветеран",
			[SpiritId.PleadingChild]: "Молящее дитя",
			[SpiritId.TiptoeingTeaBrewer]: "Крадущаяся чаевница",
			[SpiritId.WoundedWarrior]: "Раненый воин",
			[SpiritId.PassageGuide]: "Проводник посвящения",
			[SpiritId.OddballOutcast]: "Чудаковатый изгой",
			[SpiritId.TumblingTroublemaker]: "Кувыркун-проказник",
			[SpiritId.MelancholyMope]: "Меланхолик",
			[SpiritId.OveractiveOverachiever]: "Гиперактивный трудяга",
			[SpiritId.MomentsGuide]: "Проводник мгновений",
			[SpiritId.ReassuringRanger]: "Надёжный рейнджер",
			[SpiritId.NightbirdWhisperer]: "Заклинательница сов",
			[SpiritId.JollyGeologist]: "Весёлый геолог",
			[SpiritId.AsceticMonk]: "Монах-отшельник",
			[SpiritId.HopefulSteward]: "Неунывающий смотритель",
			[SpiritId.VestigeOfADesertedOasis]: "Останки заброшенного оазиса",
			[SpiritId.MemoryOfALostVillage]: "Память об оставленной деревне",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Эхо покинутого убежища",
			[SpiritId.RemnantOfAForgottenHaven]: "Следы забытой гавани",
			[SpiritId.SpiritOfMural]: "духу фрески",
			[SpiritId.HerbGatherer]: "Сборщик трав",
			[SpiritId.Hunter]: "Охотник",
			[SpiritId.FeudalLord]: "Феодальный господин",
			[SpiritId.Princess]: "Принцесса",
			[SpiritId.NestingGuide]: "Проводник гнездования",
			[SpiritId.NestingSolarium]: "Гнездовой солярий",
			[SpiritId.NestingLoft]: "Гнездовой лофт",
			[SpiritId.NestingAtrium]: "Гнездовой атриум",
			[SpiritId.NestingNook]: "Уголок гнездования",
			[SpiritId.DuetsGuide]: "Проводник дуэтов",
			[SpiritId.TheCellistsBeginnings]: "Становление виолончелиски",
			[SpiritId.ThePianistsBeginnings]: "Становление пианиста",
			[SpiritId.TheMusiciansLegacy]: "Наследие музыкантов",
			[SpiritId.TheCellistsFlourishing]: "Зенит виолончелиски",
			[SpiritId.ThePianistsFlourishing]: "Зенит пианиста",
			[SpiritId.TheMoominStorybook]: "Книга Муми-троллей",
			[SpiritId.ComfortOfKindness]: "Комфорт доброты",
			[SpiritId.SenseOfSelf]: "Самосознание",
			[SpiritId.SpiritOfAdventure]: "Дух приключений",
			[SpiritId.InspirationOfInclusion]: "Вдохновение инклюзивности",
			[SpiritId.RadianceGuide]: "Проводник сияния",
			[SpiritId.RadianceLeapingDancer]: "Скачущий танцор сияния",
			[SpiritId.RadianceProvokingPerformer]: "Исполнитель-провокатор сияния",
			[SpiritId.RadianceGreetingShaman]: "Приветствующий шаман сияния",
		},
	},
} as const;
