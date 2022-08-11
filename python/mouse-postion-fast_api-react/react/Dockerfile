
# RUN apk update
# RUN apk add --update yarn
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /src

COPY . ./src

WORKDIR /src

RUN yarn install --frozen-lockfile

RUN yarn run build

RUN mv /src/build/* /usr/share/nginx/html

WORKDIR /

RUN rm -rf /src
