# Builder stage.
FROM node:lts-alpine AS builder
ARG SENTRY_RELEASE

WORKDIR /thatskyapplication

# Install pnpm.
RUN npm install --global pnpm@10.20.0

# Copy the monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .npmrc ./
COPY ./apps/website/package.json ./apps/website/package.json
COPY ./packages/utility/package.json ./packages/utility/package.json

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY ./apps/website ./apps/website
COPY ./packages/utility ./packages/utility
RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  export SENTRY_RELEASE=$SENTRY_RELEASE && \
	pnpm --filter @thatskyapplication/website... run build

# Deploy to a clean directory.
RUN pnpm --filter @thatskyapplication/website deploy --prod /thatskyapplication-production/website

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE}

# Copy the deployed application.
COPY --from=builder /thatskyapplication-production/website /thatskyapplication/apps/website

# Start the application.
ENV HOST=0.0.0.0
ENV PORT=80
ENV SENTRY_RELEASE=${SENTRY_RELEASE}
WORKDIR /thatskyapplication/apps/website
CMD ["npm", "run-script", "start"]
