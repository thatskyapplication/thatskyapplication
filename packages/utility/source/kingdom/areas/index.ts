import type { RealmName } from "../geography.js";
import ancientMemory from "./ancient-memory.js";
import birdNest from "./bird-nest.js";
import blueBirdTheatre from "./blue-bird-theatre.js";
import boneyard from "./boneyard.js";
import butterflyFields from "./butterfly-fields.js";
import crabFields from "./crab-fields.js";
import crescentOasis from "./crescent-oasis.js";
import dawnCircle from "./dawn-circle.js";
import dawnOverlook from "./dawn-overlook.js";
import elevatedClearing from "./elevated-clearing.js";
import forestBrook from "./forest-brook.js";
import forestCavern from "./forest-cavern.js";
import forestCourtyard from "./forest-courtyard.js";
import forgottenArk from "./forgotten-ark.js";
import frozenLake from "./frozen-lake.js";
import gateOfEden from "./gate-of-eden.js";
import hermitValley from "./hermit-valley.js";
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
import theOuterBailey from "./the-outer-bailey.js";
import thePassage from "./the-passage.js";
import theTreehouse from "./the-treehouse.js";
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
import wanderingCarnival from "./wandering-carnival.js";

export const AREAS = [
	// Isle of Dawn.
	dawnCircle,
	passageRock,
	templeOfTheIsle,
	dawnOverlook,
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
	crescentOasis,
	moominvalley,

	// Eye of Eden.
	gateOfEden,
	pathOfEden,

	// Miscellaneous.
	ancientMemory,
	thePassage,
	wanderingCarnival,
] as const;

export function areasForRealm(realm: RealmName) {
	return AREAS.filter((area) => area.realm === realm);
}
