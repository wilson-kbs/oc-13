FROM node:22-alpine AS builder

RUN apk add --no-cache git

RUN git clone https://github.com/wilson-kbs/oc-13-api.git /app

WORKDIR /app

RUN npm install --production

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/swagger.yaml ./swagger.yaml


CMD ["npm", "run", "server"]
