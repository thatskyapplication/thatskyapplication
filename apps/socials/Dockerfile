ARG NODE_IMAGE=node:24-alpine

FROM ${NODE_IMAGE} AS build
ENV PNPM_HOME=/pnpm
WORKDIR /thatskyapplication
RUN npm install --global pnpm@11.0.9

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/utility/package.json packages/utility/
COPY apps/socials/package.json apps/socials/
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY packages/utility packages/utility
COPY apps/socials apps/socials
RUN pnpm --filter @thatskyapplication/socials... run build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm --filter @thatskyapplication/socials deploy --prod /out

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
WORKDIR /thatskyapplication/apps/socials
COPY --from=build --chown=node:node /out .
USER node
CMD ["npm", "run-script", "start"]
