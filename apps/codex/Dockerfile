# FROM node:20.12.2-buster-slim AS base
FROM node:20.12.2-buster-slim

WORKDIR /app

# COPY package.json pnpm-workspace.yaml ./

# RUN npm install -g pnpm

# RUN pnpm install

# RUN pnpm run -F "./apps/**" -r build

# FROM node:20.12.2-buster-slim AS production
# WORKDIR /app
# COPY --from=base ./apps/codex/.next ./.next
# COPY --from=base ./apps/codex/public ./public
# COPY --from=base ./apps/codex/package.json ./
# COPY --from=base ./node_modules ./node_modules

COPY ./node_modules ./node_modules
COPY ./apps/codex/public ./public
COPY ./apps/codex/next.config.js ./next.config.js
COPY ./apps/codex/package.json ./package.json
COPY ./apps/codex/.next ./.next

EXPOSE 3000

ENV NODE_ENV production

RUN npm install -g next@13.5.6

RUN pwd

RUN ls

# CMD [ "next", "start" ]
CMD ["node", ".next/standalone/server.js"]

# CMD ["node_modules/.bin/next", "start"]

# FROM node:18-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi


# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry during the build.
# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN \
#   if [ -f yarn.lock ]; then yarn run build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# # Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD HOSTNAME="0.0.0.0" node server.js
