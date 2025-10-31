# Builder stage.
FROM node:lts-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm.
RUN npm install --global pnpm@10.20.0

# Copy the monorepo files required for dependency resolution.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .npmrc ./
COPY ./apps/notifications/package.json ./apps/notifications/package.json
COPY ./packages/utility/package.json ./packages/utility/package.json

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY ./apps/notifications ./apps/notifications
COPY ./packages/utility ./packages/utility
RUN pnpm --filter @thatskyapplication/notifications... run build

# Deploy to a clean directory.
RUN pnpm --filter @thatskyapplication/notifications deploy --prod /thatskyapplication-production/notifications

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production

# Copy the deployed application.
COPY --from=builder /thatskyapplication-production/notifications /thatskyapplication/apps/notifications

# Start the application.
WORKDIR /thatskyapplication/apps/notifications
CMD ["npm", "run-script", "start"]
