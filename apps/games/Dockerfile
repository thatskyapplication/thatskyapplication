ARG NODE_IMAGE=node:26-alpine

FROM ${NODE_IMAGE} AS build
ENV PNPM_HOME=/pnpm
WORKDIR /thatskyapplication
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install --global "pnpm@$(node --print 'require("./package.json").devEngines.packageManager.version')"

COPY packages/utility/package.json packages/utility/
COPY apps/games/package.json apps/games/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY packages/utility packages/utility
COPY apps/games apps/games

ARG SENTRY_RELEASE
ARG SENTRY_DATA_SOURCE_NAME
RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
	export SENTRY_RELEASE=$SENTRY_RELEASE && \
	export VITE_SENTRY_RELEASE=$SENTRY_RELEASE && \
	export VITE_SENTRY_DATA_SOURCE_NAME=$SENTRY_DATA_SOURCE_NAME && \
	pnpm --filter @thatskyapplication/games... run build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm --filter @thatskyapplication/games deploy --prod /out

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
ENV PORT=3000
WORKDIR /thatskyapplication/apps/games
COPY --from=build --chown=node:node /out .
USER node
CMD ["npm", "run-script", "start"]
