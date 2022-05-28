import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "agreeToSession",
    },
  });

export { getSession, commitSession, destroySession };
