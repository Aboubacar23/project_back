FROM node:22-alpine

#RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
#COPY package.json $HOME/
#RUN chown -R app:app $HOME/*

#USER root
WORKDIR $HOME

#COPY . .

#RUN npm init
RUN npm install -g nodemon
EXPOSE 3000