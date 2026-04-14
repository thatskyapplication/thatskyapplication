import type { AreaDefinition } from "../../models/area.js";
import ancientMemory from "./ancient-memory.js";
import aviaryVillage from "./aviary-village.js";
import birdNest from "./bird-nest.js";
import blueBirdTheatre from "./blue-bird-theatre.js";
import boneyard from "./boneyard.js";
import butterflyFields from "./butterfly-fields.js";
import caveOfProphecies from "./cave-of-prophecies.js";
import crabFields from "./crab-fields.js";
import crescentOasis from "./crescent-oasis.js";
import dawnCircle from "./dawn-circle.js";
import dawnOverlook from "./dawn-overlook.js";
import elevatedClearing from "./elevated-clearing.js";
import forestBrook from "./forest-brook.js";
import forestCavern from "./forest-cavern.js";
import forestCourtyard from "./forest-courtyard.js";
import forgottenArk from "./forgotten-ark.js";
import fracturedLanternStorage from "./fractured-lantern-storage.js";
import frozenLake from "./frozen-lake.js";
import gateOfEden from "./gate-of-eden.js";
import hermitValley from "./hermit-valley.js";
import jellyfishCove from "./jellyfish-cove.js";
import lowerValleyTrack from "./lower-valley-track.js";
import lowerVault from "./lower-vault.js";
import moominvalley from "./moominvalley.js";
import passageRock from "./passage-rock.js";
import pathOfEden from "./path-of-eden.js";
import prairieCave from "./prairie-cave.js";
import prairieHeights from "./prairie-heights.js";
import prairiePeaks from "./prairie-peaks.js";
import prairieRest from "./prairie-rest.js";
import prairieVillage from "./prairie-village.js";
import repositoryOfRefuge from "./repository-of-refuge.js";
import sacredPond from "./sacred-pond.js";
import sanctuaryIslands from "./sanctuary-islands.js";
import starlightDesert from "./starlight-desert.js";
import templeOfTheIsle from "./temple-of-the-isle.js";
import templeOfThePrairie from "./temple-of-the-prairie.js";
import templeOfTheValley from "./temple-of-the-valley.js";
import templeOfTheVault from "./temple-of-the-vault.js";
import templeOfTheWasteland from "./temple-of-the-wasteland.js";
import theBattlefield from "./the-battlefield.js";
import theCitadel from "./the-citadel.js";
import theGraveyard from "./the-graveyard.js";
import theLastCity from "./the-last-city.js";
import theOuterBailey from "./the-outer-bailey.js";
import thePassage from "./the-passage.js";
import theTreehouse from "./the-treehouse.js";
import theVoidOfShattering from "./the-void-of-shattering.js";
import theWindPaths from "./the-wind-paths.js";
import treasureReef from "./treasure-reef.js";
import trialOfAir from "./trial-of-air.js";
import trialOfEarth from "./trial-of-earth.js";
import trialOfFire from "./trial-of-fire.js";
import trialOfWater from "./trial-of-water.js";
import upperValleyTrack from "./upper-valley-track.js";
import upperVault from "./upper-vault.js";
import valleyRest from "./valley-rest.js";
import vaultArchive from "./vault-archive.js";
import vaultRest from "./vault-rest.js";
import villageOfDreams from "./village-of-dreams.js";
import villageTheatre from "./village-theatre.js";

export const AREA_DEFINITIONS: readonly AreaDefinition[] = [
	// Isle of Dawn.
	dawnCircle,
	passageRock,
	templeOfTheIsle,
	dawnOverlook,
	caveOfProphecies,
	trialOfWater,
	trialOfEarth,
	trialOfAir,
	trialOfFire,

	// Daylight Prairie.
	prairieRest,
	butterflyFields,
	birdNest,
	sanctuaryIslands,
	prairieCave,
	prairiePeaks,
	prairieVillage,
	prairieHeights,
	templeOfThePrairie,

	// Hidden Forest.
	theWindPaths,
	forestCourtyard,
	theTreehouse,
	forestBrook,
	boneyard,
	elevatedClearing,
	blueBirdTheatre,
	forestCavern,
	sacredPond,

	// Valley of Triumph.
	valleyRest,
	frozenLake,
	theCitadel,
	lowerValleyTrack,
	upperValleyTrack,
	templeOfTheValley,
	villageOfDreams,
	hermitValley,
	villageTheatre,

	// Golden Wasteland.
	treasureReef,
	theOuterBailey,
	theGraveyard,
	forgottenArk,
	theBattlefield,
	crabFields,
	templeOfTheWasteland,

	// Vault of Knowledge.
	vaultRest,
	vaultArchive,
	repositoryOfRefuge,
	lowerVault,
	upperVault,
	templeOfTheVault,
	starlightDesert,
	fracturedLanternStorage,
	jellyfishCove,
	crescentOasis,
	moominvalley,

	// Eye of Eden.
	gateOfEden,
	pathOfEden,

	// Miscellaneous.
	ancientMemory,
	theVoidOfShattering,
	aviaryVillage,
	theLastCity,
	thePassage,
] as const;
