FROM pluswerk/puppeteer

WORKDIR /usr/src/app

RUN yarn add nodemon convert-svg-to-png express body-parser

COPY ./index.mjs /usr/src/app

CMD ["node", "--experimental-modules", "index.mjs"]

EXPOSE 3000