FROM node:20-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./ ./

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]