import dotenv from "dotenv";
dotenv.config();
const { TENANT_ID, APP_ID, HOST_URL, PORT, APP_SECRET } = process.env;

export const passconfig = {
  creds: {
    identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/.well-known/openid-configuration`,
    clientID: `${APP_ID}`,
    redirectUrl: `https://cbnlnxprojectajalabackenddevtest.azurewebsites.net/api/v1/ad/signin`,
    clientSecret: APP_SECRET,
  },
  resourceURL: "https://graph.windows.net",
  destroySessionUrl: `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${HOST_URL}`,
};
