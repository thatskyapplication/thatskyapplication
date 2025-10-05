# Builder stage.
FROM node:lts-alpine AS builder

WORKDIR /thatskyapplication

# Install pnpm and copy the monorepo files required for dependency resolution.
RUN npm install --global pnpm@10.14.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/servare ./apps/servare

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm --filter @thatskyapplication/servare run build

# Remove unnecessary dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-alpine
ENV NODE_ENV=production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /thatskyapplication/node_modules /thatskyapplication/node_modules
COPY --from=builder /thatskyapplication/apps/servare/node_modules /thatskyapplication/apps/servare/node_modules
COPY --from=builder /thatskyapplication/apps/servare/distribution /thatskyapplication/apps/servare/distribution
COPY --from=builder /thatskyapplication/apps/servare/package.json /thatskyapplication/apps/servare/package.json

# Start the application.
WORKDIR /thatskyapplication/apps/servare
CMD ["npm", "run-script", "start"]
