# to-do app
This is fullstack app created in NextJS 13+

## Running on localhost
This app is using `docker compose` to run MYSQL database and `yarn` to run application.

1. Fetch app code

2. Create file `.env` from `.env-example` and fill non empty values (you can leave PRODUCTION_DATABASE_MYSQL_URL empty). Look at secion `File. env` from README.md

3. Install dependencies `yarn install`

4. Run database on docker container `docker-compose up -d` (remove -d if you want to see logs)

5. Run application `yarn dev`

TIP: You can use combined command from step 4 and 5: `docker-compose up -d && yarn dev`

6. Enojoy at `localhost:3000`

If you want to stop your container with database use command `docker compose down` - it will remove container with all its data inside.

## Running outside localhost (eg.: production)
Application in NextJS is designed to work on Vercel. Example steps to configure production:
- create MySQL database on railway
- create new project in Vercel
- correctly fill file `.env` for production and use is as environment inside Vercel project.

## File .env
How fill .env:

- `DEV_ENV`- when set to `on` it is configured to work on localhost. Other value will run on production mode.
- `PRODUCTION_DATABASE_MYSQL_URL` - leave empty for localhost. For production paste here railway MySQL URL address.
- `JWT_SECRET` - must be filled, it can be random string eg.: `jwt_very_secret_token_abc`
- `COOKIE_NAME` - must be filled, it can be random string eg.: `__todo_app__`
- `DB_NAME_LOCALHOST` - need for localhost. Leave as it is in `.env-example`
- `DB_USER_LOCALHOST` - need for localhost. Leave as it is in `.env-example`
- `DB_PASSWORD_LOCALHOST` - need for localhost, type you password (can be random string)

## Tests

### Unit tests
Unit tests are in folder `/tests`, test are created with Jest and react testing library .
To run use `yarn test` in root folder.

### e2e tests
End-to-end (e2e) tests are in folder `/e2e` to run need you need install dependencies by `yarn install` on `/e2e` folder.
Tests got its own `package.json` hence installed packages are separated from application code.

You need to create file `environment.e2e.ts` (eg.: from `environment.e2e-example.ts`) on `/e2e` folder and fill it.

To run test:
- `npx cypress open` - it will open Cypress window when you can chose which tests should run
- `yarn e2e` - it will run all tests in headless mode
- `yarn <test_name>` (eg.: `yarn smokeTest`) - it will run specific test in headless mode


// TO DO:
1. OPTIONAL - Spojrzeć na https://www.bitrix24.pl/uses/to-do-list-czyli-lista-rzeczy-do-zrobienia.php?utm_source=google&utm_medium=cpc&utm_campaign=10618862608-104405168105&gad_source=1&gclid=EAIaIQobChMIjpv_kr2ohAMVWDQGAB0FeQaKEAAYAiAAEgLSXvD_BwE - zobaczyć obrazki jak to wygląda na tej aplikacji:
2. Zobaczyć/Dodać cypress
3. wprowadzić i18next
4. zobaczyć/dodać testy jednostkowe

- root@root.pl
- rootoo