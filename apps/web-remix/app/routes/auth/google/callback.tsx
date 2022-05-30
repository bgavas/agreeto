import type { LoaderArguments } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ReactElement } from "react";

import { getRequiredEnvironmentVariable } from "~/utils/getRequiredEnvironmentVariable.server";
import { REDIRECT_URI, google } from "~/utils/google.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const parameters = new URL(request.url).searchParams;
  const code = parameters.get("code");
  const runtime = parameters.get("state");

  if (!code || !runtime || !["browser"].includes(runtime)) {
    return redirect("/");
  }

  const client = new google.auth.OAuth2(
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_ID"),
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
    REDIRECT_URI
  );

  const { tokens } = await client.getToken(code);

  if (!tokens.access_token) {
    throw new Error("No access token");
  }

  const token = tokens.access_token;

  // TODO: instead of returning the identity provider's access_token here store it in a database & return a JWT with the user info

  switch (runtime) {
    case "browser": {
      return json(token);
    }
    default: {
      console.error(`Invalid runtime "${runtime}"`);
      return redirect("/");
    }
  }
}

export default function Callback(): ReactElement {
  const token = useLoaderData();

  // TODO: @agreeto/common constant for id
  return <code id="agreeto-token">{token}</code>;
}
