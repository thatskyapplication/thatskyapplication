import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		realms: {
			[RealmName.IslesOfDawn]: "Ilha do Alvorecer",
			[RealmName.DaylightPrairie]: "Campina da Aurora",
			[RealmName.HiddenForest]: "Floresta Oculta",
			[RealmName.ValleyOfTriumph]: "Vale do Triunfo",
			[RealmName.GoldenWasteland]: "Sertão Dourado",
			[RealmName.VaultOfKnowledge]: "Relicário do Conhecimento",
			[RealmName.EyeOfEden]: "Olho de Éden",
		},
		maps: { [SkyMap.JellyfishCove]: "Enseada das Águas-vivas" },
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Obter 30 fragmentos de luz",
			[DailyQuest.Light20Candles]: "Acender 20 velas",
			[DailyQuest.ForgeACandle]: "Confeccionar uma vela",
			[DailyQuest.Melt10Darkness]: "Dissipar 10 escuridões",
			[DailyQuest.BowAtAPlayer]: "Curvar-se perante um jogador",
			[DailyQuest.FollowAFriend]: "Siga um amigo",
			[DailyQuest.HugAFriend]: "Abraçar um amigo",
			[DailyQuest.WaveToAFriend]: "Dar tchau para um amigo",
			[DailyQuest.HoldAFriendsHand]: "Segurar a mão de um amigo",
			[DailyQuest.SendAGiftToAFriend]: "Enviar um presente para um amigo",
			[DailyQuest.MakeANewAcquaintance]: "Conhecer alguém novo",
			[DailyQuest.HighFiveAFriend]: "Cumprimentar um amigo com um “toca aí”",
			[DailyQuest.UseAnExpressionNearAFriend]: "Use uma expressão perto de um amigo",
			[DailyQuest.SitOnABenchWithAStranger]: "Sentar em um banco ao lado de um estranho",
			[DailyQuest.RechargeFromAJellyfish]: "Recarregar sua luz com uma água-viva",
			[DailyQuest.RechargeFromALightBloom]: "Recarregar sua luz com um florescer luminoso",
			[DailyQuest.RideWithAManta]: "Passeie com uma arraia",
			[DailyQuest.ReliveASpiritsMemories]: "Reviver as memórias de um espírito",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Reviva as memórias de um espírito na Campina da Aurora",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Reviva as memórias de um espírito na Floresta Oculta",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Reviva as memórias de um espírito no Vale do Triunfo",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Reviva as memórias de um espírito no Sertão Dourado",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Reviva as memórias de um espírito no Relicário do Conhecimento",
			[DailyQuest.FaceTheDarkDragon]: "Enfrentar o Dragão Sombrio",
			[DailyQuest.KnockOver5DarkCrabs]: "Derrubar 5 caranguejos de criaturas da escuridão",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Pegue a luz na Campina da Aurora",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Pegue a luz na Floresta Oculta",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Pegue a luz no Vale do Triunfo",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Pegue a luz nas Terras Abandonadas Douradas",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Pegue a luz no Relicário do Conhecimento",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Visite o esconderijo aconchegante nas Cavernas da Campina",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Visite a mesa do Ancestral do Pertencer na clareira elevada da Floresta",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
				"Visite as águas termais na Aldeia dos Sonhos",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: "Visite a fogueira no Túmulo do Sertão",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]:
				"Admire o broto na Aurora's Campina por um curto período de tempo",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]:
				"Admire o broto na Floresta Escondida por um curto período de tempo",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"Admire o broto no Vale do Triunfo por um curto período de tempo",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"Admire o broto no Sertão Dourado por um curto período de tempo",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"Admire o broto no Reliquário do Conhecimento por um curto período de tempo",
			[DailyQuest.VisitThePollutedGeyser]: "Visite o gêiser poluído nas Ilhas do Santuário",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Livre o Santuário do Vórtice das Trevas",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Econtre as velas no fim do arco-íris na Campina da Aurora",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Encontre as velas no fim do arco-íris na Floresta Oculta",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Encontre as velas no fim do arco-íris no Vale do Triunfo",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Encontre as velas no fim do arco-íris no Sertão Dourado",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Encontre as velas no fim do arco-íris no Relicário do Conhecimento",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]:
				"Admire o arco-íris nas Ilhas do Santuário por um breve momento",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]:
				"Admire o arco-íris nas Trilhas do Vento por um breve momento",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]:
				"Admire o arco-íris no Desfiladeiro do Iéti por um breve momento",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]:
				"Admire o arco-íris no Recife do Tesouro por um breve momento",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]:
				"Admire o arco-íris no Deserto da Luz Estelar por um breve momento",
			[DailyQuest.MeditateAtTheBirdNest]: "Meditar no altar do ninho da Campina",
			[DailyQuest.MeditateInTheButterflyFields]: "Meditar no campo de borboletas da Campina",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Meditar nas Ilhas do Santuário",
			[DailyQuest.MeditateInTheCave]: "Meditar no altar da caverna da Campina",
			[DailyQuest.MeditateByTheKoiPond]: "Meditar na lagoa de carpas da Campina",
			[DailyQuest.MeditateAtTheForestClearing]: "Meditar na clareira da Floresta",
			[DailyQuest.MeditateAtTheForestBrook]: "Medite sobre o riacho da floresta",
			[DailyQuest.MeditateAtTheElevatedClearing]: "Meditar na clareira elevada da Floresta",
			[DailyQuest.MeditateAtTheForestEnd]: "Meditar no fim da Floresta",
			[DailyQuest.MeditateAtTheBoneyard]: "Meditar no ossário da Floresta",
			[DailyQuest.MeditateByTheIceRink]: "Meditar perto da pista de gelo do Vale",
			[DailyQuest.MeditateAboveTheCitadelsArch]: "Meditar sobre o arco da cidadela do Vale",
			[DailyQuest.MeditateHighAboveTheCitadel]: "Meditar acima da cidadela do Vale",
			[DailyQuest.MeditateAtTheColiseum]: "Medite no final da corrida",
			[DailyQuest.MeditateInTheBrokenTemple]: "Meditar no templo em ruínas",
			[DailyQuest.MeditateInTheForgottenArk]: "Meditar na Arca Esquecida",
			[DailyQuest.MeditateInTheGraveyard]: "Meditar no cemitério",
			[DailyQuest.MeditateOnTheBoat]: "Meditar no barco",
			[DailyQuest.MeditateOnTheBattlefield]: "Meditar no campo de batalha",
			[DailyQuest.MeditateAtTheVaultEntrance]: "Meditar na entrada do Relicário do Conhecimento",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Meditar no segundo andar do Relicário",
			[DailyQuest.MeditateAtTheVaultSummit]: "Meditar no cume do Relicário",
			[DailyQuest.CollectGreenLight]: "Colete Luz Verde",
			[DailyQuest.CollectOrangeLight]: "Colete Luz Laranja",
			[DailyQuest.CollectBlueLight]: "Colete Luz Azul",
			[DailyQuest.CollectRedLight]: "Colete Luz Vermelha",
			[DailyQuest.CollectPurpleLight]: "Colete Luz Roxa",
			[DailyQuest.PracticeWithTheSkater]: "Pratique com a Patinadora na Aldeia dos Sonhos",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Desça as ladeiras com a Patinadora na Aldeia dos Sonhos",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Desça a montanha com a Patinadora na Aldeia do Ermitão",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Ensaie para uma apresentação com a Patinadora no Coliseu",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Conclua a caça ao tesouro do aro",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Reviva as lembranças do Encantador de Borboletas na Campina da Aurora",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Reviva as lembranças da Sineira que Aplaude na Campina da Aurora",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Reviva as lembranças do Sineiro que Acena na Campina da Aurora",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Reviva as lembranças do Fabricador de Barcos Sonolento na Campina da Aurora",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Reviva as lembranças da Caçadora de Luz Risonha na Campina da Aurora",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Reviva as lembranças do Encantador de Aves na Campina da Aurora",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Reviva as lembranças do Estivador Cansado na Campina da Aurora",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Reviva as lembranças da Pioneira Tremendo na Floresta Oculta",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Reviva as lembranças da Garimpeira Ruborizada na Floresta Oculta",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Reviva as lembranças do Pioneiro de Esconde-esconde na Floresta Oculta",
			[DailyQuest.ReliveThePoutyPorter]:
				"Reviva as lembranças do Porteiro Mal-humorado na Floresta Oculta",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Reviva as lembranças da Caçadora Desmaiada na Floresta Oculta",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Reviva as lembranças do Lenhador Apologético na Floresta Oculta",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Reviva as lembranças da Mineradora de Luz Triste na Floresta Oculta",
			[DailyQuest.ReliveTheWhaleWhisperer]:
				"Reviva as lembranças do Encantador de Baleias na Floresta Oculta",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Reviva as lembranças do Turista Confidente no Vale do Triunfo",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Reviva as lembranças do Amante da Adrenalina de Ponta Cabeça no Vale do Triunfo",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Reviva as lembranças do Encantador de Arraias no Vale do Triunfo",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Reviva as lembranças do Campeão dando Cambalhota no Vale do Triunfo",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Reviva as lembranças do Espectador Vibrante no Vale do Triunfo",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Reviva as lembranças do Medalhista Curvando-se no Vale do Triunfo",
			[DailyQuest.ReliveTheProudVictor]:
				"Reviva as lembranças da Vitoriosa Orgulhosa no Vale do Triunfo",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Reviva as lembranças da Refugiada Assustada no Sertão Dourado",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Reviva as lembranças da Guerreira Desmaiada no Sertão Dourado",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Reviva as lembranças do Soldado Valente no Sertão Dourado",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Reviva as lembranças da Sobrevivente Furtiva no Sertão Dourado",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Reviva as lembranças do Capitão Saudoso no Sertão Dourado",
			[DailyQuest.ReliveTheLookoutScout]: "Reviva as lembranças do Olheiro Vigia no Sertão Dourado",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Reviva as lembranças do Acólito que Reza no Relicário do Conhecimento",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Reviva as lembranças da Adepta Levitante no Relicário do Conhecimento",
			[DailyQuest.ReliveThePoliteScholar]:
				"Reviva as lembranças da Estudante Educada no Relicário do Conhecimento",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Reviva as lembranças do Encantador de Espíritos no Relicário do Conhecimento",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Reviva as lembranças do Intelectual Meditante no Relicário do Conhecimento",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Reviva as lembranças do Guru Alongando na Campina da Aurora",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Reviva as lembranças do Artista Provocante na Floresta Oculta",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Reviva as lembranças do Dançarino Saltitante no Vale do Triunfo",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Reviva as lembranças do Protetor Saudoso no Sertão Dourado",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Reviva as lembranças do Xamã Acolhedor no Relicário do Conhecimento",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Reviva as lembranças do Caçador de Luz Celebrante na Campina da Aurora",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Reviva as lembranças do Pioneiro Descontraído na Floresta Oculta",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Reviva as lembranças do Campeão de Giros no Vale do Triunfo",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Reviva as lembranças da Encantadora de Caranguejos no Sertão Dourado",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Reviva as lembranças do Estudioso da Luz Silenciador no Relicário do Conhecimento",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Reviva as lembranças da Prima do Confete na Campina da Aurora",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Reviva as lembranças do Adolescente Desgrenhado na Floresta Oculta",
			[DailyQuest.ReliveTheSparklerParent]:
				"Reviva as lembranças da Mãe Cintilante no Vale do Triunfo",
			[DailyQuest.ReliveThePleafulParent]:
				"Reviva as lembranças do Pai Suplicante no Sertão Dourado",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Reviva as lembranças do Diretor Pensativo no Relicário do Conhecimento",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Reviva as lembranças da Dançarina Rodopiante de Festival na Campina da Aurora",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Reviva as lembranças do Ator Admirado na Floresta Oculta",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Reviva as lembranças do Malabarista da Trupe no Vale do Triunfo",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Reviva as lembranças da Pianista Respeitosa no Sertão Dourado",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Reviva as lembranças do Diretor Pensativo no Relicário do Conhecimento",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Reviva as lembranças da Muralista Concordante no Sertão Dourado",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Reviva as lembranças do Alquimista Indiferente no Sertão Dourado",
			[DailyQuest.ReliveTheCrabWalker]:
				"Reviva as lembranças do Caranguejo Andarilho no Sertão Dourado",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Reviva as lembranças do Fazendeiro Espantalho no Sertão Dourado",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Reviva as lembranças da Carpinteira Dorminhoca no Sertão Dourado",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Reviva as lembranças da Herbalista Lutadora no Sertão Dourado",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Reviva as lembranças da Água-viva Sussurrante na Campina da Aurora",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Reviva as lembranças do Bibliófilo Tímido na Campina da Aurora",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Reviva as lembranças do Amante da Adrenalina Motivador na Campina da Aurora",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Reviva as lembranças do Caminhante Resmungão na Campina da Aurora",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Reviva as lembranças da Colecionadora de Conchas Agradecida na Campina da Aurora",
			[DailyQuest.ReliveTheChillSunbather]:
				"Reviva as lembranças do Banhista Relaxado na Campina da Aurora",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Reviva as lembranças da Mentora do Giro no Vale do Triunfo",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Reviva as lembranças do Dançarino no Vale do Triunfo",
			[DailyQuest.ReliveThePeekingPostman]:
				"Reviva as lembranças da Carteira Tímida no Vale do Triunfo",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Reviva as lembranças do Iéti do Abraço de Urso no Vale do Triunfo",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Reviva as lembranças do Botanista Boquiaberto na Floresta Oculta",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Reviva as lembranças do Estudante Esbravejante na Floresta Oculta",
			[DailyQuest.ReliveTheScaredyCadet]:
				"Reviva as lembranças do Cadete Cauteloso na Floresta Oculta",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Reviva as lembranças da Aventureira Marchante na Floresta Oculta",
			[DailyQuest.ReliveTheChucklingScout]:
				"Reviva as lembranças do Batedor Risonho na Floresta Oculta",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Reviva as lembranças do Silvicultor Sonhador na Floresta Oculta",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Visite um fragmento da escuridão que caiu no Reino de Sky",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Tire uma selfie com o Caminhante Resmungão nos Picos da Campina",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Tire uma selfie com a Encantadora de Caranguejos nos Picos da Campina",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Tire uma selfie com a Canhoneira Sorridente nos Picos da Campina",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Tire uma selfie com o Cumprimentador da Trupe nos Picos da Campina",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Encontre Cinnamoroll em uma colina na Aldeia Aviária.",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Cheire flores com o Cinnamoroll na Aldeia Aviária.",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Encontre Cinnamoroll explorand a Aldeia Aviária.",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Acorde Cinnamoroll na Aldeia Aviária.",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Voe até a torre com Cinnamoroll na Aldeia Aviária.",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Pule na água com Cinnamoroll na Aldeia Aviária.",
			[DailyQuest.PlayAnyTournamentSport]: "Jogue qualquer esporte do torneio",
			[DailyQuest.ChangeYourHairstyle]: "Trocar de corte de cabelo",
			[DailyQuest.ChangeYourNecklace]: "Troque o colar",
			[DailyQuest.ChangeYourProp]: "Troque os apetrechos",
			[DailyQuest.ChangeYourMask]: "Trocar de máscara",
			[DailyQuest.ChangeYourCape]: "Trocar de capa",
			[DailyQuest.ChangeYourOutfit]: "Trocar de calças",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Veja uma memória compartilhada em um altar de passarela de moda",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Grave uma memória compartilhada em um altar de passarela de moda",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
				"Faça uma pegadinha com o Comodoro Abandonado",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Encontre-se com Pioneiro de esconde-esconde em Cemitério",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Ajude a Canhoneira Sorridente ou o <1>Batedor Risonho</1> a encontrar tesouros nas Ilhas do Santuário",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Ajude o Contramestre Trapalhão ou o <1>Guia da União</1> a encontrar tesouros na Floresta Oculta",
		},
		seasons: {
			[SeasonId.Gratitude]: "Temporada da Gratidão",
			[SeasonId.Lightseekers]: "Temporada dos Caçadores de Luz",
			[SeasonId.Belonging]: "Temporada do Pertencer",
			[SeasonId.Rhythm]: "Temporada do Rítmo",
			[SeasonId.Enchantment]: "Temporada dos Encantos",
			[SeasonId.Sanctuary]: "Temporada do Santuário",
			[SeasonId.Prophecy]: "Temporada da Profecia",
			[SeasonId.Dreams]: "Temporada dos Sonhos",
			[SeasonId.Assembly]: "Temporada da União",
			[SeasonId.LittlePrince]: "Temporada do Pequeno Príncipe",
			[SeasonId.Flight]: "Temporada de Vôo",
			[SeasonId.Abyss]: "Temporada do Abismo",
			[SeasonId.Performance]: "Temporada da Performance",
			[SeasonId.Shattering]: "Temporada do Despedaçar",
			[SeasonId.AURORA]: "Temporada da AURORA",
			[SeasonId.Remembrance]: "Temporada da Recordação",
			[SeasonId.Passage]: "A Temporada da Passagem",
			[SeasonId.Moments]: "Temporada dos Momentos",
			[SeasonId.Revival]: "Temporada do Reavivamento",
			[SeasonId.NineColouredDeer]: "Temporada do Cervo de Nove Cores",
			[SeasonId.Nesting]: "Temporada do Ninho",
			[SeasonId.Duets]: "Temporada de Duetos",
			[SeasonId.Moomin]: "Temporada dos Mumins",
			[SeasonId.Radiance]: "Temporada do Resplendor",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "Candeeiro Denotante",
			[SpiritId.UsheringStargazer]: "Astrólogo Convidativo",
			[SpiritId.RejectingVoyager]: "Viajante em negação",
			[SpiritId.ElderOfTheIsle]: "Ancião da Ilha",
			[SpiritId.ButterflyCharmer]: "Encantador de borboletas",
			[SpiritId.ApplaudingBellmaker]: "Sineira que aplaude",
			[SpiritId.WavingBellmaker]: "Sineiro que acena",
			[SpiritId.SlumberingShipwright]: "Fabricador de barcos sonolento",
			[SpiritId.LaughingLightCatcher]: "Caçadora de luz risonha",
			[SpiritId.BirdWhisperer]: "Comunicador de aves",
			[SpiritId.ExhaustedDockWorker]: "Estivador cansado",
			[SpiritId.CeremonialWorshiper]: "Adorador cerimonial",
			[SpiritId.ElderOfThePrairie]: "Anciã da Campina",
			[SpiritId.ShiveringTrailblazer]: "Pioneira tremendo",
			[SpiritId.BlushingProspector]: "Garimpeira ruborizada",
			[SpiritId.HideNSeekPioneer]: "Pioneiro de esconde-esconde",
			[SpiritId.PoutyPorter]: "Porteiro mal-humorado",
			[SpiritId.DismayedHunter]: "Caçadora desmaiada",
			[SpiritId.ApologeticLumberjack]: "Lenhador apologético",
			[SpiritId.TearfulLightMiner]: "Mineradora de luz triste",
			[SpiritId.WhaleWhisperer]: "Comunicador de baleias",
			[SpiritId.ElderOfTheForest]: "Anciã da Floresta",
			[SpiritId.ConfidentSightseer]: "Turista confidente",
			[SpiritId.HandstandingThrillseeker]: "Amante da adrenalina de ponta cabeça",
			[SpiritId.MantaWhisperer]: "Comunicador de arraia",
			[SpiritId.BackflippingChampion]: "Campeão dando cambalhota",
			[SpiritId.CheerfulSpectator]: "Espectador vibrante",
			[SpiritId.BowingMedalist]: "Medalhista curvando-se",
			[SpiritId.ProudVictor]: "Vitoriosa orgulhosa",
			[SpiritId.ElderOfTheValley]: "Ancião do Vale",
			[SpiritId.FrightenedRefugee]: "Refugiada assustada",
			[SpiritId.FaintingWarrior]: "Guerreira desmaiada",
			[SpiritId.CourageousSoldier]: "Soldado valente",
			[SpiritId.StealthySurvivor]: "Sobrevivente furtiva",
			[SpiritId.SalutingCaptain]: "Capitão saudoso",
			[SpiritId.LookoutScout]: "Olheiro vigia",
			[SpiritId.ElderOfTheWasteland]: "Ancião do Sertão",
			[SpiritId.PrayingAcolyte]: "Acólito que reza",
			[SpiritId.LevitatingAdept]: "Adepta levitante",
			[SpiritId.PoliteScholar]: "Estudante educada",
			[SpiritId.MemoryWhisperer]: "Comunicador de espíritos",
			[SpiritId.MeditatingMonastic]: "Intelectual meditante",
			[SpiritId.ElderOfTheVault]: "Anciã do Relicário",
			[SpiritId.GratitudeGuide]: "Guia da gratidão",
			[SpiritId.SassyDrifter]: "Andarilho Ousado",
			[SpiritId.StretchingGuru]: "Guru alongando",
			[SpiritId.ProvokingPerformer]: "Artista provocante",
			[SpiritId.LeapingDancer]: "Dançarino saltitante",
			[SpiritId.SalutingProtector]: "Protetor saudoso",
			[SpiritId.GreetingShaman]: "Xamã acolhedor",
			[SpiritId.LightseekerGuide]: "Guia buscador da luz",
			[SpiritId.PiggybackLightseeker]: "Buscadora da luz de carona",
			[SpiritId.DoublefiveLightCatcher]: "Caçador de luz celebrante",
			[SpiritId.LaidbackPioneer]: "Pioneiro descontraído",
			[SpiritId.TwirlingChampion]: "Campeão de giros",
			[SpiritId.CrabWhisperer]: "Comunicador de carangueijo",
			[SpiritId.ShushingLightScholar]: "Estudioso da luz silenciador",
			[SpiritId.BelongingGuide]: "Guia do pertencer",
			[SpiritId.BoogieKid]: "Criança dançarina",
			[SpiritId.ConfettiCousin]: "Prima do confete",
			[SpiritId.HairtousleTeen]: "Adolescente desgrenhado",
			[SpiritId.SparklerParent]: "Mãe cintilante",
			[SpiritId.PleafulParent]: "Pai suplicante",
			[SpiritId.WiseGrandparent]: "Avô sábio",
			[SpiritId.RhythmGuide]: "Guia do ritmo",
			[SpiritId.TroupeGreeter]: "Trupe de comprimentadores",
			[SpiritId.FestivalSpinDancer]: "Dançarina rodopiante de festival",
			[SpiritId.AdmiringActor]: "Ator admirado",
			[SpiritId.TroupeJuggler]: "Malabarista da trupe",
			[SpiritId.RespectfulPianist]: "Pianista respeitosa",
			[SpiritId.ThoughtfulDirector]: "Diretor pensativo",
			[SpiritId.EnchantmentGuide]: "Guia do encanto",
			[SpiritId.NoddingMuralist]: "Muralista concordante",
			[SpiritId.IndifferentAlchemist]: "Alquimista indiferente",
			[SpiritId.CrabWalker]: "Caranguejo andarilho",
			[SpiritId.ScarecrowFarmer]: "Fazendeiro espantalho",
			[SpiritId.SnoozingCarpenter]: "Carpinteira dorminhoca",
			[SpiritId.PlayfightingHerbalist]: "Herbalista lutadora",
			[SpiritId.SanctuaryGuide]: "Guia do santuário",
			[SpiritId.JellyWhisperer]: "Água-viva sussurrante",
			[SpiritId.TimidBookworm]: "Bibliófilo tímido",
			[SpiritId.RallyingThrillseeker]: "Amante da adrenalina motivador",
			[SpiritId.HikingGrouch]: "Caminhante resmungão",
			[SpiritId.GratefulShellCollector]: "Colecionadora de conchas agradecida",
			[SpiritId.ChillSunbather]: "Banhista relaxado",
			[SpiritId.ProphecyGuide]: "Guia da profecia",
			[SpiritId.ProphetOfWater]: "Profeta da água",
			[SpiritId.ProphetOfEarth]: "Profeta da terra",
			[SpiritId.ProphetOfAir]: "Profeta do ar",
			[SpiritId.ProphetOfFire]: "Profeta do fogo",
			[SpiritId.DreamsGuide]: "Guia dos Sonhos",
			[SpiritId.SpinningMentor]: "Mentora do Giro",
			[SpiritId.DancingPerformer]: "Dançarino",
			[SpiritId.PeekingPostman]: "Carteira Tímida",
			[SpiritId.BearhugHermit]: "Iéti do Abraço de Urso",
			[SpiritId.AssemblyGuide]: "Guia da União",
			[SpiritId.BaffledBotanist]: "Botanista boquiaberto",
			[SpiritId.ScoldingStudent]: "Estudante esbravejante",
			[SpiritId.ScaredyCadet]: "Cadete cauteloso",
			[SpiritId.MarchingAdventurer]: "Aventureira marchante",
			[SpiritId.ChucklingScout]: "Batedor risonho",
			[SpiritId.DaydreamForester]: "Silvicultor sonhador",
			[SpiritId.TheRose]: "A Rosa",
			[SpiritId.BeckoningRuler]: "Rei acenando",
			[SpiritId.GloatingNarcissist]: "Vaidoso Narcisista",
			[SpiritId.StretchingLamplighter]: "Acendedor de lampiões se esticando",
			[SpiritId.SlouchingSoldier]: "Soldado relaxado",
			[SpiritId.SneezingGeographer]: "Geógrafo espirrando",
			[SpiritId.StarCollector]: "Contador de estrelas",
			[SpiritId.FlightGuide]: "Guia de Voo",
			[SpiritId.LivelyNavigator]: "Navegante Vigoroso",
			[SpiritId.LightWhisperer]: "Domadora de Luzes",
			[SpiritId.TinkeringChimesmith]: "Forjadora de Sinos",
			[SpiritId.TalentedBuilder]: "Construtor Engenhoso",
			[SpiritId.AbyssGuide]: "Guia do Abismo",
			[SpiritId.AnxiousAngler]: "Pescadora Ansiosa",
			[SpiritId.CeasingCommodore]: "Comodoro Abandonado",
			[SpiritId.BumblingBoatswain]: "Contramestre Trapalhão",
			[SpiritId.CacklingCannoneer]: "Canhoneira Sorridente",
			[SpiritId.PerformanceGuide]: "Guia de Performance",
			[SpiritId.FranticStagehand]: "Assistente de Palco Frenético",
			[SpiritId.ForgetfulStoryteller]: "Contadora de Histórias Esquecidiça",
			[SpiritId.MellowMusician]: "Músico Meloso",
			[SpiritId.ModestDancer]: "Dançarina Modesta",
			[SpiritId.TheVoidOfShattering]: "O Vazio Despedaçado",
			[SpiritId.AncientLight1]: "Luz Antiga (Água-Viva)",
			[SpiritId.AncientLight2]: "Luz Antiga (Manta)",
			[SpiritId.AncientDarkness1]: "Escuridão Antiga (Planta)",
			[SpiritId.AncientDarkness2]: "Escuridão Antiga (Dragão)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Viajante de Corrida",
			[SpiritId.MindfulMiner]: "Mineradora Consciente",
			[SpiritId.WarriorOfLove]: "Guerreira do Amor",
			[SpiritId.SeedOfHope]: "Semente de Esperança",
			[SpiritId.RemembranceGuide]: "Guia da Recordação",
			[SpiritId.BereftVeteran]: "Veterano Despojado",
			[SpiritId.PleadingChild]: "Criança Suplicante",
			[SpiritId.TiptoeingTeaBrewer]: "Fabricante de Chá na Ponta dos Pés",
			[SpiritId.WoundedWarrior]: "Guerreiro Ferido",
			[SpiritId.PassageGuide]: "Guia da Passagem",
			[SpiritId.OddballOutcast]: "Pária Pateta",
			[SpiritId.TumblingTroublemaker]: "Instigante Instável",
			[SpiritId.MelancholyMope]: "Jeca Jururu",
			[SpiritId.OveractiveOverachiever]: "Empolgante Exigente",
			[SpiritId.MomentsGuide]: "Guia dos Momentos",
			[SpiritId.ReassuringRanger]: "Guarda-florestal Tranquilizador",
			[SpiritId.NightbirdWhisperer]: "Domadora de Aves Noturnas",
			[SpiritId.JollyGeologist]: "Geóloga Divertida",
			[SpiritId.AsceticMonk]: "Monge Asceta",
			[SpiritId.HopefulSteward]: "Gestor Otimista",
			[SpiritId.VestigeOfADesertedOasis]: "Vestígio de um oásis deserto",
			[SpiritId.MemoryOfALostVillage]: "Lembrança de uma Aldeia Perdida",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Eco de um Refúgio Abandonado",
			[SpiritId.RemnantOfAForgottenHaven]: "Resquício de um Abrigo Esquecido",
			[SpiritId.SpiritOfMural]: "Espírito do Mural",
			[SpiritId.HerbGatherer]: "Coletor de ervas",
			[SpiritId.Hunter]: "Caçador",
			[SpiritId.FeudalLord]: "Senhor feudal",
			[SpiritId.Princess]: "Princesa",
			[SpiritId.NestingGuide]: "Guia do Ninho",
			[SpiritId.NestingSolarium]: "Solarium do Ninho",
			[SpiritId.NestingLoft]: "Loft do Ninho",
			[SpiritId.NestingAtrium]: "Átrio do Ninho",
			[SpiritId.NestingNook]: "Recanto do Ninho",
			[SpiritId.DuetsGuide]: "Guia de Duetos",
			[SpiritId.TheCellistsBeginnings]: "Os Primórdios da Violoncelista",
			[SpiritId.ThePianistsBeginnings]: "Os Primórdios do Pianista",
			[SpiritId.TheMusiciansLegacy]: "O Legado dos Músicos",
			[SpiritId.TheCellistsFlourishing]: "Desabrochar da Violoncelista",
			[SpiritId.ThePianistsFlourishing]: "O Desabrochar do Pianista",
			[SpiritId.TheMoominStorybook]: "Livro de Histórias dos Mumins",
			[SpiritId.ComfortOfKindness]: "Conforto da Bondade",
			[SpiritId.SenseOfSelf]: "Senso de Identidade",
			[SpiritId.SpiritOfAdventure]: "Espírito de Aventura",
			[SpiritId.InspirationOfInclusion]: "Inspiração de Inclusão",
			[SpiritId.RadianceGuide]: "Guia do Resplendor",
			[SpiritId.RadianceLeapingDancer]: "Dançarino Saltitante do Resplendor",
			[SpiritId.RadianceProvokingPerformer]: "Artista Provocante do Resplendor",
			[SpiritId.RadianceGreetingShaman]: "Xamã Acolhedor do Resplendor",
		},
	},
} as const;
