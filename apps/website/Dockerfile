FROM node:lts-alpine as base

LABEL fly_launch_runtime="Remix"

WORKDIR /thatskyapplication
ENV NODE_ENV="production"

# Install pnpm.
RUN npm install --global pnpm@10.14.0

FROM base as build

# Copy monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/website ./apps/website
COPY ./packages/utility ./packages/utility

# Install only dependencies for the current application.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm --filter @thatskyapplication/website... run build

# Prune unnecessary dependencies.
RUN pnpm prune --prod

FROM base

# Copy the built application.
COPY --from=build /thatskyapplication /thatskyapplication

ENV HOST=0.0.0.0
EXPOSE 3000
WORKDIR /thatskyapplication/apps/website
CMD [ "pnpm", "run", "start" ]
