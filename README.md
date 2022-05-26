# Agreeto Basic Monorepo

The main monorepo for everything AgreeTo.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- `web-remix`: a [Remix](https://remix.run/) app
- `browser`: a browser extension for Chrome & Firefox
- `app`: a (currently empty) React app that will contain the calendar client
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`; will contain also prettier & tailwind configurations soon)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This monorepo uses the additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting started


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
