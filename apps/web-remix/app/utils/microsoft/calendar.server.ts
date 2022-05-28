import { graphClient } from "./microsoft-client.server";

export const getEvents = async (
  token: string,
): Promise<any> => {
  const events = await graphClient(token)
    .api('me/calendar/events')
    .top(10)
    .get();

  return events;
}
