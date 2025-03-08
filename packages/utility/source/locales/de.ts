import { RealmName, SkyMap } from "../kingdom.js";
import { DailyQuest } from "../quests.js";
import { SeasonId } from "../season.js";
import { SpiritId } from "../utility/spirits.js";

export default {
	general: {
		"days-left": {
			season_zero: "Die Saison endet heute.",
			season_one: "{{count}} Tag für die Saison übrig. ",
			season_other: "{{count}} Tage für die Saison übrig.",
		},
		realms: {
			[RealmName.IslesOfDawn]: "Insel der Dämmerung",
			[RealmName.DaylightPrairie]: "Tageslichtprärie",
			[RealmName.HiddenForest]: "Verborgener Wald",
			[RealmName.ValleyOfTriumph]: "Tal des Triumphs",
			[RealmName.GoldenWasteland]: "Goldene Ödnis",
			[RealmName.VaultOfKnowledge]: "Tresor des Wissens",
			[RealmName.EyeOfEden]: "Auge von Eden",
		},
		maps: { [SkyMap.JellyfishCove]: "Quallenbucht" },
		quests: {
			[DailyQuest.Collect30PiecesOfLight]: "Sammle 30 Lichtstücke",
			[DailyQuest.Light20Candles]: "Zünde 20 Kerzen an",
			[DailyQuest.ForgeACandle]: "Schmiede eine Kerze",
			[DailyQuest.Melt10Darkness]: "Schmelze 10 Dunkelheit",
			[DailyQuest.BowAtAPlayer]: "Verbeuge dich vor einem Spieler",
			[DailyQuest.FollowAFriend]: "Folge einem Freund",
			[DailyQuest.HugAFriend]: "Umarme einen Freund",
			[DailyQuest.WaveToAFriend]: "Winke einem Freund zu",
			[DailyQuest.HoldAFriendsHand]: "Halte die Hand eines Freundes",
			[DailyQuest.SendAGiftToAFriend]: "Schicke einem Freund ein Geschenk",
			[DailyQuest.MakeANewAcquaintance]: "Lerne eine neue Person kennen",
			[DailyQuest.HighFiveAFriend]: "Gib einem Freund ein High Five",
			[DailyQuest.UseAnExpressionNearAFriend]: "Verwende einen Ausdruck in der Nähe eines Freundes",
			[DailyQuest.SitOnABenchWithAStranger]: "Sitze auf einer Bank mit einem Fremden",
			[DailyQuest.RechargeFromAJellyfish]: "Lade dein Licht durch eine Qualle auf",
			[DailyQuest.RechargeFromALightBloom]: "Lade dein Licht durch ein Lichtblühen auf",
			[DailyQuest.RideWithAManta]: "Schwimme mit einem Riesenrochen",
			[DailyQuest.ReliveASpiritsMemories]: "Erlebe die Erinnerungen eines Geistes",
			[DailyQuest.ReliveASpiritsMemoriesInDaylightPrairie]:
				"Erlebe die Erinnerungen eines Geistes in der Tageslichtprärie",
			[DailyQuest.ReliveASpiritsMemoriesInHiddenForest]:
				"Erlebe die Erinnerungen eines Geistes im Verborgenen Wald",
			[DailyQuest.ReliveASpiritsMemoriesInValleyOfTriumph]:
				"Erlebe die Erinnerungen eines Geistes im Tal des Triumphs",
			[DailyQuest.ReliveASpiritsMemoriesInGoldenWasteland]:
				"Erlebe die Erinnerungen eines Geistes in der Goldenen Ödnis",
			[DailyQuest.ReliveASpiritsMemoriesInVaultOfKnowledge]:
				"Erlebe die Erinnerungen eines Geistes im Tresor des Wissens",
			[DailyQuest.FaceTheDarkDragon]: "Stell dich dem Dunkeldrachen",
			[DailyQuest.KnockOver5DarkCrabs]: "Wirf 5 Dunkelkreaturen-Krebse um",
			[DailyQuest.CatchTheLightInTheDaylightPrairie]: "Fange das Licht in der Tageslichtprärie",
			[DailyQuest.CatchTheLightInTheHiddenForest]: "Fange das Licht im Verborgenen Wald",
			[DailyQuest.CatchTheLightInTheValleyOfTriumph]: "Fange das Licht im Tal des Triumphs",
			[DailyQuest.CatchTheLightInTheGoldenWasteland]: "Fange das Licht in der Goldenen Ödnis",
			[DailyQuest.CatchTheLightInTheVaultOfKnowledge]: "Fange das Licht im Tresor des Wissens",
			[DailyQuest.VisitTheCosyHideoutInTheDaylightPrairie]:
				"Besuche das gemütliche Versteck in den Präriehöhlen",
			[DailyQuest.VisitTheAncestorsTableOfBelongingInTheHiddenForest]:
				"Besuche in der erhabenen Waldlichtung den Vorfahrentisch des Zusammengehörens",
			[DailyQuest.VisitTheHotSpringInTheValleyOfTriumph]:
				"Besuche die heiße Quelle im Dorf der Träume",
			[DailyQuest.VisitTheBonfireAtTheGoldenWasteland]: "Besuche das Lagerfeuer beim Ödnisfriedhof",
			[DailyQuest.AdmireTheSaplingInTheDaylightPrairie]:
				"Geh und bewundere das Bäumchen in der Tageslichtprärie für eine kurze Weile",
			[DailyQuest.AdmireTheSaplingInTheHiddenForest]:
				"Geh und bewundere das Bäumchen im verborgenen Wald für eine kurze Weile",
			[DailyQuest.AdmireTheSaplingInTheValleyOfTriumph]:
				"Geh und bewundere das Bäumchen im Tal des Triumphs für eine kurze Weile",
			[DailyQuest.AdmireTheSaplingInTheGoldenWasteland]:
				"Geh und bewundere das Bäumchen in der goldenen Ödnis für eine kurze Weile",
			[DailyQuest.AdmireTheSaplingInTheVaultOfKnowledge]:
				"Geh und bewundere das Bäumchen im Tresor des Wissens für eine kurze Weile",
			[DailyQuest.VisitThePollutedGeyser]:
				"Besuche den verschmutzten Geysir auf den Zufluchtsinseln",
			[DailyQuest.RidTheSanctuaryVortexOfDarkness]: "Erlöse den Zufluchtsvortex von der Finsternis",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheDaylightPrairie]:
				"Suche die Kerzen am Ende des Regenbogens in der Tageslichtprärie",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheHiddenForest]:
				"Suche die Kerzen am Ende des Regenbogens im verborgenen Wald",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheValleyOfTriumph]:
				"Suche die Kerzen am Ende des Regenbogens im Tal des Triumphs",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheGoldenWasteland]:
				"Suche die Kerzen am Ende des Regenbogens in der goldenen Ödnis",
			[DailyQuest.FindTheCandlesAtTheEndOfTheRainbowInTheVaultOfKnowledge]:
				"Suche die Kerzen am Ende des Regenbogens im Tresor des Wissens",
			[DailyQuest.AdmireTheRainbowInTheSanctuaryIslands]:
				"Bewundere den Regenbogen auf den Zufluchtsinseln für eine kurze Zeit",
			[DailyQuest.AdmireTheRainbowInTheWindPaths]:
				"Bewundere den Regenbogen in den Windpfaden für eine kurze Zeit",
			[DailyQuest.AdmireTheRainbowInTheHermitValley]:
				"Bewundere den Regenbogen im Einsiedlertal für eine kurze Zeit",
			[DailyQuest.AdmireTheRainbowInTheTreasureReef]:
				"Bewundere den Regenbogen im Schatzriff für eine kurze Zeit",
			[DailyQuest.AdmireTheRainbowInTheStarlightDesert]:
				"Bewundere den Regenbogen in der Sternenlichtwüste für eine kurze Zeit",
			[DailyQuest.MeditateAtTheBirdNest]: "Meditiere im Vogelnestschrein der Prärie",
			[DailyQuest.MeditateInTheButterflyFields]: "Meditiere im Schmetterlingsfeld der Prärie",
			[DailyQuest.MeditateAtTheSanctuaryIslands]: "Meditiere auf den Zufluchtsinseln",
			[DailyQuest.MeditateInTheCave]: "Meditiere im Höhlenschrein der Prärie",
			[DailyQuest.MeditateByTheKoiPond]: "Meditiere am Koiteich der Prärie",
			[DailyQuest.MeditateAtTheForestClearing]: "Meditiere auf der Lichtung im Wald",
			[DailyQuest.MeditateAtTheForestBrook]: "Meditiere über dem Bach des Walds",
			[DailyQuest.MeditateAtTheElevatedClearing]:
				"Meditiere auf der höhergelegenen Lichtung im Wald",
			[DailyQuest.MeditateAtTheForestEnd]: "Meditiere am Ende des Walds",
			[DailyQuest.MeditateAtTheBoneyard]: "Meditiere auf dem Friedhof im Wald",
			[DailyQuest.MeditateByTheIceRink]: "Meditiere an der Eisbahn des Tals",
			[DailyQuest.MeditateAboveTheCitadelsArch]: "Meditiere über dem Zitadellenbogen des Tals",
			[DailyQuest.MeditateHighAboveTheCitadel]: "Meditiere hoch über der Zitadelle des Tals",
			[DailyQuest.MeditateAtTheColiseum]: "Meditiere am Ende des Rennens",
			[DailyQuest.MeditateInTheBrokenTemple]: "Meditiere im kaputten Tempel",
			[DailyQuest.MeditateInTheForgottenArk]: "Meditiere in der Vergessenen Arche",
			[DailyQuest.MeditateInTheGraveyard]: "Meditiere auf dem Friedhof",
			[DailyQuest.MeditateOnTheBoat]: "Meditiere auf dem Boot",
			[DailyQuest.MeditateOnTheBattlefield]: "Meditiere auf dem Schlachtfeld",
			[DailyQuest.MeditateAtTheVaultEntrance]: "Meditiere am Eingang des Tresor des Wissens",
			[DailyQuest.MeditateInTheVaultSecondFloor]: "Meditiere im zweiten Stock des Tresors",
			[DailyQuest.MeditateAtTheVaultSummit]: "Meditiere auf der Spitze des Tresors",
			[DailyQuest.CollectGreenLight]: "Sammle Grünes Licht",
			[DailyQuest.CollectOrangeLight]: "Sammle Oranges Licht",
			[DailyQuest.CollectBlueLight]: "Sammle Blaues Licht",
			[DailyQuest.CollectRedLight]: "Sammle Rotes Licht",
			[DailyQuest.CollectPurpleLight]: "Sammle Lila Licht",
			[DailyQuest.PracticeWithTheSkater]: "Übe mit der Skaterin im Dorf der Träume",
			[DailyQuest.RaceDownTheSlopesWithTheSkater]:
				"Rase mit der Skaterin die Hänge im Dorf der Träume hinab",
			[DailyQuest.RaceDownTheMountainWithTheSkater]:
				"Rase mit der Skaterin den Berg im Einsiedlertal hinab",
			[DailyQuest.RehearseForAPerformanceWithTheSkater]:
				"Probe einen Auftritt mit der Skaterin im Kolosseum",
			[DailyQuest.CompleteTheHoopScavengerHunt]: "Schließe die Reifen-Schnitzeljagd ab",
			[DailyQuest.ReliveTheButterflyCharmer]:
				"Erlebe erneut die Erinnerung des Schmetterlingszähmers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheApplaudingBellmaker]:
				"Erlebe erneut die Erinnerung der Applaudierenden Glockenmacherin von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheWavingBellmaker]:
				"Erlebe erneut die Erinnerung des Winkenden Glockenmachers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheSlumberingShipwright]:
				"Erlebe erneut die Erinnerung des Müden Bootsbauers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheLaughingLightCatcher]:
				"Erlebe erneut die Erinnerung der Lachenden Lichtfarmerin von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheBirdWhisperer]:
				"Erlebe erneut die Erinnerung des Vogelsprechers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheExhaustedDockWorker]:
				"Erlebe erneut die Erinnerung des Erschöpften Dockarbeiters von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheShiveringTrailblazer]:
				"Erlebe erneut die Erinnerung der Zitternden Wegbereiterin vom Verborgenen Wald",
			[DailyQuest.ReliveTheBlushingProspector]:
				"Erlebe erneut die Erinnerung der Errötenden Goldsucherin vom Verborgenen Wald",
			[DailyQuest.ReliveTheHideNSeekPioneer]:
				"Erlebe erneut die Erinnerung des Versteckspiel-Pioniers vom Verborgenen Wald",
			[DailyQuest.ReliveThePoutyPorter]:
				"Erlebe erneut die Erinnerung des Mürrischen Gepäckträgers vom Verborgenen Wald",
			[DailyQuest.ReliveTheDismayedHunter]:
				"Erlebe erneut die Erinnerung der Bestürzten Jägerin vom Verborgenen Wald",
			[DailyQuest.ReliveTheApologeticLumberjack]:
				"Erlebe erneut die Erinnerung des Sich entschuldigenden Baumfällers vom Verborgenen Wald",
			[DailyQuest.ReliveTheTearfulLightMiner]:
				"Erlebe erneut die Erinnerung der Weinerlichen Lichtabbauerin vom Verborgenen Wald",
			[DailyQuest.ReliveTheWhaleWhisperer]:
				"Erlebe erneut die Erinnerung des Walsprechers vom Verborgenen Wald",
			[DailyQuest.ReliveTheConfidentSightseer]:
				"Erlebe erneut die Erinnerung des Selbstbewussten Touristen vom Tal des Triumphs",
			[DailyQuest.ReliveTheHandstandingThrillseeker]:
				"Erlebe erneut die Erinnerung des Abenteuerlustigen Handstandmachers vom Tal des Triumphs",
			[DailyQuest.ReliveTheMantaWhisperer]:
				"Erlebe erneut die Erinnerung des Riesenrochensprechers vom Tal des Triumphs",
			[DailyQuest.ReliveTheBackflippingChampion]:
				"Erlebe erneut die Erinnerung des Rückwärtssalto-Champions vom Tal des Triumphs",
			[DailyQuest.ReliveTheCheerfulSpectator]:
				"Erlebe erneut die Erinnerung des Fröhlichen Zuschauers vom Tal des Triumphs",
			[DailyQuest.ReliveTheBowingMedalist]:
				"Erlebe erneut die Erinnerung der Sich verbeugenden Medaillengewinnerin vom Tal des Triumphs",
			[DailyQuest.ReliveTheProudVictor]:
				"Erlebe erneut die Erinnerung der Stolzen Siegerin vom Tal des Triumphs",
			[DailyQuest.ReliveTheFrightenedRefugee]:
				"Erlebe erneut die Erinnerung der Ängstlichen Flüchtlingsfrau von der Goldenen Einöde",
			[DailyQuest.ReliveTheFaintingWarrior]:
				"Erlebe erneut die Erinnerung der Ohnmächtigen Kriegerin von der Goldenen Einöde",
			[DailyQuest.ReliveTheCourageousSoldier]:
				"Erlebe erneut die Erinnerung des Mutigen Soldaten von der Goldenen Einöde",
			[DailyQuest.ReliveTheStealthySurvivor]:
				"Erlebe erneut die Erinnerung der Schleichenden Überlebenden von der Goldenen Einöde",
			[DailyQuest.ReliveTheSalutingCaptain]:
				"Erlebe erneut die Erinnerung des Grüßenden Kapitäns von der Goldenen Einöde",
			[DailyQuest.ReliveTheLookoutScout]:
				"Erlebe erneut die Erinnerung des Aussichtsspähers von der Goldenen Einöde",
			[DailyQuest.ReliveThePrayingAcolyte]:
				"Erlebe erneut die Erinnerung des Betenden Messdieners vom Tresor des Wissens",
			[DailyQuest.ReliveTheLevitatingAdept]:
				"Erlebe erneut die Erinnerung der Schwebenden Forscherin vom Tresor des Wissens",
			[DailyQuest.ReliveThePoliteScholar]:
				"Erlebe erneut die Erinnerung der Höflichen Gelehrten vom Tresor des Wissens",
			[DailyQuest.ReliveTheMemoryWhisperer]:
				"Erlebe erneut die Erinnerung des Geistersprechers vom Tresor des Wissens",
			[DailyQuest.ReliveTheMeditatingMonastic]:
				"Erlebe erneut die Erinnerung des Meditierenden Gelehrten vom Tresor des Wissens",
			[DailyQuest.ReliveTheStretchingGuru]:
				"Erlebe erneut die Erinnerung des Stretchenden Gurus von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheProvokingPerformer]:
				"Erlebe erneut die Erinnerung des Provozierenden Künstlers vom Verborgenen Wald",
			[DailyQuest.ReliveTheLeapingDancer]:
				"Erlebe erneut die Erinnerung des Springenden Tänzers vom Tal des Triumphs",
			[DailyQuest.ReliveTheSalutingProtector]:
				"Erlebe erneut die Erinnerung des Grüßenden Beschützers von der Goldenen Einöde",
			[DailyQuest.ReliveTheGreetingShaman]:
				"Erlebe erneut die Erinnerung des Grüßenden Schamanen vom Tresor des Wissens",
			[DailyQuest.ReliveTheDoublefiveLightCatcher]:
				"Erlebe erneut die Erinnerung des Doppel-Five-Lichtfängers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheLaidbackPioneer]:
				"Erlebe erneut die Erinnerung des Entspannten Pioniers vom Verborgenen Wald",
			[DailyQuest.ReliveTheTwirlingChampion]:
				"Erlebe erneut die Erinnerung des Wirbelnden Champions vom Tal des Triumphs",
			[DailyQuest.ReliveTheCrabWhisperer]:
				"Erlebe erneut die Erinnerung des Krabbensprechers von der Goldenen Einöde",
			[DailyQuest.ReliveTheShushingLightScholar]:
				"Erlebe erneut die Erinnerung des Beruhigenden Lichtwissenschaftlers vom Tresor des Wissens",
			[DailyQuest.ReliveTheConfettiCousin]:
				"Erlebe erneut die Erinnerung der Konfetti-Cousine von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheHairtousleTeen]:
				"Erlebe erneut die Erinnerung des Haarwuschel-Teenagers vom Verborgenen Wald",
			[DailyQuest.ReliveTheSparklerParent]:
				"Erlebe erneut die Erinnerung der Wunderkerzen-Mutter vom Tal des Triumphs",
			[DailyQuest.ReliveThePleafulParent]:
				"Erlebe erneut die Erinnerung des Bittenden Vaters von der Goldenen Einöde",
			[DailyQuest.ReliveTheWiseGrandparent]:
				"Erlebe erneut die Erinnerung des Nachdenklichen Direktors vom Tresor des Wissens",
			[DailyQuest.ReliveTheFestivalSpinDancer]:
				"Erlebe erneut die Erinnerung der Festival-Drehtänzerin von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheAdmiringActor]:
				"Erlebe erneut die Erinnerung des Bewundernden Schauspielers vom Verborgenen Wald",
			[DailyQuest.ReliveTheTroupeJuggler]:
				"Erlebe erneut die Erinnerung des Zirkusjonglierers vom Tal des Triumphs",
			[DailyQuest.ReliveTheRespectfulPianist]:
				"Erlebe erneut die Erinnerung des Respektvollen Klavierspielers von der Goldenen Einöde",
			[DailyQuest.ReliveTheThoughtfulDirector]:
				"Erlebe erneut die Erinnerung des Nachdenklichen Direktors vom Tresor des Wissens",
			[DailyQuest.ReliveTheNoddingMuralist]:
				"Erlebe erneut die Erinnerung der Nickenden Wandmalerin von der Goldenen Einöde",
			[DailyQuest.ReliveTheIndifferentAlchemist]:
				"Erlebe erneut die Erinnerung des Gleichgültigen Alchemisten von der Goldenen Einöde",
			[DailyQuest.ReliveTheCrabWalker]:
				"Erlebe erneut die Erinnerung des Krabbenläufers von der Goldenen Einöde",
			[DailyQuest.ReliveTheScarecrowFarmer]:
				"Erlebe erneut die Erinnerung des Vogelscheuchen-Farmers von der Goldenen Einöde",
			[DailyQuest.ReliveTheSnoozingCarpenter]:
				"Erlebe erneut die Erinnerung der Dösenden Schreinerin von der Goldenen Einöde",
			[DailyQuest.ReliveThePlayfightingHerbalist]:
				"Erlebe erneut die Erinnerung der Schaukampf-Kräuterkundlerin von der Goldenen Einöde",
			[DailyQuest.ReliveTheJellyWhisperer]:
				"Erlebe erneut die Erinnerung des Quallenflüsterers von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheTimidBookworm]:
				"Erlebe erneut die Erinnerung des Schüchternen Bücherwurms von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheRallyingThrillseeker]:
				"Erlebe erneut die Erinnerung des Motivierenden Abenteuerlustigen von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheHikingGrouch]:
				"Erlebe erneut die Erinnerung des Wandernden Griesgrams von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheGratefulShellCollector]:
				"Erlebe erneut die Erinnerung der Dankbaren Muschelsammlerin von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheChillSunbather]:
				"Erlebe erneut die Erinnerung des Entspannten Sonnenbadenden von der Tageslicht-Prärie",
			[DailyQuest.ReliveTheSpinningMentor]:
				"Erlebe erneut die Erinnerung der Piourettina vom Tal des Triumphs",
			[DailyQuest.ReliveTheDancingPerformer]:
				"Erlebe erneut die Erinnerung des Tänzers vom Tal des Triumphs",
			[DailyQuest.ReliveThePeekingPostman]:
				"Erlebe erneut die Erinnerung des Guckenden Postboten vom Tal des Triumphs",
			[DailyQuest.ReliveTheBearhugHermit]:
				"Erlebe erneut die Erinnerung des Großen Yetis vom Tal des Triumphs",
			[DailyQuest.ReliveTheBaffledBotanist]:
				"Erlebe erneut die Erinnerung der Überraschten Botanikerin vom Verborgenen Wald",
			[DailyQuest.ReliveTheScoldingStudent]:
				"Erlebe erneut die Erinnerung der Schimpfenden Schülerin vom Verborgenen Wald",
			[DailyQuest.ReliveTheScaredyCadet]:
				"Erlebe erneut die Erinnerung des Verängstigten Kadetten vom Verborgenen Wald",
			[DailyQuest.ReliveTheMarchingAdventurer]:
				"Erlebe erneut die Erinnerung der Marschierenden Abenteurerin vom Verborgenen Wald",
			[DailyQuest.ReliveTheChucklingScout]:
				"Erlebe erneut die Erinnerung des Kichernden Pfadfinders vom Verborgenen Wald",
			[DailyQuest.ReliveTheDaydreamForester]:
				"Erlebe erneut die Erinnerung des Tagträumenden Försters vom Verborgenen Wald",
			[DailyQuest.VisitAShardOfDarknessFallenToTheKingdomOfSky]:
				"Besuche eine Scherbe der Finsternis, die in das Königreich von Sky gefallen ist",
			[DailyQuest.TakeASelfieWithHikingGrouchInPrairiePeaks]:
				"Mache ein Selfie mit dem Wandernden Griesgram auf dem Präriegipfel",
			[DailyQuest.TakeASelfieWithCrabWhispererInPrairiePeaks]:
				"Mache ein Selfie mit der Krabbenflüsterin auf dem Präriegipfel",
			[DailyQuest.TakeASelfieWithCacklingCannoneerInPrairiePeaks]:
				"Mache ein Selfie mit der Kicher-Kanonierin auf dem Präriegipfel",
			[DailyQuest.TakeASelfieWithTroupeGreeterInPrairiePeaks]:
				"Mache ein Selfie mit dem Zirkusbegrüßer auf dem Präriegipfel",
			[DailyQuest.MeetCinnamorollOnAHillInAviaryVillage]:
				"Triff Cinnamoroll auf einem Hügel im Volieren-Dorf",
			[DailyQuest.SmellFlowersWithCinnamorollInAviaryVillage]:
				"Rieche an Blumen mit Cinnamoroll im Volieren-Dorf",
			[DailyQuest.FindCinnamorollPeekingAroundAviaryVillage]:
				"Finde Cinnamoroll, während er sich im Volieren-Dorf umsieht",
			[DailyQuest.WakeUpCinnamorollInAviaryVillage]: "Wecke Cinnamoroll im Volieren-Dorf auf",
			[DailyQuest.FlyUpToTheTowerWithCinnamorollInAviaryVillage]:
				"Fliege mit Cinnamoroll zum Turm im Volieren-Dorf",
			[DailyQuest.SplashInTheWaterWithCinnamorollInAviaryVillage]:
				"Plansche im Wasser mit Cinnamoroll im Volieren-Dorf",
			[DailyQuest.PlayAnyTournamentSport]: "Spiele einen beliebigen Turniersport",
			[DailyQuest.ChangeYourHairstyle]: "Ändere deine Frisur",
			[DailyQuest.ChangeYourNecklace]: "Ändere deine Halskette",
			[DailyQuest.ChangeYourProp]: "Ändere deine Requisite",
			[DailyQuest.ChangeYourMask]: "Ändere deine Maske",
			[DailyQuest.ChangeYourCape]: "Ändere deinen Umhang",
			[DailyQuest.ChangeYourOutfit]: "Ändere deine Hose",
			[DailyQuest.ViewASharedMemoryAtAStyleRunwayShrine]:
				"Sieh dir eine Geteilte Erinnerung bei einem Schrein des Stillaufstegs an",
			[DailyQuest.RecordASharedMemoryAtAStyleRunwayShrine]:
				"Sieh dir eine Geteilte Erinnerung bei einem Schrein des Stillaufstegs an",
			[DailyQuest.MeetUpWithCacklingCannoneerInGraveyard]:
				"Spiele dem Kommando-Kapitän einen Streich",
			[DailyQuest.MeetUpWithHideNSeekPioneerInBoneyard]:
				"Triff dich mit Versteckspiel-Pionier in Friedhof im Wald",
			[DailyQuest.HelpCacklingCannoneerOrChucklingScoutFindTreasureInSanctuaryIslands]:
				"Hilf der Kicher-Kanonierin oder dem Kichernden Pfadfinder dabei, einen Schatz auf den Zufluchtsinseln zu finden",
			[DailyQuest.HelpTheBumblingBoatswainOrTheAssemblyGuideFindTreasureInHiddenForest]:
				"Hilf dem Stümperhaften Schiffsjungen oder dem Zusammenbauhelfer dabei, einen Schatz im Verborgenen Wald zu finden",
			[DailyQuest.HelpCeasingCommodoreOrDaydreamForesterFindTreasureInVillageOfDreams]:
				"Hilf dem Kommando-Kapitän oder dem Tagträumenden Förster dabei, einen Schatz im Dorf der Träume zu finden",
			[DailyQuest.HelpTheAnxiousAnglerOrTheScoldingStudentFindTreasureInTreasureReef]:
				"Hilf der Ängstlichen Anglerin oder der Schimpfenden Schülerin dabei, einen Schatz im Schatzriff zu finden",
			[DailyQuest.HelpTheCacklingCannoneerOrTheChucklingScoutFindTreasureInStarlightDesert]:
				"Hilf der Kicher-Kanonierin oder dem Kichernden Pfadfinder dabei, einen Schatz in der Sternenlichtwüste zu finden",
		},
		seasons: {
			[SeasonId.Gratitude]: "Saison der Dankbarkeit",
			[SeasonId.Lightseekers]: "Saison der Lichtsucher",
			[SeasonId.Belonging]: "Saison des Zusammengehörens",
			[SeasonId.Rhythm]: "Saison des Rhythmus",
			[SeasonId.Enchantment]: "Saison der Verzauberung",
			[SeasonId.Sanctuary]: "Saison der Zuflucht",
			[SeasonId.Prophecy]: "Saison der Prophezeiung",
			[SeasonId.Dreams]: "Saison der Träume",
			[SeasonId.Assembly]: "Saison des Zusammenbaus",
			[SeasonId.LittlePrince]: "Saison des kleinen Prinzen",
			[SeasonId.Flight]: "Saison des Fliegens",
			[SeasonId.Abyss]: "Saison des Abgrunds",
			[SeasonId.Performance]: "Saison der Darbietung",
			[SeasonId.Shattering]: "Saison der Zertrümmerung",
			[SeasonId.AURORA]: "Saison von AURORA",
			[SeasonId.Remembrance]: "Saison des Gedenkens",
			[SeasonId.Passage]: "Die Saison des Übergangs",
			[SeasonId.Moments]: "Die Saison der Momente",
			[SeasonId.Revival]: "Saison der Wiederbelebung",
			[SeasonId.NineColouredDeer]: "Saison des Neunfarbigen Hirsches",
			[SeasonId.Nesting]: "Saison des Nistens",
			[SeasonId.Duets]: "Saison der Duette",
			[SeasonId.Moomin]: "Saison des Mumins",
			[SeasonId.Radiance]: "Saison des Leuchtens",
		},
		spirits: {
			[SpiritId.PointingCandlemaker]: "Deutender Kerzenmacher",
			[SpiritId.UsheringStargazer]: "Geleitende Sternguckerin",
			[SpiritId.RejectingVoyager]: "Ablehnender Reisender",
			[SpiritId.ElderOfTheIsle]: "Ältester der Insel",
			[SpiritId.ButterflyCharmer]: "Schmetterlingszähmer",
			[SpiritId.ApplaudingBellmaker]: "Applaudierende Glockenmacherin",
			[SpiritId.WavingBellmaker]: "Winkender Glockenmacher",
			[SpiritId.SlumberingShipwright]: "Müder Bootsbauer",
			[SpiritId.LaughingLightCatcher]: "Lachende Lichtfarmerin",
			[SpiritId.BirdWhisperer]: "Vogelsprecher",
			[SpiritId.ExhaustedDockWorker]: "Erschöpfter Dockarbeiter",
			[SpiritId.CeremonialWorshiper]: "Zeremonieller Verehrer",
			[SpiritId.ElderOfThePrairie]: "Älteste der Prärie",
			[SpiritId.ShiveringTrailblazer]: "Zitternde Wegbereiterin",
			[SpiritId.BlushingProspector]: "Errötende Goldsucherin",
			[SpiritId.HideNSeekPioneer]: "Versteckspiel-Pionier",
			[SpiritId.PoutyPorter]: "Mürrischer Gepäckträger",
			[SpiritId.DismayedHunter]: "Bestürzte Jägerin",
			[SpiritId.ApologeticLumberjack]: "Sich entschuldigender Baumfäller",
			[SpiritId.TearfulLightMiner]: "Weinerliche Lichtabbauerin",
			[SpiritId.WhaleWhisperer]: "Walsprecher",
			[SpiritId.ElderOfTheForest]: "Älteste des Waldes",
			[SpiritId.ConfidentSightseer]: "Selbstbewusster Tourist",
			[SpiritId.HandstandingThrillseeker]: "Abenteuerlustiger Handstandmacher",
			[SpiritId.MantaWhisperer]: "Riesenrochensprecher",
			[SpiritId.BackflippingChampion]: "Rückwärtssalto-Champion",
			[SpiritId.CheerfulSpectator]: "Fröhlicher Zuschauer",
			[SpiritId.BowingMedalist]: "Sich verbeugende Medaillengewinnerin",
			[SpiritId.ProudVictor]: "Stolze Siegerin",
			[SpiritId.ElderOfTheValley]: "Ältester des Tals",
			[SpiritId.FrightenedRefugee]: "Ängstliche Flüchtlingsfrau",
			[SpiritId.FaintingWarrior]: "Ohnmächtige Kriegerin",
			[SpiritId.CourageousSoldier]: "Mutiger Soldat",
			[SpiritId.StealthySurvivor]: "Schleichende Überlebende",
			[SpiritId.SalutingCaptain]: "Grüßender Kapitän",
			[SpiritId.LookoutScout]: "Aussichtsspäher",
			[SpiritId.ElderOfTheWasteland]: "Ältester der Ödnis",
			[SpiritId.PrayingAcolyte]: "Betender Messdiener",
			[SpiritId.LevitatingAdept]: "Schwebende Forscherin",
			[SpiritId.PoliteScholar]: "Höfliche Gelehrte",
			[SpiritId.MemoryWhisperer]: "Geistersprecher",
			[SpiritId.MeditatingMonastic]: "Meditierender Gelehrter",
			[SpiritId.ElderOfTheVault]: "Älteste des Tresors",
			[SpiritId.GratitudeGuide]: "Dankbarkeits-Helfer",
			[SpiritId.SassyDrifter]: "Frecher Landstreicher",
			[SpiritId.StretchingGuru]: "Stretchender Guru",
			[SpiritId.ProvokingPerformer]: "Provozierender Künstler",
			[SpiritId.LeapingDancer]: "Springender Tänzer",
			[SpiritId.SalutingProtector]: "Grüßender Beschützer",
			[SpiritId.GreetingShaman]: "Grüßender Schamane",
			[SpiritId.LightseekerGuide]: "Lichtsucher-Helfer",
			[SpiritId.PiggybackLightseeker]: "Huckepack-Lichtsucherin",
			[SpiritId.DoublefiveLightCatcher]: "Doppel-Five-Lichtfänger",
			[SpiritId.LaidbackPioneer]: "Entspannter Pionier",
			[SpiritId.TwirlingChampion]: "Wirbelnder Champion",
			[SpiritId.CrabWhisperer]: "Krabbensprecher",
			[SpiritId.ShushingLightScholar]: "Beruhigender Lichtwissenschaftler",
			[SpiritId.BelongingGuide]: "Zusammengehörigkeits-Helfer",
			[SpiritId.BoogieKid]: "Boogie-Kind",
			[SpiritId.ConfettiCousin]: "Konfetti-Cousine",
			[SpiritId.HairtousleTeen]: "Haarwuschel-Teenager",
			[SpiritId.SparklerParent]: "Wunderkerzen-Mutter",
			[SpiritId.PleafulParent]: "Bittender Vater",
			[SpiritId.WiseGrandparent]: "Weiser Großvater",
			[SpiritId.RhythmGuide]: "Rhythmischer Helfer",
			[SpiritId.TroupeGreeter]: "Zirkusbegrüßer",
			[SpiritId.FestivalSpinDancer]: "Festival-Drehtänzerin",
			[SpiritId.AdmiringActor]: "Bewundernder Schauspieler",
			[SpiritId.TroupeJuggler]: "Zirkusjonglierer",
			[SpiritId.RespectfulPianist]: "Respektvoller Klavierspieler",
			[SpiritId.ThoughtfulDirector]: "Nachdenklicher Direktor",
			[SpiritId.EnchantmentGuide]: "Verzauberungshelfer",
			[SpiritId.NoddingMuralist]: "Nickender Wandmaler",
			[SpiritId.IndifferentAlchemist]: "Gleichgültiger Alchemist",
			[SpiritId.CrabWalker]: "Krabbenläufer",
			[SpiritId.ScarecrowFarmer]: "Vogelscheuchen-Farmer",
			[SpiritId.SnoozingCarpenter]: "Düsende Schreinerin",
			[SpiritId.PlayfightingHerbalist]: "Schaukampf-Kräuterkundlerin",
			[SpiritId.SanctuaryGuide]: "Zufluchtshelfer",
			[SpiritId.JellyWhisperer]: "Quallenflüsterer",
			[SpiritId.TimidBookworm]: "Schüchternder Bücherwurm",
			[SpiritId.RallyingThrillseeker]: "Motivierender Abenteuerlustiger",
			[SpiritId.HikingGrouch]: "Wandernder Griesgram",
			[SpiritId.GratefulShellCollector]: "Dankbare Muschelsammlerin",
			[SpiritId.ChillSunbather]: "Entspannter Sonnenbadender",
			[SpiritId.ProphecyGuide]: "Prophezeiungshelfer",
			[SpiritId.ProphetOfWater]: "Prophet des Wassers",
			[SpiritId.ProphetOfEarth]: "Prophet der Erde",
			[SpiritId.ProphetOfAir]: "Prophet der Luft",
			[SpiritId.ProphetOfFire]: "Prophet des Feuers",
			[SpiritId.DreamsGuide]: "Traumanleitung",
			[SpiritId.SpinningMentor]: "Piourettina",
			[SpiritId.DancingPerformer]: "Tänzer",
			[SpiritId.PeekingPostman]: "Guckender Postbote",
			[SpiritId.BearhugHermit]: "Großer Yeti",
			[SpiritId.AssemblyGuide]: "Zusammenbauhelfer",
			[SpiritId.BaffledBotanist]: "Überraschte Botanikerin",
			[SpiritId.ScoldingStudent]: "Schimpfende Schülerin",
			[SpiritId.ScaredyCadet]: "Verängstigter Kadett",
			[SpiritId.MarchingAdventurer]: "Marschierende Abenteurerin",
			[SpiritId.ChucklingScout]: "Kichernder Pfadfinder",
			[SpiritId.DaydreamForester]: "Tagträumender Förster",
			[SpiritId.TheRose]: "Die Rose",
			[SpiritId.BeckoningRuler]: "Winkender Herrscher",
			[SpiritId.GloatingNarcissist]: "Schadenfroher Narzisst",
			[SpiritId.StretchingLamplighter]: "Sich streckender Laternenanzünder",
			[SpiritId.SlouchingSoldier]: "Buckliger Soldat",
			[SpiritId.SneezingGeographer]: "Niesender Geograf",
			[SpiritId.StarCollector]: "Sternensammler",
			[SpiritId.FlightGuide]: "Flughelfer",
			[SpiritId.LivelyNavigator]: "Lebhafter Navigator",
			[SpiritId.LightWhisperer]: "Lichtflüsterin",
			[SpiritId.TinkeringChimesmith]: "Glockenspielschmiedin",
			[SpiritId.TalentedBuilder]: "Talentierter Baumeister",
			[SpiritId.AbyssGuide]: "Tiefseehelfer",
			[SpiritId.AnxiousAngler]: "Ängstliche Anglerin",
			[SpiritId.CeasingCommodore]: "Kommando-Kapitän",
			[SpiritId.BumblingBoatswain]: "Stümperhafter Schiffsjunge",
			[SpiritId.CacklingCannoneer]: "Kicher-Kanonierin",
			[SpiritId.PerformanceGuide]: "Darbietungshelfer",
			[SpiritId.FranticStagehand]: "Hektischer Bühnenarbeiter",
			[SpiritId.ForgetfulStoryteller]: "Vergessliche Geschichtenerzählerin",
			[SpiritId.MellowMusician]: "Entspannter Musiker",
			[SpiritId.ModestDancer]: "Bescheidene Tänzerin",
			[SpiritId.TheVoidOfShattering]: "Die Leere der Zertrümmerung",
			[SpiritId.AncientLight1]: "Uraltes Licht (Qualle)",
			[SpiritId.AncientLight2]: "Uraltes Licht (Manta)",
			[SpiritId.AncientDarkness1]: "Uralte Finsternis (Pflanze)",
			[SpiritId.AncientDarkness2]: "Uralte Finsternis (Drache)",
			[SpiritId.AURORA]: "AURORA",
			[SpiritId.RunningWayfarer]: "Rennende Wanderin",
			[SpiritId.MindfulMiner]: "Achtsame Bergarbeiterin",
			[SpiritId.WarriorOfLove]: "Kriegerin der Liebe",
			[SpiritId.SeedOfHope]: "Funken der Hoffnung",
			[SpiritId.RemembranceGuide]: "Gedenken-Helfer",
			[SpiritId.BereftVeteran]: "Betrübter Veteran",
			[SpiritId.PleadingChild]: "Flehendes Kind",
			[SpiritId.TiptoeingTeaBrewer]: "Verstohlene Teebrauerin",
			[SpiritId.WoundedWarrior]: "Verwundeter Krieger",
			[SpiritId.PassageGuide]: "Übergangshelfer",
			[SpiritId.OddballOutcast]: "Komischer Kauz",
			[SpiritId.TumblingTroublemaker]: "Stolpernder Störenfried",
			[SpiritId.MelancholyMope]: "Trübsinniger Trauerkloß",
			[SpiritId.OveractiveOverachiever]: "Überaktiver Überflieger",
			[SpiritId.MomentsGuide]: "Momente-Helfer",
			[SpiritId.ReassuringRanger]: "Ermutigender Ranger",
			[SpiritId.NightbirdWhisperer]: "Nachtvogelflüsterin",
			[SpiritId.JollyGeologist]: "Fröhliche Geologin",
			[SpiritId.AsceticMonk]: "Asketen-Mönch",
			[SpiritId.HopefulSteward]: "Hoffnungsvoller Verwalter",
			[SpiritId.VestigeOfADesertedOasis]: "Überreste einer verlassenen Oase",
			[SpiritId.MemoryOfALostVillage]: "Erinnerung eines verlorenen Dorfes",
			[SpiritId.EchoOfAnAbandonedRefuge]: "Echo einer verlassenen Zuflucht",
			[SpiritId.RemnantOfAForgottenHaven]: "Überreste eines vergessenen Hafens",
			[SpiritId.SpiritOfMural]: "Geist des Wandbildes",
			[SpiritId.HerbGatherer]: "Kräutersammler",
			[SpiritId.Hunter]: "Jäger",
			[SpiritId.FeudalLord]: "Feudalherr",
			[SpiritId.Princess]: "Prinzessin",
			[SpiritId.NestingGuide]: "Nest-Helfer",
			[SpiritId.NestingSolarium]: "Nest-Solarium",
			[SpiritId.NestingLoft]: "Nistboden",
			[SpiritId.NestingAtrium]: "Nest-Aula",
			[SpiritId.NestingNook]: "Nistecke",
			[SpiritId.DuetsGuide]: "Duette-Helfer",
			[SpiritId.TheCellistsBeginnings]: "Die Anfänge der Cellistin",
			[SpiritId.ThePianistsBeginnings]: "Die Anfänge des Pianisten",
			[SpiritId.TheMusiciansLegacy]: "Das Vermächtnis der Musik",
			[SpiritId.TheCellistsFlourishing]: "Das Aufblühen der Cellistin",
			[SpiritId.ThePianistsFlourishing]: "Das Aufblühen des Pianisten",
			[SpiritId.TheMoominStorybook]: "Das Mumin-Geschichtsbuch",
			[SpiritId.ComfortOfKindness]: "Komfort der Güte",
			[SpiritId.SenseOfSelf]: "Selbstbewusstsein",
			[SpiritId.SpiritOfAdventure]: "Geist des Abenteuers",
			[SpiritId.InspirationOfInclusion]: "Inspiration der Inklusion",
			[SpiritId.RadianceGuide]: "Leuchten-Helferin",
			[SpiritId.RadianceLeapingDancer]: "Leuchtender Springender Tänzer",
			[SpiritId.RadianceProvokingPerformer]: "Leuchtender Provozierender Künstler",
			[SpiritId.RadianceGreetingShaman]: "Leuchtender Grüßender Schamane",
		},
	},
	commands: {
		about: {
			"command-name": "über-mich",
			"command-description": "Infos über mich, den kleinen wunderbaren Helfer für Sky!",
		},
		ai: {
			"command-name": "ai",
			"command-description": "Konfiguriere die AI.",
		},
	},
} as const;
