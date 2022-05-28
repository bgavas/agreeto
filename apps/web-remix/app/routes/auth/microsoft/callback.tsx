import { LoaderArguments } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { commitSession, getSession } from "~/sessions.server";
import { getAuthToken } from "~/utils/microsoft/auth.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const parameters = new URL(request.url).searchParams;
  const code = parameters.get("code");
  if (!code) {
    return redirect("/");
  }

  // Acquire a token by exchanging the code
  const response = await getAuthToken(code);

  if (!response) {
    throw new Error('Authorization failed');
  }

  // Save token to the session
  const session = await getSession(request.headers.get("Cookie"));
  session.set('microsoft-token', response.accessToken);

  return redirect('/api/microsoft/events', {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
