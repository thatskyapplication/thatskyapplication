import { RealmName, SkyMap } from "../kingdom.js";
import { NotificationType } from "../notifications.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		back: "Retour",
		next: "Suivant",
		"event-tickets": "Devise d'Événement",
		realms: {
			[RealmName.IslesOfDawn]: "Île de l'aube",
			[RealmName.DaylightPrairie]: "Prairie illuminée",
			[RealmName.HiddenForest]: "Forêt cachée",
			[RealmName.ValleyOfTriumph]: "Vallée du triomphe",
			[RealmName.GoldenWasteland]: "Désert d'or",
			[RealmName.VaultOfKnowledge]: "Chambre forte de connaissance",
			[RealmName.EyeOfEden]: "Œil d'Éden",
		},
		maps: { [SkyMap.JellyfishCove]: "Crique aux Méduses" },
		"notification-types": {
			[NotificationType.PollutedGeyser]: "Geyser Pollué",
			[NotificationType.Grandma]: "Mamie",
			[NotificationType.Turtle]: "Tortue",
			[NotificationType.DailyReset]: "Reset Quotidien",
			[NotificationType.EyeOfEden]: "Œil d'Éden",
			[NotificationType.InternationalSpaceStation]: "Station spatiale internationale",
			[NotificationType.RegularShardEruption]: "Faible Éruption d'Éclats",
			[NotificationType.StrongShardEruption]: "Forte Éruption d'Éclats",
			[NotificationType.AURORA]: "AURORA",
			[NotificationType.Passage]: "Initiation",
			[NotificationType.AviarysFireworkFestival]: "Feux d'artifices du Village Volière",
			[NotificationType.Dragon]: "Dragon",
			[NotificationType.TravellingSpirit]: "Esprit voyageur",
		},
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Récupérez 30 morceaux de lumière",
			[DailyQuest.Light20Candles]: "Allumez 20 bougies",
			[DailyQuest.ForgeACandle]: "Forgez une bougie",
			[DailyQuest.Melt10Darkness]: "Brûlez 10 ténèbres",
			[DailyQuest.BowAtAPlayer]: "Inclinez-vous face à un joueur",
			[DailyQuest.FollowAFriend]: "Suivez un ami",
			[DailyQuest.HugAFriend]: "Faites un câlin à un ami",
			[DailyQuest.WaveToAFriend]: "Faites signe à un ami",
			[DailyQuest.HoldAFriendsHand]: "Tenez la main d'un ami",
			[DailyQuest.SendAGiftToAFriend]: "Envoyez un cadeau a un ami",
			[DailyQuest.MakeANewAcquaintance]: "Faites une nouvelle connaissance",
			[DailyQuest.HighFiveAFriend]: "Topez-là avec un ami",
			[DailyQuest.UseAnExpressionNearAFriend]: "Utilisez une expression à côté d'un ami",
			[DailyQuest.SitOnABenchWithAStranger]: "Asseyez-vous sur un banc avec un étranger",
			[DailyQuest.RechargeFromAJellyfish]: "Rechargez votre lumière auprès d'une méduse",
			[DailyQuest.RechargeFromALightBloom]: "Rechargez votre lumière auprès d'une fleur de lumière",
			[DailyQuest.RideWithAManta]: "Montez sur une raie manta",
			[DailyQuest.ReliveASpiritsMemories]: "Revivez les souvenirs d'un esprit",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Revivez les souvenirs d'un esprit dans la Prairie illuminée",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Revivez les souvenirs d'un esprit dans la Forêt cachée",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Revivez les souvenirs d'un esprit dans la Vallée du triomphe",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Revivez les souvenirs d'un esprit dans le Désert d'or",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Revivez les souvenirs d'un esprit dans la Chambre forte de connaissance",
			[DailyQuest.FaceTheDarkDragon]: "Affrontez le dragon sombre",
			[DailyQuest.KnockOver5DarkCrabs]: "Renversez 5 crabes sombres",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]:
				"Récupérez la lumière dans la Prairie illuminée",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Récupérez la lumière dans la Forêt cachée",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]:
				"Récupérez la lumière dans la Vallée du triomphe",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Récupérez la lumière dans le Désert d'or",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]:
				"Récupérez la lumière dans la Chambre forte de connaissance",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Visitez le cachette confortable dans les grottes de la Prairie",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Visitez la table de l'appartenance des ancêtres dans la clairière surélevée de la Forêt",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
				"Visitez la source chaude du village des rêves",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]:
				"Visitez le feu de joie dans le cimetière du Désert",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]:
				"Appréciez le jeune arbre dans la Prairie illuminée pendant un petit moment",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]:
				"Appréciez le jeune arbre dans la Forêt cachée pendant un petit moment",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"Appréciez le jeune arbre dans la Vallée du triomphe pendant un petit moment",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"Appréciez le jeune arbre dans le Désert d'or pendant un petit moment",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"Appréciez le jeune arbre dans la Chambre forte de connaissance pendant un petit moment",
			[DailyQuest.VisitThePollutedGeyser]: "Visitez le geyser pollué dans les îles du sanctuaire",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Éliminez les ténèbres du Vortex du sanctuaire",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Trouvez les bougies au bout de l'arc-en-ciel dans la Prairie illuminée",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Trouvez les bougies au bout de l'arc-en-ciel dans la Forêt cachée",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Trouvez les bougies au bout de l'arc-en-ciel dans la Vallée du triomphe",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Trouvez les bougies au bout de l'arc-en-ciel dans le Désert d'or",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Trouvez les bougies au bout de l'arc-en-ciel dans la Chambre forte de connaissance",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]:
				"Admirez l'arc-en-ciel des îles du sanctuaire pendant un petit moment",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]:
				"Admirez l'arc-en-ciel des chemins de vent pendant un petit moment",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]:
				"Admirez l'arc-en-ciel de la vallée de l'ermite pendant un petit moment",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]:
				"Admirez l'arc-en-ciel du récif du trésor pendant un petit moment",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]:
				"Admirez l'arc-en-ciel du désert stellaire pendant un petit moment",
			[DailyQuest.MeditateAtTheBirdNest]: "Méditez dans le sanctuaire nid de la Prairie",
			[DailyQuest.MeditateInTheButterflyFields]: "Méditez dans le champ de papillons de la Prairie",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Méditez dans les Îles du sanctuaire",
			[DailyQuest.MeditateInTheCave]: "Méditez dans le sanctuaire de grotte dans la Prairie",
			[DailyQuest.MeditateByTheKoiPond]: "Méditez à la mare des carpes koï de la Prairie",
			[DailyQuest.MeditateAtTheForestClearing]: "Méditez dans la clairière de la Forêt",
			[DailyQuest.MeditateAtTheForestBrook]: "Méditez au-dessus du ruisseau de la Forêt",
			[DailyQuest.MeditateAtTheElevatedClearing]: "Méditez à la clairière élevée de la Forêt",
			[DailyQuest.MeditateAtTheForestEnd]: "Méditez au bout de la Forêt",
			[DailyQuest.MeditateAtTheBoneyard]: "Méditez au cimetière de la Forêt",
			[DailyQuest.MeditateByTheIceRink]: "Méditez à côté de la patinoire de la Vallée",
			[DailyQuest.MeditateAboveTheCitadelsArch]:
				"Méditez au-dessus de l'arche de la citadelle de la Vallée",
			[DailyQuest.MeditateHighAboveTheCitadel]:
				"Méditez loin au-dessus de la citadelle de la Vallée",
			[DailyQuest.MeditateAtTheColiseum]: "Méditez à la fin de la course",
			[DailyQuest.MeditateInTheBrokenTemple]: "Méditez dans le temple brisé",
			[DailyQuest.MeditateInTheForgottenArk]: "Méditez dans l'arche oubliée",
			[DailyQuest.MeditateInTheGraveyard]: "Méditez dans le cimetière",
			[DailyQuest.MeditateOnTheBoat]: "Méditez sur le bateau",
			[DailyQuest.MeditateOnTheBattlefield]: "Méditez sur le champ de bataille",
			[DailyQuest.MeditateAtTheVaultEntrance]:
				"Méditez à l'entrée de la Chambre forte de connaissance",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Méditez au premier étage de la Chambre forte",
			[DailyQuest.MeditateAtTheVaultSummit]: "Méditez au sommet de la Chambre forte",
			[DailyQuest.CollectGreenLight]: "Récupérez la lumière verte",
			[DailyQuest.CollectOrangeLight]: "Récupérez la lumière orange",
			[DailyQuest.CollectBlueLight]: "Récupérez la lumière bleue",
			[DailyQuest.CollectRedLight]: "Récupérez la lumière rouge",
			[DailyQuest.CollectPurpleLight]: "Récupérez la lumière violette",
			[DailyQuest.PracticeWithTheSkater]:
				"Entraînez-vous avec la patineuse dans le village des rêves",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Dévalez les pistes avec la patineuse dans le village des rêves",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Dévalez la montagne avec la patineuse dans la vallée de l'ermite",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Répètez pour un spectacle avec la patineuse dans le colisée",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Complétez la chasse au trésor du cerceau",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Revivez le souvenir du charmeur de papillon dans la Prairie illuminée",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Revivez le souvenir de la fabricante de cloches applaudissant dans la Prairie illuminée",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Revivez le souvenir de la fabricante de cloches disant adieu dans la Prairie illuminée",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Revivez le souvenir du fabricant de bateaux somnolent dans la Prairie illuminée",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Revivez le souvenir de l'attrapeuse de lumière riant dans la Prairie illuminée",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Revivez le souvenir de l'orateur d'oiseaux dans la Prairie illuminée",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Revivez le souvenir du travailleur de quai épuisé dans la Prairie illuminée",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Revivez le souvenir de la pionnière frissonnante dans la Forêt cachée",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Revivez le souvenir de la prospectrice rougissante dans la Forêt cachée",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Revivez le souvenir du pionnier du cache-cache dans la Forêt cachée",
			[DailyQuest.ReliveThePoutyPorter]:
				"Revivez le souvenir du porteur boudeur dans la Forêt cachée",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Revivez le souvenir de la chasseuse consternée dans la Forêt cachée",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Revivez le souvenir du bûcheron désolé dans la Forêt cachée",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Revivez le souvenir de la mineuse de lumière en larmes dans la Forêt cachée",
			[DailyQuest.ReliveTheWhaleWhisperer]:
				"Revivez le souvenir de l'orateur de baleines dans la Forêt cachée",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Revivez le souvenir du touriste confident dans la Vallée du triomphe",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Revivez le souvenir de l'amateur d'adrénaline en équilibre dans la Vallée du triomphe",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Revivez le souvenir de l'orateur Manta dans la Vallée du triomphe",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Revivez le souvenir du champion du salto arrière dans la Vallée du triomphe",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Revivez le souvenir du spectateur enthousiaste dans la Vallée du triomphe",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Revivez le souvenir de la médaillée à l'arc dans la Vallée du triomphe",
			[DailyQuest.ReliveTheProudVictor]:
				"Revivez le souvenir de la vainqueuse fière dans la Vallée du triomphe",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Revivez le souvenir de la réfugiée effrayée dans le Désert d'or",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Revivez le souvenir de la guerrière affaiblie dans le Désert d'or",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Revivez le souvenir du soldat courageux dans le Désert d'or",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Revivez le souvenir de la survivante furtive dans le Désert d'or",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Revivez le souvenir du capitaine saluant dans le Désert d'or",
			[DailyQuest.ReliveTheLookoutScout]:
				"Revivez le souvenir de l'éclaireur vigie dans le Désert d’or",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Revivez le souvenir de l'acolyte priant dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Revivez le souvenir de l'adepte lévitante dans la Chambre forte de connaissance",
			[DailyQuest.ReliveThePoliteScholar]:
				"Revivez le souvenir de l'érudite polie dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Revivez le souvenir de l'orateur spirituel dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Revivez le souvenir de l'érudit méditatif dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Revivez le souvenir du gourou en étirement dans la Prairie illuminée",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Revivez le souvenir de l'interprète provocateur dans la Forêt cachée",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Revivez le souvenir du danseur bondissant dans la Vallée du triomphe",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Revivez le souvenir du protecteur saluant dans le Désert d'or",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Revivez le souvenir du shaman saluant dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Revivez le souvenir de l'attrapeur de lumière amical dans la Prairie illuminée",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Revivez le souvenir du pionnier décontracté dans la Forêt cachée",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Revivez le souvenir du champion virevoltant dans la Vallée du triomphe",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Revivez le souvenir de la charmeuse de crabes dans le Désert d'or",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Revivez le souvenir de l'érudit de Lumière silencieux dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Revivez le souvenir de la cousine des confettis dans la Prairie illuminée",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Revivez le souvenir de l'adolescent ébouriffé dans la Forêt cachée",
			[DailyQuest.ReliveTheSparklerParent]:
				"Revivez le souvenir de la parente étincelante dans la Vallée du triomphe",
			[DailyQuest.ReliveThePleafulParent]:
				"Revivez le souvenir du parent suppliant dans le Désert d'or",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Revivez le souvenir du réalisateur réfléchi dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Revivez le souvenir de la tournoyeuse de festival dans la Prairie illuminée",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Revivez le souvenir de l'acteur admiratif dans la Forêt cachée",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Revivez le souvenir du jongleur de troupe dans la Vallée du triomphe",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Revivez le souvenir de la pianiste respectueuse dans le Désert d'or",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Revivez le souvenir du réalisateur réfléchi dans la Chambre forte de connaissance",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Revivez le souvenir de la muraliste acquiesçant dans le Désert d'or",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Revivez le souvenir de l'alchimiste indifférent dans le Désert d’or",
			[DailyQuest.ReliveTheCrabWalker]:
				"Revivez le souvenir du marcheur de crabe dans le Désert d'or",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Revivez le souvenir du fermier épouvantail dans le Désert d'or",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Revivez le souvenir de la charpentière ensommeillée dans le Désert d'or",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Revivez le souvenir de l'herboriste de combat dans le Désert d’or",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Revivez le souvenir du murmureur de méduse dans la Prairie illuminée",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Revivez le souvenir du lecteur timide dans la Prairie illuminée",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Revivez le souvenir de l'amateur d'adrénaline motivant dans la Prairie illuminée",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Revivez le souvenir du râleur de randonnée dans la Prairie illuminée",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Revivez le souvenir de la collectionneuse de coquillages reconnaissante dans la Prairie illuminée",
			[DailyQuest.ReliveTheChillSunbather]:
				"Revivez le souvenir de l'adepte des bains de soleil tranquille dans la Prairie illuminée",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Revivez le souvenir du mentor tournoyant dans la Vallée du triomphe",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Revivez le souvenir de l'interprète de danse dans la Vallée du triomphe",
			[DailyQuest.ReliveThePeekingPostman]:
				"Revivez le souvenir de la factrice timide dans la Vallée du triomphe",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Revivez le souvenir du yéti du câlin dans la Vallée du triomphe",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Revivez le souvenir du botaniste perplexe dans la Forêt cachée",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Revivez le souvenir de l'étudiante moralisatrice dans la Forêt cachée",
			[DailyQuest.ReliveTheScaredyCadet]:
				"Revivez le souvenir du cadet effrayé dans la Forêt cachée",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Revivez le souvenir de l'aventurière marchante dans la Forêt cachée",
			[DailyQuest.ReliveTheChucklingScout]:
				"Revivez le souvenir du scout ricanant dans la Forêt cachée",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Revivez le souvenir du forestier rêveur dans la Forêt cachée",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Visitez un fragment des ténèbres tombé dans le royaume de Sky",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Prenez un selfie avec le râleur de randonnée dans les pics de la Prairie",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Prenez un selfie avec la charmeuse de crabes dans les pics de la Prairie",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Prenez un selfie avec la canonnière caquetante dans les pics de la Prairie",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Prenez un selfie avec l'hôte de troupe dans les pics de la Prairie",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Rencontrez Cinnamoroll sur une colline du village volière",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Sentez les fleurs avec Cinnamoroll au village volière",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Trouvez Cinnamoroll quelque part dans le village volière",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]:
				"Réveillez Cinnamoroll dans le village volière",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Volez jusqu'au clocher avec Cinnamoroll au village volière",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Plongez dans l'eau avec Cinnamoroll au village volière",
			[DailyQuest.PlayAnyTournamentSport]: "Participez à n'importe quel tournoi sportif",
			[DailyQuest.ChangeYourHairstyle]: "Changez de coupe de cheveux",
			[DailyQuest.ChangeYourNecklace]: "Changez de collier",
			[DailyQuest.ChangeYourProp]: "Changez votre accessoire",
			[DailyQuest.ChangeYourMask]: "Changez de masque",
			[DailyQuest.ChangeYourCape]: "Changez de cape",
			[DailyQuest.ChangeYourOutfit]: "Changez de pantalon",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Regardez un souvenir partagé sur le podium d'un sanctuaire",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Enregistrez un souvenir partagé sur le podium d'un sanctuaire",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
				"Faites une farce au commodore commandant",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Retrouvez Pionnier du cache-cache à Cimetière de la Forêt",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Aidez la Canonnière caquetante ou le Scout ricanant à trouver des trésors sur les Îles du Sanctuaire",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Aidez le Maître d'équipage maladroit ou le Guide du Rassemblement à trouver des trésors dans la Forêt cachée",
		},
		seasons: {
			[SeasonId.Gratitude]: "Saison de la gratitude",
			[SeasonId.Lightseekers]: "Saison des Chercheurs de lumière",
			[SeasonId.Belonging]: "Saison de l'Appartenance",
			[SeasonId.Rhythm]: "Saison du Rythme",
			[SeasonId.Enchantment]: "Saison de l'Enchantement",
			[SeasonId.Sanctuary]: "Saison du sanctuaire",
			[SeasonId.Prophecy]: "Saison de la Prophétie",
			[SeasonId.Dreams]: "Saison des Rêves",
			[SeasonId.Assembly]: "Saison du Rassemblement",
			[SeasonId.LittlePrince]: "Saison du Petit Prince",
			[SeasonId.Flight]: "Saison de l'Envol",
			[SeasonId.Abyss]: "Saison des Abysses",
			[SeasonId.Performance]: "Saison de l'Interprétation",
			[SeasonId.Shattering]: "Saison de l'Éclatement",
			[SeasonId.AURORA]: "Saison d'AURORA",
			[SeasonId.Remembrance]: "Saison du Souvenir",
			[SeasonId.Passage]: "La saison de l'Initiation",
			[SeasonId.Moments]: "La saison des Instants",
			[SeasonId.Revival]: "Saison du Renouveau",
			[SeasonId.NineColouredDeer]: "Saison du Cerf aux neuf couleurs",
			[SeasonId.Nesting]: "Saison de la Nidification",
			[SeasonId.Duets]: "Saison des Duos",
			[SeasonId.Moomin]: "Saison des Moomins",
			[SeasonId.Radiance]: "Saison de l'Éclat",
		},
		"shard-eruption": "Éruption d'Éclats",
		"shard-eruption-none": "Aucun",
		spirits: {
			[SpiritId.PointingCandlemaker]: "Cirier pointant",
			[SpiritId.UsheringStargazer]: "Guide astronome",
			[SpiritId.RejectingVoyager]: "Voyageur refusant",
			[SpiritId.ElderOfTheIsle]: "Ancien de l'Île",
			[SpiritId.ButterflyCharmer]: "Charmeur de papillon",
			[SpiritId.ApplaudingBellmaker]: "Fabricante de cloches applaudissant",
			[SpiritId.WavingBellmaker]: "Fabricant de cloches saluant",
			[SpiritId.SlumberingShipwright]: "Fabricant de bateaux somnolent",
			[SpiritId.LaughingLightCatcher]: "Attrapeuse de lumière riant",
			[SpiritId.BirdWhisperer]: "Orateur d'oiseaux",
			[SpiritId.ExhaustedDockWorker]: "Travailleur de quai épuisé",
			[SpiritId.CeremonialWorshiper]: "Adorateur de cérémonie",
			[SpiritId.ElderOfThePrairie]: "Ancienne de la Prairie",
			[SpiritId.ShiveringTrailblazer]: "Pionnière frissonnante",
			[SpiritId.BlushingProspector]: "Prospectrice rougissante",
			[SpiritId.HideNSeekPioneer]: "Pionnier du cache-cache",
			[SpiritId.PoutyPorter]: "Porteur boudeur",
			[SpiritId.DismayedHunter]: "Chasseuse consternée",
			[SpiritId.ApologeticLumberjack]: "Bûcheron désolé",
			[SpiritId.TearfulLightMiner]: "Mineuse de lumière en larmes",
			[SpiritId.WhaleWhisperer]: "Orateur de baleines",
			[SpiritId.ElderOfTheForest]: "Ancienne de la Forêt",
			[SpiritId.ConfidentSightseer]: "Touriste confident",
			[SpiritId.HandstandingThrillseeker]: "Amateur d'adrénaline en équilibre",
			[SpiritId.MantaWhisperer]: "Orateur Manta",
			[SpiritId.BackflippingChampion]: "Champion du salto arrière",
			[SpiritId.CheerfulSpectator]: "Spectateur enthousiaste",
			[SpiritId.BowingMedalist]: "Médaillée à l'arc",
			[SpiritId.ProudVictor]: "Vainqueuse fière",
			[SpiritId.ElderOfTheValley]: "Ancien de la Vallée",
			[SpiritId.FrightenedRefugee]: "Réfugiée effrayée",
			[SpiritId.FaintingWarrior]: "Guerrière affaiblie",
			[SpiritId.CourageousSoldier]: "Soldat courageux",
			[SpiritId.StealthySurvivor]: "Survivante furtive",
			[SpiritId.SalutingCaptain]: "Capitaine saluant",
			[SpiritId.LookoutScout]: "Éclaireur vigie",
			[SpiritId.ElderOfTheWasteland]: "Ancien du Désert",
			[SpiritId.PrayingAcolyte]: "Acolyte priant",
			[SpiritId.LevitatingAdept]: "Adepte lévitante",
			[SpiritId.PoliteScholar]: "Érudite polie",
			[SpiritId.MemoryWhisperer]: "Orateur spirituel",
			[SpiritId.MeditatingMonastic]: "Érudit méditatif",
			[SpiritId.ElderOfTheVault]: "Ancienne de la Chamber forte",
			[SpiritId.GratitudeGuide]: "Guide de la gratitude",
			[SpiritId.SassyDrifter]: "Vagabond excentrique",
			[SpiritId.StretchingGuru]: "Gourou en étirement",
			[SpiritId.ProvokingPerformer]: "Interprète provocateur",
			[SpiritId.LeapingDancer]: "Danseur bondissant",
			[SpiritId.SalutingProtector]: "Protecteur saluant",
			[SpiritId.GreetingShaman]: "Shaman saluant",
			[SpiritId.LightseekerGuide]: "Guide de Chercheur de lumière",
			[SpiritId.PiggybackLightseeker]: "Chercheuse de lumière à califourchon",
			[SpiritId.DoublefiveLightCatcher]: "Attrapeur de lumière amical",
			[SpiritId.LaidbackPioneer]: "Pionnier décontracté",
			[SpiritId.TwirlingChampion]: "Champion virevoltant",
			[SpiritId.CrabWhisperer]: "Orateur crabe des",
			[SpiritId.ShushingLightScholar]: "Érudit de Lumière silencieux",
			[SpiritId.BelongingGuide]: "Guide de l'Appartenance",
			[SpiritId.BoogieKid]: "Enfant dansant",
			[SpiritId.ConfettiCousin]: "Cousine des confettis",
			[SpiritId.HairtousleTeen]: "Adolescent ébouriffé",
			[SpiritId.SparklerParent]: "Parente étincelante",
			[SpiritId.PleafulParent]: "Parent suppliant",
			[SpiritId.WiseGrandparent]: "Grand-parent sage",
			[SpiritId.RhythmGuide]: "Guide du Rythme",
			[SpiritId.TroupeGreeter]: "Hôte de troupe",
			[SpiritId.FestivalSpinDancer]: "Tournoyeuse de festival",
			[SpiritId.AdmiringActor]: "Acteur admiratif",
			[SpiritId.TroupeJuggler]: "Jongleur de troupe",
			[SpiritId.RespectfulPianist]: "Pianiste respectueuse",
			[SpiritId.ThoughtfulDirector]: "Réalisateur réfléchi",
			[SpiritId.EnchantmentGuide]: "Guide de l'Enchantement",
			[SpiritId.NoddingMuralist]: "Muraliste acquiesçant",
			[SpiritId.IndifferentAlchemist]: "Alchimiste indifférent",
			[SpiritId.CrabWalker]: "Marcheur de crabe",
			[SpiritId.ScarecrowFarmer]: "Fermier épouvantail",
			[SpiritId.SnoozingCarpenter]: "Charpentière ensommeillée",
			[SpiritId.PlayfightingHerbalist]: "Herboriste de combat",
			[SpiritId.SanctuaryGuide]: "Guide de sanctuaire",
			[SpiritId.JellyWhisperer]: "Murmureur de méduse",
			[SpiritId.TimidBookworm]: "Lecteur timide",
			[SpiritId.RallyingThrillseeker]: "Amateur d'adrénaline motivant",
			[SpiritId.HikingGrouch]: "Râleur de randonnée",
			[SpiritId.GratefulShellCollector]: "Collectionneuse de coquillages reconnaissante",
			[SpiritId.ChillSunbather]: "Bain de soleil relaxant",
			[SpiritId.ProphecyGuide]: "Guide de la prophétie",
			[SpiritId.ProphetOfWater]: "Prophète de l'eau",
			[SpiritId.ProphetOfEarth]: "Prophète de la terre",
			[SpiritId.ProphetOfAir]: "Prophète de l'air",
			[SpiritId.ProphetOfFire]: "Prophète du feu",
			[SpiritId.DreamsGuide]: "Guide des Rêves",
			[SpiritId.SpinningMentor]: "Mentor tournoyant",
			[SpiritId.DancingPerformer]: "Interprète de danse",
			[SpiritId.PeekingPostman]: "Factrice timide",
			[SpiritId.BearhugHermit]: "Yéti du câlin",
			[SpiritId.AssemblyGuide]: "Guide du Rassemblement",
			[SpiritId.BaffledBotanist]: "Botaniste perplexe",
			[SpiritId.ScoldingStudent]: "Étudiante moralisatrice",
			[SpiritId.ScaredyCadet]: "Cadet effrayé",
			[SpiritId.MarchingAdventurer]: "Aventurière marchante",
			[SpiritId.ChucklingScout]: "Scout ricanant",
			[SpiritId.DaydreamForester]: "Forestier rêveur",
			[SpiritId.TheRose]: "La rose",
			[SpiritId.BeckoningRuler]: "Seigneur qui appelle",
			[SpiritId.GloatingNarcissist]: "Narcissique prétentieux",
			[SpiritId.StretchingLamplighter]: "Allumeur de réverbères qui s'étire",
			[SpiritId.SlouchingSoldier]: "Soldat avachi",
			[SpiritId.SneezingGeographer]: "Géographe qui éternue",
			[SpiritId.StarCollector]: "Collectionneur d'étoiles",
			[SpiritId.FlightGuide]: "Guide de vol",
			[SpiritId.LivelyNavigator]: "Navigateur dynamique",
			[SpiritId.LightWhisperer]: "Chuchoteuse de lumières",
			[SpiritId.TinkeringChimesmith]: "Carillonneuse bricoleuse",
			[SpiritId.TalentedBuilder]: "Bâtisseur talentueux",
			[SpiritId.AbyssGuide]: "Guide des Abysses",
			[SpiritId.AnxiousAngler]: "Pêcheuse angoissée",
			[SpiritId.CeasingCommodore]: "Commodore commandant",
			[SpiritId.BumblingBoatswain]: "Maître d'équipage maladroit",
			[SpiritId.CacklingCannoneer]: "Canonnière caquetante",
			[SpiritId.PerformanceGuide]: "Guide de l'Interprétation",
			[SpiritId.FranticStagehand]: "Machiniste débordé",
			[SpiritId.ForgetfulStoryteller]: "Conteuse distraite",
			[SpiritId.MellowMusician]: "Musicien serein",
			[SpiritId.ModestDancer]: "Danseuse modeste",
			[SpiritId.TheVoidOfShattering]: "Le Néant de l'Éclatement",
			[SpiritId.AncientLight1]: "Lumière ancienne (méduses)",
			[SpiritId.AncientLight2]: "Lumière ancienne (manta)",
			[SpiritId.AncientDarkness1]: "Ténèbres anciennes (plante)",
			[SpiritId.AncientDarkness2]: "Ténèbres anciennes (dragon)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Voyageur fugueur",
			[SpiritId.MindfulMiner]: "Mineur attentif",
			[SpiritId.WarriorOfLove]: "Guerrier de l'amour",
			[SpiritId.SeedOfHope]: "Graine d'espoir",
			[SpiritId.RemembranceGuide]: "Guide du Souvenir",
			[SpiritId.BereftVeteran]: "Vétéran endeuillé",
			[SpiritId.PleadingChild]: "Enfant implorant",
			[SpiritId.TiptoeingTeaBrewer]: "Brasseuse de thé sure la pointe des pieds",
			[SpiritId.WoundedWarrior]: "Guerrier blessé",
			[SpiritId.PassageGuide]: "Guide de l'Initiation",
			[SpiritId.OddballOutcast]: "Paria farfelu",
			[SpiritId.TumblingTroublemaker]: "Trublion virevoltant",
			[SpiritId.MelancholyMope]: "Mélancolie morose",
			[SpiritId.OveractiveOverachiever]: "Prodige performant",
			[SpiritId.MomentsGuide]: "Guide des Instants",
			[SpiritId.ReassuringRanger]: "Garde-forestier rassurant",
			[SpiritId.NightbirdWhisperer]: "Charmeuse d'oiseaux de nuit",
			[SpiritId.JollyGeologist]: "Géologue joyeuse",
			[SpiritId.AsceticMonk]: "Moine ascétique",
			[SpiritId.HopefulSteward]: "Coordinateur optimiste",
			[SpiritId.VestigeOfADesertedOasis]: "Vestige d'une oasis désertée",
			[SpiritId.MemoryOfALostVillage]: "Souvenir d'un village perdu",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Écho d'un refuge abandonné",
			[SpiritId.RemnantOfAForgottenHaven]: "Vestige d'un havre oublié",
			[SpiritId.SpiritOfMural]: "Esprit de la fresque",
			[SpiritId.HerbGatherer]: "Cueilleur d'herbes",
			[SpiritId.Hunter]: "Chasseur",
			[SpiritId.FeudalLord]: "Seigneur féodal",
			[SpiritId.Princess]: "Princesse",
			[SpiritId.NestingGuide]: "Guide de la Nidification",
			[SpiritId.NestingSolarium]: "Solarium de la Nidification",
			[SpiritId.NestingLoft]: "Loft de la Nidification",
			[SpiritId.NestingAtrium]: "Atrium de la Nidification",
			[SpiritId.NestingNook]: "Recoin de la Nidification",
			[SpiritId.DuetsGuide]: "Guide des Duos",
			[SpiritId.TheCellistsBeginnings]: "Les débuts de la Violoncelliste",
			[SpiritId.ThePianistsBeginnings]: "Les débuts du Pianiste",
			[SpiritId.TheMusiciansLegacy]: "L'héritage du Musicien",
			[SpiritId.TheCellistsFlourishing]: "L'eclosion de la Violoncelliste",
			[SpiritId.ThePianistsFlourishing]: "L'eclosion du Pianiste",
			[SpiritId.TheMoominStorybook]: "Le livre des Moomins",
			[SpiritId.ComfortOfKindness]: "Bien-être et bonté",
			[SpiritId.SenseOfSelf]: "Sens de soi",
			[SpiritId.SpiritOfAdventure]: "Esprit d'aventure",
			[SpiritId.InspirationOfInclusion]: "L'inspiration de l'inclusion",
			[SpiritId.RadianceGuide]: "Guide de l'Éclat",
			[SpiritId.RadianceLeapingDancer]: "Danseur bondissant de l'Éclat",
			[SpiritId.RadianceProvokingPerformer]: "Interprète provocateur de l'Éclat",
			[SpiritId.RadianceGreetingShaman]: "Shaman saluant de l'Éclat",
		},
		timestamps: "Heures",
		view: "Voir",
	},
	commands: {
		hug: {
			"command-name": "câlin",
			"command-description": "Fais un câlin à quelqu'un!",
			user: "utilisateur",
			"user-description": "La personne a qui tu veux faire un câlin.",
			"hug-self": "Fais en profiter les autres! Va câliner quelqu'un!",
			"not-in-server": "{{user}} n'est pas dans ce serveur pour recevoir ton câlin.",
			"not-around": "{{user}} n'est pas dans le coin pour voir recevoir ton câlin!",
			bot: "{{user}} est un bot. Ils ne ressentent pas grand chose. Tu peux essayer, mais je crois qu'ils ne sont pas très sensible aux câlins.",
			message: "{{user}}, {{invoker}} te fait un câlin!",
		},
		schedule: {
			"command-name": "planning",
			"command-description": "Montre un planning des événements de Sky!",
			"every-15-minutes": "... Toutes les 15 minutes...",
			"travelling-spirit": "Esprit Voyageur",
			"travelling-spirit-today": "Aujourd'hui!",
			"travelling-spirit-none": "Aucun",
			"travelling-spirit-next-visit": "Prochaine visite le",
			"first-of-month": "_Tout les premiers du mois_",
			"times-are-relative": "Les heures correspondent a votre localisation.",
			"schedule-today": "Planning d'aujourd'hui",
		},
	},
} as const;
