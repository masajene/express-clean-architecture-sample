
## buildを実行
FROM --platform=linux/amd64 node:18.5.0-alpine as build-stage

WORKDIR /app

COPY . ./

RUN yarn install --no-progress

RUN yarn prisma generate

RUN yarn run build

## runtime環境を作成
FROM node:18.5.0-alpine as runtime-stage

WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

COPY --from=build-stage /app ./

## PID1問題に対応する
RUN apk add --no-cache tini

ENTRYPOINT ["/sbin/tini", "--"]

USER node

EXPOSE 4000

ENV NODE_ENV prod

CMD ["node", "build/main.js"]