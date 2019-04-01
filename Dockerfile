FROM node:8

ENV HOME=/usr/src/app

COPY package.json package-lock.json .sequelizerc $HOME/
COPY api/src/config $HOME/api/src/config

WORKDIR $HOME
RUN npm install

# This script to run after the DB container is up, 
# to run migrations.
RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "development"]
