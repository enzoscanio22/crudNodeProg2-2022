# CRUD Node.js
CRUD made with Node.js, Express, TypeScript, TypeORM, EJS &amp; SQLite.

![Home page image](https://github.com/sinvalbsneto/crud_nodejs/blob/main/public/img/home.png)

## How to run with yarn:
- Clone the repository.
- Run `yarn` to download the dependecies.
- Create the `database.sqlite` file inside the `src/database` folder.
- Run `yarn typeorm migration:run` to run the migrations.
- Run `yarn dev` to start the server.
- The CRUD will be avaiable at `http://localhost:3000`.
- 
## How to run with npm:
- npm install -D tslib @types/node
- npm i -D @types/express
- npm install --location=local
- Create the `database.sqlite` file inside the `src/database` folder.
- npm run typeorm migration:run
- npm run dev
