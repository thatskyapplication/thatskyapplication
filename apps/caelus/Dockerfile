# Builder stage.
FROM node:lts-bullseye-slim AS builder

WORKDIR /monorepo

# Install pnpm and copy the required files.
RUN npm install --global pnpm@8.6.0
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/caelus/package.json ./apps/caelus/

# Install dependencies.
RUN pnpm install --filter=./apps/caelus

# Build the monorepo.
COPY . .
RUN pnpm run build --filter=caelus

# Remove development dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-bullseye-slim
ENV NODE_ENV production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /monorepo/node_modules /monorepo/node_modules
COPY --from=builder /monorepo/apps/caelus/dist /monorepo/apps/caelus/dist
COPY --from=builder /monorepo/apps/caelus/node_modules /monorepo/apps/caelus/node_modules
COPY --from=builder /monorepo/apps/caelus/package.json /monorepo/apps/caelus/package.json

# Start the application.
WORKDIR /monorepo/apps/caelus
CMD ["npm", "run-script", "start"]
