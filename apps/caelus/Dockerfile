# Builder stage.
FROM node:lts-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm.
RUN npm install --global pnpm@10.20.0

# Copy the monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .npmrc ./
COPY ./apps/caelus/package.json ./apps/caelus/package.json
COPY ./packages/utility/package.json ./packages/utility/package.json

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY ./apps/caelus ./apps/caelus
COPY ./packages/utility ./packages/utility
RUN pnpm --filter @thatskyapplication/caelus... run build

# Deploy to a clean directory.
RUN pnpm --filter @thatskyapplication/caelus deploy --prod /thatskyapplication-production/caelus

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production
ENV HONO_PORT=3000
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

# Copy the deployed application.
COPY --from=builder /thatskyapplication-production/caelus /thatskyapplication/apps/caelus

# Start the application.
WORKDIR /thatskyapplication/apps/caelus
CMD ["npm", "run-script", "start"]
