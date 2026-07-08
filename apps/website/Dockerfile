ARG NODE_IMAGE=node:26-alpine

FROM ${NODE_IMAGE} AS build
ENV PNPM_HOME=/pnpm
WORKDIR /thatskyapplication
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install --global "pnpm@$(node --print 'require("./package.json").devEngines.packageManager.version')"

COPY packages/utility/package.json packages/utility/
COPY apps/website/package.json apps/website/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY packages/utility packages/utility
COPY apps/website apps/website

ARG CDN_URL
ARG SENTRY_RELEASE
ARG SENTRY_DATA_SOURCE_NAME
RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
	export SENTRY_RELEASE=$SENTRY_RELEASE && \
	export VITE_CDN_URL=$CDN_URL && \
	export VITE_SENTRY_DATA_SOURCE_NAME=$SENTRY_DATA_SOURCE_NAME && \
	pnpm --filter @thatskyapplication/website... run build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm --filter @thatskyapplication/website deploy --prod /out

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
WORKDIR /thatskyapplication/apps/website
COPY --from=build /out .
CMD ["npm", "run-script", "start"]
