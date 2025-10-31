# Builder stage.
FROM node:lts-alpine AS builder
ARG SENTRY_RELEASE

WORKDIR /thatskyapplication

# Install pnpm and copy the monorepo files required for dependency resolution.
RUN npm install --global pnpm@10.20.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/caelus ./apps/caelus
COPY ./packages/utility ./packages/utility

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN export SENTRY_RELEASE=$SENTRY_RELEASE && \
  pnpm --filter @thatskyapplication/caelus... run build

# Remove unnecessary dependencies.
RUN CI=true pnpm prune --prod

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

WORKDIR /thatskyapplication

# Copy built files and production dependencies from builder stage.
COPY --from=builder /thatskyapplication/node_modules /thatskyapplication/node_modules
COPY --from=builder /thatskyapplication/packages/utility/distribution /thatskyapplication/packages/utility/distribution
COPY --from=builder /thatskyapplication/packages/utility/node_modules /thatskyapplication/packages/utility/node_modules
COPY --from=builder /thatskyapplication/packages/utility/package.json /thatskyapplication/packages/utility/package.json
COPY --from=builder /thatskyapplication/apps/caelus/node_modules /thatskyapplication/apps/caelus/node_modules
COPY --from=builder /thatskyapplication/apps/caelus/distribution /thatskyapplication/apps/caelus/distribution
COPY --from=builder /thatskyapplication/apps/caelus/package.json /thatskyapplication/apps/caelus/package.json

# Start the application.
WORKDIR /thatskyapplication/apps/caelus
CMD ["npm", "run-script", "start"]
