import { AuthenticationResult } from "@azure/msal-node";
import { REDIRECT_URI, SCOPES } from "./constants.server";
import { azureClient } from "./microsoft-client.server";

export const getRedirectUrl = async (): Promise<string> => {
  return azureClient.getAuthCodeUrl({
    scopes: SCOPES,
    redirectUri: REDIRECT_URI,
  });
}

export const getAuthToken = async (
  code: string,
): Promise<AuthenticationResult | null> => {
  return azureClient.acquireTokenByCode({
    code,
    redirectUri: REDIRECT_URI,
    scopes: SCOPES,
  });
}
