FROM oven/bun:1
WORKDIR /app
COPY ./package.json ./
COPY ./bun.lockb ./
RUN bun install
EXPOSE 3000/tcp
EXPOSE 9229/tcp

