FROM node:10 as builder

ENV NODE_ENV production

WORKDIR /build
COPY backend/package.json ./backend/
COPY backend/yarn.lock ./backend/
RUN cd backend && yarn --production=false --frozen-lockfile --non-interactive

COPY frontend/package.json ./frontend/
COPY frontend/yarn.lock ./frontend/
RUN cd frontend && yarn --production=false --frozen-lockfile --non-interactive

COPY . .

RUN cd backend && yarn run build
RUN cd frontend && yarn run build

FROM node:10

ENV NODE_ENV production
WORKDIR /server
COPY backend/package.json ./
COPY backend/yarn.lock ./
RUN yarn --prod --frozen-lockfile --non-interactive
COPY --from=builder /build/backend/bin ./bin
COPY --from=builder /build/backend/lib ./lib
COPY --from=builder /build/frontend/dist/apps/huectl ./www

EXPOSE 5050
CMD [ "node", "bin/cli.js" ]
