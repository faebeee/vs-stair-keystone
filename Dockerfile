FROM node:6

RUN mkdir -p /var/www
WORKDIR /var/www
COPY . /var/www

RUN npm install
RUN npm rebuild node-sass

EXPOSE 8000

ENV NODE_ENV production
ENV PORT 8000

CMD npm run start
