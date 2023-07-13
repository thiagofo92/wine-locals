FROM node:18.13.0

WORKDIR /var 

RUN mkdir -p /api/wine-locals/
RUN mkdir -p /api/wine-locals/logs
RUN mkdir -p /api/wine-locals/prisma/

COPY ./dist ./api/wine-locals/
COPY ./package.json ./api/wine-locals
COPY ./prisma ./api/wine-locals/prisma
COPY ./script.sh ./api/wine-locals

WORKDIR /var/api/wine-locals

RUN npm install
RUN npx prisma generate

CMD ["sh", "script.sh"]