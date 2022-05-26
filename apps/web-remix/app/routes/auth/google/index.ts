import type { LoaderArguments } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { google } from "googleapis";

import { getRequiredEnvironmentVariable } from "~/utils/getRequiredEnvironmentVariable.server";
import { REDIRECT_URI, SCOPES } from "~/utils/google.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const runtime = new URL(request.url).searchParams.get("runtime");

  if (!runtime || !["browser"].includes(runtime)) {
    return redirect("/");
  }

  const client = new google.auth.OAuth2(
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_ID"),
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
    REDIRECT_URI
  );

  // Redirect to Google OAuth endpoint
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    include_granted_scopes: true,
    state: runtime,
  });

  return redirect(url);
}
