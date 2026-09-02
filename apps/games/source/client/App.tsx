import type { DiscordSDK } from "@discord/embedded-app-sdk";
import type { Snowflake } from "@discordjs/core/http-only";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { GuessTypes } from "@thatskyapplication/utility";
import type { GuessGameOver, GuessSessionView } from "../guess.js";
import {
	answerSession,
	endSession,
	exchangeToken,
	fetchLeaderboard,
	fetchState,
	RequestError,
	claimPrimary,
	givePrimary,
	type LeaderboardResponse,
	saveName,
	setAccessToken,
	setActivityLocale,
	identifyByToken,
	startSession,
	type StateResponse,
} from "./api.js";
import { ActionAnchor, ActionButton } from "./components/ActionButton.js";
import { GuessBoard, GuessGameOverPanel, GuessModePicker } from "./components/GuessGame.js";
import { GuessSkeleton } from "./components/GuessSkeleton.js";
import { Handoff } from "./components/Handoff.js";
import { Leaderboard } from "./components/Leaderboard.js";
import { Links } from "./components/Links.js";
import { Participants } from "./components/Participants.js";
import { Screen } from "./components/Screen.js";
import { SkyProfileNameGate } from "./components/SkyProfileNameGate.js";
import { initialiseLayout } from "./layout.js";
import { setLinkOpener, shareActivityLink } from "./link.js";
import { initialiseOrientation } from "./orientation.js";
import {
	ensureProfiles,
	initialiseParticipants,
	profileFor,
	profilesSnapshot,
	subscribeToParticipants,
} from "./participants.js";
import { setPresence, setPresenceTarget } from "./presence.js";
import { connectSocket, recoverableClose, socketMessage } from "./socket.js";

const LOGIN_PATH = "/login" as const;
const FRAME_ID_SEARCH_PARAMETER = "frame_id" as const;
const STAGE_CONSTRUCTING = "Constructing the SDK" as const;
const STAGE_WAITING = "Waiting for Discord" as const;
const STAGE_AUTHORISING = "Authorising" as const;
const STAGE_EXCHANGING = "Exchanging the code" as const;
const STAGE_AUTHENTICATING = "Authenticating" as const;
const STAGE_LOADING = "Loading the game" as const;
const UNKNOWN_ERROR = "An unknown error occurred." as const;
const NAME_PLACEHOLDER = "{{name}}" as const;
const IDENTIFY_SCOPE = "identify" as const;
const RICH_PRESENCE_SCOPE = "rpc.activities.write" as const;
const PRESENCE_SEPARATOR = " · " as const;
const CENTRED_SCREEN_CLASS =
	"flex min-h-svh flex-col items-center justify-center gap-4 overflow-y-auto p-4 text-center" as const;
const NOTICE_CLASS =
	"pointer-events-none fixed inset-x-0 bottom-[calc(1rem+var(--safe-area-inset-bottom))] z-50 mx-auto w-fit max-w-[min(28rem,calc(100%-2rem))] rounded-xl border border-red-300/25 bg-red-500/15 px-4 py-2 text-center text-sm text-red-100 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md" as const;
const IN_DISCORD_FRAME = new URLSearchParams(window.location.search).has(FRAME_ID_SEARCH_PARAMETER);

const NO_PARTICIPANTS: readonly Snowflake[] = [];

const VERIFIED_STATE_ATTEMPTS = 4 as const;
const VERIFIED_STATE_RETRY_DELAY = 500 as const;
const NOTICE_DURATION = 6_000 as const;
const UNAUTHENTICATED_STATUS = 401 as const;

type Game =
	| { status: "picking" }
	| { status: "playing"; session: GuessSessionView; highestStreak: number }
	| { status: "over"; gameOver: GuessGameOver; playedByViewer: boolean }
	| { status: "leaderboard"; type: GuessTypes; leaderboard: LeaderboardResponse };

type Failure = { kind: "socket"; code: number } | { kind: "fatal"; message: string };

interface Reconciliation {
	attributable: boolean;
	disowned: boolean;
	started: boolean;
	witnessed: boolean;
}

function errorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof error.message === "string"
	) {
		return error.message;
	}

	const seen = new WeakSet<object>();

	const serialised = JSON.stringify(error, (_, value: unknown) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return undefined;
			}

			seen.add(value);
		}

		return value;
	});

	return serialised ?? UNKNOWN_ERROR;
}

