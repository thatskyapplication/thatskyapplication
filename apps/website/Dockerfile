# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Remix"

WORKDIR /app
ENV NODE_ENV="production"

# Install pnpm.
ARG PNPM_VERSION=9.14.2
RUN npm install -g pnpm@$PNPM_VERSION

FROM base as build

# Install packages needed to build node modules.
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/website ./apps/website
COPY ./packages/utility ./packages/utility

# Install only dependencies for the current app.
RUN pnpm install --frozen-lockfile --prod=false

# Build the application.
COPY . .
RUN pnpm run --filter ./packages/utility build
RUN pnpm run --filter ./apps/website build

# Prune unnecessary dependencies.
RUN pnpm prune --prod

FROM base

# Copy the built application.
COPY --from=build /app /app

ENV HOST=0.0.0.0
EXPOSE 3000
WORKDIR /app/apps/website
CMD [ "pnpm", "run", "start" ]
