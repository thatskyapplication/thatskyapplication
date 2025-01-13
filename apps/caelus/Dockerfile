# Builder stage.
FROM node:lts-bullseye-slim AS builder

WORKDIR /app

# Install pnpm and copy the monorepo files required for dependency resolution.
RUN npm install --global pnpm@9.12.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/caelus ./apps/caelus

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm run --filter ./apps/caelus build

# Remove unnecessary dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-bullseye-slim
ENV NODE_ENV production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/caelus/node_modules /app/apps/caelus/node_modules
COPY --from=builder /app/apps/caelus/distribution /app/apps/caelus/distribution
COPY --from=builder /app/apps/caelus/package.json /app/apps/caelus/package.json

# Start the application.
WORKDIR /app/apps/caelus
CMD ["npm", "run-script", "start"]
