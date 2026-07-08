ARG NODE_IMAGE=node:26-alpine

FROM ${NODE_IMAGE} AS build
ENV PNPM_HOME=/pnpm
WORKDIR /thatskyapplication
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
RUN npm install --global "pnpm@$(node --print 'require("./package.json").devEngines.packageManager.version')"

COPY packages/utility/package.json packages/utility/
COPY apps/caelus/fluxer/package.json apps/caelus/fluxer/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY packages/utility packages/utility
COPY apps/caelus/fluxer apps/caelus/fluxer
RUN pnpm --filter @thatskyapplication/caelus-fluxer... run build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm --filter @thatskyapplication/caelus-fluxer deploy --prod /out

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
WORKDIR /thatskyapplication/apps/caelus/fluxer
COPY --from=build --chown=node:node /out .
USER node
CMD ["npm", "run-script", "start"]