function unauthenticated(error: unknown) {
	return error instanceof RequestError && error.status === UNAUTHENTICATED_STATUS;
}

async function authorise(discordSdk: DiscordSDK, applicationId: string) {
	const request = {
		client_id: applicationId,
		response_type: "code",
		state: "",
		prompt: "none",
	} as const;

	try {
		return await discordSdk.commands.authorize({
			...request,
			scope: [IDENTIFY_SCOPE, RICH_PRESENCE_SCOPE],
		});
	} catch (authoriseError: unknown) {
		console.warn(`Rich presence authorisation declined: ${errorMessage(authoriseError)}.`);
		return discordSdk.commands.authorize({ ...request, scope: [IDENTIFY_SCOPE] });
	}
}

function modeNameFor(state: StateResponse, type: GuessTypes) {
	return state.authenticated && !state.nameRequired
		? (state.modes.find((mode) => mode.type === type)?.name ?? null)
		: null;
}

function primaryOf(state: StateResponse) {
	return state.authenticated && !state.nameRequired ? state.primaryUserId : undefined;
}

function sessionOf(state: StateResponse) {
	return state.authenticated && !state.nameRequired ? state.session : null;
}

function sharedRoundOf(state: StateResponse) {
	return state.authenticated && !state.nameRequired ? state.gameOver : null;
}

function spectatingIn(state: StateResponse) {
	return state.authenticated && !state.nameRequired && !state.isPrimary;
}

function gameFromState(
	state: StateResponse,
	{ attributable, disowned, witnessed }: Reconciliation,
): Game {
	if (!state.authenticated || state.nameRequired) {
		return { status: "picking" };
	}

	if (state.session !== null) {
		return { status: "playing", session: state.session, highestStreak: state.highestStreak };
	}

	return state.gameOver === null || disowned || !witnessed
		? { status: "picking" }
		: { status: "over", gameOver: state.gameOver, playedByViewer: attributable };
}

function nextGame(current: Game, state: StateResponse, reconciliation: Reconciliation): Game {
	if (reconciliation.started || current.status === "playing") {
		return gameFromState(state, reconciliation);
	}

	if (current.status === "over") {
		const stale =
			!current.playedByViewer && (reconciliation.disowned || sharedRoundOf(state) === null);
		return stale ? { status: "picking" } : current;
	}

	return current.status === "picking" && spectatingIn(state)
		? gameFromState(state, reconciliation)
		: current;
}

