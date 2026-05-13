# Builder stage.
FROM node:24-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm.
RUN npm install --global pnpm@11.0.9

# Copy the monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/caelus/discord/package.json ./apps/caelus/discord/package.json
COPY ./packages/utility/package.json ./packages/utility/package.json

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY ./apps/caelus/discord ./apps/caelus/discord
COPY ./packages/utility ./packages/utility
RUN pnpm --filter @thatskyapplication/utility run build
RUN pnpm install --frozen-lockfile --offline
RUN pnpm --filter @thatskyapplication/caelus run build

# Deploy to a clean directory.
RUN pnpm --filter @thatskyapplication/caelus deploy --prod /thatskyapplication-production/caelus

# Final stage.
FROM node:24-alpine
ENV NODE_ENV=production
ENV HONO_PORT=3000
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

# Copy the deployed application.
COPY --from=builder /thatskyapplication-production/caelus /thatskyapplication/apps/caelus

# Start the application.
WORKDIR /thatskyapplication/apps/caelus
CMD ["npm", "run-script", "start"]
