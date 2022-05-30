export * from "googleapis";

export const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
