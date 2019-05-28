FROM node:10-alpine
RUN mkdir /www
WORKDIR /www
COPY . /www/
CMD ["npm", "start"]