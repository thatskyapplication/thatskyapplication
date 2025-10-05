# Builder stage.
FROM node:lts-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm and copy the monorepo files required for dependency resolution.
RUN npm install --global pnpm@10.14.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/notifications ./apps/notifications
COPY ./packages/utility ./packages/utility

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm --filter @thatskyapplication/notifications... run build

# Remove unnecessary dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /thatskyapplication/node_modules /thatskyapplication/node_modules
COPY --from=builder /thatskyapplication/packages/utility/distribution /thatskyapplication/packages/utility/distribution
COPY --from=builder /thatskyapplication/packages/utility/node_modules /thatskyapplication/packages/utility/node_modules
COPY --from=builder /thatskyapplication/packages/utility/package.json /thatskyapplication/packages/utility/package.json
COPY --from=builder /thatskyapplication/apps/notifications/node_modules /thatskyapplication/apps/notifications/node_modules
COPY --from=builder /thatskyapplication/apps/notifications/distribution /thatskyapplication/apps/notifications/distribution
COPY --from=builder /thatskyapplication/apps/notifications/package.json /thatskyapplication/apps/notifications/package.json

# Start the application.
WORKDIR /thatskyapplication/apps/notifications
CMD ["npm", "run-script", "start"]
