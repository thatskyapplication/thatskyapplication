FROM node:24-alpine AS builder

WORKDIR /thatskyapplication

RUN npm install --global pnpm@11.0.9

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/caelus/fluxer/package.json apps/caelus/fluxer/package.json
COPY packages/utility/package.json packages/utility/package.json

RUN pnpm install --frozen-lockfile

COPY packages/utility packages/utility
RUN pnpm --filter @thatskyapplication/utility run build

COPY apps/caelus/fluxer apps/caelus/fluxer
RUN pnpm install --frozen-lockfile --offline
RUN pnpm --filter @thatskyapplication/caelus-fluxer run build
RUN pnpm --filter @thatskyapplication/caelus-fluxer deploy --prod /thatskyapplication-production/caelus-fluxer

FROM node:24-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /thatskyapplication/apps/caelus/fluxer
COPY --from=builder /thatskyapplication-production/caelus-fluxer ./

USER node
CMD ["node", "distribution/index.js"]
