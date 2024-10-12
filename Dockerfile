# Builder stage.
FROM node:lts-bullseye-slim AS builder

WORKDIR /app

# Install pnpm and copy the required files.
RUN npm install --global pnpm@9.12.1
COPY package.json ./
COPY pnpm-lock.yaml ./
# COPY patches ./patches

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm run build

# Remove development dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-bullseye-slim
ENV NODE_ENV production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/distribution /app/distribution
COPY --from=builder /app/package.json /app/package.json

# Start the application.
WORKDIR /app
CMD ["npm", "run-script", "start"]
