import {UserRefreshClient} from "google-auth-library";

const client_id = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET

export default async function refreshTokens(tokens) {
  const { refresh_token, expiry_date } = tokens;
  const currentTimestamp = Date.now();
  if (expiry_date < currentTimestamp) {
    const user = new UserRefreshClient(
      client_id,
      secret,
      refresh_token
    );
    const { credentials } = await user.refreshAccessToken();
    return credentials;
  }
  
  return tokens;
}