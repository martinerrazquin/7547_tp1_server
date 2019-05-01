# 7547_tp1_server
Servidor para TP1 de 75.47 - Taller de Desarrollo de Proyectos 2

[![Build Status](https://travis-ci.com/martinerrazquin/7547_tp1_server.svg?token=cxW52jpx7sfJZG9rsfwE&branch=master)](https://travis-ci.com/martinerrazquin/7547_tp1_server)
[![codecov](https://codecov.io/gh/martinerrazquin/7547_tp1_server/branch/master/graph/badge.svg?token=1J3EwBI3ow)](https://codecov.io/gh/martinerrazquin/7547_tp1_server)
![Heroku](https://heroku-badge.herokuapp.com/?app=server7547&root=ping)


## Run
* `docker-compose up`

The API will listen on `localhost:3000`, and reload on any changes to the source.

## Changes to the DB schema
The API uses Sequelize to connect to its PostgreSQL DB, and changes are handled using Sequelize-CLI. 
When making changes to the DB schema, follow these steps:

* Create a new migration that contains the changes to be added. (Use 
`docker-compose exec app ./node_modules/.bin/sequelize migration:generate --name [YOUR_MIGRATION_NAME]` to make sure 
it's timestamped)
* Implement those changes in the Sequelize model.
* Run migration (`docker-compose exec app npm run db:migrate`).

## Before pushing
Make sure that all tests pass and there are no code style errors by running `docker-compose exec app npm test` 
before pushing.