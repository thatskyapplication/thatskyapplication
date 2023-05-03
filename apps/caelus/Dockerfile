# Builder stage.
FROM node:lts-bullseye-slim AS builder

WORKDIR /app

# Install pnpm and copy the required files.
RUN npm install --global pnpm@8.4.0
COPY package.json ./

# Install dependencies.
RUN pnpm install

# Build the project.
COPY . .
RUN pnpm run build

# Remove development dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-bullseye-slim

ENV NODE_ENV production
WORKDIR /app

# Copy built files and production dependencies from builder stage.
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Start the application.
CMD ["npm", "run-script", "start"]
