import type { LoaderArguments } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getEvents } from "~/utils/google/calendar.server";

export async function loader({ request }: LoaderArguments): Promise<Response> {
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return json(
      {
        error: "Missing token",
      },
      400
    );
  }

  // TODO: import generic type for `json` from `@agreeto/common`
  return json({
    events: await getEvents(token),
  });
}
