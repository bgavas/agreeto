import { Client } from "@microsoft/microsoft-graph-client";
import * as msal from "@azure/msal-node";
import "isomorphic-fetch";
import { getRequiredEnvironmentVariable } from "~/utils/getRequiredEnvironmentVariable.server";

export const azureClient = new msal.ConfidentialClientApplication({
  auth: {
    clientId: getRequiredEnvironmentVariable("MICROSOFT_CLIENT_ID"),
    clientSecret: getRequiredEnvironmentVariable("MICROSOFT_CLIENT_SECRET"),
  },
});

export const graphClient = (accessToken: string) => Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      return accessToken;
    },
  },
});