function delay(milliseconds: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

async function fetchVerifiedState(instanceId: string, attempt = 1): Promise<StateResponse> {
	try {
		return await fetchState(instanceId);
	} catch (stateError: unknown) {
		const unverified = stateError instanceof RequestError && stateError.status === 403;

		if (!unverified || attempt === VERIFIED_STATE_ATTEMPTS) {
			throw stateError;
		}

		console.warn(`Instance state attempt ${attempt} failed: ${errorMessage(stateError)}.`);
		await delay(VERIFIED_STATE_RETRY_DELAY * attempt);
		return fetchVerifiedState(instanceId, attempt + 1);
	}
}

export function App() {
	const [state, setState] = useState<StateResponse | null>(null);
	const [game, setGame] = useState<Game>({ status: "picking" });
	const [instanceId, setInstanceId] = useState<string | null>(null);
	const [verified, setVerified] = useState(!IN_DISCORD_FRAME);
	const [failure, setFailure] = useState<Failure | null>(null);
	const [notice, setNotice] = useState<{ id: number; message: string } | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);
	const run = useRef<{ startedAt: number } | null>(null);
	const watched = useRef<string | null>(null);
	const host = useRef<Snowflake | null | undefined>(undefined);
	const disowned = useRef(false);
	const identified = useRef(false);
	const booted = useRef(false);
	const answering = useRef(false);
	const notices = useRef(0);
	const profiles = useSyncExternalStore(subscribeToParticipants, profilesSnapshot);

	const participants =
		state?.authenticated === true && !state.nameRequired ? state.connectedUserIds : NO_PARTICIPANTS;
	const connectable = state !== null && state.authenticated;

	const applyState = useCallback((next: StateResponse) => {
		if (!next.authenticated && identified.current && IN_DISCORD_FRAME) {
			console.warn("Ignored an unauthenticated activity state whilst signed in.");
			return;
		}

		const previousPrimaryUserId = host.current;
		const nextPrimaryUserId = primaryOf(next);
		const nextSession = sessionOf(next);

		const handedOver =
			previousPrimaryUserId !== undefined &&
			nextPrimaryUserId !== undefined &&
			previousPrimaryUserId !== nextPrimaryUserId;

		const reconciliation = {
			attributable:
				previousPrimaryUserId !== undefined &&
				previousPrimaryUserId === nextPrimaryUserId &&
				next.authenticated &&
				!next.nameRequired &&
				next.isPrimary,
			disowned: sharedRoundOf(next) !== null && (handedOver || disowned.current),
			started:
				nextSession !== null &&
				watched.current !== nextSession.id &&
				(watched.current === null || nextSession.streak === 0),
			witnessed: previousPrimaryUserId !== undefined,
		} satisfies Reconciliation;

		identified.current = next.authenticated;
		watched.current = nextSession?.id ?? null;
		host.current = nextPrimaryUserId;
		disowned.current = reconciliation.disowned;
		setState(next);
		setGame((current) => nextGame(current, next, reconciliation));
	}, []);

	const showNotice = useCallback((message: string) => {
		notices.current++;
		setNotice({ id: notices.current, message });
	}, []);

	const beginAction = useCallback(() => {
		setBusy(true);
		setNotice(null);
	}, []);

	const reportFailure = useCallback(
		(actionError: unknown) => {
			console.warn(`Action failed: ${errorMessage(actionError)}.`);

			if (unauthenticated(actionError)) {
				setFailure({ kind: "fatal", message: errorMessage(actionError) });
				return;
			}

			showNotice(errorMessage(actionError));
		},
		[showNotice],
	);

	const recover = useCallback(() => {
		if (failure?.kind === "socket" && recoverableClose(failure.code)) {
			setFailure(null);
			return;
		}

		window.location.reload();
	}, [failure]);

	useEffect(() => {
		if (failure === null) {
			return;
		}

		window.addEventListener("online", recover);

		return () => {
			window.removeEventListener("online", recover);
		};
	}, [failure, recover]);

	useEffect(() => {
		if (notice === null) {
			return;
		}

		const timeout = setTimeout(() => {
			setNotice(null);
		}, NOTICE_DURATION);

		return () => {
			clearTimeout(timeout);
		};
	}, [notice]);

	useEffect(() => {
		if (!connectable || instanceId === null || failure !== null) {
			return;
		}

		return connectSocket(instanceId, {
			onState: (next) => {
				applyState(next);
				setVerified(true);
			},
			onUnavailable: (code) => {
				setFailure({ kind: "socket", code });
			},
		});
	}, [applyState, connectable, failure, instanceId]);

	const handleClaim = useCallback(async () => {
		if (instanceId === null) {
			return;
		}

		beginAction();

		try {
			await claimPrimary(instanceId);
			applyState(await fetchState(instanceId));
		} catch (claimError: unknown) {
			reportFailure(claimError);
		} finally {
			setBusy(false);
		}
	}, [applyState, beginAction, instanceId, reportFailure]);

	useEffect(() => {
		if (state === null || !state.authenticated || state.nameRequired) {
			return;
		}

		ensureProfiles(participants).catch((refreshError: unknown) => {
			console.warn(`Participants refresh failed: ${errorMessage(refreshError)}.`);
		});
	}, [participants, state]);

	useEffect(() => {
		if (booted.current) {
			return;
		}

		booted.current = true;

		const boot = async () => {
			if (IN_DISCORD_FRAME) {
				identifyByToken();
			}

			const initial = await fetchState(null);
			applyState(initial);

			if (!IN_DISCORD_FRAME) {
				return;
			}

			console.debug(`Activity boot: ${STAGE_CONSTRUCTING}.`);
			const { DiscordSDK } = await import("@discord/embedded-app-sdk");
			const discordSdk = new DiscordSDK(initial.applicationId);
			setInstanceId(discordSdk.instanceId);
			setLinkOpener(discordSdk);
			console.debug(`Activity boot: ${STAGE_WAITING}.`);
			await discordSdk.ready();

			console.debug(`Activity boot: ${STAGE_AUTHORISING}.`);

			const { code } = await authorise(discordSdk, initial.applicationId);

			console.debug(`Activity boot: ${STAGE_EXCHANGING}.`);
			const { access_token: accessToken } = await exchangeToken(code);
			setAccessToken(accessToken);
			console.debug(`Activity boot: ${STAGE_AUTHENTICATING}.`);
			await discordSdk.commands.authenticate({ access_token: accessToken });
			setPresenceTarget(discordSdk);

			initialiseOrientation(discordSdk).catch((orientationError: unknown) => {
				console.warn(`Orientation setup failed: ${errorMessage(orientationError)}.`);
			});

			initialiseLayout(discordSdk).catch((layoutError: unknown) => {
				console.warn(`Layout setup failed: ${errorMessage(layoutError)}.`);
			});

			initialiseParticipants(discordSdk).catch((participantsError: unknown) => {
				console.warn(`Participants setup failed: ${errorMessage(participantsError)}.`);
			});

			try {
				const { locale } = await discordSdk.commands.userSettingsGetLocale();
				setActivityLocale(locale);
			} catch (localeError: unknown) {
				console.warn(`Locale lookup failed: ${errorMessage(localeError)}.`);
			}

			console.debug(`Activity boot: ${STAGE_LOADING}.`);
			applyState(await fetchVerifiedState(discordSdk.instanceId));
			setVerified(true);
		};

		boot().catch((bootError: unknown) => {
			setFailure({ kind: "fatal", message: errorMessage(bootError) });
		});
	}, [applyState]);

	async function handleSaveName(name: string) {
		beginAction();
		setNameError(null);

		try {
			await saveName(name);
			applyState(await fetchState(instanceId));
		} catch (saveError: unknown) {
			setNameError(errorMessage(saveError));
		} finally {
			setBusy(false);
		}
	}

	const resynchronise = useCallback(
		async (actionError: unknown) => {
			reportFailure(actionError);

			try {
				applyState(await fetchState(instanceId));
			} catch (stateError: unknown) {
				console.warn(`Resynchronisation failed: ${errorMessage(stateError)}.`);

				if (unauthenticated(stateError)) {
					setFailure({ kind: "fatal", message: errorMessage(stateError) });
				}
			}
		},
		[applyState, instanceId, reportFailure],
	);

	async function handleStart(type: GuessTypes) {
		beginAction();

		try {
			const result = await startSession(type, instanceId);
			setGame({ status: "playing", session: result.session, highestStreak: result.highestStreak });
		} catch (startError: unknown) {
			await resynchronise(startError);
		} finally {
			setBusy(false);
		}
	}

	const handleEnd = useCallback(
		async (session: GuessSessionView) => {
			beginAction();

			try {
				const result = await endSession(session.type, instanceId, session.id);
				setGame({ status: "over", gameOver: result.gameOver, playedByViewer: true });
			} catch (endError: unknown) {
				await resynchronise(endError);
			} finally {
				setBusy(false);
			}
		},
		[beginAction, instanceId, resynchronise],
	);

	const handleExpire = useCallback(() => {
		if (answering.current || game.status !== "playing") {
			return;
		}

		void handleEnd(game.session);
	}, [game, handleEnd]);

	async function handleLeaderboard(type: GuessTypes, page: number) {
		beginAction();

		try {
			setGame({ status: "leaderboard", type, leaderboard: await fetchLeaderboard(type, page) });
		} catch (leaderboardError: unknown) {
			reportFailure(leaderboardError);
		} finally {
			setBusy(false);
		}
	}

	async function handleAnswer(session: GuessSessionView, option: number) {
		answering.current = true;
		beginAction();

		try {
			const result = await answerSession(session.type, option, instanceId, session.id);

			setGame(
				"gameOver" in result
					? { status: "over", gameOver: result.gameOver, playedByViewer: true }
					: { status: "playing", session: result.session, highestStreak: result.highestStreak },
			);
		} catch (answerError: unknown) {
			await resynchronise(answerError);
		} finally {
			answering.current = false;
			setBusy(false);
		}
	}

	async function handleGive(userId: string) {
		if (instanceId === null) {
			return;
		}

		beginAction();

		try {
			await givePrimary(instanceId, userId);
			applyState(await fetchState(instanceId));
		} catch (giveError: unknown) {
			reportFailure(giveError);
		} finally {
			setBusy(false);
		}
	}

	useEffect(() => {
		const report = (presence: Parameters<typeof setPresence>[0]) => {
			setPresence(presence).catch((presenceError: unknown) => {
				console.warn(`Presence update failed: ${errorMessage(presenceError)}.`);
			});
		};

		if (state === null || !state.authenticated || state.nameRequired) {
			return;
		}

		if (!state.isPrimary) {
			const { primaryUserId, spectatorLabel } = state;

			if (spectatorLabel !== null) {
				report({
					details: spectatorLabel.replace(
						NAME_PLACEHOLDER,
						() =>
							(primaryUserId === null ? undefined : profiles.get(primaryUserId)?.name) ??
							state.strings.leaderboardUnnamed,
					),
				});
			}

			return;
		}

		if (game.status === "over") {
			run.current = null;
			const finishedMode = modeNameFor(state, game.gameOver.type);

			if (finishedMode !== null) {
				report({
					details: finishedMode,
					state: `${state.strings.gameOver}${PRESENCE_SEPARATOR}${state.strings.streak} ${game.gameOver.streak}`,
				});
			}

			return;
		}

		if (game.status !== "playing") {
			run.current = null;
			report({ details: state.strings.presenceSelecting });
			return;
		}

		const { session } = game;
		const modeName = modeNameFor(state, session.type);
		const current = (run.current ??= { startedAt: Date.now() });

		if (modeName === null) {
			return;
		}

		report({
			details: modeName,
			party: participants.length,
			startedAt: current.startedAt,
			state: `${state.strings.streak} ${session.streak}`,
		});
	}, [game, participants.length, profiles, state]);

	useEffect(() => {
		if (state !== null) {
			document.documentElement.lang = state.locale;
		}
	}, [state]);

	if (failure !== null) {
		const strings = state?.strings ?? null;

		const message =
			failure.kind === "fatal"
				? failure.message
				: strings === null
					? UNKNOWN_ERROR
					: socketMessage(failure.code, strings);

		return (
			<div className={CENTRED_SCREEN_CLASS}>
				<p>{message}</p>
				{strings !== null && (
					<ActionButton onClick={recover} size="large" variant="primary">
						{strings.retry}
					</ActionButton>
				)}
			</div>
		);
	}

	if (state === null || !verified) {
		return (
			<Screen>
				<GuessSkeleton />
			</Screen>
		);
	}

	if (!state.authenticated) {
		return IN_DISCORD_FRAME ? (
			<Screen>
				<GuessSkeleton />
			</Screen>
		) : (
			<div className={CENTRED_SCREEN_CLASS}>
				<ActionAnchor href={LOGIN_PATH} size="large" variant="primary">
					{state.strings.signIn}
				</ActionAnchor>
			</div>
		);
	}

	if (state.nameRequired) {
		return (
			<Screen>
				<SkyProfileNameGate
					busy={busy}
					maximumLength={state.nameMaximumLength}
					skyProfileURL={state.skyProfileURL}
					error={nameError}
					onSave={(name) => {
						void handleSaveName(name);
					}}
					strings={state.strings}
				/>
			</Screen>
		);
	}

	const corner = participants.length > 0 && (
		<Participants
			hostLabel={state.strings.host}
			participants={participants}
			primaryUserId={state.primaryUserId}
			unnamedLabel={state.strings.leaderboardUnnamed}
		/>
	);

	let screen: ReactNode;

	if (game.status === "leaderboard") {
		screen = (
			<Screen corner={corner}>
				<Leaderboard
					backLabel={state.isPrimary ? state.strings.chooseMode : state.strings.navigationBack}
					busy={busy}
					leaderboard={game.leaderboard}
					locale={state.locale}
					onBack={() => setGame({ status: "picking" })}
					onPage={(page) => {
						void handleLeaderboard(game.type, page);
					}}
					strings={state.strings}
				/>
			</Screen>
		);
	} else if (state.isPrimary && game.status === "over") {
		const { gameOver, playedByViewer } = game;

		screen = (
			<Screen corner={corner}>
				<GuessGameOverPanel
					footer={
						<>
							<ActionButton
								className="w-full"
								disabled={busy}
								onClick={() => {
									void handleStart(gameOver.type);
								}}
								size="large"
								variant="primary"
							>
								{state.strings.tryAgain}
							</ActionButton>
							{IN_DISCORD_FRAME && playedByViewer && gameOver.streak > 0 && (
								<ActionButton
									disabled={busy}
									onClick={() => {
										shareActivityLink(gameOver.shareMessage).catch((shareError: unknown) => {
											console.warn(`Share failed: ${errorMessage(shareError)}.`);
										});
									}}
									size="medium"
									variant="option"
								>
									{state.strings.share}
								</ActionButton>
							)}
							<ActionButton
								disabled={busy}
								onClick={() => setGame({ status: "picking" })}
								size="medium"
								variant="quiet"
							>
								{state.strings.chooseMode}
							</ActionButton>
						</>
					}
					gameOver={gameOver}
					modeName={modeNameFor(state, gameOver.type)}
					strings={state.strings}
				/>
			</Screen>
		);
	} else if (state.isPrimary && game.status === "playing") {
		const { highestStreak, session } = game;

		screen = (
			<Screen corner={corner}>
				<GuessBoard
					busy={busy}
					footer={
						<ActionButton
							disabled={busy}
							onClick={() => {
								void handleEnd(session);
							}}
							size="medium"
							variant="danger"
						>
							{state.strings.endGame}
						</ActionButton>
					}
					highestStreak={Math.max(highestStreak, session.streak)}
					key={session.id}
					modeName={modeNameFor(state, session.type)}
					onAnswer={(option) => {
						void handleAnswer(session, option);
					}}
					onExpire={handleExpire}
					session={session}
					strings={state.strings}
				/>
			</Screen>
		);
	} else if (state.isPrimary) {
		const others = participants.filter((id) => id !== state.primaryUserId);

		screen = (
			<Screen corner={corner} footer={<Links links={state.links} strings={state.strings} />}>
				<GuessModePicker
					busy={busy}
					heading={state.strings.chooseMode}
					modes={state.modes}
					onLeaderboard={(type) => {
						void handleLeaderboard(type, 1);
					}}
					onStart={(type) => {
						void handleStart(type);
					}}
					strings={state.strings}
				/>
				{others.length > 0 && (
					<Handoff
						busy={busy}
						onGive={(userId) => {
							void handleGive(userId);
						}}
						participants={others}
						strings={state.strings}
					/>
				)}
			</Screen>
		);
	} else {
		const { primaryUserId, spectatorLabel } = state;
		const hostName =
			(primaryUserId === null ? undefined : profileFor(primaryUserId)?.name) ??
			state.strings.leaderboardUnnamed;

		screen = (
			<Screen corner={corner}>
				{game.status === "picking" && spectatorLabel !== null && (
					<GuessModePicker
						busy={busy}
						heading={spectatorLabel.replace(NAME_PLACEHOLDER, () => hostName)}
						modes={state.modes}
						onLeaderboard={(type) => {
							void handleLeaderboard(type, 1);
						}}
						onStart={null}
						strings={state.strings}
					/>
				)}
				{game.status === "playing" && (
					<GuessBoard
						busy={busy}
						highestStreak={Math.max(game.highestStreak, game.session.streak)}
						key={game.session.id}
						modeName={modeNameFor(state, game.session.type)}
						session={game.session}
						strings={state.strings}
					/>
				)}
				{state.claimable && (
					<ActionButton
						className="self-center"
						disabled={busy}
						onClick={() => {
							void handleClaim();
						}}
						size="medium"
						variant="primary"
					>
						{state.strings.takeControl}
					</ActionButton>
				)}
				{game.status === "over" && (
					<GuessGameOverPanel
						gameOver={game.gameOver}
						modeName={modeNameFor(state, game.gameOver.type)}
						strings={state.strings}
					/>
				)}
			</Screen>
		);
	}

	return (
		<>
			{screen}
			{notice !== null && (
				<div className={NOTICE_CLASS} key={notice.id} role="status">
					{notice.message}
				</div>
			)}
		</>
	);
}
