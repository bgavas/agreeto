# agreeto

The main monorepo for everything AgreeTo.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`; will contain also prettier & tailwind configurations soon)
- `database`: [Prisma](https://prisma.io/) ORM wrapper to manage & access your database
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo uses the additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [Docker Compose](https://docs.docker.com/compose/) for local database

## Getting started

### Database

We use [Prisma](https://prisma.io/) to manage & access our database. As such you will need a database for this project, either locally or hosted in the cloud.

To make this process easier, we offer a [`docker-compose.yml`](https://docs.docker.com/compose/) file to deploy a Postgres server locally with a new database named `agreeto` and a user & password.

To set up the database, you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp packages/database/.env.example packages/database/.env.example/.env
```

Now, you're ready to set up the database. We've included a script for you that sets up the database.

```bash
npm run db:setup
```

If you prefer do to set it up manually, you have to execute the following steps:

1. Deploys a postgres database via docker-compose (command `npm run db:up`)
2. Run migrations via prisma migrate deploy (command `npm run db:migrate:deploy`)
3. Seed the database via a seed.ts script contained in the database package (command `npm run db:seed`)

You can also execute the commands manually.

For further more information on migrations & how to use Prisma Migrate, we recommend to read through the [Prisma Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate).

### Start the apps

**Load the extension**. `npm run dev:chromium` or `npm run dev:firefox` for your preferred browser

- **AgreeTo for any website.** Visit any website & click on the AgreeTo extension icon to see the app.
- **AgreeTo for Gmail**. After logging in to gmail with your credentials, visit [Gmail's compose window](https://mail.google.com/mail/u/0/?compose=new) to see AgreeTo for Gmail.

## Local development workflow

1. **Start the react app.** `npm run dev:app` runs the react-app in development mode (not the extension)
2. **Make changes.** You can observe your changes on `localhost:3000` almost instantly thanks to vite
3. **Load the extension.** After you've made your changes, load the extension right from the shell

- `npm run dev:chromium` → Opens a chromium browser with your extension loaded
- `npm run dev:firefox` → Opens a firefox browser with your extension loaded
