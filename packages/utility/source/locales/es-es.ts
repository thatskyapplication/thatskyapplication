import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		"days-left": {
			season_zero: "La temporada termina hoy.",
			season_one: "Resta {{count}} día en la temporada.",
			season_other: "Restan {{count}} días en la temporada.",
		},
		realms: {
			[RealmName.IslesOfDawn]: "Isla del Amanecer",
			[RealmName.DaylightPrairie]: "Planicie Luz de Dia",
			[RealmName.HiddenForest]: "Bosque Escondido",
			[RealmName.ValleyOfTriumph]: "Valle del Triunfo",
			[RealmName.GoldenWasteland]: "Páramo Dorado",
			[RealmName.VaultOfKnowledge]: "Bóveda de Conocimiento",
			[RealmName.EyeOfEden]: "Ojo de edén",
		},
		maps: {
			[SkyMap.AncientMemory]: "Recuerdo Ancestral",
			[SkyMap.JellyfishCove]: "Ensenada de la Medusa",
			[SkyMap.CrescentOasis]: "Oasis creciente",
		},
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Recoge 30 piezas de luz",
			[DailyQuest.Light20Candles]: "Enciende 20 velas",
			[DailyQuest.ForgeACandle]: "Forja una vela",
			[DailyQuest.Melt10Darkness]: "Derrite 10 oscuridades",
			[DailyQuest.BowAtAPlayer]: "Inclínate ante un jugador",
			[DailyQuest.FollowAFriend]: "Sigue a una amistad",
			[DailyQuest.HugAFriend]: "Da un abrazo a un amigo",
			[DailyQuest.WaveToAFriend]: "Saluda a un amigo",
			[DailyQuest.HoldAFriendsHand]: "Toma la mano de un amigo",
			[DailyQuest.SendAGiftToAFriend]: "Envía un regalo a un amigo",
			[DailyQuest.MakeANewAcquaintance]: "Haz un conocido",
			[DailyQuest.HighFiveAFriend]: "Chócalas con un amigo",
			[DailyQuest.UseAnExpressionNearAFriend]: "Usa una expresión cerca de un amigo",
			[DailyQuest.SitOnABenchWithAStranger]: "Siéntate en un banca a lado de un extraño",
			[DailyQuest.RechargeFromAJellyfish]: "Recarga tu luz a partir de una medusa",
			[DailyQuest.RechargeFromALightBloom]: "Recarga tu luz a partir de un resplandor de luz",
			[DailyQuest.RideWithAManta]: "Vuela con una mantarraya",
			[DailyQuest.ReliveASpiritsMemories]: "Revive las memorias de un espíritu",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Revive los recuerdos de un espíritu en la Planicie Luz de Día",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Revive los recuerdos de un espíritu en el Bosque Escondido",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Revive los recuerdos de un espíritu en el Valle del Triunfo",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Revive los recuerdos de un espíritu en el Páramo Dorado",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Revive los recuerdos de un espíritu en la Bóveda de Conocimiento",
			[DailyQuest.FaceTheDarkDragon]: "Enfrenta al Dragón oscuro",
			[DailyQuest.KnockOver5DarkCrabs]: "Derriba 5 cangrejos oscuros",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Atrapa la luz en la Planicie Luz de Día",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Atrapa la luz en el Bosque Escondido",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Atrapa la luz en el Valle del Triunfo",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Atrapa la luz en el Páramo Dorado",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Atrapa la luz en la Bóveda de Conocimiento",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Visita el cómodo escondite en las cuevas de las planicies",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Visita la mesa de la pertenencia de los ancestros en el claro elevado del bosque",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
				"Visita las aguas termales en la Aldea de los sueños",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]:
				"Visita la fogata en el cementerio del páramo",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]:
				"Admira el árbol joven en la Planicie de la Luz del Día por un rato",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]:
				"Admira el árbol joven en el Bosque Escondido por un rato",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"Admira el árbol joven en el Valle del Triunfo por un rato",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"Admira el árbol joven en el Páramo Dorado por un rato",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"Admira el árbol joven en la Bóveda del Conocimiento por un rato",
			[DailyQuest.VisitThePollutedGeyser]: "Visita el géiser contaminado en las Islas Santuario",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]:
				"Elimina la oscuridad del vórtice del santuario",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Encuentra las velas al final del arcoíris en la Planicie Luz de Día",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Encuentra las velas al final del arcoiris en el Bosque Escondido",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Encuentra las velas al final del arcoíris en el Valle del Triunfo",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Encuentra las velas al final del arcoíris en el Páramo Dorado",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Encuentra las velas al final del arcoíris en la Bóveda de Conocimiento",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]:
				"Admira por un rato el arcoíris en las Islas Santuario",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]:
				"Admira por un rato el arcoíris en Los Caminos del viento",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]:
				"Admira por un rato el arcoíris en el Valle del ermitaño",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]:
				"Admira por un rato el arcoíris en el Coral del tesoro",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]:
				"Admira por un rato el arcoíris en el Desierto luz de estrellas",
			[DailyQuest.MeditateAtTheBirdNest]: "Medita en el altar del nido del ave de la Planicie",
			[DailyQuest.MeditateInTheButterflyFields]: "Medita en el campo de mariposas de la Planicie",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Medita en las Islas Santuario",
			[DailyQuest.MeditateInTheCave]: "Medita en el altar de la caverna de la Planicie",
			[DailyQuest.MeditateByTheKoiPond]: "Medita en el estanque de kois de la Planicie",
			[DailyQuest.MeditateAtTheForestClearing]: "Medita en el claro del bosque",
			[DailyQuest.MeditateAtTheForestBrook]: "Medita sobre el arroyo del Bosque",
			[DailyQuest.MeditateAtTheElevatedClearing]: "Medita en el claro elevado del Bosque",
			[DailyQuest.MeditateAtTheForestEnd]: "Medita en el fin del bosque",
			[DailyQuest.MeditateAtTheBoneyard]: "Medita en el deshuesadero del Bosque",
			[DailyQuest.MeditateByTheIceRink]: "Medita por la pista de hielo del Valle",
			[DailyQuest.MeditateAboveTheCitadelsArch]:
				"Medita por encima del arco de la ciudadela del Valle",
			[DailyQuest.MeditateHighAboveTheCitadel]: "Medita por encima de la ciudadela del Valle",
			[DailyQuest.MeditateAtTheColiseum]: "Medita al final de la carrera",
			[DailyQuest.MeditateInTheBrokenTemple]: "Medita en el templo destrozado",
			[DailyQuest.MeditateInTheForgottenArk]: "Medita en el Arca olvidada",
			[DailyQuest.MeditateInTheGraveyard]: "Medita en el cementerio",
			[DailyQuest.MeditateOnTheBoat]: "Medita en el bote",
			[DailyQuest.MeditateOnTheBattlefield]: "Medita en el campo de batalla",
			[DailyQuest.MeditateAtTheVaultEntrance]: "Meditar en la entrada de Bóveda de Conocimiento",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Medita en el segundo piso de la Bóveda",
			[DailyQuest.MeditateAtTheVaultSummit]: "Medita en la cima de la Bóveda",
			[DailyQuest.CollectGreenLight]: "Recoge Luz Verde",
			[DailyQuest.CollectOrangeLight]: "Recoge Luz Naranja",
			[DailyQuest.CollectBlueLight]: "Recoge Luz Azul",
			[DailyQuest.CollectRedLight]: "Recoge Luz Roja",
			[DailyQuest.CollectPurpleLight]: "Recoge Luz Púrpura",
			[DailyQuest.PracticeWithTheSkater]: "Practica con la patinadora en la Aldea de los Sueños",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Corre cuesta abajo con la patinadora en la Aldea de los Sueños",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Corre cuesta abajo de la montaña con la patinadora en el Valle del Ermitaño",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Ensaya para una presentación con la patinadora en el coliseo",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Completa la búsqueda del tesoro del aro",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Revive el recuerdo del Encantador de mariposas de la Planicie Luz de Día",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Revive el recuerdo de la Campanera que aplaude de la Planicie Luz de Día",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Revive el recuerdo del Campanero que saluda de la Planicie Luz de Día",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Revive el recuerdo del Fabricante de barcos dormilón de la Planicie Luz de Día",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Revive el recuerdo de la Cazadora de luz risueña en la Planicie Luz de Día",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Revive el recuerdo del Susurrador de aves de la Planicie Luz de Día",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Revive el recuerdo del Estibador exhausto de la Planicie Luz de Día",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Revive el recuerdo de la Pionera temblorosa del Bosque Escondido",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Revive el recuerdo de la Buscadora de oro sonrojada del Bosque Escondido",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Revive el recuerdo del Pionero de las escondidas del Bosque Escondido",
			[DailyQuest.ReliveThePoutyPorter]:
				"Revive el recuerdo del Portero que hace puchero del Bosque Escondido",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Revive el recuerdo de la Cazadora abatida del Bosque Escondido",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Revive el recuerdo del Leñador arrepentido del Bosque Escondido",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Revive el recuerdo de la Minera de luz llorona del Bosque Escondido",
			[DailyQuest.ReliveTheWhaleWhisperer]:
				"Revive el recuerdo del Susurrador de ballenas del Bosque Escondido",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Revive el recuerdo del Turista confidente del Valle del Triunfo",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Revive el recuerdo del Amante de la adrenalina parado de manos del Valle del Triunfo",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Revive el recuerdo del Susurrador de mantas del Valle del Triunfo",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Revive el recuerdo del Campeón de Voltereta del Valle del Triunfo",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Revive el recuerdo del Espectador alegre del Valle del Triunfo",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Revive el recuerdo del Medallista reverencial del Valle del Triunfo",
			[DailyQuest.ReliveTheProudVictor]:
				"Revive el recuerdo de la Vencedora orgullosa del Valle del Triunfo",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Revive el recuerdo de la Refugiada temerosa del Páramo Dorado",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Revive el recuerdo de la Guerrera desmayada del Páramo Dorado",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Revive el recuerdo del Soldado valiente del Páramo Dorado",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Revive el recuerdo de la Sobreviviente sigilosa del Páramo Dorado",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Revive el recuerdo del Capitán que saluda del Páramo Dorado",
			[DailyQuest.ReliveTheLookoutScout]:
				"Revive el recuerdo del Explorador vigía del Páramo Dorado",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Revive el recuerdo del Acólito orador de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Revive el recuerdo de la Adepta Levitante de la Bóveda de Conocimiento",
			[DailyQuest.ReliveThePoliteScholar]:
				"Revive el recuerdo de la Académica amable de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Revive el recuerdo del Susurrador de los espíritus de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Revive el recuerdo del Erudito Meditante de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Revive el recuerdo del Gurú estirando de la Planicie Luz de Día",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Revive el recuerdo del Artista provocador del Bosque Escondido",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Revive el recuerdo del Bailarín saltarín del Valle del Triunfo",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Revive el recuerdo del Protector que saluda del Páramo Dorado",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Revive el recuerdo del Chamán amable de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Revive el recuerdo del Cazador de luz con chócalas en la Planicie Luz de Día",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Revive el recuerdo del Pionero despreocupado del Bosque Escondido",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Revive el recuerdo del Campeón de piruetas del Valle del Triunfo",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Revive el recuerdo del Susurrador de cangrejos del Páramo Dorado",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Revive el recuerdo del Erudito de la luz que silencia de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Revive el recuerdo de la Prima de Confeti de la Planicie Luz de Día",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Revive el recuerdo del Adolescente despeinado del Bosque Escondido",
			[DailyQuest.ReliveTheSparklerParent]:
				"Revive el recuerdo de la Madre iluminada del Valle del Triunfo",
			[DailyQuest.ReliveThePleafulParent]:
				"Revive el recuerdo del Padre suplicante del Páramo Dorado",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Revive el recuerdo del Director atento de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Revive el recuerdo de la Bailarina festiva de la Planicie Luz de Día",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Revive el recuerdo del Actor admirado del Bosque Escondido",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Revive el recuerdo del Grupo de malabaristas del Valle del Triunfo",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Revive el recuerdo de la Pianista respetuosa del Páramo Dorado",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Revive el recuerdo del Director atento de la Bóveda de Conocimiento",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Revive el recuerdo de Muralista que asiente del Páramo Dorado",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Revive el recuerdo de Alquimista indiferente del Páramo Dorado",
			[DailyQuest.ReliveTheCrabWalker]:
				"Revive el recuerdo del Caminador cangrejo del Páramo Dorado",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Revive el recuerdo del Granjero espantapájaros del Páramo Dorado",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Revive el recuerdo de la Carpintera dormilona del Páramo Dorado",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Revive el recuerdo de la Herborista peleadora del Páramo Dorado",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Revive el recuerdo del Susurrador de medusas de la Planicie Luz de Día",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Revive el recuerdo del Ratón de biblioteca tímido de la Planicie Luz de Día",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Revive el recuerdo del Buscador de la luz alentador de la Planicie Luz de Día",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Revive el recuerdo del Gruñón alpinista de la Planicie Luz de Día",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Revive el recuerdo de la Coleccionista de caracolas agradecida de la Planicie Luz de Día",
			[DailyQuest.ReliveTheChillSunbather]:
				"Revive el recuerdo del Tranquilo Bañista del Sol de la Planicie Luz de Día",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Revive el recuerdo de la Mentora de volteretas del Valle del Triunfo",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Revive el recuerdo del Bailarín del Valle del Triunfo",
			[DailyQuest.ReliveThePeekingPostman]:
				"Revive el recuerdo de la Cartera que espía del Valle del Triunfo",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Revive el recuerdo del Yeti Abrazoso del Valle del Triunfo",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Revive el recuerdo de la Botánica perpleja del Bosque Escondido",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Revive el recuerdo de la Estudiante gruñona del Bosque Escondido",
			[DailyQuest.ReliveTheScaredyCadet]:
				"Revive el recuerdo del Cadete miedoso del Bosque Escondido",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Revive el recuerdo de la Aventurera en marcha del Bosque Escondido",
			[DailyQuest.ReliveTheChucklingScout]:
				"Revive el recuerdo del Explorador risueño del Bosque Escondido",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Revive el recuerdo del Guardabosques soñador del Bosque Escondido",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Visita un fragmento de oscuridad que cayó sobre el reino de Sky",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Tómate una selfi con el gruñón alpinista en las cumbres de la planicie",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Tómate una selfi con la susurradora de cangrejos en las cumbres de la planicie",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Tómate una selfi con el cañonero tentado en las cumbres de la planicie",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Tómate una selfi con el saludador de la compañía en las cumbres de la planicie",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Busca a Cinnamoroll en una colina de la aldea aviaria",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Huele flores con Cinnamoroll en la aldea aviaria",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Busca a Cinnamoroll en la aldea aviaria",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Despierta a Cinnamoroll en la aldea aviaria",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Vuela hasta la torre con Cinnamoroll en la aldea aviaria",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Chapotea en el agua con Cinnamoroll en la aldea aviaria",
			[DailyQuest.PlayAnyTournamentSport]: "Juega a cualquier deporte del torneo",
			[DailyQuest.ChangeYourHairstyle]: "Cambia tu peinado",
			[DailyQuest.ChangeYourNecklace]: "Cambia de collar",
			[DailyQuest.ChangeYourProp]: "Cambia de utilería",
			[DailyQuest.ChangeYourMask]: "Cambia tu máscara",
			[DailyQuest.ChangeYourCape]: "Cambia tu capa",
			[DailyQuest.ChangeYourOutfit]: "Cambia tus pantalones",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Mira un recuerdo compartido en un altar de pasarela",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Graba un recuerdo compartido en un altar de pasarela",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
				"Hazle una broma al Capitán de navío cesante",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Reúnete con Pionero de las escondidas en Deshuesadero",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en las Islas Santuario",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Ayuda al Contramaestre torpe o al Guía del Ensamblaje a buscar tesoros en el Bosque Escondido",
			[DailyQuest.HelpCeasingCommodoreOrDaydreamForesterFindTreasureInVillageOfDreams]:
				"Ayuda al Capitán de navío cesante o al Guardabosques soñador a buscar tesoros en la Aldea de los Sueños",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInTreasureReef]:
				"Ayuda al Pescador ansioso o a la Estudiante gruñona a buscar tesoros en el Coral del tesoro",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInStarlightDesert]:
				"Ayuda al Cañonero tentado o al Explorador risueño a buscar tesoros en el desierto Luz de Estrellas.",
		},
		seasons: {
			[SeasonId.Gratitude]: "Temporada de la gratitud",
			[SeasonId.Lightseekers]: "Temporada de los buscadores de la luz",
			[SeasonId.Belonging]: "Temporada de la pertenencia",
			[SeasonId.Rhythm]: "Temporada del ritmo",
			[SeasonId.Enchantment]: "Temporada del Encanto",
			[SeasonId.Sanctuary]: "Temporada del Santuario",
			[SeasonId.Prophecy]: "Temporada de la Profecía",
			[SeasonId.Dreams]: "Temporada de los sueños",
			[SeasonId.Assembly]: "Temporada del Ensamblaje",
			[SeasonId.LittlePrince]: "Temporada de El Principito",
			[SeasonId.Flight]: "Temporada de vuelo",
			[SeasonId.Abyss]: "Temporada del abismo",
			[SeasonId.Performance]: "Temporada de obras",
			[SeasonId.Shattering]: "Temporada de la Destrucción",
			[SeasonId.AURORA]: "Temporada de AURORA",
			[SeasonId.Remembrance]: "Temporada de conmemoración",
			[SeasonId.Passage]: "La temporada de iniciación",
			[SeasonId.Moments]: "La temporada de los momentos",
			[SeasonId.Revival]: "Temporada del Renacimiento",
			[SeasonId.NineColouredDeer]: "Temporada del ciervo de los nueve colores",
			[SeasonId.Nesting]: "Temporada Acogedora",
			[SeasonId.Duets]: "Temporada de Duetos",
			[SeasonId.Moomin]: "Temporada de los Mumins",
			[SeasonId.Radiance]: "Temporada de resplandor",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "Candelero que apunta",
			[SpiritId.UsheringStargazer]: "Soñadora escolta",
			[SpiritId.RejectingVoyager]: "Viajero que rechaza",
			[SpiritId.ElderOfTheIsle]: "Anciano de la Isla",
			[SpiritId.ButterflyCharmer]: "Encantador de mariposas",
			[SpiritId.ApplaudingBellmaker]: "Campanera que aplaude",
			[SpiritId.WavingBellmaker]: "Campanero que saluda",
			[SpiritId.SlumberingShipwright]: "Fabricante de barcos dormilón",
			[SpiritId.LaughingLightCatcher]: "Cazadora de luz risueña",
			[SpiritId.BirdWhisperer]: "Susurrador de aves",
			[SpiritId.ExhaustedDockWorker]: "Estibador exhausto",
			[SpiritId.CeremonialWorshiper]: "Adorador ceremonial",
			[SpiritId.ElderOfThePrairie]: "Anciana de la Planicie",
			[SpiritId.ShiveringTrailblazer]: "Pionera temblorosa",
			[SpiritId.BlushingProspector]: "Buscadora de oro sonrojada",
			[SpiritId.HideNSeekPioneer]: "Pionero de las escondidas",
			[SpiritId.PoutyPorter]: "Portero que hace puchero",
			[SpiritId.DismayedHunter]: "Cazadora abatida",
			[SpiritId.ApologeticLumberjack]: "Leñador arrepentido",
			[SpiritId.TearfulLightMiner]: "Minera de luz llorona",
			[SpiritId.WhaleWhisperer]: "Susurrador de ballenas",
			[SpiritId.ElderOfTheForest]: "Anciana del Bosque",
			[SpiritId.ConfidentSightseer]: "Turista confidente",
			[SpiritId.HandstandingThrillseeker]: "Amante de la adrenalina parado de manos",
			[SpiritId.MantaWhisperer]: "Susurrador de mantas",
			[SpiritId.BackflippingChampion]: "Campeón de Voltereta",
			[SpiritId.CheerfulSpectator]: "Espectador alegre",
			[SpiritId.BowingMedalist]: "Medallista reverencial",
			[SpiritId.ProudVictor]: "Vencedora orgullosa",
			[SpiritId.ElderOfTheValley]: "Anciano del Valle",
			[SpiritId.FrightenedRefugee]: "Refugiada temerosa",
			[SpiritId.FaintingWarrior]: "Guerrera desmayada",
			[SpiritId.CourageousSoldier]: "Soldado valiente",
			[SpiritId.StealthySurvivor]: "Sobreviviente sigilosa",
			[SpiritId.SalutingCaptain]: "Capitán que saluda",
			[SpiritId.LookoutScout]: "Explorador vigía",
			[SpiritId.ElderOfTheWasteland]: "Anciano del Páramo",
			[SpiritId.PrayingAcolyte]: "Acólito orador",
			[SpiritId.LevitatingAdept]: "Adepta Levitante",
			[SpiritId.PoliteScholar]: "Académica amable",
			[SpiritId.MemoryWhisperer]: "Susurrador de los espíritus",
			[SpiritId.MeditatingMonastic]: "Erudito Meditante",
			[SpiritId.ElderOfTheVault]: "Anciana de la Bóveda",
			[SpiritId.GratitudeGuide]: "Guía de la Gratitud",
			[SpiritId.SassyDrifter]: "Vagabundo pícaro",
			[SpiritId.StretchingGuru]: "Gurú estirando",
			[SpiritId.ProvokingPerformer]: "Artista provocador",
			[SpiritId.LeapingDancer]: "Bailarín saltarín",
			[SpiritId.SalutingProtector]: "Protector que saluda",
			[SpiritId.GreetingShaman]: "Chamán amable",
			[SpiritId.LightseekerGuide]: "Guía de los Buscadores de la Luz",
			[SpiritId.PiggybackLightseeker]: "Buscadora de la luz a caballito",
			[SpiritId.DoublefiveLightCatcher]: "Cazador de luz con chocalas!",
			[SpiritId.LaidbackPioneer]: "Pionero despreocupado",
			[SpiritId.TwirlingChampion]: "Campeón de piruetas",
			[SpiritId.CrabWhisperer]: "Susurrador de cangrejos",
			[SpiritId.ShushingLightScholar]: "Erudito de la luz que silencia",
			[SpiritId.BelongingGuide]: "Guía de la Pertenencia",
			[SpiritId.BoogieKid]: "Niño Boogie",
			[SpiritId.ConfettiCousin]: "Prima de Confeti",
			[SpiritId.HairtousleTeen]: "Adolescente despeinado",
			[SpiritId.SparklerParent]: "Madre iluminada",
			[SpiritId.PleafulParent]: "Padre suplicante",
			[SpiritId.WiseGrandparent]: "Abuelo sabio",
			[SpiritId.RhythmGuide]: "Guía del Ritmo",
			[SpiritId.TroupeGreeter]: "Grupo de saludadores",
			[SpiritId.FestivalSpinDancer]: "Bailarina festiva",
			[SpiritId.AdmiringActor]: "Actor admirado",
			[SpiritId.TroupeJuggler]: "Grupo de malabaristas",
			[SpiritId.RespectfulPianist]: "Pianista respetuosa",
			[SpiritId.ThoughtfulDirector]: "Director atento",
			[SpiritId.EnchantmentGuide]: "Guía del Encanto",
			[SpiritId.NoddingMuralist]: "Muralista que asiente",
			[SpiritId.IndifferentAlchemist]: "Alquimista indiferente",
			[SpiritId.CrabWalker]: "Caminador cangrejo",
			[SpiritId.ScarecrowFarmer]: "Granjero espantapájaros",
			[SpiritId.SnoozingCarpenter]: "Carpintera dormilona",
			[SpiritId.PlayfightingHerbalist]: "Herborista peleadora",
			[SpiritId.SanctuaryGuide]: "Guía del santuario",
			[SpiritId.JellyWhisperer]: "Susurrador de medusas",
			[SpiritId.TimidBookworm]: "Ratón de biblioteca tímido",
			[SpiritId.RallyingThrillseeker]: "Buscador de la luz alentador",
			[SpiritId.HikingGrouch]: "Gruñón alpinista",
			[SpiritId.GratefulShellCollector]: "Coleccionista de caracolas agradecida",
			[SpiritId.ChillSunbather]: "Tranquilo Bañista del Sol",
			[SpiritId.ProphecyGuide]: "Guía de la profecía",
			[SpiritId.ProphetOfWater]: "Profeta del Agua",
			[SpiritId.ProphetOfEarth]: "Profeta de la Tierra",
			[SpiritId.ProphetOfAir]: "Profeta del Aire",
			[SpiritId.ProphetOfFire]: "Profeta del Fuego",
			[SpiritId.DreamsGuide]: "Guía de los sueños",
			[SpiritId.SpinningMentor]: "Mentora de volteretas",
			[SpiritId.DancingPerformer]: "Bailarín",
			[SpiritId.PeekingPostman]: "Cartera que espía",
			[SpiritId.BearhugHermit]: "Yeti Abrazoso",
			[SpiritId.AssemblyGuide]: "Guía del Ensamblaje",
			[SpiritId.BaffledBotanist]: "Botánica perpleja",
			[SpiritId.ScoldingStudent]: "Estudiante gruñona",
			[SpiritId.ScaredyCadet]: "Cadete miedoso",
			[SpiritId.MarchingAdventurer]: "Aventurera en marcha",
			[SpiritId.ChucklingScout]: "Explorador risueño",
			[SpiritId.DaydreamForester]: "Guardabosques soñador",
			[SpiritId.TheRose]: "La rosa",
			[SpiritId.BeckoningRuler]: "Gobernante que llama",
			[SpiritId.GloatingNarcissist]: "Narcisista presuntuoso",
			[SpiritId.StretchingLamplighter]: "Farolero que se estira",
			[SpiritId.SlouchingSoldier]: "Soldado encorvado",
			[SpiritId.SneezingGeographer]: "Geógrafo que estornuda",
			[SpiritId.StarCollector]: "Coleccionista de estrellas",
			[SpiritId.FlightGuide]: "Guía de vuelo",
			[SpiritId.LivelyNavigator]: "Navegante vivaz",
			[SpiritId.LightWhisperer]: "Susurradora de la luz",
			[SpiritId.TinkeringChimesmith]: "Forjadora de campanitas de viento",
			[SpiritId.TalentedBuilder]: "Constructor talentoso",
			[SpiritId.AbyssGuide]: "Guía del abismo",
			[SpiritId.AnxiousAngler]: "Pescador ansioso",
			[SpiritId.CeasingCommodore]: "Capitán de navío cesante",
			[SpiritId.BumblingBoatswain]: "Contramaestre torpe",
			[SpiritId.CacklingCannoneer]: "Cañonero tentado",
			[SpiritId.PerformanceGuide]: "Guía de la obra",
			[SpiritId.FranticStagehand]: "Tramoyista agitado",
			[SpiritId.ForgetfulStoryteller]: "Cuentista olvidadizo",
			[SpiritId.MellowMusician]: "Músico gentil",
			[SpiritId.ModestDancer]: "Bailarín modesto",
			[SpiritId.TheVoidOfShattering]: "El Vacío de la Destrucción",
			[SpiritId.AncientLight1]: "Luz ancestral (medusa)",
			[SpiritId.AncientLight2]: "Luz ancestral (manta)",
			[SpiritId.AncientDarkness1]: "Oscuridad ancestral (planta)",
			[SpiritId.AncientDarkness2]: "Oscuridad ancestral (dragon)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Viajero corredor",
			[SpiritId.MindfulMiner]: "Minero consciente",
			[SpiritId.WarriorOfLove]: "Guerrero de amor",
			[SpiritId.SeedOfHope]: "Semilla de esperanza",
			[SpiritId.RemembranceGuide]: "Guía de conmemoración",
			[SpiritId.BereftVeteran]: "Veterano despojado",
			[SpiritId.PleadingChild]: "Niño suplicante",
			[SpiritId.TiptoeingTeaBrewer]: "Camarera de té en puntas de pie",
			[SpiritId.WoundedWarrior]: "Guerrero herido",
			[SpiritId.PassageGuide]: "Guía de iniciación",
			[SpiritId.OddballOutcast]: "Paria excéntrico",
			[SpiritId.TumblingTroublemaker]: "Alborotador acrobático",
			[SpiritId.MelancholyMope]: "Melancólico abatido",
			[SpiritId.OveractiveOverachiever]: "Sobresaliente hiperactivo",
			[SpiritId.MomentsGuide]: "Guía de los momentos",
			[SpiritId.ReassuringRanger]: "Guardaparques reconfortante",
			[SpiritId.NightbirdWhisperer]: "Susurradora de aves nocturnas",
			[SpiritId.JollyGeologist]: "Geóloga alegre",
			[SpiritId.AsceticMonk]: "Monje ascético",
			[SpiritId.HopefulSteward]: "Administrador optimista",
			[SpiritId.VestigeOfADesertedOasis]: "Vestigio de un oasis desierto",
			[SpiritId.MemoryOfALostVillage]: "Recuerdo de una aldea perdida",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Eco de un refugio abandonado",
			[SpiritId.RemnantOfAForgottenHaven]: "Restos de un paraíso olvidado",
			[SpiritId.SpiritOfMural]: "Espíritu del mural",
			[SpiritId.HerbGatherer]: "Recolector de hierbas",
			[SpiritId.Hunter]: "Cazador",
			[SpiritId.FeudalLord]: "Señor feudal",
			[SpiritId.Princess]: "Princesa",
			[SpiritId.NestingGuide]: "Guía acogedora",
			[SpiritId.NestingSolarium]: "Solárium acogedor",
			[SpiritId.NestingLoft]: "Ático acogedor",
			[SpiritId.NestingAtrium]: "Pórtico acogedor",
			[SpiritId.NestingNook]: "Rincón acogedor",
			[SpiritId.DuetsGuide]: "Guía de los duetos",
			[SpiritId.TheCellistsBeginnings]: "Los comienzos del chelista",
			[SpiritId.ThePianistsBeginnings]: "Los comienzos del pianista",
			[SpiritId.TheMusiciansLegacy]: "El legado del músico",
			[SpiritId.TheCellistsFlourishing]: "La prosperidad del chelista",
			[SpiritId.ThePianistsFlourishing]: "La prosperidad del pianista",
			[SpiritId.TheMoominStorybook]: "Libro de cuentos de los Mumin",
			[SpiritId.ComfortOfKindness]: "Consuelo de bondad",
			[SpiritId.SenseOfSelf]: "Sentido de identidad",
			[SpiritId.SpiritOfAdventure]: "Espíritu aventurero",
			[SpiritId.InspirationOfInclusion]: "Inspiración inclusiva",
			[SpiritId.RadianceGuide]: "Guía de resplandor",
			[SpiritId.RadianceLeapingDancer]: "Bailarín saltarín de resplandor",
			[SpiritId.RadianceProvokingPerformer]: "Artista provocador de resplandor",
			[SpiritId.RadianceGreetingShaman]: "Chamán amable de resplandor",
		},
	},
	commands: {
		calculate: {
			"command-name": "calcular",
			"command-description": "El comando contiene varias calculadoras.",
			"seasonal-candles": {
				"command-name": "velas-de-temporada",
				"command-description":
					"Este comando indica cuántos días se necesitan para conseguir cierta cantidad de velas de temporada.",
				"command-option-start-name": "inicio",
				"command-option-start-description": "Número inicial de velas de temporada.",
				"command-option-goal-name": "meta",
				"command-option-goal-description": "Número de velas de temporada que deseas",
				"goal-achieved": "¡Ya has alcanzado tu objetivo!",
				start: "Inicio",
				goal: "Meta",
				required: "Requeridos",
				result: "Resultado",
				day_one: "{{count}} día",
				day_other: "{{count}} días",
				"day-season-pass_one": "({{count}} día con el Pase).",
				"day-season-pass_other": "({{count}} días con el Pase).",
				"seasonal-candle-calculator": "Calculadora de Velas de Temporada",
				"season-calculations": "Cálculos de Temporada",
				"remain-in-the-season": "Restantes en la temporada.",
				"remain-in-the-season-with-a-season-pass": "Restantes en la temporada con el Pase.",
				notes: "Notas",
				"double-seasonal-light-calculation":
					"Evento de luz doble de Temporada incluído en los cálculos.",
			},
			"winged-light": {
				"command-name": "luz-alada",
				"command-description": "Calcula cuánta luz alada deberías tener.",
				"duplicate-areas": "Áreas duplicadas detectadas. ¡Asegúrate de dar una única área!",
				"started-with": "Empezaste con",
				"reborn-with": "Renaciste con",
				total: "Total",
				unknown: "Área desconocida detectada. Por favor, ¡reporta este problema!",
				"wedge-next_other": "Siguiente nivel: {{count}}",
				"wedge-total_other": "Nivel {{count}}",
				"winged-light-calculator": "Calculadora de Luz Alada",
			},
		},
		hug: {
			"command-name": "abrazo",
			"command-description": "¡Abraza a alguien!",
			user: "usuario",
			"user-description": "El individuo para ser abrazado.",
			"hug-self": "¡Comparte el amor! ¡Abraza a alguien que no seas tú!",
			"not-in-server": "{{user}} no está en el servidor para recibir tu abrazo.",
			"not-around": "{{user}} no está aquí para recibir el abrazo!",
			bot: "{{user}} es un bot. No tiene emociones. Es inmune a los abrazos, diría yo.",
			message: "{{user}}, ¡{{invoker}} te ha abrazado!",
		},
		notifications: {
			setup: {
				"no-everyone": "Oye espera, eso no es una buena idea. ¡Escoge otro rol!",
			},
		},
	},
} as const;
