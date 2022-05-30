import { json, LoaderArguments } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ReactElement } from "react";

import { getSession } from "~/sessions.server";
import { getRedirectUrl } from "~/utils/microsoft/auth.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get('microsoft-token');
  // Redirect to events page if already has token
  if (token) {
    return redirect("/api/microsoft/events");
  }
  
  // Get redirect URL
  const url = await getRedirectUrl();
  // Redirect client
  return json(url);
}

export default function Callback(): ReactElement {
  const url = useLoaderData();

  return (
    <button onClick={() => window.location.href = url}>
      Sign In with Microsoft
    </button>
  );
}
