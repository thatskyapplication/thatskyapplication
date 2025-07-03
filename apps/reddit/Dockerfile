# Builder stage.
FROM node:lts-bullseye-slim AS builder

WORKDIR /thatskyapplication

# Install pnpm and copy the monorepo files required for dependency resolution.
RUN npm install --global pnpm@9.12.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ./apps/reddit ./apps/reddit
COPY ./packages/utility ./packages/utility

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Build the application.
COPY . .
RUN pnpm run --filter ./packages/utility build
RUN pnpm run --filter ./apps/reddit build

# Remove unnecessary dependencies.
RUN pnpm prune --prod

# Final stage.
FROM node:lts-bullseye-slim
ENV NODE_ENV production

# Copy built files and production dependencies from builder stage.
COPY --from=builder /thatskyapplication/node_modules /thatskyapplication/node_modules
COPY --from=builder /thatskyapplication/packages/utility/distribution /thatskyapplication/packages/utility/distribution
COPY --from=builder /thatskyapplication/packages/utility/node_modules /thatskyapplication/packages/utility/node_modules
COPY --from=builder /thatskyapplication/packages/utility/package.json /thatskyapplication/packages/utility/package.json
COPY --from=builder /thatskyapplication/apps/reddit/node_modules /thatskyapplication/apps/reddit/node_modules
COPY --from=builder /thatskyapplication/apps/reddit/distribution /thatskyapplication/apps/reddit/distribution
COPY --from=builder /thatskyapplication/apps/reddit/package.json /thatskyapplication/apps/reddit/package.json

# Start the application.
WORKDIR /thatskyapplication/apps/reddit
CMD ["npm", "run-script", "start"]
