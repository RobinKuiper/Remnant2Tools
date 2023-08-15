import {OAuth2Client} from "google-auth-library";

const client_id = process.env.CLIENT_ID
const secret = process.env.CLIENT_SECRET

const oAuth2Client = new OAuth2Client(
  client_id,
  secret,
  'postmessage',
);

export default async function handler(request, response) {
  const { tokens } = await oAuth2Client.getToken(request.body.code); // exchange code for tokens
  const { access_token, refresh_token, expiry_date } = tokens;

  response.status(200).json({
    body: {
      access_token,
      refresh_token,
      expiry_date
    }
  });
}