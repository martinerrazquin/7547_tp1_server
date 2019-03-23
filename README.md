# 7547_tp1_server
Servidor para TP1 de 75.47 - Taller de Desarrollo de Proyectos 2

## Run
* `docker-compose up`
* `docker-compose exec app npm run db:migrate`

The API will listen on `localhost:3000`, and reload on any changes to the source.

## Changes to the DB schema
The API uses Sequelize to connect to its PostgreSQL DB, and changes are handled using Sequelize-CLI. When making changes to the DB schema, follow these steps:

* Create a new migration that contains the changes to be added.
* Implement those changes in the Sequelize model.
* Run migration (`docker-compose exec app npm run db:migrate`).

## Before pushing
Make sure that all tests pass and there are no code style errors by running `docker-compose exec app npm test` before pushing.

# HypeChat API Rest