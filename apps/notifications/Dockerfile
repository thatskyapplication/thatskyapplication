ARG NODE_IMAGE=node:26-alpine

FROM ${NODE_IMAGE} AS build
ENV PNPM_HOME=/pnpm
WORKDIR /thatskyapplication
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install --global "pnpm@$(node --print 'require("./package.json").devEngines.packageManager.version')"

COPY packages/utility/package.json packages/utility/
COPY apps/notifications/package.json apps/notifications/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY packages/utility packages/utility
COPY apps/notifications apps/notifications
RUN pnpm --filter @thatskyapplication/notifications... run build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm --filter @thatskyapplication/notifications deploy --prod /out

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
WORKDIR /thatskyapplication/apps/notifications
COPY --from=build --chown=node:node /out .
USER node
CMD ["npm", "run-script", "start"]
