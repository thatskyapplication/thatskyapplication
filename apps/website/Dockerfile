FROM node:lts-alpine AS base

ARG SENTRY_RELEASE
WORKDIR /thatskyapplication
ENV NODE_ENV="production"

# Install pnpm.
RUN npm install --global pnpm@10.20.0

FROM base AS build

# Copy monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/website ./apps/website
COPY ./packages/utility ./packages/utility

# Install only dependencies for the current application.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  export SENTRY_RELEASE=$SENTRY_RELEASE && \
	pnpm --filter @thatskyapplication/website... run build

# Prune unnecessary dependencies.
RUN CI=true pnpm prune --prod

FROM base

# Copy the built application.
COPY --from=build /thatskyapplication /thatskyapplication

ENV HOST=0.0.0.0
ENV PORT=80
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
WORKDIR /thatskyapplication/apps/website
CMD [ "pnpm", "run", "start" ]
