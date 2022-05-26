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

## Context
This monorepo is barebones only:
The `browser` doesn't really have any features. It simply handles the injection on gmail and listens to icon clicks on any page to render the `app` package's react app (a Hello World example).

We want to support both browser extension & outlook and want to sync the user data between the apps. 

We therefore need a standalone web server (the `web-remix` app in this case) to fetch calendar events.

The web-remix app currently exposes a GET API endpoint that initiates the authentication flow:
`<domain>/auth/google`
The callback url will contain the code in the URL as a parameter.



## Your task
> **Note**
> Upon completion of this task, you'll get $200 transferred.

Your task is to add the outlook package and solve for the authentication strategy between the players.
- Add an outlook package to our monorepo that builds the package via an npm script
  <img width="410" alt="image" src="https://user-images.githubusercontent.com/18185649/170488699-8d3de54b-042f-48b3-8474-6476371a1638.png">
- Add microsoft oauth authentication to the web-remix app
  - *Note:* You can take inspiration from the google flow that you find, however ideally you find a way to persist the access token on the server & issue an JWT
- Store the returned token in locaStorage of the outlook api
- If the user is now authenticated, display a list of 10 events in the add-in instead of the sign in page


Bonus:
In case you want to get fancy, you can pick up any of the following tasks (50$ each):

- Find a way to deploy the outlook package via CLI/GitHub Action to the [Microsoft AppSource]([url](https://appsource.microsoft.com/de-de/home)) Store
- Add a database to the `web-remix` package to persist the Identity Provider's credentials & create a user
- Add a basic FullCalendar client view to the `app` package and render this in add-in whenever the user is authenticated (your choice if outlook or react)

## Getting started with this repo
1. Set up Google OAuth Platform
  JavaScript origins: `http://localhost:3000`
  Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
2. Copy the `.env.example` to `.env` & set the appropriate values from an account you've create on Google Cloud Platform
3. Start the web app. Start the remix app `npm run dev:web-remix` to accept api calls.
4. Visit `http://localhost:3000/api/auth/google?runtime=browser` and go through the oauth flow to see the token displayed in the URL

## Troubleshooting
For any questions, you can simply write on our Slack channel. We expect there to be errors and would love to bounce off ideas while you work on this.

## Tips

- You can change any part of the application — if you are more comfortable or productive with something else.
- You can change the project structure as you see fit.
- You can add any NPM package you need to implement new features or improve the existing code.
- We don't expect any particular approach other than outlined; infact, where eager to see with which solutions you come up

## How to submit
- Use a separate repo for the solution. Don't fork it, use this guide for [mirroring repos]([url](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository#mirroring-a-repository)).
- Create a short Loom recording of UI and code walk-through.
- Let us know on Slack once you've implemented everything

