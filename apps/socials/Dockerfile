# Builder stage.
FROM node:24-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm.
RUN npm install --global pnpm@11.0.9

# Copy the monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/socials/package.json ./apps/socials/package.json
COPY ./packages/utility/package.json ./packages/utility/package.json

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY ./apps/socials ./apps/socials
COPY ./packages/utility ./packages/utility
RUN pnpm --filter @thatskyapplication/utility run build
RUN pnpm install --frozen-lockfile --offline
RUN pnpm --filter @thatskyapplication/socials run build

# Deploy to a clean directory.
RUN pnpm --filter @thatskyapplication/socials deploy --prod /thatskyapplication-production/socials

# Final stage.
FROM node:24-alpine
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

# Copy the deployed application.
COPY --from=builder /thatskyapplication-production/socials /thatskyapplication/apps/socials

# Start the application.
WORKDIR /thatskyapplication/apps/socials
CMD ["npm", "run-script", "start"]
