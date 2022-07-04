# express-api-boilerplate

Steps to run this project:

1. Run `yarn` command
2. Run `docker-compose up -d` command
3. Run `yarn start` command

```sh
├── src
│   ├── adapter
│   │   ├── gateway
│   │   │   └── user_repository.ts
│   │   └── handler
│   │       └── user_handler.ts
│   ├── application
│   │   ├── interactor
│   │   │   └── user_usecase.ts
│   │   └── usecase
│   │       └── user_usecase.ts
│   ├── domain
│   │   ├── entity
│   │   │   └── user.ts
│   │   └── repository
│   │       └── user_repository.ts
│   ├── infra
│   │   ├── database
│   │   │   ├── mysql_datasource.ts
│   │   │   └── ormconfig.ts
│   │   └── router
│   │       └── router.ts
│   └── main.ts

```