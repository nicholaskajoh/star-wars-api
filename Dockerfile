FROM node:8-alpine
RUN mkdir /www
WORKDIR /www
COPY . /www/
CMD ["npm", "start"]