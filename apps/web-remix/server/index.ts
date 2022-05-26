import { createRequestHandler } from "@remix-run/express";
import type { LoadContext } from "@remix-run/node";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";

const BUILD_DIR = path.join(process.cwd(), "build");

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

app.use(express.static("public"));

app.use(morgan("tiny"));

app.all(
  "*",

  (req, res, next) => {
    const NODE_ENV = process.env.NODE_ENV;

    if (NODE_ENV === "development") {
      purgeRequireCache();
    }

    return createRequestHandler({
      build: require(BUILD_DIR),
      mode: NODE_ENV,
      getLoadContext(): LoadContext {
        return {};
      },
    })(req, res, next);
  }
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function purgeRequireCache(): void {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change.
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
