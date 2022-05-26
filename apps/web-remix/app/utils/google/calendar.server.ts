import type { calendar_v3 } from "googleapis";
import { google } from "googleapis";

import { getRequiredEnvironmentVariable } from "../getRequiredEnvironmentVariable.server";

function getCalendarClient(token: string): calendar_v3.Calendar {
  const client = new google.auth.OAuth2(
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_ID"),
    getRequiredEnvironmentVariable("GOOGLE_CLIENT_SECRET")
  );

  client.setCredentials({
    access_token: token,
  });

  return google.calendar({ version: "v3", auth: client });
}

export async function getEvents(
  token: string
): Promise<calendar_v3.Schema$Event[]> {
  const calendar = getCalendarClient(token);
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    // randomly, get 10 events
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  console.log(response.data.items?.length);
  const events = response.data.items || [];

  return events;
}
